import { EventypeRecord, NotificationDispatchReturn } from "@/types/prisma/NotificationDispatchType.js";
import { ICreateNotification } from "@/interface/ICreateNotification.js";
import { prisma } from "@/infrastructure/database/prisma/Connection.js";
import { UpdateNotificationType } from "@/types/zod/NotificationType.js";
import { DispatchEventype, Prisma } from "@generated/prisma/client.js";
import { SchemaTypeZod } from "@/types/index.js";
import { ErrorSystem } from "@/error/index.js";

export class CreateNotification implements ICreateNotification {
  async create(data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]): Promise<NotificationDispatchReturn> {
    const { event, jobId, eventId, payload } = data;

    try {
      const dataDispatch = await prisma.notificationDispatch.create({
        data: {
          job_id: jobId,
          event_id: eventId,
          user_id: payload.userId,
          message: payload.message,
          ...(payload.phone && { phone: payload.phone }),
          event_type: EventypeRecord[event] as DispatchEventype,
          ...(payload.severity && { severity: payload.severity }),
          ...(payload.email_alert && { email_alert: payload.email_alert })
        },
        select : {
          id: true,
          phone: true,
          message: true,
          severity: true,
          email_alert: true
        }
      });
      
      return dataDispatch;

    }catch (error) {
      if(error instanceof Prisma.PrismaClientInitializationError) {
        throw new ErrorSystem.UnavailableError("Database connection failed.", 503);
      };

      if(error instanceof Prisma.PrismaClientValidationError) {
        throw new ErrorSystem.ValidationError("Invalid field or data sent to database.", 400);
      };

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ErrorSystem.ConflictError("Duplicate event_id value violates unique constraint.", 409);
      }

      throw new ErrorSystem.ApplicationError("Unexpected database error.", 500);
    }
  }

  async update(id: string, data: UpdateNotificationType): Promise<void> {
    const { status, processed_at, error_reason, attempt: attempts } = data;
    try {
      await prisma.notificationDispatch.update({
        where: { id },
        data: {
          status,
          ...(processed_at && { processed_at }),
          ...(error_reason && { error_reason }),
          ...(attempts && { attempts }),
        }
      });

    }catch (error) {
      if(error instanceof Prisma.PrismaClientInitializationError) {
        throw new ErrorSystem.UnavailableError("Database connection failed.", 503);
      }

      if(error instanceof Prisma.PrismaClientValidationError) {
        throw new ErrorSystem.ValidationError("Invalid field or data sent to database.", 400);
      };

      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new ErrorSystem.NotFoundError(`Notification with id ${id} not found.`, 404);
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ErrorSystem.ConflictError("Duplicate event_id value violates unique constraint.", 409);
      }

      throw new ErrorSystem.ApplicationError("Unexpected database error.", 500);
    }
  }
}
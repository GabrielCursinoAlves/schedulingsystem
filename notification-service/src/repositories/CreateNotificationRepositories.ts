import { NotificationEventypeRecord, NotificationDispatchReturn } from "@/types/prisma/NotificationDispatchType.js";
import { ICreateNotification } from "@/interface/ICreateNotification.js";
import { UpdateNotificationType } from "@/types/zod/NotificationType.js";
import { prisma } from "@/infrastructure/database/prisma/Connection.js";
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
          ...(payload.severity && { severity: payload.severity }),
          event_type: NotificationEventypeRecord[event] as DispatchEventype,
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
      
      return { ...dataDispatch, alreadyFinished: false };

    }catch (error) {
      if(error instanceof Prisma.PrismaClientInitializationError) {
        throw new ErrorSystem.UnavailableError("Database connection failed.", 503);
      };

      if(error instanceof Prisma.PrismaClientValidationError) {
        throw new ErrorSystem.ValidationError("Invalid field or data sent to database.", 400);
      };

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        const notificationExists = await prisma.notificationDispatch.findUnique({
          where: { event_id: eventId },
          select: {
            id: true,
            phone: true,
            message: true,
            severity: true,
            email_alert: true,
            notificationOutbox: { select: { id: true } }
          }
        });

        if (!notificationExists) throw new ErrorSystem.ConflictError("Duplicate event_id value violates unique constraint.", 409);
        
        return {
          id: notificationExists.id,
          phone: notificationExists.phone,
          message: notificationExists.message,
          severity: notificationExists.severity,
          email_alert: notificationExists.email_alert,
          alreadyFinished: notificationExists.notificationOutbox ? true : false
        };
      }

      throw new ErrorSystem.ApplicationError("Unexpected database error.", 500);
    }
  }
  
  async update(id: string, data: UpdateNotificationType, tx: Prisma.TransactionClient): Promise<void> {
    const { status, processed_at, error_reason, attempt: attempts } = data;
    try {
      await tx.notificationDispatch.update({
        where: { id },
        data: {
          status,
          ...(error_reason !== undefined && { error_reason }),
          ...(attempts !== undefined && { attempts }),
          ...(processed_at && { processed_at })
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

      throw new ErrorSystem.ApplicationError("Unexpected database error.", 500);
    }
  }
}
import { NotificationDispatchReturn } from "@/types/prisma/NotificationDispatchType.js";
import { ICreateNotification } from "@/interface/ICreateNotification.js";
import { prisma } from "@/infrastructure/database/prisma/Connection.js";
import { DispatchEventype } from "@generated/prisma/client.js";
import { Prisma } from "@generated/prisma/client.js";
import { SchemaTypeZod } from "@/types/index.js";
import { ErrorSystem } from "@/error/index.js";

export class CreateNotification implements ICreateNotification {
  async execute(data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]): Promise<NotificationDispatchReturn> {
    const { event, jobId, eventId, payload } = data;
    try {
      const dataDispatch = await prisma.notificationDispatch.create({
        data: {
          event_id: eventId,
          job_id: jobId,
          event_type: event.replace(/\./g, "_") as DispatchEventype,
          user_id: payload.userId,
          phone: payload.phone,
          message: payload.message,
          ...(payload.severity && { severity: payload.severity })
        },
        select : {
          id: true,
          phone: true,
          message: true,
          severity: true
        }
      });
      
      return dataDispatch;

    }catch (error) {
      if(error instanceof Prisma.PrismaClientValidationError) {
        throw new ErrorSystem.ApplicationError(`Invalid field or data sent to database. Error: ${error.message}`);
      };

      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ErrorSystem.ConflictError("This event has already been scheduled.");
      }

      throw new ErrorSystem.ApplicationError("Unexpected database error.");
    }
  }
}
import { INotificationOutbox } from "@/interface/ICreateNotification.js";
import { Prisma } from "@generated/prisma/client.js";
import { SchemaTypeZod } from "@/types/index.js";
import { ErrorSystem } from "@/error/index.js";

export class CreateNotificationOutbox implements INotificationOutbox {
  async create(data: SchemaTypeZod["SchemaNotificationOutbox"], tx: Prisma.TransactionClient): Promise<void> {
    const { id: dispatch_id, jobId, eventId, status, event_type, error_reason } = data;

     try {
      const dataPayload = {
        jobId,
        status,
        eventId,
        ...(error_reason && { error_reason })
      };

      await tx.notificationOutbox.create({
        data: {
          event_type,
          dispatch_id,
          payload: { ...dataPayload }
        }
      });

     }catch (error) {
      if(error instanceof Prisma.PrismaClientInitializationError) {
        throw new ErrorSystem.UnavailableError("Database connection failed.", 503);
      };

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ErrorSystem.ConflictError("Duplicate dispatch_id value violates unique constraint.", 409);
      }

      throw new ErrorSystem.ApplicationError("Unexpected database error.", 500);
     }
  }
}
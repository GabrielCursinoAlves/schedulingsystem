import { ICreateNotification, INotificationOutbox, INotificationResult } from "@/interface/ICreateNotification.js";
import { prisma } from "@/infrastructure/database/prisma/Connection.js";
import { Prisma } from "@generated/prisma/client.js";
import { SchemaTypeZod } from "@/types/index.js";
import { ErrorSystem } from "@/error/index.js";

export class NotificationResultService implements INotificationResult {

   constructor(
    private readonly createNotification: ICreateNotification,
    private readonly createNotificationOutbox: INotificationOutbox
  ) {}

  async execute(data: SchemaTypeZod["SchemaNotificationOutbox"]): Promise<void> {
    const { id, event_type, eventId, jobId, status, attempt, error_reason } = data;
    
    try {
      await prisma.$transaction(async(tx) => {
    
        await this.createNotification.update( id, { 
          status, 
          processed_at: new Date(), 
          error_reason: error_reason ?? null,
          ...(attempt !== undefined && { attempt }),
        }, tx );

        await this.createNotificationOutbox.create({
          id,
          jobId,
          eventId,
          event_type,
          ...(error_reason && { error_reason }),
          status: status == "retry_send" ? "sent" : status,
        }, tx );
      });  
    
    } catch (error) {
      if(error instanceof ErrorSystem.ConflictError) throw error;
      
      if(error instanceof Prisma.PrismaClientInitializationError) {
        throw new ErrorSystem.UnavailableError("Database connection failed.", 503);
      }

      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ErrorSystem.ConflictError("NotificationOutbox already exists for this dispatch.", 409);
      }

      console.error("Persist notification result failed:", error);
      throw new ErrorSystem.ApplicationError("Failed to persist notification result.", 500);
    }
  }
}
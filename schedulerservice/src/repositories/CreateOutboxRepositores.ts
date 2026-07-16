import { OutboxParams } from "@/types/prisma/OutboxType.js";
import { Prisma } from "@generated/prisma/client.js";
import { ErrorSystem } from "@/error/index.js";

export class CreateOutbox {
  async execute(data: OutboxParams, tx: Prisma.TransactionClient): Promise<void> {
    const { eventId: event_id, event, scheduleId: schedule_id, scheduledAt: scheduled_at, payload } = data;
    
    try {
      await tx.outbox.create({
        data:{
          event_id,
          scheduled_at,
          schedule_id,
          payload,
          event,
        }
      });
    } catch (error) {
       if(error instanceof Prisma.PrismaClientValidationError) {
        throw new ErrorSystem.ApplicationError("Invalid field or data sent to database.");
      };
      
      throw new ErrorSystem.ApplicationError("Unexpected database error."); 
    }
  }
}
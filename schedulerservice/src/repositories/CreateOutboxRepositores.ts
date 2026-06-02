import { OutboxParams } from "@/types/prisma/OutboxType.js";
import { Prisma } from "@generated/prisma/client.js";
import { ErrorSystem } from "@/error/index.js";

export class CreateOutbox {
  async execute(data: OutboxParams, tx: Prisma.TransactionClient): Promise<void> {
    const { eventId, event, scheduleId, scheduledAt, payload } = data;
    
    try {
      await tx.outbox.create({
        data:{
          event_id: eventId,
          scheduledAt,
          scheduleId,
          payload,
          event,
        }
      });
    } catch (error) {
      throw new ErrorSystem.ApplicationError("Unexpected database error."); 
    }
  }
}
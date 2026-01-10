import { Transaction } from "@/types/prisma/TransactionType.js";
import { OutboxParams } from "@/interface/OutboxParams.js";
import { ErrorSystem } from "@/error/index.js";

export class CreateOutbox {
  async execute(data: OutboxParams, tsxprisma: Transaction): Promise<void> {
    const { aggregate_type, scheduleId, scheduledAt, event_type, payload} = data;
   
    try {
      await tsxprisma.outbox.create({
        data:{
          aggregate_type,
          scheduledAt,
          scheduleId,
          event_type,
          payload
        },
      });
    } catch (error) {
      throw new ErrorSystem.ApplicationError("Unexpected database error."); 
    }
  }
}
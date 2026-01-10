import { Transaction } from "../types/prisma/TransactionType.ts";
import { OutboxParams } from "../interface/OutboxParams.ts";
import { ErrorSystem } from "../error/index.ts";

export class CreateStorageOutboxService {
  async execute(data: OutboxParams, tsxprisma: Transaction): Promise<void> {
    const { aggregate_type, scheduleId, event_type, payload} = data;
   
    try {
      await tsxprisma.outbox.create({
        data:{
          aggregate_type,
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
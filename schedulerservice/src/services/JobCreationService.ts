import { PayloadPatternValidation } from "@/lib/validation/PayloadPatternValidation.js";
import { CronPatternValidation } from "@/lib/validation/CronPatternValidation.js";
import { ICreateShedulingSystem } from "@/interface/ICreateShedulingSystem.js";
import { SchemaSendPayload } from "@/schema/zod/SchedulingPayloadSchema.js";
import { prisma } from "@/infrastructure/database/prisma/Connection.js";
import { ensureJsonObject } from "@/lib/prisma/EnsureJsonObject.js";
import { ErrorSystem, ErrorValidation } from "@/error/index.js";
import { ICreateOutbox } from "@/interface/ICreateOutbox.js";
import { IJobCreation } from "@/interface/IJobCreation.js";
import { ConvertCron } from "@/lib/cron/ConvertCron.js";
import { SchemaTypeZod } from "@/types/index.js";

export class JobCreation implements IJobCreation { 
  constructor(private createScheduling: ICreateShedulingSystem, private createOutbox: ICreateOutbox) {}
  execute = async(user_id: string, data: SchemaTypeZod["SchemaCreateSystemService"]): Promise<void> => {
    try {
      const { payload, run_at, recurrence_pattern } = data;
     
      const payloadJobPattern = PayloadPatternValidation(payload);
      
      const cronPatternRecurrence = CronPatternValidation(recurrence_pattern);
     
      const scheduledAt = ConvertCron(cronPatternRecurrence) ?? new Date();
      
      const dataShedulingSystem = {
        recurrence_pattern: cronPatternRecurrence, 
        payload: payloadJobPattern,
        userId: user_id,
        run_at
      };

      await prisma.$transaction(async(tx) => {
        const ShedulingSystem = await this.createScheduling.execute(dataShedulingSystem, tx);
       
        const { id, user_id, event, phone } = ShedulingSystem;

        const resultPayload = SchemaSendPayload.safeParse(ShedulingSystem.payload);

        if(!resultPayload.success) throw new ErrorValidation.ZodValidationError(resultPayload.error);
       
        const payloadOutboxPattern = ensureJsonObject(resultPayload.data, { jobId: id, phone, userId: user_id });
        
        const dataOutbox = { 
          eventId: payloadOutboxPattern.eventId,
          payload: payloadOutboxPattern,
          scheduleId: id,
          scheduledAt,
          event
        };
      
        await this.createOutbox.execute(dataOutbox, tx);
       
      });

    } catch (error) {
      
      if(error instanceof ErrorValidation.ZodValidationError) {
        throw error;
      }

      if(error instanceof ErrorSystem.ApplicationError) {
        throw new ErrorSystem.ApplicationError(`Transaction process failure: ${error.message}`);
      }

      throw new ErrorSystem.ApplicationError(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);}
  }
}
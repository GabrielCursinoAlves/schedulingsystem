import { PayloadPatternValidation } from "@/lib/validation/PayloadPatternValidation.js";
import { CronPatternValidation } from "@/lib/validation/CronPatternValidation.js";
import { SchemaSendPayload } from "@/schema/zod/SchedulingPayloadSchema.js";
import { prisma } from "@/infrastructure/database/prisma/Connection.js";
import { ensureJsonObject } from "@/lib/prisma/EnsureJsonObject.js";
import { ErrorSystem, ErrorValidation } from "@/error/index.js";
import { RepositoriesSystem } from "@/repositories/index.js";
import { ConvertCron } from "@/lib/cron/ConvertCron.js";
import { SchemaTypeZod } from "@/types/index.js";

export class JobCreation { 
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
        const ShedulingSystem = await new RepositoriesSystem.CreateShedulingSystem().execute(dataShedulingSystem, tx);
       
        const { id, userId, event, phone } = ShedulingSystem;

        const resultPayload = SchemaSendPayload.safeParse(ShedulingSystem.payload);

        if(!resultPayload.success) throw new ErrorValidation.ZodValidationError(resultPayload.error);
       
        const payloadOutboxPattern = ensureJsonObject(resultPayload.data, { jobId: id, phone, userId });
       
        const dataOutbox = { 
          payload: payloadOutboxPattern,
          scheduleId: id,
          scheduledAt,
          event
        };
        
        await new RepositoriesSystem.CreateOutbox().execute(dataOutbox, tx);
       
      });

    } catch (error) {
      if(error instanceof ErrorSystem.ApplicationError) {
        throw new ErrorSystem.ApplicationError(`Transaction process failure: ${error.message}`);
      }
    }
  }
}
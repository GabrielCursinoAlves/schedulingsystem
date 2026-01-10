import { PayloadPatternValidation } from "../lib/validation/PayloadPatternValidation.ts";
import { CronPatternValidation } from "../lib/validation/CronPatternValidation.ts";
import { ensureJsonObject } from "../lib/prisma/EnsureJsonObject.ts";
import { SchedulingMetadata } from "../interface/ShedulingParams.ts";
import { RepositoriesSystem } from "../repositories/index.ts";
import { prisma } from "../config/prisma/Connection.ts";
import { SchemaTypeZod } from "../types/index.ts";
import { ErrorSystem } from "../error/index.ts";

export class JobCreationService {
  execute = async(user_id: string, data: SchemaTypeZod["SchemaCreateSystemService"]): Promise<void> => {
    try {
      const { payload, run_at, recurrence_pattern } = data;

      let payloadPattern = PayloadPatternValidation(payload);
      const cronPatternRecurrence = CronPatternValidation(recurrence_pattern);

      const dataShedulingSystem = {
        userId: user_id,
        payload: payloadPattern,
        run_at,
        recurrence_pattern: cronPatternRecurrence 
      };

      await prisma.$transaction(async(tx) => {
        const ShedulingSystem = await new RepositoriesSystem.CreateShedulingSystem().execute(dataShedulingSystem, tx);
        
        const { id, userId, dataAdditional } = ShedulingSystem;
        const { aggregate_type, event_type, phone }: SchedulingMetadata = dataAdditional;
       
        payloadPattern = ensureJsonObject(
          ShedulingSystem.payload, {
            phone,
            userId,
            jobId: id
          }
        );

        const dataOutbox = { 
          payload,
          event_type,
          scheduleId: id, 
          aggregate_type,
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
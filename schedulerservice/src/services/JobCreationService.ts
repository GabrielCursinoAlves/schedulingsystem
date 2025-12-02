import { SchedulingParams, SchedulingMetadata } from "../interface/ShedulingParams.ts";
import { ensureJsonObject } from "../lib/prisma/EnsureJsonObject.ts";
import { RepositoriesSystem } from "../repositories/index.ts";
import { prisma } from "../config/prisma/Connection.ts";
import { ErrorSystem } from "../error/index.ts";

export class JobCreationService {
  execute = async(data: SchedulingParams): Promise<void> => {
    try {
      let { payload } = data;
      
      await prisma.$transaction(async(tx) => {
        const ShedulingSystem = await new RepositoriesSystem.CreateShedulingSystem().execute(data, tx);
        
        const { id, userId, dataAdditional } = ShedulingSystem;
        const { aggregate_type, event_type, phone }: SchedulingMetadata = dataAdditional;
        
        payload = ensureJsonObject(
          ShedulingSystem.payload,{
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
       
        await new RepositoriesSystem.CreateOutboxService().execute(dataOutbox, tx);
       
      });

    } catch (error) {
     
      if(error instanceof ErrorSystem.ApplicationError){
        throw new ErrorSystem.ApplicationError(`Transaction process failure: ${error.message}`);
      }
    }
  }
}
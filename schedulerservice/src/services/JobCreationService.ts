import { SchedulingParams } from "../interface/ShedulingParams";
import { RepositoriesSystem } from "../repositories/index.ts";
import { prisma } from "../config/prisma/Connection.ts";
import { ErrorSystem } from "../error/index.ts";
import { Prisma } from "@prisma/client";

export class JobCreationService {
  execute = async(data: SchedulingParams): Promise<void> => {
    try {
      const { payload } = data;
      await prisma.$transaction(async(tx) => {
        const ShedulingSystem = await new RepositoriesSystem.CreateStorageShedulingSystem().execute(data, tx);
        
        const { aggregate_type, event_type, phone } = ShedulingSystem.dataPayload;
        const dataPayload = {... payload as Prisma.JsonObject, aggregate_type, event_type, phone};
        const dataOutbox = { scheduleId: ShedulingSystem.id, event_type, payload: dataPayload, phone, aggregate_type };
        
        await new RepositoriesSystem.CreateStorageOutboxService().execute(dataOutbox, tx);
      });

    } catch (error) {
      if(error instanceof ErrorSystem["ApplicationError"]){
        throw new ErrorSystem.ApplicationError(`Transaction process failure: ${error.message}`);
      }
    }
  }
}
import { SchedulingParams } from "../interface/ShedulingParams";
import { prisma } from "../config/prisma/Connection.ts";
import { ErrorSystem } from "../error/index.ts";

export class JobCreationService {
  execute = async(data: SchedulingParams): Promise<void> =>{
    try {

      await prisma.$transaction(async(tx) => {

      });

    } catch (error) {
      if(error instanceof ErrorSystem["ApplicationError"]){
        throw new ErrorSystem.ApplicationError(`Transaction process failure: ${error.message}`);
      }
    }
  }
}
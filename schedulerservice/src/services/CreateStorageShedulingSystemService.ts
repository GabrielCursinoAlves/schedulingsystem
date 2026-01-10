import { SchedulingParams, ShedulingReturns } from "../interface/ShedulingParams.ts";
import { prisma } from "../config/prisma/Connection.ts";
import { ErrorSystem } from "../error/index.ts";

export class CreateStorageShedulingSystem {
  execute = async(data: SchedulingParams): Promise<ShedulingReturns> => {
    const {userId, payload, run_at, recurrence_pattern} = data;
    
    const userExist = prisma.user.findUnique({ where:{ id: userId }});

    if(!userExist){
      throw new ErrorSystem.NotFound("User does not exist.");
    }
    
    const createSheduling = await prisma.scheduledJob.create({
      data:{
        userId,
        payload,
        run_at,
        recurrence_pattern,
        is_recurring: (recurrence_pattern.match(/\*/g) || []).length == 6 ? true : false,
      }
    });

    return createSheduling;
  }
}
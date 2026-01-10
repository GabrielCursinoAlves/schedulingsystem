import { SchedulingParams, ShedulingReturns } from "../interface/ShedulingParams.ts";
import { cronPatternRecurrence } from "../lib/cron/cronPatternRecurrence.ts";
import { Transaction } from "../types/prisma/TransactionType.ts";
import { ErrorSystem } from "../error/index.ts";
import { Prisma } from "@prisma/client";

export class CreateStorageShedulingSystem {
  execute = async(data: SchedulingParams, tsxprisma: Transaction): Promise<ShedulingReturns> => {
    const {userId, payload, run_at, recurrence_pattern} = data;
  
    try {
      const user = await tsxprisma.user.findUnique({ 
        where: { id: userId },
        select: {
          phone: true,
        }
      });
     
      if(!user){
        throw new ErrorSystem.NotFound("User does not exist.");
      }
      
      const createSheduling = await tsxprisma.scheduledJob.create({
        data:{
          userId,
          payload,
          run_at,
          recurrence_pattern,
          is_recurring: cronPatternRecurrence(recurrence_pattern),
        },
      });

      const dataAdditional = {
        phone: user.phone,
        aggregate_type: "ScheduledJob",
        event_type: "JobScheduled"
      };
     
      return {
        ...createSheduling,
        dataAdditional
      };

    } catch (error) {
      
      if(error instanceof Prisma.PrismaClientValidationError) {
        throw new ErrorSystem.PrismaUniqueViolation("Invalid field or data sent to database.");
      }
            
      throw new ErrorSystem.ApplicationError("Unexpected database error."); 
    }
    
  }
}
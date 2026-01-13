import { SchedulingParams, ShedulingReturns } from "@/interface/ShedulingParams.js";
import { cronPatternRecurrence } from "@/lib/cron/cronPatternRecurrence.js";
import { Transaction } from "@/types/prisma/TransactionType.js";
import { Prisma } from "@generated/prisma/client.js";
import { ErrorSystem } from "@/error/index.js";

export class CreateShedulingSystem {
  execute = async(data: SchedulingParams, tsxprisma: Transaction): Promise<ShedulingReturns> => {
    const { userId, payload, run_at, recurrence_pattern } = data;
    
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
        throw new ErrorSystem.ApplicationError("Invalid field or data sent to database.");
      }
            
      throw new ErrorSystem.ApplicationError("Unexpected database error."); 
    }
    
  }
}
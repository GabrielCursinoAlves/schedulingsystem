import { SchedulingParams, SchedulingReturns } from "@/types/prisma/ShedulingType.js";
import { cronPatternRecurrence } from "@/lib/cron/cronPatternRecurrence.js";
import { SchemaSendPayload } from "@/schema/zod/SchedulingPayloadSchema.js";
import { Prisma } from "@generated/prisma/client.js";
import { ErrorSystem } from "@/error/index.js";

export class CreateShedulingSystem {
  execute = async(data: SchedulingParams, tx: Prisma.TransactionClient): Promise<SchedulingReturns> => {
    const { userId, payload, run_at, recurrence_pattern } = data;
   
    try {
      const user = await tx.user.findUnique({ 
        where: { id: userId }, 
        select: { phone: true } 
      });
     
      if(!user){
        throw new ErrorSystem.NotFound("User does not exist.");
      }
      
      const createSheduling = await tx.scheduledJob.create({
        data:{
          userId,
          payload,
          run_at,
          recurrence_pattern,
          is_recurring: cronPatternRecurrence(recurrence_pattern),
        },
      });

      const dataJobPayload = SchemaSendPayload.parse(createSheduling.payload);

      return {
        ...createSheduling,
        phone: user.phone,
        event: `notification.${dataJobPayload.type}`
      };

    } catch (error) {
      
      if(error instanceof ErrorSystem.ApplicationError) {
        throw error;
      };

      if(error instanceof Prisma.PrismaClientValidationError) {
        throw new ErrorSystem.ApplicationError("Invalid field or data sent to database.");
      };
            
      throw new ErrorSystem.ApplicationError("Unexpected database error."); 
    }
    
  }
}
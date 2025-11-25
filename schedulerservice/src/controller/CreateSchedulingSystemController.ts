import { SchemaCreateSystemRouter } from "../schema/zod/CreateSchedulingSystemSchema.ts";
import { PayloadPatternValidation } from "../lib/validation/PayloadPatternValidation.ts";
import { CronPatternValidation } from "../lib/validation/CronPatternValidation.ts";
import { JobCreationService } from "../services/JobCreationService.ts";
import { ErrorSystem, ErrorValidation } from "../error/index.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import dayjs from "dayjs";

export class CreateSchedulingSystem {
  constructor(private SchedulingTransaction = new JobCreationService()){}
  handle = async(req: FastifyRequest, reply: FastifyReply) => {
    const result = SchemaCreateSystemRouter.safeParse(req.body);
    
    if(!result.success){
      throw new ErrorValidation.ZodValidationError(result.error);
    }

    if(result.data){
      const {user_id, payload, run_at, recurrence_pattern} = result.data;

      const payloadPattern = PayloadPatternValidation(payload);
      const cronPatternRecurrence = CronPatternValidation(recurrence_pattern);

      if(!dayjs(run_at).isValid()){
        throw new ErrorSystem.ApplicationError("The date is not in the correct format.")
      }

      const data = {
        userId: user_id,
        payload: payloadPattern,
        run_at,
        recurrence_pattern: cronPatternRecurrence 
      };

      await this.SchedulingTransaction.execute(data);
      
      return reply.code(204).send({
        message: "Scheduling created successfully"
      });
      
    }
  }
}
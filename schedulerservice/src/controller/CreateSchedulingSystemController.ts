import { SchemaCreateSystemRouter } from "../schema/zod/CreateSchedulingSystemSchema.ts";
import { JobCreationService } from "../services/JobCreationService.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorValidation } from "../error/index.ts";

export class CreateSchedulingSystem {
  constructor(private SchedulingTransaction = new JobCreationService()){}
  handle = async(req: FastifyRequest, reply: FastifyReply) => {
    const result = SchemaCreateSystemRouter.safeParse(req.body);
    
    if(!result.success){
      throw new ErrorValidation.ZodValidationError(result.error);
    }

    if(result.data){
      const {user_id, payload, run_at, recurrence_pattern} = result.data;

      const data = {
        user_id,
        payload,
        run_at,
        recurrence_pattern
      };

      await this.SchedulingTransaction.execute(data);
      
      return reply.code(204).send({
        message: "Scheduling created successfully"
      });
      
    }
  }
}
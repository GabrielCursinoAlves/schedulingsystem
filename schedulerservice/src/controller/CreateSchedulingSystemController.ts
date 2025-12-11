import { SchemaCreateSystemRouter } from "../schema/zod/CreateSchedulingSystemSchema.ts";
import { JobCreationService } from "../services/JobCreationService.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorValidation } from "../error/index.ts";

export class CreateSchedulingSystem {
  constructor(private SchedulingTransaction = new JobCreationService()){}
  handle = async(req: FastifyRequest, reply: FastifyReply) => {
    const result = SchemaCreateSystemRouter.safeParse(req.body);
    const user_id = req.user.userId as string;
    
    if(!result.success) throw new ErrorValidation.ZodValidationError(result.error);

    if(result.data){
      const { payload, run_at, recurrence_pattern } = result.data;

      const data = {
        payload,
        run_at,
        recurrence_pattern
      };

      await this.SchedulingTransaction.execute(user_id, data);
      
      return reply.code(201).send({
        message: "Scheduling created successfully"
      });
      
    }
  }
}
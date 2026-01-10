import { SchemaCreateSystemRouter } from "../schema/zod/CreateSchedulingSystemSchema.ts";
import { JobCreation } from "../services/JobCreationService.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorValidation } from "../error/index.ts";

export class CreateSchedulingSystem {
  constructor(private SchedulingTransaction = new JobCreation()){}
  handle = async(req: FastifyRequest, reply: FastifyReply) => {
    const result = SchemaCreateSystemRouter.safeParse(req.body);
    const user_id = req.user.userId as string;
    
    if(!result.success) throw new ErrorValidation.ZodValidationError(result.error);

    const { payload, run_at, recurrence_pattern } = result.data;

    const schedulingData = { payload, run_at, recurrence_pattern };

    await this.SchedulingTransaction.execute(user_id, schedulingData);
      
    return reply.code(201).send({
      message: "Scheduling created successfully"
    });
  
  }
}
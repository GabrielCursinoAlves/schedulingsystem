import { SchemaCreateSystemRouter } from "@/schema/zod/CreateSchedulingSystemSchema.js";
import { JobCreation } from "@/services/JobCreationService.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorSystem, ErrorValidation } from "@/error/index.js";

export class CreateSchedulingSystem {
  constructor(private SchedulingTransaction = new JobCreation()){}
  handle = async(req: FastifyRequest, reply: FastifyReply) => {
    const result = SchemaCreateSystemRouter.safeParse(req.body);
    const user_id = req.user.userId;
    
    if(!result.success) throw new ErrorValidation.ZodValidationError(result.error);

    if(!user_id) throw new ErrorSystem.NotFound("User does not exist.");
  
    const { payload, run_at, recurrence_pattern } = result.data;

    const schedulingData = { payload, run_at, recurrence_pattern };

    await this.SchedulingTransaction.execute(user_id, schedulingData);
      
    return reply.code(201).send({
      message: "Scheduling created successfully"
    });
  
  }
}
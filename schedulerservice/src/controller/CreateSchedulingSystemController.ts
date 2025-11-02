import {Request, SchemaCreateSchedulingController} from "../types/CreateSchedulingType.ts";
import { SchemaCreateSystemRouter } from "../schema/zod/CreateSchedulingSystemSchema.ts";
import { ErrorSystem } from "../error/index.ts";
import type {FastifyReply} from 'fastify';
import { ZodError } from "zod";

export class CreateSchedulingSystem {
  async handle(req: Request<SchemaCreateSchedulingController>, replay:FastifyReply){
    const result =   SchemaCreateSystemRouter.safeParse(req.body);

    if(result.error instanceof ZodError){
      throw new ErrorSystem.ZodValidationError(result.error);
    }
 
  }
}
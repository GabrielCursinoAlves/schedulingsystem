import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import {FastifyInstance} from "fastify";

import {SchemaCreateSystem} from "../schema/zod/CreateSchedulingSystemSchema.ts";
import {ControllerSystem} from "../controller/index.ts";

export const CreateSchedulingRouter = async(app:FastifyInstance) => {

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.withTypeProvider<ZodTypeProvider>().post("/CreateSchedulingSystem", SchemaCreateSystem, new ControllerSystem.CreateSchedulingSystem().handle);

}
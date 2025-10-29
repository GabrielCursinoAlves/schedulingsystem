import fastify from "fastify";
import { 
  validatorCompiler, 
  serializerCompiler, 
  ZodTypeProvider } 
from "fastify-type-provider-zod"; 
import {ErrorHandler} from "../../errorHandler.ts";
import type {ControllerZodInstance} from "../../types/ErrorZodType.ts";

export const CreateZodFastify = (): ControllerZodInstance => {

  const app = fastify().withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler(ErrorHandler);

  return app;
}
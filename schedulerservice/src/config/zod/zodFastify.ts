import { validatorCompiler, serializerCompiler, ZodTypeProvider } from "fastify-type-provider-zod"; 
import type { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { ErrorHandler } from "@/errorHandler.js";
import fastify from "fastify";

export const CreateZodFastify = (): ControllerZodInstance => {

  const app = fastify().withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler(ErrorHandler);

  return app;
}
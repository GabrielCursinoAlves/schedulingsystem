import { 
  validatorCompiler, 
  serializerCompiler, 
  ZodTypeProvider } 
from "fastify-type-provider-zod"; 
import fastify, { FastifyInstance } from "fastify";

export const CreateZodFastify = (): FastifyInstance => {

  const app = fastify().withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  return app;
}
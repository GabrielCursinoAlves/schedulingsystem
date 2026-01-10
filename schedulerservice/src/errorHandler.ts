import {FastifyRequest, FastifyReply} from "fastify";
import { ErrorSystem } from "./error/index.ts";

export const ErrorHandler = (
  error: Error, 
  request: FastifyRequest, 
  reply: FastifyReply) => {
  
  if((error as any).validation) {

    const zodError = (error as any).validation[0]?.message;
    return reply.status(400).send({
      error: "ZodValidationError",
      statusCode: 400,
      message: zodError || "Zod validation error",
    });
  }
  const ErrorClass = ErrorSystem[error.name as keyof typeof ErrorSystem]; 
  
  if(error instanceof ErrorClass){
     
    const PrismaErro = new ErrorClass(error.message);
     return reply.status(PrismaErro.statusCode).send({
      error: PrismaErro.name,
      statusCode: PrismaErro.statusCode,
      message: PrismaErro.message,
    });
  }

  if(error instanceof ErrorClass) {

    reply.status(error.statusCode).send({
      error: error.name,
      statusCode: error.statusCode,
      message: error.message
    });
  }
 
  reply.status(500).send({
    error: "Internal Server Error",
    statusCode: 500,
    message: "An unexpected error has occurred."
  });
  
}
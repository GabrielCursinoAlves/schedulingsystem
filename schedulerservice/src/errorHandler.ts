import {FastifyRequest, FastifyReply} from "fastify";
import { ErrorSystem } from "./error/index.ts";
import { ZodValidationError } from "./error/zod/ZodError.ts";
import { error } from "console";

export const ErrorHandler = (
  error: Error, 
  request: FastifyRequest, 
  reply: FastifyReply) => {

  if((error as any).validation) {
    const zodError = (error as any).validation[0]?.message ?? "ZodValidationError";
    return reply.status(400).send({
      error: "ZodValidationError",
      statusCode: 400,
      message: zodError,
    });
  };

  if(error instanceof ErrorSystem.ZodValidationError){
    
     reply.status(error.statusCode).send({
      error: error.name,
      statusCode: error.statusCode,
      message: error.message,
      issues: error.issues
    });
  }

  const ErrorClass = ErrorSystem[error.name as keyof typeof ErrorSystem]; 
 
  if (error instanceof ErrorClass && !(error instanceof ZodValidationError)) {
    
    const prismaInstance = new ErrorClass(error.message as any);
     return reply.status(prismaInstance.statusCode).send({
      error: prismaInstance.name,
      statusCode: prismaInstance.statusCode,
      message: prismaInstance.message,
    });
  }

  if(error instanceof ErrorSystem.ApplicationError) {

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
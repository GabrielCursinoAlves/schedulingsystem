import { ErrorSystem, ErrorValidation } from "@/error/index.js";
import {FastifyRequest, FastifyReply} from "fastify";

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

  if(error instanceof ErrorValidation.ZodValidationError){
     return reply.status(error.statusCode).send({
      error: error.name,
      statusCode: error.statusCode,
      message: error.message,
      issues: error.issues
    });
  }

  if(error instanceof ErrorSystem.ApplicationError) {
    return reply.status(error.statusCode).send({
      error: error.name,
      statusCode: error.statusCode,
      message: error.message
    });
  }
  
  request.log.error(error);
  
  reply.status(500).send({
    error: "Internal Server Error",
    statusCode: 500,
    message: "An unexpected error has occurred."
  });
  
}
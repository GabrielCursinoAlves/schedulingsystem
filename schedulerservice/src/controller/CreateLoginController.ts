import { ErrorValidation } from "../error/index.ts";
import { SchemaLogin } from "../schema/zod/LoginSchema.ts";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateLoginController {
  handle = async(req: FastifyRequest, reply: FastifyReply) => {
      const result = SchemaLogin.safeParse(req.body);

      if(!result.success){
        throw new ErrorValidation.ZodValidationError(result.error);
      }

      if(result.data){
        const { username, password } = result.data;
        console.log(password);
      }
  }
}
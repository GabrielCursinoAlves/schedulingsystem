import { SessionStorage } from "../services/SessionStorageService.ts";
import { SchemaSession } from "../schema/zod/SessionSchema.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorValidation } from "../error/index.ts";

export class CreateSessionController {
  constructor(private Session = new SessionStorage()){}
  handle = async(req: FastifyRequest, reply: FastifyReply) => {
    const result = SchemaSession.safeParse(req.body);

    if(!result.success){
      throw new ErrorValidation.ZodValidationError(result.error);
    }

    if(result.data){
      const { email, password } = result.data;

      const credentialsData = await this.Session.verify({email, password});

      return reply.code(200).send({
        data: credentialsData
      });

    }
  }
}
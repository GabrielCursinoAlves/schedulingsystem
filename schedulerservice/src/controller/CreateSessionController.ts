import { SessionStorage } from "../services/SessionStorageService.ts";
import { SchemaSession } from "../schema/zod/SessionSchema.ts";
import { RepositoriesSystem } from "../repositories/index.ts";
import { expiresInToMs } from "../lib/date/ExpiresInTo.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorValidation } from "../error/index.ts";

export class CreateSession {
  constructor(private Session = new SessionStorage()){}
  handle = async(req: FastifyRequest, reply: FastifyReply) => {
    const result = SchemaSession.safeParse(req.body);

    if(!result.success) throw new ErrorValidation.ZodValidationError(result.error);

    const { email, password } = result.data;

    const credentialsData = await this.Session.verify({ email, password });
    const { user_id, refreshToken, expiresAt, acessToken } = credentialsData;

    const expiresAtToken = new Date(Date.now() + expiresInToMs(expiresAt));
      
    const sessionData = {
      user_id,
      refreshToken,
      expiresAt: expiresAtToken
    };
        
    await new RepositoriesSystem.CreateSession().execute(sessionData);

    return reply.code(200).send({
      message: "User logged in succes", 
      acessToken, 
      refreshToken 
    });

  }
}
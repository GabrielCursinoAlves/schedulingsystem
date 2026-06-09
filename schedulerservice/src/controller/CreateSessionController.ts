import { ISessionStorage } from "@/interface/ISessionStorage.js";
import { ICreateSession } from "@/interface/ICreateSession.js";
import { SchemaSession } from "@/schema/zod/SessionSchema.js";
import { expiresInToMs } from "@/lib/date/ExpiresInTo.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorValidation } from "@/error/index.js";

export class CreateSession {
  constructor(private Session: ISessionStorage, private CreateSession: ICreateSession){}
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
        
    await this.CreateSession.execute(sessionData);

    return reply.code(200).send({
      message: "User logged in succes", 
      acessToken, 
      refreshToken 
    });

  }
}
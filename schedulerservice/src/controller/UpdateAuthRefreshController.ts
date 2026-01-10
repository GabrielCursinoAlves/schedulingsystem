import { SchemaRefreshToken } from "@/schema/zod/RefreshTokenSchema.js";
import { RefreshToken } from "@/services/RefreshTokenService.js";
import { RepositoriesSystem } from "@/repositories/index.js";
import { expiresInToMs } from "@/lib/date/ExpiresInTo.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorValidation } from "@/error/index.js";

export class UpdateAuthRefresh {
  constructor(private refreshToken = new RefreshToken()){}
  handle = async(req: FastifyRequest, reply: FastifyReply) => {
    const result = SchemaRefreshToken.safeParse(req.body);

    if(!result.success) throw new ErrorValidation.ZodValidationError(result.error);

    const { refreshToken } = result.data;

    this.refreshToken.verify({ refreshToken });

    const tokenData = await this.refreshToken.generate({refreshToken});

    const expiresAtToken = new Date(Date.now() + expiresInToMs(tokenData.expiresAt));

    const sessionData = {
      expiresAt: expiresAtToken,
      user_id: tokenData.user_id,
      refreshToken: tokenData.refreshToken
    };

    await new RepositoriesSystem.CreateSession().execute(sessionData);

    return reply.code(200).send({
      message: "Credentials updated successfully.", 
      data: {
        acessToken: tokenData.acessToken,
        refreshToken: tokenData.refreshToken
      }
    });

  }
}
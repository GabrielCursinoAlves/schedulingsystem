import { SessionRefreshReturns, SessionReturns } from "@/interface/SessionParams.js";
import { JWTProvider } from "@/lib/middleware/JWTProvider.js";
import { RepositoriesSystem } from "@/repositories/index.js";
import { prisma } from "@/config/prisma/Connection.js";
import { SchemaTypeZod } from "@/types/index.js";
import { ErrorSystem } from "@/error/index.js";
import { Env } from "@/environment/env.js";
import jwt from "jsonwebtoken";

export class RefreshToken {
  verify = (data: SchemaTypeZod["SchemaRefreshToken"]): void => {
    const secret =  Env.SECRET_KEY;
    if(!secret) throw new ErrorSystem.ApplicationError("SECRET KEY was not defined.");

    const { refreshToken } = data;
   
    if(!refreshToken) throw new ErrorSystem.UnauthorizedError("Malformed Authorization header.");

    try {
      jwt.verify(refreshToken, secret);

    } catch (error) {

      if(error instanceof ErrorSystem.ApplicationError) {
        throw new ErrorSystem.ApplicationError(`Failed to validate token: ${error.message}`);
      }

      throw new ErrorSystem.ApplicationError("Unexpected error in token authentication.");
    }
  }

  validateAndGetSession = async(refreshToken: string): Promise<SessionRefreshReturns> => {
    const session = await prisma.session.findUnique({where:{ token: refreshToken } });
    
    if(!session) 
      throw new ErrorSystem.UnauthorizedError("RefreshToken Invalid authentication credentials.");
    
    if(session.expiresAt && new Date() > session.expiresAt) 
      throw new ErrorSystem.ApplicationError("Session expired. Please log in again.");

    return {
      user_id: session.userId,
      acessToken: session.token,
      expiresAt: session.expiresAt
    };
  }

  generate = async(data: SchemaTypeZod["SchemaRefreshToken"]): Promise<SessionReturns> => {
    const { refreshToken } = data;

    const acessTokenExpires = Env.ACESS_TOKEN_EXPIRES;
    if(!acessTokenExpires) 
      throw new ErrorSystem.ApplicationError("ACESS_TOKEN_EXPIRES was not defined.");

    const refreshTokenExpires = Env.REFRESH_TOKEN_EXPIRES;
    if(!refreshTokenExpires) 
      throw new ErrorSystem.ApplicationError("REFRESH_TOKEN_EXPIRES was not defined.");
    
    const session = await this.validateAndGetSession(refreshToken);
    await new RepositoriesSystem.CreateRefreshToken().delete(session.acessToken);
    
    const acessNewToken = JWTProvider(session.user_id, acessTokenExpires);
    const refreshNewToken = JWTProvider(session.user_id, refreshTokenExpires);
    
    return { 
      expiresAt: refreshTokenExpires,
      user_id: session.user_id,
      acessToken: acessNewToken,
      refreshToken: refreshNewToken
    };
  }
}
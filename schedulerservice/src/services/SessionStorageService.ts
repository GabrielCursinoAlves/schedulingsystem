import { SessionParams, SessionReturns } from "@/interface/SessionParams.js";
import { JWTProvider } from "@/lib/middleware/JWTProvider.js";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { prisma } from "@/config/prisma/Connection.js";
import { ErrorSystem } from "@/error/index.js";
import { Env } from "@/environment/env.js";

export class SessionStorage {
  verify = async(data: SessionParams): Promise<SessionReturns> => {
    const { email, password } = data;
   
    const acessTokenExpires = Env.ACESS_TOKEN_EXPIRES;
    if(!acessTokenExpires) 
      throw new ErrorSystem.ApplicationError("ACESS_TOKEN_EXPIRES was not defined.");
    
    const refreshTokenExpires =  Env.REFRESH_TOKEN_EXPIRES;
    if(!refreshTokenExpires) 
      throw new ErrorSystem.ApplicationError("REFRESH_TOKEN_EXPIRES was not defined.");

    const user = await prisma.user.findUnique({ where:{ email }, 
      select:{ id: true, password: true } 
    });
    
    if(!user) throw new ErrorSystem.UnauthorizedError("Email Invalid authentication credentials.");
   
    const [salt, hash] = user.password.split("-");
   
    const hashBuffer = Buffer.from(hash, "hex");
    const verifyHash = scryptSync(password, salt, 64);

    if(!timingSafeEqual(hashBuffer, verifyHash)) throw new ErrorSystem.UnauthorizedError("Password Invalid authentication credentials.")

    const acessToken = JWTProvider(user.id, acessTokenExpires);
    const refreshToken = JWTProvider(user.id, refreshTokenExpires);
   
    return {
      user_id: user.id,
      expiresAt: refreshTokenExpires,
      refreshToken,
      acessToken
    }
    
  }
}
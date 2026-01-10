import { SessionParams, SessionReturns } from "../interface/SessionParams.ts";
import { JWTProvider } from "../lib/middleware/JWTProvider.ts";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { prisma } from "../config/prisma/Connection.ts";
import { ErrorSystem } from "../error/index.ts";

export class SessionStorage {
  verify = async(data: SessionParams): Promise<SessionReturns> => {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where:{ email }, 
      select:{id: true, password: true} 
    });
    
    if(!user) throw new ErrorSystem.UnauthorizedError("Email Invalid authentication credentials.");

    const [salt, hash] = user.password.split("-");
   
    const hashBuffer = Buffer.from(hash, "hex");
    const verifyHash = scryptSync(password, salt, 64);

    if(!timingSafeEqual(hashBuffer, verifyHash)) throw new ErrorSystem.UnauthorizedError("Password Invalid authentication credentials.")

    const acessToken = JWTProvider(user.id, "1h");
    const refreshToken = JWTProvider(user.id, "7d");

    return {
      user_id: user.id,
      expiresAt: "7d",
      refreshToken,
      acessToken
    }
    
  }
}
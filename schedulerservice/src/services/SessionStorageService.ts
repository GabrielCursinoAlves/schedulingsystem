import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import { JWTProvider } from "../lib/middleware/JWTProvider.ts";
import { SessionParams } from "../interface/SessionParams.ts";
import { prisma } from "../config/prisma/Connection.ts";
import { ErrorSystem } from "../error/index.ts";

export class SessionStorage {
  verify = async(data: SessionParams) => {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ 
      where:{ email }, 
      select:{ id: true, password: true } 
    });
    
    if(!user){
      throw new ErrorSystem.UnauthorizedError("Email Invalid authentication credentials.");
    }

    const [salt, hash] = user.password.split("-");
   
    const hashBuffer = Buffer.from(hash, "hex");
    const verifyHash = scryptSync(password, salt, 64);

    if(!timingSafeEqual(hashBuffer, verifyHash)){
      throw new ErrorSystem.UnauthorizedError("Password Invalid authentication credentials.")
    }

    const token = JWTProvider(user.id, "1h");
    return {
      message: "User logged in success",
      accessToken: token
    }
    
  }
}
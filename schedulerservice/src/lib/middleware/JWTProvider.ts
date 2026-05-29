import { Env } from "@/config/environment/env.js";
import jwt, { SignOptions } from "jsonwebtoken";
import { ErrorSystem } from "@/error/index.js";

export function JWTProvider(userId: string, expiresInValue: SignOptions["expiresIn"]): string {
  const secret =  Env.SECRET_KEY;
 
  if(!secret) throw new ErrorSystem.ApplicationError("SECRET KEY was not defined.");
  
  const payload = { userId };
  const token = jwt.sign(payload, secret, { expiresIn: expiresInValue });

  return token;
}
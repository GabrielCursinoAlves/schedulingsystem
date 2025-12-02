import { ErrorSystem } from "../../error/index.ts";
import jwt , {SignOptions } from "jsonwebtoken";

export function JWTProvider(userId: string, expiresInValue: SignOptions["expiresIn"]):string{
  const secret =  process.env.SECRET_KEY;
  if(!secret){
    throw new ErrorSystem.ApplicationError("SECRET_KEY was not defined.");
  }

  const payload = { userId };
  const token = jwt.sign(payload, secret, { expiresIn: expiresInValue });

  return token;
}
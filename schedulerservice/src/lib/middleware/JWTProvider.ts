import type { SignoOptionExpiresIn } from "@/types/jwt/SignOptionsType.ts";
import { ErrorSystem } from "@/error/index.js";
import jwt from "jsonwebtoken";

export function JWTProvider(userId: string, expiresInValue: SignoOptionExpiresIn): string {
  const secret =  process.env.SECRET_KEY;
  if(!secret) throw new ErrorSystem.ApplicationError("SECRET KEY was not defined.");

  const payload = { userId };
  const token = jwt.sign(payload, secret, { expiresIn: expiresInValue });

  return token;
}
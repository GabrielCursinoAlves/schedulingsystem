import type { SignoOptionExpiresIn } from "../types/jwt/SignOptionsType.ts";
import type { BaseUser } from "./UserParams.ts";

export interface BaseSession {
  user_id: string,
  refreshToken: string,
  expiresAt: string & SignoOptionExpiresIn 
}

export interface Session extends BaseSession {}

export interface SessionParams extends Omit<BaseUser, "username" | "phone">{}

export interface SessionReturns extends BaseSession{
  message: string,
  acessToken: string
}
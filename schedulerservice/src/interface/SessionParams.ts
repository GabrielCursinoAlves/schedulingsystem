import type { BaseUser } from "./UserParams.ts";

export interface BaseSession {
  user_id: string,
  refreshToken: string,
  expiresAt: string | number
}

export interface SessionParams extends Omit<BaseUser, "username" | "phone">{}

export interface Session extends Omit<BaseSession, "expiresAt"> {
  expiresAt: Date
}

export interface SessionReturns extends BaseSession {
  acessToken: string
}

export interface SessionRefreshReturns extends Omit<BaseSession, "expiresAt" | "refreshToken"> {
  expiresAt: Date,
  acessToken: string
}


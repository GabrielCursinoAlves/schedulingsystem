import { UserParams } from "@/types/prisma/UserType.js";

type BaseSession = {
  expiresAt: number | string,
  refreshToken: string,
  user_id: string
}

export type SessionParams = Omit<UserParams, "username" | "phone">;

export type Session = Omit<BaseSession, "expiresAt"> & {
  expiresAt: Date
}

export type  SessionReturns = BaseSession & {
  acessToken: string
}

export type SessionRefreshReturns = Omit<BaseSession, "expiresAt" | "refreshToken"> & {
  acessToken: string,
  expiresAt: Date
}

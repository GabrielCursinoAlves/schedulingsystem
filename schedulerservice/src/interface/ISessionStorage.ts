import { SessionParams, SessionReturns } from "@/types/prisma/SessionType.js"

export interface ISessionStorage {
  verify: (data: SessionParams) => Promise<SessionReturns>;
};
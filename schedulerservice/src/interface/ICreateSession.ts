import { Session } from "@/types/prisma/SessionType.js";

export interface ICreateSession {
  execute: (data: Session) => Promise<void>;
};
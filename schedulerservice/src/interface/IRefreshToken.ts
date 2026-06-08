import { SessionReturns } from "@/types/prisma/SessionType.js";
import { SchemaTypeZod } from "@/types/index.js";

export interface IRefreshToken {
  verify: (data: SchemaTypeZod["SchemaRefreshToken"]) => void;
  generate: (data: SchemaTypeZod["SchemaRefreshToken"]) => Promise<SessionReturns>;
}
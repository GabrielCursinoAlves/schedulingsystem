import { SchedulingPayload } from "@/interface/ShedulingParams.js";
import { Prisma } from "@generated/prisma/client.js";

export function ensureJsonObject(data: Prisma.JsonValue, fields: SchedulingPayload): Prisma.JsonObject {
  if(data && typeof data === "object" && !Array.isArray(data)){
    const { jobId, phone, userId } = fields;
    return { ... data, jobId, phone, userId } as Prisma.JsonObject;
  }
  return {};
}
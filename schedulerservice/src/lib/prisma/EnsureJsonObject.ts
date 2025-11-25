import { SchedulingPayload } from "../../interface/ShedulingParams.ts";
import { Prisma } from "@prisma/client";

export function ensureJsonObject(data: Prisma.JsonValue, fields: SchedulingPayload): Prisma.JsonObject {
  if(data && typeof data === "object" && !Array.isArray(data)){
    const { jobId, phone, userId } = fields;
    return { ... data, jobId, phone, userId } as Prisma.JsonObject;
  }

  return {};
}
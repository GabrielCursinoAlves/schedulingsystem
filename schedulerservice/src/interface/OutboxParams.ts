import type { SchedulingMetadata } from "./ShedulingParams.ts";
import { Prisma } from "../generated/prisma/client.ts";

export interface OutboxParams extends Omit<SchedulingMetadata, "phone"> { 
  scheduledAt: Date,
  scheduleId: string, 
  payload: Prisma.InputJsonValue
}
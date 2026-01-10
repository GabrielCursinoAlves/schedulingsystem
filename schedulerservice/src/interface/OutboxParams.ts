import type { SchedulingMetadata } from "./ShedulingParams.js";
import { Prisma } from "../../generated/prisma/client.js";

export interface OutboxParams extends Omit<SchedulingMetadata, "phone"> { 
  scheduledAt: Date,
  scheduleId: string,
  payload: Prisma.InputJsonValue
}
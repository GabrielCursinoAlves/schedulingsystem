import type { SchedulingMetadata } from "./ShedulingParams.ts";
import { Prisma } from "../generated/prisma/client.ts";

export interface OutboxParams extends Omit<SchedulingMetadata, "phone"> { 
  scheduleId: string, 
  payload: Prisma.InputJsonValue
}
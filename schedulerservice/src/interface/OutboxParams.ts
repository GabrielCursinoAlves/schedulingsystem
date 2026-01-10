import type { SchedulingMetadata } from "./ShedulingParams";
import { Prisma } from "@prisma/client"

export interface OutboxParams extends Omit<SchedulingMetadata, "phone"> {
  scheduleId: string, 
  payload: Prisma.InputJsonValue
}
import type { SchedulingMetadata } from "./ShedulingParams";
import { Prisma } from "@prisma/client"

export interface OutboxParams extends Omit<SchedulingMetadata, "phone">{
  payload: Prisma.InputJsonValue
}
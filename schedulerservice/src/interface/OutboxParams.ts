import { Prisma } from "@prisma/client"

export interface OutboxParams {
  aggregate_type: string,
  scheduleId: string
  event_type: string,
  phone: string,
  payload: Prisma.InputJsonValue
}
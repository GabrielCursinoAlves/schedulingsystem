import { Prisma } from "@generated/prisma/client.js"

export type OutboxParams = {
  event: string,
  eventId: string,
  scheduledAt: Date,
  scheduleId: string,
  payload: Prisma.InputJsonValue
}
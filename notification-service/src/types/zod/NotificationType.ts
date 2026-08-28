import { DispatchStatus } from "@generated/prisma/client.js";

export type UpdateNotificationType = {
  status: DispatchStatus,
  error_reason?: string,
  processed_at?: Date,
  attempt?: number
}
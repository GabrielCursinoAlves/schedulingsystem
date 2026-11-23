import { DispatchStatus } from "@generated/prisma/client.js";

export type UpdateNotificationType = {
  error_reason?: string | null,
  status: DispatchStatus,
  processed_at?: Date,
  attempt?: number
}
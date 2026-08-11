import { DispatchStatus } from "@generated/prisma/client.js";

export type UpdateNotificationType = {
  status: DispatchStatus,
  processed_at?: Date,
  error_reason?: string
}
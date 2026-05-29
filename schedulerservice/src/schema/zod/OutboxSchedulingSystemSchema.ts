import { z } from "zod";

export const SchemaOutboxSchedulingSystem = z.object({
  event: z.enum(["notification.send_sms", "notification.send_alert"]),
  jobId: z.string(),
  payload: z.object({
    userId: z.string(),
    phone: z.string(),
    message: z.string(),
    severity: z.enum(["low", "medium", "high"]).optional()
  })
});
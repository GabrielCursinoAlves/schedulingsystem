import { z } from "zod";

export const SchemaOutboxSchedulingSystem = z.object({
  eventId: z.string().uuid(),
  event: z.enum(["notification.send_sms", "notification.send_alert"]),
  jobId: z.string().uuid(),
  payload: z.object({
    userId: z.string().uuid(),
    phone: z.string(),
    message: z.string(),
    severity: z.enum(["low", "medium", "high"]).optional()
  })
});
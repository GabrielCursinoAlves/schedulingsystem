import { PhoneSchema } from "./PhoneSchema.js";
import { z } from "zod";

export const SchemaOutboxSchedulingSystem = z.object({
  eventId: z.string().uuid(),
  event: z.enum(["notification.send_sms", "notification.send_alert"]),
  jobId: z.string().uuid(),
  payload: z.object({
    message: z.string(),
    userId: z.string().uuid(),
    phone: PhoneSchema.optional(),
    email_alert: z.email().optional(),
    severity: z.enum(["low", "medium", "high"]).optional()
  })
}); 
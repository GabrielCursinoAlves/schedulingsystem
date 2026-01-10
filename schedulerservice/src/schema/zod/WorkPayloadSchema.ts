import { z } from "zod";

const PhoneSchema = z.string().min(10).max(15).regex(/^\+?\d{10,15}$/);

export const WorkPayload = z.object({
  userId: z.string().uuid(),
  jobId: z.string().uuid(),
  type: z.enum(["send_sms", "send_alert"]),
  phone: PhoneSchema,
  message: z.string(),
  severity: z.enum(["low", "medium", "high"]).optional()
});

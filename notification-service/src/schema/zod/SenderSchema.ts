import { z } from "zod";

export const SchemaSender = z.object({
  phone: z.string().optional(),
  message: z.string(),
  email_alert: z.string().email().optional(),
  severity: z.enum(["low", "medium", "high"]).optional()
}); 
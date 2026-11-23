import { z } from "zod";

export const SchemaOutboxPayloadNotification = z.object({
  jobId: z.string().uuid(),
  eventId: z.string().uuid(),
  status: z.enum(["failed","sent"]),
  error_reason: z.string().or(z.null()).optional()
});
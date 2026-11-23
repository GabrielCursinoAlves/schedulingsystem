import { z } from "zod";

export const SchemaOutboxNotification = z.object({
  id: z.string().uuid(),
  jobId: z.string().uuid(),
  eventId: z.string().uuid(),
  attempt: z.number().optional(),
  status: z.enum(["retry_send","failed","sent"]),
  error_reason: z.string().or(z.null()).optional(),
  event_type: z.enum(["notification.send_sms_result","notification.send_alert_result"])
}); 
import { PayloadPatternValidation } from "@/lib/validation/PayloadPatternValidation.js";
import { SchedulingPayload } from "@/types/prisma/ShedulingType.js";
import { SchemaTypeZod } from "@/types/index.js";
import { randomUUID } from "node:crypto";

export function ensureJsonObject(data: SchemaTypeZod["SchemaCreateSchedulingPayload"], fields: SchedulingPayload): SchemaTypeZod["SchemaOutboxSchedulingSystem"] {
  
  const notificationPayload = PayloadPatternValidation(data);
  const { jobId, phone, userId, email_alert } = fields;
 
  return {
    eventId: randomUUID(),
    event: `notification.${notificationPayload.type}`,
    jobId,
    payload: {
      userId,
      ...(notificationPayload.type === "send_sms" && {
        phone: phone,
      }),
      ...(notificationPayload.type === "send_alert" && {
        email_alert: email_alert,
      }),
      message: notificationPayload.message,
      ...(notificationPayload.type === "send_alert" && {
      severity: notificationPayload.severity,
    }),
    }
  };
 
}
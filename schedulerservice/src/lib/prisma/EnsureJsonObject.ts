import { PayloadPatternValidation } from "@/lib/validation/PayloadPatternValidation.js";
import { SchedulingPayload } from "@/types/prisma/ShedulingType.js";
import { SchemaTypeZod } from "@/types/index.js";

export function ensureJsonObject(data: SchemaTypeZod["SchemaCreateSchedulingPayload"], fields: SchedulingPayload): SchemaTypeZod["SchemaOutboxSchedulingSystem"] {
  
  const notificationPayload = PayloadPatternValidation(data);
  const { jobId, phone, userId } = fields;
 
  return {
    event: `notification.${notificationPayload.type}`,
    jobId,
    payload: {
      userId,
      phone,
      message: notificationPayload.message,
      ...(notificationPayload.type === "send_alert" && {
      severity: notificationPayload.severity,
    }),
    }
  };
 
}
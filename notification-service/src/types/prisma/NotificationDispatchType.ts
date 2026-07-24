import { DispatchEventype } from "@generated/prisma/client.js";
import { SchemaTypeZod } from "@/types/index.js";

export const EventypeRecord: Record<
SchemaTypeZod["SchemaOutboxSchedulingSystem"]["event"],
DispatchEventype> = { 
  "notification.send_sms": DispatchEventype.notification_send_sms, 
  "notification.send_alert": DispatchEventype.notification_send_alert
};

export type NotificationDispatchReturn = {
  id: string,
  phone: string,
  message: string,
  severity: string | null
};
import { DispatchEventype, DispatchSeverity } from "@generated/prisma/client.js";
import { SchemaTypeZod } from "@/types/index.js";

export const EventypeRecord: Record<
  SchemaTypeZod["SchemaOutboxSchedulingSystem"]["event"],
  keyof typeof DispatchEventype
> = {
  "notification.send_sms": "notification_send_sms",
  "notification.send_alert": "notification_send_alert",
};

export type NotificationDispatchReturn = {
  id: string,
  phone: string,
  message: string,
  severity: DispatchSeverity
};
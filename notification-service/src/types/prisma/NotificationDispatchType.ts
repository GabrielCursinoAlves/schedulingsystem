import { DispatchEventype, DispatchSeverity } from "@generated/prisma/client.js";

export const EventypeRecord: Record<
  typeof DispatchEventype[keyof typeof DispatchEventype],
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
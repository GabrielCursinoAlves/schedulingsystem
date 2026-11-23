import { DispatchEventype, DispatchOutboxEventype, DispatchSeverity } from "@generated/prisma/client.js";

export const NotificationEventypeRecord: Record<
  typeof DispatchEventype[keyof typeof DispatchEventype],
  keyof typeof DispatchEventype
> = {
  "notification.send_sms": "notification_send_sms",
  "notification.send_alert": "notification_send_alert",
};

export const NotificationOutboxEventRecord: Record<
typeof DispatchOutboxEventype[keyof typeof DispatchOutboxEventype],
keyof typeof DispatchOutboxEventype
> = {
  "notification.send_sms_result": "notification_send_sms_result",
  "notification.send_alert_result": "notification_send_alert_result"
};

export type NotificationDispatchReturn = {
  id: string,
  message: string,
  phone: string | null,
  alreadyFinished: boolean,
  email_alert: string | null,
  severity: DispatchSeverity | null
};
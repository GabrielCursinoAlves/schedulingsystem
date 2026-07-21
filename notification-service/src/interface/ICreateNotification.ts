import { NotificationDispatchReturn } from "@/types/prisma/NotificationDispatchType.js";
import { SchemaTypeZod } from "@/types/index.js";

export interface ICreateNotification {
  execute: (data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]) => Promise<NotificationDispatchReturn>;
};

export interface INotificationHandler {
  execute: (data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]) => Promise<void>;
}
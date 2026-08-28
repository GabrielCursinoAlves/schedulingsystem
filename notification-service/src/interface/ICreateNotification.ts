import { NotificationDispatchReturn } from "@/types/prisma/NotificationDispatchType.js";
import { UpdateNotificationType } from "@/types/zod/NotificationType.js";
import { SchemaTypeZod } from "@/types/index.js";

export interface ICreateNotification {
  create: (data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]) => Promise<NotificationDispatchReturn>;
  update: (id: string, data: UpdateNotificationType) => Promise<void>;
};  
 
export interface INotificationHandler {
  execute: (data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]) => Promise<void>;
}
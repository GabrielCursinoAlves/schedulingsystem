import { NotificationDispatchReturn } from "@/types/prisma/NotificationDispatchType.js";
import { UpdateNotificationType } from "@/types/zod/NotificationType.js";
import { Prisma } from "@generated/prisma/client.js";
import { SchemaTypeZod } from "@/types/index.js";

export interface ICreateNotification {
  create: (data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]) => Promise<NotificationDispatchReturn>;
  update: (id: string, data: UpdateNotificationType, tx: Prisma.TransactionClient) => Promise<void>;
} 

export interface INotificationOutbox {
  create: (data: SchemaTypeZod["SchemaNotificationOutbox"], tx: Prisma.TransactionClient) => Promise<void>;
}

export interface INotificationHandler {
  execute: (data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]) => Promise<void>;
}

export interface INotificationResult {
  execute: (data: SchemaTypeZod["SchemaNotificationOutbox"]) => Promise<void>;
}
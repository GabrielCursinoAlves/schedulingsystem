import { SchemaOutboxPayloadNotification } from "@/schema/zod/OutboxPayloadNotificationSchema.js";
import { SchemaOutboxSchedulingSystem } from "@/schema/zod/OutboxSchedulingSystemSchema.js";
import { SchemaOutboxNotification } from "@/schema/zod/OutboxNotificationSchema.js";
import { SchemaSender } from "@/schema/zod/SenderSchema.js";
import { z } from "zod";

export type SchemaTypeZod = {
  SchemaNotificationOutboxPayload: z.infer<typeof SchemaOutboxPayloadNotification>,
  SchemaOutboxSchedulingSystem: z.infer<typeof SchemaOutboxSchedulingSystem>,
  SchemaNotificationOutbox: z.infer<typeof SchemaOutboxNotification>,
  SchemaSender: z.infer<typeof SchemaSender> 
};

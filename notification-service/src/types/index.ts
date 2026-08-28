import { SchemaOutboxSchedulingSystem } from "@/schema/zod/OutboxSchedulingSystemSchema.js";
import { SchemaSender } from "@/schema/zod/SenderSchema.js";
import { z } from "zod";

export type SchemaTypeZod = {
  SchemaOutboxSchedulingSystem: z.infer<typeof SchemaOutboxSchedulingSystem>,
  SchemaSender: z.infer<typeof SchemaSender> 
};

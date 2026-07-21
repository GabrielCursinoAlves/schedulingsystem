import { SchemaOutboxSchedulingSystem } from "@/schema/zod/OutboxSchedulingSystemSchema.js";
import { z } from "zod";

export type SchemaTypeZod = {
  SchemaOutboxSchedulingSystem: z.infer<typeof SchemaOutboxSchedulingSystem>
};

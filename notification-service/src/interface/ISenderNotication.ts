import { SenderType } from "@/types/zod/SenderType.js";
import { SchemaTypeZod } from "@/types/index.js";

export interface ISenderNotification {
  send: (data: SchemaTypeZod["SchemaSender"]) => Promise<SenderType>;
} 
import { SchemaTypeZod } from "@/types/index.js";

export interface IJobCreation {
  execute: (user_id: string, data: SchemaTypeZod["SchemaCreateSystemService"]) => Promise<void>;
};
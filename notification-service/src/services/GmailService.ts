import { ISenderNotification } from "@/interface/ISenderNotication.js";
import { SenderType } from "@/types/zod/SenderType.js";
import { SchemaTypeZod } from "@/types/index.js";

export class GmailService implements ISenderNotification{
  async send(data: SchemaTypeZod["SchemaSender"]): Promise<SenderType> {
    return { success: true };
  }
}
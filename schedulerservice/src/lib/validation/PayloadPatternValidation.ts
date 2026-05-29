import { SchemaSendPayload } from "@/schema/zod/SchedulingPayloadSchema.js";
import { ErrorValidation } from "@/error/index.js";
import { SchemaTypeZod } from "@/types/index.js";

export function PayloadPatternValidation(data: SchemaTypeZod["SchemaCreateSchedulingPayload"]): SchemaTypeZod["SchemaCreateSchedulingPayload"] {
  const {type, message} = data;

  const dataPayload = type === "send_alert" ? { type, message, severity: data.severity } : { type, message };
  const result = SchemaSendPayload.safeParse(dataPayload);

  if(!result.success) throw new ErrorValidation.ZodValidationError(result.error);

  return result.data;
}
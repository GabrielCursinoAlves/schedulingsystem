import { SchemaSendPayload } from "../../schema/zod/SchedulingPayloadSchema.ts";
import { Prisma } from "../../generated/prisma/client.ts";
import { ErrorValidation } from "../../error/index.ts";
import { SchemaTypeZod } from "../../types";

export function PayloadPatternValidation(data: SchemaTypeZod["SchemaCreateSchedulingPayload"]): Prisma.InputJsonValue{
  const {type, message} = data;

  const dataPayload = type == "send_alert" ? {type, message, severity: data.severity} : {type, message};
  const result = SchemaSendPayload.safeParse(dataPayload);

  if(!result.success) throw new ErrorValidation.ZodValidationError(result.error);

  const payloadValid = result.data;

  return payloadValid;
}
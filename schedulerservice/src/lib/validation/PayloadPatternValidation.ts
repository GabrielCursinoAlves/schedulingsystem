import { SchemaSendPayload } from "../../schema/zod/SchedulingPayloadSchema.ts";
import { ErrorValidation } from "../../error/index.ts";
import { SchemaTypeZod } from "../../types";
import { Prisma } from "@prisma/client";

export function PayloadPatternValidation(data: SchemaTypeZod["SchemaCreateSchedulingPayload"]){
  const {type, message} = data;

  const dataPayload = type == "send_alert" ? {type, message, severity: data.severity} : {type, message};
  const result = SchemaSendPayload.safeParse(dataPayload);

  if(!result.success){
    throw new ErrorValidation.ZodValidationError(result.error);
  }

  const payloadValid: Prisma.InputJsonValue = result.data;

  return payloadValid;
}
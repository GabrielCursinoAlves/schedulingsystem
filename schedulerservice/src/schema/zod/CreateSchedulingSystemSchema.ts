import { SchemaRecurrencePattern, Schemas } from "./SchedulingRecurrenceSchema.ts";
import { SchemaSendPayload } from "./SchedulingPayloadSchema.ts";
import { z } from "zod";

export const SchemaCreateSystemRouter = z.object({
  user_id: z.uuid(),
  payload: SchemaSendPayload,
  run_at:  z.coerce.date(),
  recurrence_pattern: SchemaRecurrencePattern.superRefine((data, ctx) => {
    const AllTypeSchemas = Schemas[data.type]; 

    if(AllTypeSchemas instanceof z.ZodObject){
     
     const allowedKeys = Object.keys(AllTypeSchemas.shape);
      const receivedKeys = Object.keys(data);

      const extraFields = receivedKeys.filter((fields) => !allowedKeys.includes(fields));
      if(extraFields.length > 0){
         ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Fields not allowed: ${extraFields.join(", ")}`
        });
      }
    }
  }),
});

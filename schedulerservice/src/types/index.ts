import { SchemaRecurrencePattern } from "../schema/zod/SchedulingRecurrenceSchema.ts";
import { SchemaSchedulingJobCron } from "../schema/zod/SchedulingJobSchema.ts";
import { SchemaSendPayload } from "../schema/zod/SchedulingPayloadSchema.ts";
import {z} from "zod";

export type SchemaTypeZod = {
  SchemaSchedulingJobCronController: z.infer<typeof SchemaSchedulingJobCron>,
  SchemaCreateSchedulingRecurrence: z.infer<typeof SchemaRecurrencePattern>,
  SchemaCreateSchedulingPayload: z.infer<typeof SchemaSendPayload>
};
import { SchemaCreateSystemRouter } from "../schema/zod/CreateSchedulingSystemSchema.ts";
import { SchemaRecurrencePattern } from "../schema/zod/SchedulingRecurrenceSchema.ts";
import { SchemaSchedulingJobCron } from "../schema/zod/SchedulingJobSchema.ts";
import { SchemaSendPayload } from "../schema/zod/SchedulingPayloadSchema.ts";
import { SchemaCreateUserRouter } from "../schema/zod/CreateUserSchema.ts";
import {z} from "zod";

export type SchemaTypeZod = {
  SchemaCreateSchedulingController: z.infer<typeof SchemaCreateSystemRouter>,
  SchemaSchedulingJobCronController: z.infer<typeof SchemaSchedulingJobCron>,
  SchemaCreateSchedulingRecurrence: z.infer<typeof SchemaRecurrencePattern>,
  SchemaCreateUserController: z.infer<typeof SchemaCreateUserRouter>,
  SchemaCreateSchedulingPayload: z.infer<typeof SchemaSendPayload>
};
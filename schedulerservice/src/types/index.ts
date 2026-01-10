import { SchemaCreateSystemRouter } from "@/schema/zod/CreateSchedulingSystemSchema.js";
import { SchemaRecurrencePattern } from "@/schema/zod/SchedulingRecurrenceSchema.js";
import { SchemaSchedulingJobCron } from "@/schema/zod/SchedulingJobSchema.js";
import { SchemaSendPayload } from "@/schema/zod/SchedulingPayloadSchema.js";
import { SchemaRefreshToken } from "@/schema/zod/RefreshTokenSchema.js";
import { WorkPayload } from "@/schema/zod/WorkPayloadSchema.js";
import { z } from "zod";

export type SchemaTypeZod = {
  SchemaSchedulingJobCronController: z.infer<typeof SchemaSchedulingJobCron>,
  SchemaCreateSchedulingRecurrence: z.infer<typeof SchemaRecurrencePattern>,
  SchemaCreateSystemService: z.infer<typeof SchemaCreateSystemRouter>,
  SchemaCreateSchedulingPayload: z.infer<typeof SchemaSendPayload>,
  SchemaRefreshToken: z.infer<typeof SchemaRefreshToken>,
  SchemaWorkPayload: z.infer<typeof WorkPayload>
};

import { SchemaCreateSystemRouter } from "../schema/zod/CreateSchedulingSystemSchema.ts";
import { SchemaRecurrencePattern } from "../schema/zod/SchedulingRecurrenceSchema.ts";
import { SchemaSchedulingJobCron } from "../schema/zod/SchedulingJobSchema.ts";
import { SchemaSendPayload } from "../schema/zod/SchedulingPayloadSchema.ts";
import { SchemaRefreshToken } from "../schema/zod/RefreshTokenSchema.ts";
import { z } from "zod";

export type SchemaTypeZod = {
  SchemaSchedulingJobCronController: z.infer<typeof SchemaSchedulingJobCron>,
  SchemaCreateSchedulingRecurrence: z.infer<typeof SchemaRecurrencePattern>,
  SchemaCreateSystemService: z.infer<typeof SchemaCreateSystemRouter>,
  SchemaCreateSchedulingPayload: z.infer<typeof SchemaSendPayload>,
  SchemaRefreshToken: z.infer<typeof SchemaRefreshToken>
};

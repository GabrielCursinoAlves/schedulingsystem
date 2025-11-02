import {z} from "zod/v4";

const HoursPatterns = z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);
const DayOfWeekSchema = z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]);

const SendSmsPayload = z.object({
  type: z.literal("send_sms"),
  message: z.string()
});

const SendAlertPayload = z.object({
  type: z.literal("send_alert"),
  message: z.string(),
  severity: z.enum(["low", "medium"], "high").default("medium")
});

const OnceSchema = z.object({ 
  type: z.literal("once") 
}).passthrough();

const DailySchema = z.object({ 
  type: z.literal("daily"),
  time_of_day: HoursPatterns
}).passthrough();

const WeeklySchema = z.object({ 
  type: z.literal("week"),
  time_of_day: HoursPatterns,
  day_of_week: DayOfWeekSchema  
}).passthrough();

const Recurrence_pattern = z.discriminatedUnion("type", [
  OnceSchema,
  DailySchema,
  WeeklySchema
]);

const Schemas = {
  "once": OnceSchema,
  "daily": DailySchema,
  "week": WeeklySchema
};

export const SchemaCreateSystemRouter = z.object({
  user_id: z.uuid(),
  payload: z.discriminatedUnion("type", [
    SendSmsPayload,
    SendAlertPayload
  ]),
  run_at: z.coerce.date(),
  recurrence_pattern: Recurrence_pattern.superRefine((data, ctx) => {
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
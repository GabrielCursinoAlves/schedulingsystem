import z from "zod";

const HoursPatterns = z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);
const DayOfWeekSchema = z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]);

const OnceSchema = z.object({ 
  type: z.literal("once") 
});

const DailySchema = z.object({ 
  type: z.literal("daily"),
  time_of_day: HoursPatterns
});

const WeeklySchema = z.object({ 
  type: z.literal("week"),
  time_of_day: HoursPatterns,
  day_of_week: DayOfWeekSchema  
});

export const SchemaCreateSystem = {
   schema: {
    body: z.object({
      payload: z.object({
        type: z.enum(["send_sms", "send_alert"]),
        user_id: z.uuid(),
        message: z.string()
      }),
      run_at: z.coerce.date(),
      recurrence_pattern: z.discriminatedUnion("type", [
        OnceSchema,
        DailySchema,
        WeeklySchema
      ]),
    })
  },
}
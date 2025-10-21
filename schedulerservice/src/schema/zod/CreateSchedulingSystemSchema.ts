import z from "zod";

const PhoneSchema = z.string().min(10).max(15).regex(/^\+?\d{10,15}$/);
const HoursPatterns = z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);

const DayOfWeekSchema = z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]);

const SendSmsPayload = z.object({
  type: z.literal("send_sms"),
  phone: PhoneSchema,
   message: z.string()
});

const SendAlertPayload = z.object({
  type: z.literal("send_alert"),
  phone: PhoneSchema,
  message: z.string(),
  severity: z.enum(["low", "medium"], "high").default("medium")
});

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
      user_id: z.uuid(),
      payload: z.discriminatedUnion("type", [
        SendSmsPayload,
        SendAlertPayload
      ]),
      run_at: z.coerce.date(),
      recurrence_pattern: z.discriminatedUnion("type", [
        OnceSchema,
        DailySchema,
        WeeklySchema
      ]),
    })
  },
}
import z from "zod";

const HoursPatterns = z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);
const DayOfWeekSchema = z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]);

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

export const Schemas = {
  "once": OnceSchema,
  "daily": DailySchema,
  "week": WeeklySchema
};

export const SchemaRecurrencePattern = z.discriminatedUnion("type", [
  OnceSchema,
  DailySchema,
  WeeklySchema
]);

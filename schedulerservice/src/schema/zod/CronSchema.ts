import { z } from "zod";

export const SchemaCronPattern = z.object({ 
  second: z.string(), 
  minute: z.string(), 
  hour: z.string(), 
  day_of_month: z.string(), 
  month: z.string(), 
  day_of_week: z.string() 
});
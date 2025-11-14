import {z} from "zod";

const OnceDaily = z.object({ 
  type: z.literal('daily'),
  hour: z.string(),
  minute:z.string()
});

const OnceWeek = z.object({ 
  type: z.literal('week'),
  hour: z.string(),
  minute:z.string(),
  day_of_week: z.string()
});


export const SchemaSchedulingJobCron = z.discriminatedUnion('type', [ 
  OnceDaily,
  OnceWeek
]);
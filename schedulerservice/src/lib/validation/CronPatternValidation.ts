import { SchemaSchedulingJobCron } from "../../schema/zod/SchedulingJobSchema.ts";
import { GenerateDataCron } from "../cron/GenerateDataCron.ts";
import { ErrorValidation } from "../../error/index.ts";
import { SchemaTypeZod } from "../../types/index.ts";
import { CronObject } from "../cron/CronObject.ts";

export function CronPatternValidation(data: SchemaTypeZod["SchemaCreateSchedulingRecurrence"]){
  if(data.type == "once") return Object.values(CronObject()).join(" ");

  const {type, time_of_day, day_of_week} = data;
  const [hour, minute] = data.time_of_day.split(":");

  const dataCron = type === "week" ? { type, hour, minute, day_of_week } : { type, hour, minute };
  const result = SchemaSchedulingJobCron.safeParse(dataCron);

  if(!result.success){
    throw new ErrorValidation.ZodValidationError(result.error);
  }
  
  const generateData = GenerateDataCron(result.data);
  return generateData;
}
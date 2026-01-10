import type { SchemaTypeZod } from "../../types/index.ts";
import { CronObject } from "./CronObject.ts";

export function GenerateDataCron(data: SchemaTypeZod["SchemaSchedulingJobCronController"]){
  const {type, hour, minute} = data;
    
  const dataCron = type === "week" ? {hour, minute, day_of_week: data.day_of_week} : {hour, minute};
  const cronSchema = CronObject();
   
  for(const keyScheduling of Object.keys(dataCron) as (keyof typeof dataCron)[]){
    if(keyScheduling in cronSchema){
      cronSchema[keyScheduling] = dataCron[keyScheduling] ?? "*";
    }
  };

  return Object.values(cronSchema).join(" ");
}

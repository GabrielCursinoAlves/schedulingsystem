import type { SchemaTypeZod } from "@/types/index.js";
import { CronObject } from "./CronObject.js";

export function GenerateDataCron(data: SchemaTypeZod["SchemaSchedulingJobCronController"]){
  const {type, hour, minute} = data;
    
  const dataCron = type === "week" ? { hour, minute, day_of_week: data.day_of_week } : { hour, minute };
  const cronSchema = CronObject();

  const dayOfWeek = { monday: "1", tuesday: "2", wednesday: "3", thursday: "4", friday: "5", saturday: "6", sunday: "0" } as const;

  for(const keyScheduling of Object.keys(dataCron) as (keyof typeof dataCron)[]){

    if(keyScheduling in cronSchema){ 
      cronSchema[keyScheduling] = dataCron[keyScheduling] ?? "*";

      if(keyScheduling == "day_of_week"){
        const rawDay  = dataCron[keyScheduling];

         if (typeof rawDay  === "string" && rawDay in dayOfWeek){
          cronSchema[keyScheduling] = dayOfWeek[rawDay as keyof typeof dayOfWeek];
         }
      }
    }
  };
 
  return Object.values(cronSchema).join(" ");
}

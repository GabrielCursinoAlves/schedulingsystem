import {SchemaCronPattern} from "@/schema/zod/CronSchema.js";

export function CronObject(){
   const cronSchema = Object.fromEntries(Object.keys(SchemaCronPattern.shape).map((key) => [key, "*"]));
   return cronSchema;
}
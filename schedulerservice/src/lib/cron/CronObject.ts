import {SchemaCronPattern} from "../../schema/zod/CronSchema.ts";

export function CronObject(){
   const cronSchema = Object.fromEntries(Object.keys(SchemaCronPattern.shape).map((key) => [key, "*"]));
   return cronSchema;
}
import { CronExpressionParser } from "cron-parser";
import { ErrorSystem } from "../../error";

export function ConvertCron(cron: string){
  try {
    const dataCron = CronExpressionParser.parse(cron, {
      tz: "America/Sao_Paulo"
    });
    return dataCron.next().toDate();
   
  } catch(error) {
    if(error instanceof ErrorSystem.ApplicationError) {
      throw new ErrorSystem.ApplicationError(`Error: ${error.message}`);
    }
  }
} 
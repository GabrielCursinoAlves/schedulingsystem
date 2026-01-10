import { WorkPayload } from "../schema/zod/WorkPayloadSchema.ts";
import { prisma } from "../config/prisma/Connection.ts";
import { ErrorValidation } from "../error/index.ts";
import { SchemaTypeZod } from "../types/index.ts";

async function WorkerScheduled(){
  
  while (true) {
    try {
      const messages = await prisma.outbox.findMany({
        where: { AND: [{ status: "pending" }, { scheduledAt: { gte: new Date() } }] }
      });
      
      const workData: SchemaTypeZod["SchemaWorkPayload"][] = [];
      for(const message of messages) {
        const result = WorkPayload.safeParse(message.payload);
        
        if(!result.success) throw new ErrorValidation.ZodValidationError(result.error);
        
        workData.push(result.data);
      };

    } catch (error) {
      console.log(`Database query failed: ${error}`);
    }
  } 

}

async function RunWorker(){

  while (true) {
    try {
      await WorkerScheduled();
    } catch (error) {
      console.error("Error dans Work: ", error);
    }
    await new Promise(res => setTimeout(res, 5000));
  }
 
}

RunWorker();
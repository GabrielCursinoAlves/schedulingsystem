import { RabbitMQConnection } from "@/infrastructure/messaging/RabbitMQConnection.js";
import { RabbitMQPublisher } from "@/infrastructure/messaging/RabbitMQPublisher.js";
import { prisma } from "@/infrastructure/database/prisma/Connection.js";
import { WorkPayload } from "@/schema/zod/WorkPayloadSchema.js";
import { ErrorValidation } from "@/error/index.js";

const connectionRabbitMQ = RabbitMQConnection.getInstance();
const channelRabbitMQ = await connectionRabbitMQ.createChannel();

async function WorkerScheduled(){
    const nextWindowDate = new Date(new Date().getTime() + 5 * 60 * 1000);

    try {
      const rabbitMQPublish = new RabbitMQPublisher(channelRabbitMQ); 

      const messages = await prisma.outbox.findMany({
        where: { AND: [{ status: "pending" }, { 
          scheduledAt: { 
            lte: nextWindowDate
          } 
        }] },
        take: 50
      });

      if(!messages.length) return;
      
      for(const message of messages) {
        const result = WorkPayload.safeParse(message.payload);

        if(!result.success) throw new ErrorValidation.ZodValidationError(result.error);

        await prisma.outbox.updateMany({
          where: {
            id: message.id,
            status: "pending"
          }, data: { status: "queued" }
        });

        await rabbitMQPublish.publishCreateJob(result.data);
    
      };
     
    } catch (error) {
      console.log(`Database query failed: ${error}`);
    }

}

async function RunWorker(){

  while (true) {
    try {
      await WorkerScheduled();
    } catch (error) {
      console.error("Error dans Work: ", error);
    }
    await new Promise(res => setTimeout(res, 30000));
  }
 
}

RunWorker();
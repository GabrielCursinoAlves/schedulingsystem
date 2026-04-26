import { RabbitMQConnection } from "@/infrastructure/messaging/RabbitMQConnection.js";
import { RabbitMQPublisher } from "@/infrastructure/messaging/RabbitMQPublisher.js";
import { prisma } from "@/infrastructure/database/prisma/Connection.js";
import { WorkPayload } from "@/schema/zod/WorkPayloadSchema.js";
import { ErrorValidation } from "@/error/index.js";

async function start() {
  const instanceRabbitMQ = RabbitMQConnection.getInstance();
  await instanceRabbitMQ.connect();

  const channelRabbitMQ = await instanceRabbitMQ.getChannel();

  async function WorkerScheduled(){
      const nextWindowDate = new Date(Date.now() + 10 * 60 * 1000);
      
      try {
        const rabbitMQPublish = new RabbitMQPublisher(channelRabbitMQ); 
        
        const messages = await prisma.outbox.findMany({
          where: { 
            status: "pending",
            scheduledAt: { 
              lte: nextWindowDate
            } 
          },
          take: 50,
          orderBy: {
            scheduledAt: "asc"
          }
        });
        
        if(!messages.length) return;

        for(const message of messages) {
          try {
            const result = WorkPayload.safeParse(message.payload);
            
            if(!result.success) throw new ErrorValidation.ZodValidationError(result.error);

            const update = await prisma.outbox.updateMany({
              where: {
                id: message.id,
                status: "pending"
              }, data: { status: "queued" }
            });

            if(update.count === 0) continue;

            try {
              await rabbitMQPublish.publishCreateJob(result.data);
            } catch (error: any) {
              await prisma.outbox.update({
                where: { id: message.id },
                data: { 
                  status: "failed", 
                  error_reason: JSON.stringify({
                    stage: "publish",
                    error: error?.message,
                    timestamp: new Date().toISOString()
                  })
                }
              });
            }

          } catch (error) {
            console.error("General processing error:", error);
          }

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

}

start().catch(err => {
  console.error("Error:", err);
});


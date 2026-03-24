import { RabbitMQConnection } from "@/infrastructure/messaging/RabbitMQConnection.js";
import type { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { prisma } from "@/infrastructure/database/prisma/Connection.js";

export const gracefulShutdown = (app: ControllerZodInstance, rabbitMQ: RabbitMQConnection) => {
  let isShuttingDown = false;
  
  const shutdown = async(signal: string) => {
    if(isShuttingDown) return;
    isShuttingDown = true;

    const timeout = setTimeout(() => {
      process.exit(1);
    }, 8000);

    try {
      await app.close();
      clearTimeout(timeout);
      process.exit(0);
    } catch(err) {
      process.exit(1);
    }

  }

  app.addHook("onClose", async () => {
    await rabbitMQ.close();
    await prisma.$disconnect();
  });

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}; 
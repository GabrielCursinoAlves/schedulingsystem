import { RabbitMQConnection } from "@/infrastructure/messaging/RabbitMQConnection.js";
import { ControllerNotificationSystemDi } from "@/infrastructure/container/index.js";
import { RabbitMQConsumer } from "@/infrastructure/messaging/RabbitMQConsumer.js";
import { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { gracefulShutdown } from "./gracefulShutdown.js";

export async function bootstrap(app: ControllerZodInstance) {
  const connectionRabbitMQ = RabbitMQConnection.getInstance();
  const consumerRabbitMQ = RabbitMQConsumer.getInstance(connectionRabbitMQ, ControllerNotificationSystemDi.createHandler);

  connectionRabbitMQ.on("connected", () => {
    consumerRabbitMQ.readyConsumer().catch((error) => {
       console.error("Failed to start consumer:", error);
    });
  });

  await connectionRabbitMQ.connect();
  
  gracefulShutdown(app, connectionRabbitMQ, consumerRabbitMQ);
}
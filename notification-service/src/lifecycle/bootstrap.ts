import { RabbitMQConnection } from "@/infrastructure/messaging/RabbitMQConnection.js";
import { ControllerNotificationSystemDi } from "@/infrastructure/container/index.js";
import { RabbitMQConsumer } from "@/infrastructure/messaging/RabbitMQConsumer.js";
import { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { gracefulShutdown } from "./gracefulShutdown.js";

export async function bootstrap(app: ControllerZodInstance) {
  const connectionRabbitMQ = RabbitMQConnection.getInstance();
  await connectionRabbitMQ.connect();
  
  const consumerRabbitMQ = RabbitMQConsumer.getInstance(connectionRabbitMQ, ControllerNotificationSystemDi.createHandler);
  await consumerRabbitMQ.readyConsumer();
  
  gracefulShutdown(app, connectionRabbitMQ);
}
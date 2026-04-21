import { RabbitMQConnection } from "@/infrastructure/messaging/RabbitMQConnection.js";
import { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { gracefulShutdown } from "./gracefulShutdown.js";

export async function bootstrap(app: ControllerZodInstance) {
  const connectionRabbitMQ = RabbitMQConnection.getInstance();
  await connectionRabbitMQ.connect();
 
  gracefulShutdown(app, connectionRabbitMQ);
}
import { RabbitMQConnection } from "@/infrastructure/messaging/RabbitMQConnection.js";
import { RabbitMQTopology } from "@/infrastructure/messaging/RabbitMQTopology.js";
import { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { gracefulShutdown } from "./gracefulShutdown.js"; 

export async function bootstrap(app: ControllerZodInstance) {
  const connectionRabbitMQ = RabbitMQConnection.getInstance();
  const channelRabbitMQ = await connectionRabbitMQ.createChannel();

  const rabbitMQTopology = new RabbitMQTopology();
  await rabbitMQTopology.setupMessagingTopology(channelRabbitMQ);

  gracefulShutdown(app, connectionRabbitMQ);

}
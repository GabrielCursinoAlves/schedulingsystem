import { configRabbitMQ } from "@/infrastructure/messaging/RabbitMQConfig.js";
import { SchemaTypeZod } from "@/types/index.js";
import { ConfirmChannel } from "amqplib"; 

export class RabbitMQPublisher {
  constructor(private readonly channelConfirm: ConfirmChannel) {}
  async publishCreateJob(data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]) {
    const message = Buffer.from(JSON.stringify(data));

    await new Promise<void>((resolve, reject) => {
      this.channelConfirm.sendToQueue(
        configRabbitMQ.queue.delay,
        message, {
          persistent: true
        },
        (err) => err ? reject(err) : resolve()
      );
    });
  }
}
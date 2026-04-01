import { configRabbitMQ } from "@/infrastructure/messaging/RabbitMQConfig.js";
import { SchemaTypeZod } from "@/types/index.js";
import { ErrorSystem } from "@/error/index.js";
import { Channel } from "amqplib";

export class RabbitMQPublisher {
  constructor(private readonly channel: Channel) {}
  async publishCreateJob(data: SchemaTypeZod["SchemaWorkPayload"]) {
    const message = Buffer.from(JSON.stringify(data));
   
    const publishConfirm = this.channel.sendToQueue(
      configRabbitMQ.queue.delay,
      message, {
        persistent: true
      }
    );

    if(!publishConfirm){
      throw new ErrorSystem.ApplicationError("RabbitMQ backpressure detected");
    }

  }
}
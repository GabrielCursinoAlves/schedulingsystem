import { SchemaOutboxSchedulingSystem } from "@/schema/zod/OutboxSchedulingSystemSchema.js";
import { configRabbitMQ } from "@/infrastructure/messaging/RabbitMQConfig.js";
import { INotificationHandler } from "@/interface/ICreateNotification.js";
import { ErrorSystem, ErrorValidation } from "@/error/index.js";
import { RabbitMQConnection } from "./RabbitMQConnection.js";
import { Env } from "@/config/environment/env.js";
import { Channel, ConsumeMessage } from "amqplib";
import { SchemaTypeZod } from "@/types/index.js";

export class RabbitMQConsumer {
  private static instance: RabbitMQConsumer;
  private consumerTag: string | null = null;

  private constructor( private readonly connection: RabbitMQConnection, private readonly notificationHandler: INotificationHandler) { }
  
  static getInstance(connection: RabbitMQConnection, notificationHandler: INotificationHandler): RabbitMQConsumer {
    if (!RabbitMQConsumer.instance) {
      RabbitMQConsumer.instance = new RabbitMQConsumer(connection, notificationHandler);
    }
    return RabbitMQConsumer.instance;
  }

  async readyConsumer(): Promise<void> {
    const channel = await this.connection.getChannel();
    this.consumerTag = null;
   
    const { consumerTag } = await channel.consume(configRabbitMQ.queue.job, async(message) => {
      if(!message) return;

      this.handleMessage(channel, message).catch((error) => {
        console.error(`Error handling message:`, error);
      });
    });

    this.consumerTag = consumerTag;
  }

  async handleMessage(channel: Channel, message: ConsumeMessage): Promise<void> {
    try {
      const payload = this.validatePayload(message);
      await this.processMessage(payload);

    } catch (error) {
      if(error instanceof ErrorValidation.ZodValidationError || error instanceof ErrorValidation.MalformedPayloadError) {
        console.error(`RabbitMQ Validation ${error.name}: ${error.message}`);
        channel.nack(message, false, false);
        return;
      }

      if(error instanceof ErrorSystem.ConflictError) {
        console.error(`RabbitMQ Conflict ${error.name}: ${error.message}`); 
        channel.ack(message);
        return;
      }

      if(error instanceof ErrorSystem.TooManyRequestsError) {
        console.error(`RabbitMQ Too Many Requests error`);
        await this.retryMessage(channel, message);
        return;
      }

      console.error(`RabbitMQ Unexpected error:`, error);
      await this.retryMessage(channel, message);
      return;
    }

    try {
      channel.ack(message);
    } catch (error) {
      console.error(`Ack failed (channel closed), broker will redeliver:`, error);
    }
  }

  private parsePayload(message: ConsumeMessage): unknown {
    try {
      return JSON.parse(message.content.toString());
    } catch {
      throw new ErrorValidation.MalformedPayloadError("Invalid JSON format in message payload");
    }
  }

  validatePayload(message: ConsumeMessage): SchemaTypeZod["SchemaOutboxSchedulingSystem"] {
    const resultPayload = SchemaOutboxSchedulingSystem.safeParse(this.parsePayload(message));

    if(!resultPayload.success) {
      throw new ErrorValidation.ZodValidationError(resultPayload.error);
    }

    return resultPayload.data;
  }

  async retryMessage(channel: Channel, message: ConsumeMessage): Promise<void> {
    const retryErrorCount = (message.properties.headers?.['x-retry-count'] ?? 0) + 1;

    if(retryErrorCount > Env.MAX_RETRY_COUNT) {
      channel.nack(message, false, false);
      return;
    };

    try { 
      const channelConfirm = await this.connection.getChannelConfirm();
      await new Promise<void>((resolve, reject) => {
        channelConfirm.sendToQueue(configRabbitMQ.queue.retry, message.content, 
          { headers: { 'x-retry-count': retryErrorCount }, 
            persistent: true 
          }, 
          (err) => err ? reject(err) : resolve()
        );
      });

      channel.ack(message);

    }catch(error) {
      channel.nack(message, false, false);
    }
  }

  async processMessage(payload: SchemaTypeZod["SchemaOutboxSchedulingSystem"]): Promise<void> {
   await this.notificationHandler.execute(payload);
  }

  async close(): Promise<void> {
    const channel = this.connection.getChannelAvailable();
    if(!channel || !this.consumerTag) return;
    try { await channel.cancel(this.consumerTag); }catch { }
    this.consumerTag = null;
  }
}
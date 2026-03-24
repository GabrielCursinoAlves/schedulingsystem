import amqp, { ChannelModel, Channel } from "amqplib";
import { Env } from "@/config/environment/env.js";
import { ErrorSystem } from "@/error/index.js";

export class RabbitMQConnection {
  private connection: ChannelModel | null = null;
  private static instance: RabbitMQConnection;
  private channel: Channel | null = null;

  static getInstance(): RabbitMQConnection {
    if(!this.instance) RabbitMQConnection.instance = new RabbitMQConnection();

    return RabbitMQConnection.instance;
  }

  async connect(): Promise<ChannelModel> {
    const rabbitmq_url = Env.RABBITMQ_URL;
    
    if(!rabbitmq_url) throw new ErrorSystem.ApplicationError("RABBITMQ_URL was not defined.");

    this.connection = await amqp.connect(rabbitmq_url);
    return this.connection;
  }

  async createChannel(): Promise<Channel> {
    if (this.channel) return this.channel;

    if (!this.connection) {
      await this.connect();
    }

    this.channel = await this.connection!.createChannel();
    return this.channel;
  }

  async close(): Promise<void>{
    await this.channel?.close();
    await this.connection?.close();
  }
}
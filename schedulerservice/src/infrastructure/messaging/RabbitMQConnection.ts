import * as amqp from "amqplib";
import { Connection, Channel } from "amqplib";
import { ErrorSystem } from "@/error/index.js";
import { Env } from "@/config/environment/env.js";
import { RabbitMQTopology } from "./RabbitMQTopology.js";
import { resolve } from "node:path";

export class RabbitMQConnection {
  constructor(private rabbitMQTopology = new RabbitMQTopology){}
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private waiters: ((channel: Channel) => void)[] = [];
  private connection: Connection | null = null;
  private static instance: RabbitMQConnection;
  private channel: Channel | null = null;
  private isConnecting = false;
  private retryCount = 0;

  static getInstance(): RabbitMQConnection {
    if(!this.instance) RabbitMQConnection.instance = new RabbitMQConnection();

    return RabbitMQConnection.instance;
  }

  async connect(): Promise<void> { 
    if (this.isConnecting) return;

    try {
      const rabbitmq_url = Env.RABBITMQ_URL;
      
      if(!rabbitmq_url) throw new ErrorSystem.ApplicationError("RABBITMQ_URL was not defined.");
      this.connection = await amqp.connect(rabbitmq_url);   
      this.isConnecting = true;
      
      this.connection.on("error", (err) => {
        console.error("RabbitMQ error:", err);
      });
  
      this.connection.on("close", () => {
        this.connection = null;
        this.channel = null;
        this.reconnect(); 
      });

      this.channel = await this.connection.createChannel();
      this.waiters.forEach((resolve) => resolve(this.channel!));

      await this.rabbitMQTopology.setupMessagingTopology(this.channel);

      this.retryCount = 0;
      this.waiters = [];

    } catch (error) {
      console.log(`RabbitMQ has not yet finished initializing the AMQP broker.`);
    } finally {
      this.isConnecting = false;
      if (!this.connection) this.reconnect();
    }
  }

  private reconnect(): void {
    if(this.isConnecting || this.reconnectTimeout) return;

    const baseDelay = Math.min(2000 * 2 ** this.retryCount, Env.MAX_RETRY_DELAY);
    const jitter = Math.random() * 1000;
 
    const delay = baseDelay + jitter;
    this.retryCount++;

    this.reconnectTimeout = setTimeout(() => { 
      this.reconnectTimeout = null;
      this.connect(); 
    }, delay);
  }

  async getChannel(): Promise<Channel>{
    if(this.channel) return this.channel;

    return new Promise((resolve) => {
      this.waiters.push(resolve);
    });
  }

  async close(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
    this.connection = null;
    this.channel = null;
  }
}
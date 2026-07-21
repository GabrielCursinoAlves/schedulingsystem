import  { Waiter } from "@/interface/RabbitMQ.js";
import { Env } from "@/config/environment/env.js";
import { Connection, Channel } from "amqplib";
import * as amqp from "amqplib";

export class RabbitMQConnection {
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private connection: Connection | null = null;
  private static instance: RabbitMQConnection;
  private channel: Channel | null = null;
  private waiters: Waiter[] = [];
  private isConnecting = false;
  private retryCount = 0;

  static getInstance(): RabbitMQConnection {
    if(!this.instance) RabbitMQConnection.instance = new RabbitMQConnection();
    return RabbitMQConnection.instance;
  }

  async connect(): Promise<void> { 
    if (this.isConnecting) return;
    this.isConnecting = true;

    try {
      const rabbitmq_url = Env.RABBITMQ_URL;
      this.connection = await amqp.connect(rabbitmq_url!);   
      
      this.connection.on("error", (err) => {
        console.error("RabbitMQ error:", err);
      });
  
      this.connection.on("close", () => {
        this.connection = null;
        this.channel = null;
        this.reconnect(); 
      });

      this.channel = await this.connection.createChannel();
      await this.channel.prefetch(10);

      this.channel.on("error", (err) => {
        console.error("RabbitMQ channel error:", err);
        this.channel = null;
      });

      this.waiters.forEach(({ resolve }) => resolve(this.channel!));
     
      this.retryCount = 0;
      this.waiters = [];

    } catch (error) {
      console.log(`RabbitMQ has not yet finished initializing the AMQP broker.`);

      this.waiters.forEach(({ reject }) => reject(error));
      this.waiters = [];

      this.reconnect();

    } finally {
      this.isConnecting = false;
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

  async getChannel(): Promise<Channel> {
    if(this.channel) return this.channel;

    return new Promise((resolve, reject) => {
      this.waiters.push({ resolve, reject });
    });
  }

  async close(): Promise<void> {
    if(this.reconnectTimeout){
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    };

    await this.channel?.close();
    await this.connection?.close();
    this.connection = null;
    this.channel = null;
  }
}
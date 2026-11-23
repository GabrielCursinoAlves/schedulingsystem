import  { Waiter, WaiterConfirm } from "@/interface/RabbitMQ.js";
import { Connection, Channel, ConfirmChannel } from "amqplib";
import { Env } from "@/config/environment/env.js";
import { ErrorSystem } from "@/error/index.js";
import EventEmitter from "node:events";
import * as amqp from "amqplib";

export class RabbitMQConnection extends EventEmitter {
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private channelConfirm: ConfirmChannel | null = null;
  private connection: Connection | null = null;
  private waitersConfirm: WaiterConfirm[] = [];
  private static instance: RabbitMQConnection;
  private channel: Channel | null = null;
  private isIntentionalClose = false;
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
      const conn = this.connection;
      
      const onChannelError = (name: string) => (err: unknown) => {
        console.error(`RabbitMQ ${name} error:`, err);
        if (this.connection === conn) conn.close().catch(() => {});
      };
     
      this.connection.on("error", (err) => {
        console.error("RabbitMQ error:", err);
      });
  
      this.connection.on("close", () => {
        if(this.connection != conn) return;

        if(this.isIntentionalClose) {
          console.log("RabbitMQ connection closed gracefully");
          this.isIntentionalClose = false;
          return;
        }

        console.log("RabbitMQ connection closed unexpectedly");
        this.channelConfirm = null;
        this.connection = null;
        this.channel = null;

        this.emit("disconnected");
        this.reconnect(); 
      });

      this.channel = await this.connection.createChannel();
      await this.channel.prefetch(1);

      this.channel.on("error", onChannelError("channel"));

      this.channelConfirm = await this.connection.createConfirmChannel();

      this.channelConfirm.on("error", onChannelError("confirmchannel"));

      this.waiters.forEach(({ resolve }) => resolve(this.channel!));

      this.waitersConfirm.forEach(({ resolve }) => resolve(this.channelConfirm!));
     
      this.waitersConfirm = [];
      this.retryCount = 0;
      this.waiters = [];

      this.emit("connected");
  
    } catch (error) {
      console.log(`RabbitMQ has not yet finished initializing the AMQP broker.`);

      this.waiters.forEach(({ reject }) => reject(error));
      this.waiters = [];

      this.waitersConfirm.forEach(({ reject }) => reject(error));
      this.waitersConfirm = [];

      this.connection?.close().catch(() => {});
      this.connection = null;

      this.channelConfirm = null;
      this.channel = null;
      
      this.isConnecting = false;
      this.reconnect();

    } finally {
      this.isConnecting = false;
    }
  }

  private reconnect(): void {
    if(this.isIntentionalClose || this.isConnecting || this.reconnectTimeout) return;
    
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

  async getChannelConfirm(): Promise<ConfirmChannel> {
    if(this.channelConfirm) return this.channelConfirm;

    return new Promise((resolve, reject) => {
      this.waitersConfirm.push({ resolve, reject });
    });
  }

  getChannelAvailable(): Channel | null {
    return this.channel;
  }

  async close(): Promise<void> {
    this.isIntentionalClose = true;
    
    if(this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    };

    const safeClose = async ( name: string, components?: { close(): Promise<void> } | null ) => {
      try {
        await components?.close();
      } catch (err) {
        console.log(`RabbitMQ ${name} close ignored:`, (err as Error).message);
      }
    }

    const closeError = new ErrorSystem.ApplicationError("RabbitMQ connection is closing");
    this.waiters.forEach(({ reject }) => reject(closeError));

    this.waitersConfirm.forEach(({ reject }) => reject(closeError));

    this.waiters = [];
    this.waitersConfirm = [];

    await safeClose("channel", this.channel);
    await safeClose("confirmchannel", this.channelConfirm);
    await safeClose("connection", this.connection);

    this.channel = null;
    this.channelConfirm = null;
    this.connection = null;
  }
}
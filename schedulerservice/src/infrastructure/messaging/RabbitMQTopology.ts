import { BindQueueParams, QueueParams } from "@/types/rabbitmq/TopologyType.js";
import { configRabbitMQ } from "@/infrastructure/messaging/RabbitMQConfig.js";
import { Env } from "@/config/environment/env.js";
import { Channel } from "amqplib";

export class RabbitMQTopology {
  async createExchange(channel: Channel, exchangeName: string): Promise<void> {
    await channel.assertExchange(exchangeName, 'direct', {
      durable: true
    });
  }

  async createQueue(channel: Channel, queueParams: QueueParams ): Promise<void> {
    const { queueName, deadExchange, deadRoutingKey, timeTtl } = queueParams;


    await channel.assertQueue(queueName, {
      durable: true,
      arguments: {
      ...(deadExchange && { "x-dead-letter-exchange": deadExchange }),
      ...(deadRoutingKey && { "x-dead-letter-routing-key": deadRoutingKey }),
      ...(timeTtl && { "x-message-ttl": timeTtl })
    }});
  }

  async createBindQueue(channel: Channel, bindParams: BindQueueParams): Promise<void> {
    const { exchangeName, routingKey, queueName } = bindParams;
    
    await channel.bindQueue(
      queueName, 
      exchangeName, 
      routingKey
    ); 
  }

  async setupMessagingTopology(channel: Channel) { 
    await this.createExchange(channel, configRabbitMQ.exchanges.name);
    await this.createExchange(channel, configRabbitMQ.exchanges.dlx);

    await this.createQueue(channel, { queueName: configRabbitMQ.queue.dlq });
    await this.createQueue(channel, { queueName: configRabbitMQ.queue.notification_dlq });

    await this.createQueue(channel, { 
      queueName: configRabbitMQ.queue.job, 
      deadExchange: configRabbitMQ.exchanges.dlx,
      deadRoutingKey: configRabbitMQ.routingKey.dead_job 
    });

    await this.createQueue(channel, {
      queueName: configRabbitMQ.queue.delay,
      deadExchange: configRabbitMQ.exchanges.name,
      deadRoutingKey: configRabbitMQ.routingKey.create_job,
      timeTtl: Env.DELAY_TTL_RABBITMQ
    });

    await this.createQueue(channel, {
      queueName: configRabbitMQ.queue.retry,
      deadExchange: configRabbitMQ.exchanges.name,
      deadRoutingKey: configRabbitMQ.routingKey.create_job,
      timeTtl: Env.DELAY_TTL_RETRY_RABBITMQ
    }); 

    await this.createQueue(channel, {
      deadExchange: configRabbitMQ.exchanges.dlx,
      queueName: configRabbitMQ.queue.notification,
      deadRoutingKey: configRabbitMQ.routingKey.notification_dead
    });

    await this.createBindQueue(channel, {
      queueName: configRabbitMQ.queue.job, 
      exchangeName: configRabbitMQ.exchanges.name, 
      routingKey: configRabbitMQ.routingKey.create_job
    });

    await this.createBindQueue(channel, {
      queueName: configRabbitMQ.queue.dlq,
      exchangeName: configRabbitMQ.exchanges.dlx,
      routingKey: configRabbitMQ.routingKey.dead_job
    });

    await this.createBindQueue(channel, {
      exchangeName: configRabbitMQ.exchanges.dlx,
      queueName: configRabbitMQ.queue.notification_dlq,
      routingKey: configRabbitMQ.routingKey.notification_dead
    });

  }
}
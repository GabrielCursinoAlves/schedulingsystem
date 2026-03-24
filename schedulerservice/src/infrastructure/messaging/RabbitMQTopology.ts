import { BindQueueParams, QueueParams } from "@/types/rabbitmq/TopologyType.js";
import { configRabbitMQ } from "@/infrastructure/messaging/RabbitMQConfig.js";
import { Channel } from "amqplib";

export class RabbitMQTopology {
  async createExchange(channel: Channel, exchangeName: string): Promise<void> {
    await channel.assertExchange(exchangeName, 'direct', {
      durable: true
    });
  }

  async createQueue(channel: Channel, queueParams: QueueParams ): Promise<void> {
    const { queueName, deadExchange } = queueParams;


    await channel.assertQueue(queueName, {
      durable: true,
      ...(deadExchange && { deadLetterExchange: deadExchange })
    });
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
    await this.createQueue(channel, { 
      queueName:  configRabbitMQ.queue.job , 
      deadExchange: configRabbitMQ.exchanges.dlx 
    });

    await this.createBindQueue(channel, {
      exchangeName: configRabbitMQ.exchanges.name, 
      queueName: configRabbitMQ.queue.job, 
      routingKey: configRabbitMQ.routingKey.create_job
    });

  }
}
export type BindQueueParams = {
  exchangeName: string,
  routingKey: string,
  queueName: string
};

export type QueueParams = {
  queueName: string,
  deadExchange?: string,
  deadRoutingKey?: string,
  timeTtl?: number
}
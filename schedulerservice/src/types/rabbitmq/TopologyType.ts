export type BindQueueParams = {
  exchangeName: string,
  routingKey: string,
  queueName: string
};

export type QueueParams = {
  deadRoutingKey?: string,
  deadExchange?: string,
  queueName: string,
  timeTtl?: number
}
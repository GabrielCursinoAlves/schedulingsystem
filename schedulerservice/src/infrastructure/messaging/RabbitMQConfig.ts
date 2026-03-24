export const configRabbitMQ = {
  exchanges: {
    name: "job.exchange",
    dlx: "job.dlx"
  },
  queue: {
    job: "job.queue",
    dlq: "job.dlq"
  },
  routingKey: {
    create_job: "job.create"
  }
};
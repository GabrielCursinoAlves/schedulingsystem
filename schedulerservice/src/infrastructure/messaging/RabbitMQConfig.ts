export const configRabbitMQ = {
  exchanges: {
    name: "job.exchange",
    dlx: "job.dlx"
  },
  queue: {
    job: "job.queue",
    delay: "job.delay",
    retry: "job.retry",
    dlq: "job.dlq"
  }, 
  routingKey: {
    create_job: "job.create",
    dead_job: "job.dead"
  }
};
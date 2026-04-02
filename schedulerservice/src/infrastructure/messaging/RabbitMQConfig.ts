export const configRabbitMQ = {
  exchanges: {
    name: "job.exchange",
    dlx: "job.dlx"
  },
  queue: {
    job: "job.queue",
    delay: "job.delay",
    dlq: "job.dlq"
  }, 
  routingKey: {
    create_job: "job.create",
    dead_job: "job.dead"
  }
};
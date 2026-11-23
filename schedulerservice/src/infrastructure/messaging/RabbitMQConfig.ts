export const configRabbitMQ = {
  exchanges: {
    name: "job.exchange",
    dlx: "job.dlx"
  },
  queue: {
    notification_dlq: "job.notification.dlq",
    notification: "job.notification",
    delay: "job.delay",
    retry: "job.retry",
    job: "job.queue",
    dlq: "job.dlq"
  }, 
  routingKey: {
    notification_dead: "job.notification.dead",
    create_job: "job.create",
    dead_job: "job.dead"
  }
};
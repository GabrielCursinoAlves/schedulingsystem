export const configRabbitMQ = {
   exchanges: {
    name: "job.exchange"
  },
  queue: {
    job: "job.queue",
    retry: "job.retry"
  }
};
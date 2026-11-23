import { SchemaOutboxPayloadNotification } from "@/schema/zod/OutboxPayloadNotificationSchema.js";
import { RabbitMQConnection } from "@/infrastructure/messaging/RabbitMQConnection.js";
import { RabbitMQPublisher } from "@/infrastructure/messaging/RabbitMQPublisher.js";
import { prisma } from "@/infrastructure/database/prisma/Connection.js";
import { ErrorValidation } from "@/error/index.js";

let running = true;
let wake: (() => void) | null = null;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    const timer = setTimeout(() => { wake = null; resolve(); }, ms);
    wake = () => { clearTimeout(timer); wake = null; resolve(); };
});

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
  Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout waiting for RabbitMQ channel")), ms)
    ),
]);

async function markFailed(id: string, stage: string, error: unknown) {
  await prisma.notificationOutbox.update({
    where: { id },
    data: {
      status: "failed",
      error_reason: JSON.stringify({
        stage,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      }),
    },
  });
}

async function processBatch(connection: RabbitMQConnection) {
  const messages = await prisma.notificationOutbox.findMany({
    where: { 
      status: "pending"
    },
    take: 50,
    orderBy: {
      created_at: "asc"
    }
  });

  if(!messages.length) return;

  const channel = await withTimeout(connection.getChannelConfirm(), 5000);
  const publisher = new RabbitMQPublisher(channel);

  for(const message of messages) {
    if(!running) break;

    const result = SchemaOutboxPayloadNotification.safeParse(message.payload);

    if(!result.success) {
      const error = new ErrorValidation.ZodValidationError(result.error);
      await markFailed(message.id, "validation", error).catch(console.error);
      continue;
    }

    try {
      await publisher.publishCreateNotification(result.data);
    } catch (error) {
      console.error(`Publish failed (id:${message.id}), retrying next cycle:`, error);
      break;
    }

    try {
      await prisma.notificationOutbox.updateMany({
        where: { 
          id: message.id, status: "pending" }, 
        data: { 
          status: "queued", processed_at: new Date() }
      });
    } catch (error) {
      console.error(`Published but not marked queued (id=${message.id}):`, error);
    }
  }
}

async function start() {
  const connectionInstance = RabbitMQConnection.getInstance();
  await connectionInstance.connect();

  const stop = () => { running = false; wake?.(); };
  process.on("SIGTERM", stop);
  process.on("SIGINT", stop);

  while(running) {
    try {
      await processBatch(connectionInstance);
    } catch (error) {
      console.error("Worker cycle failed:", error);
    }
    if (!running) break;
    await sleep(30000);
  }

  await connectionInstance.close();
  await prisma.$disconnect();
}

start().catch((err) => {
  console.error("Fatal worker error:", err);
  process.exit(1);
});
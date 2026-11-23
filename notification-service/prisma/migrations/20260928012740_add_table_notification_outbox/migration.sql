-- CreateEnum
CREATE TYPE "DispatchOutboxStatus" AS ENUM ('pending', 'queued', 'failed');

-- CreateTable
CREATE TABLE "NotificationOutbox" (
    "id" TEXT NOT NULL,
    "dispatch_id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "DispatchOutboxStatus" NOT NULL DEFAULT 'pending',
    "error_reason" TEXT,
    "processed_at" TIMESTAMP(3),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationOutbox_dispatch_id_key" ON "NotificationOutbox"("dispatch_id");

-- CreateIndex
CREATE INDEX "NotificationOutbox_created_at_idx" ON "NotificationOutbox"("created_at");

-- CreateIndex
CREATE INDEX "NotificationOutbox_status_idx" ON "NotificationOutbox"("status");

-- AddForeignKey
ALTER TABLE "NotificationOutbox" ADD CONSTRAINT "NotificationOutbox_dispatch_id_fkey" FOREIGN KEY ("dispatch_id") REFERENCES "NotificationDispatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

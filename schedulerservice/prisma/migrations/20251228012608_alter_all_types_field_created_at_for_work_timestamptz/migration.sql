/*
  Warnings:

  - A unique constraint covering the columns `[execution_id]` on the table `Outbox` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `execution_id` to the `Outbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Outbox" ADD COLUMN     "execution_id" TEXT NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "ScheduledJob" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ;

-- CreateIndex
CREATE UNIQUE INDEX "Outbox_execution_id_key" ON "Outbox"("execution_id");

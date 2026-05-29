/*
  Warnings:

  - You are about to drop the column `aggregate_type` on the `Outbox` table. All the data in the column will be lost.
  - You are about to drop the column `event_type` on the `Outbox` table. All the data in the column will be lost.
  - You are about to drop the column `execution_id` on the `Outbox` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[event_id]` on the table `Outbox` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `event` to the `Outbox` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Outbox_execution_id_key";

-- AlterTable
ALTER TABLE "Outbox" DROP COLUMN "aggregate_type",
DROP COLUMN "event_type",
DROP COLUMN "execution_id",
ADD COLUMN     "event" TEXT NOT NULL,
ADD COLUMN     "event_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Outbox_event_id_key" ON "Outbox"("event_id");

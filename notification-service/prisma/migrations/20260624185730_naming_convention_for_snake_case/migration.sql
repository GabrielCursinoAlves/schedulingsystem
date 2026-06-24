/*
  Warnings:

  - You are about to drop the column `eventId` on the `NotificationDispatch` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `NotificationDispatch` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `NotificationDispatch` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[event_id]` on the table `NotificationDispatch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `event_id` to the `NotificationDispatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_id` to the `NotificationDispatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `NotificationDispatch` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NotificationDispatch_eventId_key";

-- AlterTable
ALTER TABLE "NotificationDispatch" DROP COLUMN "eventId",
DROP COLUMN "jobId",
DROP COLUMN "userId",
ADD COLUMN     "event_id" TEXT NOT NULL,
ADD COLUMN     "job_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NotificationDispatch_event_id_key" ON "NotificationDispatch"("event_id");

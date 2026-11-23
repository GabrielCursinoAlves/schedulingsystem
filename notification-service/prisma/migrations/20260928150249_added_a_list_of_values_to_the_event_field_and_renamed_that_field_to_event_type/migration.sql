/*
  Warnings:

  - You are about to drop the column `event` on the `NotificationOutbox` table. All the data in the column will be lost.
  - Added the required column `event_type` to the `NotificationOutbox` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DispatchOutboxEventype" AS ENUM ('notification.send_alert_result', 'notification.send_sms_result');

-- AlterTable
ALTER TABLE "NotificationOutbox" DROP COLUMN "event",
ADD COLUMN     "event_type" "DispatchOutboxEventype" NOT NULL;

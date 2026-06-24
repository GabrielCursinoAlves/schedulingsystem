/*
  Warnings:

  - The `severity` column on the `NotificationDispatch` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `NotificationDispatch` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `eventype` on the `NotificationDispatch` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DispatchEventype" AS ENUM ('notification.send_alert', 'notification.send_sms');

-- CreateEnum
CREATE TYPE "DispatchSeverity" AS ENUM ('medium', 'high', 'low');

-- CreateEnum
CREATE TYPE "DispatchStatus" AS ENUM ('processing', 'pending', 'failed', 'sent');

-- AlterTable
ALTER TABLE "NotificationDispatch" DROP COLUMN "eventype",
ADD COLUMN     "eventype" "DispatchEventype" NOT NULL,
DROP COLUMN "severity",
ADD COLUMN     "severity" "DispatchSeverity" NOT NULL DEFAULT 'medium',
DROP COLUMN "status",
ADD COLUMN     "status" "DispatchStatus" NOT NULL DEFAULT 'pending';

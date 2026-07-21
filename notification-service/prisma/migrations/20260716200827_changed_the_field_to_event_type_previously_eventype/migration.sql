/*
  Warnings:

  - You are about to drop the column `eventype` on the `NotificationDispatch` table. All the data in the column will be lost.
  - Added the required column `event_type` to the `NotificationDispatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotificationDispatch" DROP COLUMN "eventype",
ADD COLUMN     "event_type" "DispatchEventype" NOT NULL;

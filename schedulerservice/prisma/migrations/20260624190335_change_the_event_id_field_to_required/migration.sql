/*
  Warnings:

  - Made the column `event_id` on table `Outbox` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Outbox" ALTER COLUMN "event_id" SET NOT NULL;

/*
  Warnings:

  - You are about to drop the column `type` on the `Outbox` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Outbox" DROP COLUMN "type",
ADD COLUMN     "aggregate_type" TEXT NOT NULL DEFAULT '';

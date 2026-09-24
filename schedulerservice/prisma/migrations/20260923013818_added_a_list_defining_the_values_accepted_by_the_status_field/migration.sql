/*
  Warnings:

  - The `status` column on the `Outbox` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DispatchStatus" AS ENUM ('completed', 'pending', 'publish', 'failed');

-- AlterTable
ALTER TABLE "Outbox" DROP COLUMN "status",
ADD COLUMN     "status" "DispatchStatus" NOT NULL DEFAULT 'pending';

-- CreateIndex
CREATE INDEX "Outbox_status_idx" ON "Outbox"("status");

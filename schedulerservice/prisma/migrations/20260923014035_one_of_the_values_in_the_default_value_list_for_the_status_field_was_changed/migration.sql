/*
  Warnings:

  - The values [publish] on the enum `DispatchStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DispatchStatus_new" AS ENUM ('completed', 'pending', 'queued', 'failed');
ALTER TABLE "public"."Outbox" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Outbox" ALTER COLUMN "status" TYPE "DispatchStatus_new" USING ("status"::text::"DispatchStatus_new");
ALTER TYPE "DispatchStatus" RENAME TO "DispatchStatus_old";
ALTER TYPE "DispatchStatus_new" RENAME TO "DispatchStatus";
DROP TYPE "public"."DispatchStatus_old";
ALTER TABLE "Outbox" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

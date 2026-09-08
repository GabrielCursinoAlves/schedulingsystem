/*
  Warnings:

  - A unique constraint covering the columns `[email_alert]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email_alert" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_alert_key" ON "User"("email_alert");

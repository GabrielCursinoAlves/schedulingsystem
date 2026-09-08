/*
  Warnings:

  - Made the column `email_alert` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email_alert" SET NOT NULL;

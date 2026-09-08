-- AlterTable
ALTER TABLE "NotificationDispatch" ADD COLUMN     "email_alert" TEXT,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "severity" DROP NOT NULL,
ALTER COLUMN "severity" DROP DEFAULT;

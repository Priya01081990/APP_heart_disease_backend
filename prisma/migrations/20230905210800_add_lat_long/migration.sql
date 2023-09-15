-- AlterTable
ALTER TABLE "heart_activity_alarm" ADD COLUMN     "lat" TEXT,
ADD COLUMN     "long" TEXT,
ALTER COLUMN "confidence" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "alarm_set_date_time" DROP NOT NULL,
ALTER COLUMN "heart_rate" DROP NOT NULL;

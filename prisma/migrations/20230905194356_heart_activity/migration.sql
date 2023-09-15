-- CreateTable
CREATE TABLE "heart_activity_alarm" (
    "id" SERIAL NOT NULL,
    "confidence" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "alarm" BOOLEAN NOT NULL DEFAULT false,
    "alarm_set_date_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "heart_activity_alarm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "heart_activity_alarm" ADD CONSTRAINT "heart_activity_alarm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

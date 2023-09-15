-- DropForeignKey
ALTER TABLE "module_wise_user_response" DROP CONSTRAINT "module_wise_user_response_module_id_fkey";

-- DropForeignKey
ALTER TABLE "module_wise_user_response" DROP CONSTRAINT "module_wise_user_response_user_id_fkey";

-- CreateTable
CREATE TABLE "prediction" (
    "id" SERIAL NOT NULL,
    "confidence" DECIMAL(5,2) NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "prediction" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "prediction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "module_wise_user_response" ADD CONSTRAINT "module_wise_user_response_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "module_wise_user_response" ADD CONSTRAINT "module_wise_user_response_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prediction" ADD CONSTRAINT "prediction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

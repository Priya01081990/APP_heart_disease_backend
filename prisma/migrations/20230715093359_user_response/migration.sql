-- AlterTable
ALTER TABLE "dynamic_attributes" ADD COLUMN     "no_of_time_response" INTEGER;

-- CreateTable
CREATE TABLE "module_wise_user_response" (
    "id" SERIAL NOT NULL,
    "total_visit" INTEGER NOT NULL,
    "module_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "module_wise_user_response_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "module_wise_user_response" ADD CONSTRAINT "module_wise_user_response_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "module_wise_user_response" ADD CONSTRAINT "module_wise_user_response_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "ph_no" VARCHAR(255),
    "address" VARCHAR(255),
    "type" VARCHAR(255),
    "age" VARCHAR(255),
    "gender" "Gender" NOT NULL DEFAULT 'Male',
    "login_status" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dynamic_attributes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "month" VARCHAR(255),
    "year" VARCHAR(255),
    "user_id" INTEGER,
    "attribute_type_id" INTEGER,
    "module_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "dynamic_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dynamic_attributes_field_values" (
    "id" SERIAL NOT NULL,
    "choices" VARCHAR(255),
    "dynamic_attributes_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "dynamic_attributes_field_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dynamic_attributes_selected_values" (
    "id" SERIAL NOT NULL,
    "answer" VARCHAR(255),
    "dynamic_attributes_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "dynamic_attributes_selected_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attribute_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "attribute_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "display_name" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "module_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dynamic_attributes" ADD CONSTRAINT "dynamic_attributes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dynamic_attributes" ADD CONSTRAINT "dynamic_attributes_attribute_type_id_fkey" FOREIGN KEY ("attribute_type_id") REFERENCES "attribute_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dynamic_attributes" ADD CONSTRAINT "dynamic_attributes_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dynamic_attributes_field_values" ADD CONSTRAINT "dynamic_attributes_field_values_dynamic_attributes_id_fkey" FOREIGN KEY ("dynamic_attributes_id") REFERENCES "dynamic_attributes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dynamic_attributes_selected_values" ADD CONSTRAINT "dynamic_attributes_selected_values_dynamic_attributes_id_fkey" FOREIGN KEY ("dynamic_attributes_id") REFERENCES "dynamic_attributes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

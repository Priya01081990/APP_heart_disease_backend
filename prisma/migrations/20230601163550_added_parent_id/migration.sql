/*
  Warnings:

  - A unique constraint covering the columns `[parent_id]` on the table `module` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "module" ADD COLUMN     "parent_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "module_parent_id_key" ON "module"("parent_id");

-- AddForeignKey
ALTER TABLE "module" ADD CONSTRAINT "module_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

/*
  Warnings:

  - Added the required column `heart_rate` to the `heart_activity_alarm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "heart_activity_alarm" ADD COLUMN     "heart_rate" INTEGER NOT NULL;

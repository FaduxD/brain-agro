/*
  Warnings:

  - You are about to drop the column `harvestId` on the `Crop` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Crop" DROP CONSTRAINT "Crop_harvestId_fkey";

-- AlterTable
ALTER TABLE "Crop" DROP COLUMN "harvestId";

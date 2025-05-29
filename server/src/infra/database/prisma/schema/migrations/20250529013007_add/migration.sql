/*
  Warnings:

  - You are about to drop the column `name` on the `Crop` table. All the data in the column will be lost.
  - Added the required column `plantationId` to the `Crop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Crop" DROP CONSTRAINT "Crop_harvestId_fkey";

-- AlterTable
ALTER TABLE "Crop" DROP COLUMN "name",
ADD COLUMN     "plantationId" INTEGER NOT NULL,
ALTER COLUMN "harvestId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Plantation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plantation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_plantationId_fkey" FOREIGN KEY ("plantationId") REFERENCES "Plantation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_harvestId_fkey" FOREIGN KEY ("harvestId") REFERENCES "Harvest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

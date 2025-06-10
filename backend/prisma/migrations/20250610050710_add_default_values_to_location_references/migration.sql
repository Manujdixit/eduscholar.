/*
  Warnings:

  - You are about to drop the column `collegesId` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `collegesId` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `collegesId` on the `State` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_collegesId_fkey";

-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_collegesId_fkey";

-- DropForeignKey
ALTER TABLE "State" DROP CONSTRAINT "State_collegesId_fkey";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "collegesId";

-- AlterTable
ALTER TABLE "Colleges" ADD COLUMN     "cityId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "countryId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "stateId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "collegesId";

-- AlterTable
ALTER TABLE "State" DROP COLUMN "collegesId";

-- AddForeignKey
ALTER TABLE "Colleges" ADD CONSTRAINT "Colleges_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Colleges" ADD CONSTRAINT "Colleges_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Colleges" ADD CONSTRAINT "Colleges_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

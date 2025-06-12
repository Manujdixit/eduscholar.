/*
  Warnings:

  - You are about to drop the column `name` on the `LeadForm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LeadForm" DROP COLUMN "name",
ADD COLUMN     "course_preference" TEXT,
ADD COLUMN     "dob" TEXT,
ADD COLUMN     "english_test" TEXT,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "preffered_intake" TEXT,
ADD COLUMN     "visa" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phn_no" DROP NOT NULL;

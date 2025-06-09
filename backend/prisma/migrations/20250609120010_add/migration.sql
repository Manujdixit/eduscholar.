/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Colleges` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `intake_start_date` to the `Colleges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pr_pathway` to the `Colleges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primary_stream` to the `Colleges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Colleges` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CollegesPrimaryStream" AS ENUM ('Engineering', 'Management', 'Design', 'Law');

-- AlterTable
ALTER TABLE "Colleges" ADD COLUMN     "intake_start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pr_pathway" BOOLEAN NOT NULL,
ADD COLUMN     "primary_stream" "CollegesPrimaryStream" NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "LeadForm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phn_no" TEXT NOT NULL,

    CONSTRAINT "LeadForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subsciption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phn_no" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Subsciption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Colleges_slug_key" ON "Colleges"("slug");

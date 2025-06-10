/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Colleges` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `intake_start_date` to the `Colleges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pr_pathway` to the `Colleges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Colleges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streamId` to the `CollegesCourses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streamId` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Colleges" ADD COLUMN     "acceptance_rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "intake_start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "international_student_rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "pr_pathway" BOOLEAN NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "streamId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "total_students" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "CollegesCourses" ADD COLUMN     "streamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "streamId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "LeadForm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phn_no" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subsciption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phn_no" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subsciption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "collegesId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "collegesId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "collegesId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stream" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactUs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phn_no" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_msg" TEXT NOT NULL,
    "text1" TEXT NOT NULL,
    "text2" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactUs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_slug_key" ON "City"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "State_slug_key" ON "State"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Country_slug_key" ON "Country"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_slug_key" ON "Stream"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Colleges_slug_key" ON "Colleges"("slug");

-- AddForeignKey
ALTER TABLE "Colleges" ADD CONSTRAINT "Colleges_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegesCourses" ADD CONSTRAINT "CollegesCourses_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_collegesId_fkey" FOREIGN KEY ("collegesId") REFERENCES "Colleges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_collegesId_fkey" FOREIGN KEY ("collegesId") REFERENCES "Colleges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_collegesId_fkey" FOREIGN KEY ("collegesId") REFERENCES "Colleges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

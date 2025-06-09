-- CreateEnum
CREATE TYPE "CollegewiseContentSilos" AS ENUM ('info', 'course', 'fees', 'scholarship', 'placement', 'news', 'ranking', 'other');

-- CreateEnum
CREATE TYPE "ArticlesSilos" AS ENUM ('news', 'exam', 'course', 'blog', 'other');

-- CreateTable
CREATE TABLE "Colleges" (
    "id" SERIAL NOT NULL,
    "college_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "established" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "bg_url" TEXT NOT NULL,
    "media_url" JSONB NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "score" INTEGER NOT NULL,
    "meta_desc" TEXT NOT NULL,
    "og_img" TEXT NOT NULL,

    CONSTRAINT "Colleges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "course_name" TEXT NOT NULL,
    "duration_in_months" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "score" INTEGER NOT NULL,
    "meta_desc" TEXT NOT NULL,
    "og_img" TEXT NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegesCourses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration_in_months" INTEGER NOT NULL,
    "tution_fees" DOUBLE PRECISION NOT NULL,
    "hostel_fees" DOUBLE PRECISION NOT NULL,
    "one_time_fees" DOUBLE PRECISION NOT NULL,
    "other_fees" JSONB NOT NULL,
    "meta_desc" TEXT NOT NULL,
    "og_img" TEXT NOT NULL,
    "college_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "CollegesCourses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegewiseContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "silos" "CollegewiseContentSilos" NOT NULL DEFAULT 'info',
    "meta_desc" TEXT NOT NULL,
    "og_img" TEXT NOT NULL,
    "college_id" INTEGER NOT NULL,

    CONSTRAINT "CollegewiseContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Articles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "silos" "ArticlesSilos" NOT NULL DEFAULT 'news',
    "meta_desc" TEXT NOT NULL,
    "og_img" TEXT NOT NULL,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollegesCourses" ADD CONSTRAINT "CollegesCourses_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "Colleges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegesCourses" ADD CONSTRAINT "CollegesCourses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegewiseContent" ADD CONSTRAINT "CollegewiseContent_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "Colleges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

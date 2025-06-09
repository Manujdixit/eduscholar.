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
    "media_url" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "score" INTEGER NOT NULL,
    "meta_desc" TEXT NOT NULL,
    "og_img" TEXT NOT NULL,

    CONSTRAINT "Colleges_pkey" PRIMARY KEY ("id")
);

ALTER SEQUENCE "Colleges_id_seq" RESTART WITH 301;

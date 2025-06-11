-- AlterTable
ALTER TABLE "Articles" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Colleges" ADD COLUMN     "avg_fees_in_aud" DOUBLE PRECISION,
ADD COLUMN     "brochure_url" TEXT,
ADD COLUMN     "search_names" TEXT,
ALTER COLUMN "score" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "CollegesCourses" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "CollegewiseContent" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "score" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 1;

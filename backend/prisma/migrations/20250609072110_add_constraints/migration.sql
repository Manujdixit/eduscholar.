-- Add CHECK constraint to Colleges.rating, score
ALTER TABLE "Colleges"
ADD CONSTRAINT "colleges_rating_check"
CHECK ("rating" >= 1 AND "rating" <= 10);

ALTER TABLE "Colleges"
ADD CONSTRAINT "colleges_score_check"
CHECK ("score" >= 1 AND "score" <= 999);

-- Add CHECK constraint to Courses.rating, score
ALTER TABLE "Courses"
ADD CONSTRAINT "courses_rating_check"
CHECK ("rating" >= 1 AND "rating" <= 10);

ALTER TABLE "Colleges"
ADD CONSTRAINT "courses_score_check"
CHECK ("score" >= 1 AND "score" <= 999);

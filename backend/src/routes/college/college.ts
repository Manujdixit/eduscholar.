import express from "express";
import { getTopColleges } from "../../controllers/college/topColleges";
import { collegeInfo } from "../../controllers/college/info";
import { getCollegeCoursesInfo } from "../../controllers/college/courses";

const CollegeRouter = express.Router();

CollegeRouter.get("/top", getTopColleges as any);
CollegeRouter.get("/info/:id", collegeInfo as any);
CollegeRouter.get("/courses/:id", getCollegeCoursesInfo as any);

export default CollegeRouter;

import express from "express";
import { getTopColleges } from "../../controllers/college/college";

const CollegeRouter = express.Router();

CollegeRouter.get("/top", getTopColleges as any);

export default CollegeRouter;

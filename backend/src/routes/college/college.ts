import express from "express";
import { getTopColleges } from "../../controllers/college/topColleges";
import { collegeInfo } from "../../controllers/college/info";
import { getCollegeCoursesInfo } from "../../controllers/college/courses";
import { getCollegeFeesInfo } from "../../controllers/college/fees";

const CollegeRouter = express.Router();

/**
 * @swagger
 * /api/v1/college/top:
 *   get:
 *     summary: Get top colleges
 *     tags: [Colleges]
 *     description: Retrieve a list of top-ranked colleges
 *     parameters:
 *       - in: query
 *         name: stream
 *         required: false
 *         description: Optional parameter to filter colleges by stream name (Engineering, Management, Design, Law)
 *         schema:
 *           type: string
 *           example: "engineering"
 *     responses:
 *       200:
 *         description: Successfully retrieved top colleges
 *       500:
 *         description: Internal server error
 */
CollegeRouter.get("/top", getTopColleges as any);

/**
 * @swagger
 * /api/v1/college/info/{id}:
 *   get:
 *     summary: Get college information by ID
 *     tags: [Colleges]
 *     description: Retrieve detailed information about a specific college
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: College ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved college information
 *       404:
 *         description: College not found
 *       500:
 *         description: Internal server error
 */
CollegeRouter.get("/info/:id", collegeInfo as any);

/**
 * @swagger
 * /api/v1/college/courses/{id}:
 *   get:
 *     summary: Get courses offered by a college
 *     tags: [Colleges]
 *     description: Retrieve all courses offered by a specific college
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: College ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved college courses
 *       404:
 *         description: College not found
 *       500:
 *         description: Internal server error
 */
CollegeRouter.get("/courses/:id", getCollegeCoursesInfo as any);

/**
 * @swagger
 * /api/v1/college/fees/{id}:
 *   get:
 *     summary: Get fess for corses offered by a college
 *     tags: [Colleges]
 *     description: Retrieve all fees for courses offered by a specific college
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: College ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved college courses fees
 *       404:
 *         description: College not found
 *       500:
 *         description: Internal server error
 */
CollegeRouter.get("/fees/:id", getCollegeFeesInfo as any);

export default CollegeRouter;

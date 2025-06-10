import express from "express";
import CollegeRouter from "./college/college";
import SearchRouter from "./search/search";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Colleges
 *     description: College management and information endpoints
 *   - name: Search
 *     description: Search functionality for colleges, artciles and courses
 */

router.use("/college", CollegeRouter);
router.use("/search", SearchRouter);

export default router;

import express from "express";
import { globalSearch } from "../../controllers/search/search";

const SearchRouter = express.Router();

/**
 * @swagger
 * /api/v1/search:
 *   get:
 *     summary: Global search for colleges, artciles and courses
 *     tags: [Search]
 *     description: Search across colleges and courses using a query parameter
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: Search query string
 *         schema:
 *           type: string
 *           example: "engineering"
 *     responses:
 *       200:
 *         description: Successfully retrieved search results
 *       400:
 *         description: Bad request - missing or invalid query parameter
 *       500:
 *         description: Internal server error
 */
SearchRouter.get("/", globalSearch as any);

export default SearchRouter;

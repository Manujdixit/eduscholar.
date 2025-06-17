import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/articles/top:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Get list of articles pagination.
 *     description: Retrieve a paginated list of articles. Results are sorted by updated_at in descending order.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 6
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved articles list
 *       500:
 *         description: Internal server error
 */

export const getTopArticles = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [articles, totalArticles] = await Promise.all([
      prisma.articles.findMany({
        orderBy: { score: "desc" },
        skip,
        take,
      }),
      prisma.articles.count(),
    ]);

    // Response with pagination metadata
    res.json({
      success: true,
      data: {
        articles,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalArticles / Number(limit)),
          totalItems: totalArticles,
          itemsPerPage: Number(limit),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching recent articles:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};

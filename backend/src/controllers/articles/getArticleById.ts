import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/articles/{id}:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Get article by ID
 *     description: Retrieve a specific article by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The article ID
 *     responses:
 *       200:
 *         description: Successfully retrieved article
 *       404:
 *         description: Article not found
 *       400:
 *         description: Invalid article ID
 *       500:
 *         description: Internal server error
 */

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate ID parameter
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid article ID. ID must be a valid number.",
      });
    }

    const articleId = Number(id);

    // Find article by ID
    const article = await prisma.articles.findUnique({
      where: {
        id: articleId,
      },
    });

    // Check if article exists
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    // Return article data
    res.json({
      success: true,
      data: {
        article,
      },
    });
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};

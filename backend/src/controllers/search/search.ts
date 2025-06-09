import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @description Global search across colleges, courses, and articles
 * @route GET /api/v1/search
 * @param {string} q - Query string to search for
 * @access Public
 */
export const globalSearch = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    // Search in all three entities in parallel
    const [colleges, courses, articles] = await Promise.all([
      prisma.colleges.findMany({
        where: {
          OR: [
            { college_name: { contains: q, mode: "insensitive" } },
            { location: { contains: q, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          college_name: true,
          location: true,
          logo_url: true,
          rating: true,
          score: true,
          primary_stream: true,
          slug: true,
        },
        take: 3,
      }),
      prisma.courses.findMany({
        where: {
          course_name: { contains: q, mode: "insensitive" },
        },
        select: {
          id: true,
          course_name: true,
          duration_in_months: true,
          rating: true,
          score: true,
        },
        take: 3,
      }),
      prisma.articles.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { content: { contains: q, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          title: true,
          silos: true,
          meta_desc: true,
          createdAt: true,
        },
        take: 3,
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        colleges,
        courses,
        articles,
      },
    });
  } catch (error) {
    console.error("Error performing global search:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while performing search",
      error: (error as Error).message,
    });
  }
};

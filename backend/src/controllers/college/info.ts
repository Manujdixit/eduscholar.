import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

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
export const collegeInfo = async (req: Request, res: Response) => {
  const collegeId = parseInt(req.params.id);

  try {
    const college = await prisma.colleges.findUnique({
      where: { id: collegeId },
      include: {
        _count: {
          select: { CollegesCourses: true },
        },
        CollegewiseContent: {
          where: { silos: "info" },
          orderBy: { updatedAt: "desc" },
          take: 1,
        },
      },
    });

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        basic: {
          ...college,
        },
        course_count: college._count.CollegesCourses,
        info_content: college.CollegewiseContent,
      },
    });
  } catch (error) {
    console.error("Error fetching college info:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching college info",
      error: (error as Error).message,
    });
  }
};

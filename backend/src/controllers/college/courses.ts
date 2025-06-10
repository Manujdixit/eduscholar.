import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
export const getCollegeCoursesInfo = async (req: Request, res: Response) => {
  const collegeId = parseInt(req.params.id);

  if (isNaN(collegeId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid college ID",
    });
  }

  try {
    const [basic, courses, course_content] = await Promise.all([
      prisma.colleges.findUnique({
        where: { id: collegeId },
      }),
      prisma.collegesCourses.findMany({
        where: { college_id: collegeId },
      }),
      prisma.collegewiseContent.findFirst({
        where: {
          college_id: collegeId,
          silos: "course",
        },
        orderBy: { updatedAt: "desc" },
      }),
    ]);

    if (!basic) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {
        basic,
        course_count: courses.length,
        courses,
        course_content,
      },
    });
  } catch (error) {
    console.error("Error fetching college courses info:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching course information",
      error: (error as Error).message,
    });
  }
};

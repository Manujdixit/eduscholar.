import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
      prisma.collegewiseContent.findMany({
        where: {
          college_id: collegeId,
          silos: "course",
        },
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

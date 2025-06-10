import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

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
          course_count: college._count.CollegesCourses,
          info_content: college.CollegewiseContent,
        },
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

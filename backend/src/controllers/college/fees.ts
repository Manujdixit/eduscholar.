import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCollegeFeesInfo = async (req: Request, res: Response) => {
  try {
    const collegeId = parseInt(req.params.id);

    if (isNaN(collegeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid college ID",
      });
    }

    const [basic, fees] = await Promise.all([
      prisma.colleges.findUnique({
        where: { id: collegeId },
      }),
      prisma.collegesCourses.findMany({
        where: { college_id: collegeId },
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
        fees,
      },
    });
  } catch (error) {}
};

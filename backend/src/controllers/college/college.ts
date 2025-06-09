import { Request, Response } from "express";
import { PrismaClient, CollegesPrimaryStream } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @description Gets top 6 colleges based on best scores, optionally filtered by stream
 * @route GET /api/v1/college/top
 * @param {string} stream - Optional parameter to filter colleges by stream (Engineering, Management, Design, Law)
 * @access Public
 */
export const getTopColleges = async (req: Request, res: Response) => {
  try {
    const { stream } = req.query;

    // Convert stream string to enum value if provided
    let streamFilter: CollegesPrimaryStream | undefined = undefined;
    if (stream) {
      const streamString = stream.toString();
      if (
        Object.values(CollegesPrimaryStream).includes(
          streamString as CollegesPrimaryStream
        )
      ) {
        streamFilter = streamString as CollegesPrimaryStream;
      } else {
        return res.status(400).json({
          success: false,
        });
      }
    }

    // Get top 6 colleges based on score
    const colleges = await prisma.colleges.findMany({
      where: {
        ...(streamFilter && { primary_stream: streamFilter }),
      },
      orderBy: {
        score: "desc",
      },
      take: 6,
      select: {
        id: true,
        college_name: true,
        logo_url: true,
        location: true,
        intake_start_date: true,
        pr_pathway: true,
        slug: true,
        CollegesCourses: {
          select: {
            id: true,
          },
        },
      },
    });

    // Transform the colleges data to include course count
    const collegesWithCourseCount = colleges.map((college) => {
      const { CollegesCourses, ...rest } = college;
      return {
        ...rest,
        count_collegewise_course: CollegesCourses.length,
      };
    });

    return res.status(200).json({
      success: true,
      data: collegesWithCourseCount,
    });
  } catch (error) {
    console.error("Error fetching top colleges:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching top colleges",
      error: (error as Error).message,
    });
  }
};

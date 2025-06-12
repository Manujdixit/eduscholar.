import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/college/top:
 *   get:
 *     summary: Get top colleges
 *     tags: [Colleges]
 *     description: Retrieve a list of top-ranked colleges
 *     parameters:
 *       - in: query
 *         name: stream
 *         required: false
 *         description: Optional parameter to filter colleges by stream name (Engineering, Management, Design, Law)
 *         schema:
 *           type: string
 *           example: "engineering"
 *     responses:
 *       200:
 *         description: Successfully retrieved top colleges
 *       500:
 *         description: Internal server error
 */
export const getTopColleges = async (req: Request, res: Response) => {
  try {
    const { stream } = req.query;

    // Build the where clause conditionally
    const whereClause: any = {};

    if (stream) {
      whereClause.primary_stream = {
        name: {
          equals: String(stream),
          mode: "insensitive",
        },
      };
    }

    const colleges = await prisma.colleges.findMany({
      where: whereClause,
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
        avg_fees_in_aud: true,
        CollegesCourses: {
          select: { id: true },
        },
      },
    });

    const response = colleges.map((college) => ({
      id: college.id,
      college_name: college.college_name,
      logo_url: college.logo_url,
      location: college.location,
      intake_start_date: college.intake_start_date,
      pr_pathway: college.pr_pathway,
      slug: college.slug,
      avg_fees_in_aud: college.avg_fees_in_aud,
      count_collegewise_course: college.CollegesCourses.length,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching top colleges:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

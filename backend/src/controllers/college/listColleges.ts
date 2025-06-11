import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/college/list:
 *   get:
 *     tags:
 *       - Colleges
 *     summary: Get list of colleges pagination, also gives primary stream, city, state, country list which has colleges
 *     descriptin: Retrieve a paginated list of colleges. Results are sorted by score in descending order. Also gives primary stream, city, state, country list which has colleges
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
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved college list
 *       500:
 *         description: Internal server error
 */

export const getCollegeList = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Fetch colleges and total count in parallel for efficiency
    const [colleges, totalColleges] = await Promise.all([
      prisma.colleges.findMany({
        select: {
          logo_url: true,
          college_name: true,
          location: true,
          rating: true,
          score: true,
          brochure_url: true,
          avg_fees_in_aud: true,
          city: { select: { name: true } },
          state: { select: { name: true } },
          CollegesCourses: { select: { id: true } },
        },
        orderBy: { score: "desc" },
        skip,
        take,
      }),
      prisma.colleges.count({}),
    ]);

    // Transform data to include course_count and flatten city/state names
    const collegeList = colleges.map((college) => ({
      logo_url: college.logo_url,
      college_name: college.college_name,
      location: college.location,
      rating: college.rating,
      score: college.score,
      brochure_url: college.brochure_url,
      avg_fees_in_aud: college.avg_fees_in_aud,
      city_name: college.city.name,
      state_name: college.state.name,
      course_count: college.CollegesCourses.length,
    }));

    // Fetch filter options as arrays of names only, in parallel
    const [streams, cities, states] = await Promise.all([
      prisma.stream.findMany({
        where: { Colleges: { some: {} } },
        select: { name: true },
        orderBy: { name: "asc" },
      }),
      prisma.city.findMany({
        where: { Colleges: { some: {} } },
        select: { name: true },
        orderBy: { name: "asc" },
      }),
      prisma.state.findMany({
        where: { Colleges: { some: {} } },
        select: { name: true },
        orderBy: { name: "asc" },
      }),
    ]);

    // Map to array of names
    const streamNames = streams.map((s) => s.name);
    const cityNames = cities.map((c) => c.name);
    const stateNames = states.map((s) => s.name);

    const response = {
      success: true,
      data: {
        colleges: collegeList,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(totalColleges / Number(limit)),
          totalItems: totalColleges,
          itemsPerPage: Number(limit),
        },
        filters: {
          stream: streamNames,
          city: cityNames,
          state: stateNames,
        },
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching college list:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};

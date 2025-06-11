import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/college/{id}:
 *   get:
 *     summary: Get college by ID with complete data
 *     tags: [Colleges]
 *     description: Retrieve a specific college by ID with all related information
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
 *         description: Successfully retrieved college
 *       400:
 *         description: Invalid college ID
 *       404:
 *         description: College not found
 *       500:
 *         description: Internal server error
 */
export const getCollegeById = async (req: Request, res: Response) => {
  try {
    const collegeId = parseInt(req.params.id);

    if (isNaN(collegeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid college ID",
      });
    }

    const college = await prisma.colleges.findUnique({
      where: { id: collegeId },
      include: {
        primary_stream: true,
        city: true,
        state: true,
        country: true,
      },
    });

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    res.status(200).json({
      success: true,
      data: college,
    });
  } catch (error) {
    console.error("Error fetching college by ID:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching college",
      error: (error as Error).message,
    });
  }
};

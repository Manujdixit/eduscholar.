import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/college/fees/{id}:
 *   get:
 *     summary: Get fess for corses offered by a college
 *     tags: [Colleges]
 *     description: Retrieve all fees for courses offered by a specific college
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
 *         description: Successfully retrieved college courses fees
 *       404:
 *         description: College not found
 *       500:
 *         description: Internal server error
 */
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
      prisma.collegewiseContent.findFirst({
        where: {
          college_id: collegeId,
          silos: "fees",
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
        fees,
      },
    });
  } catch (error) {
    console.error("Error fetching college fees info:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching fees information",
      error: (error as Error).message,
    });
  }
};

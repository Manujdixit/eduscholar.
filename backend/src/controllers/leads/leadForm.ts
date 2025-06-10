import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/leads:
 *   post:
 *     summary: Create a new lead form entry
 *     tags: [LeadForm]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phn_no
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phn_no:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lead form created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadForm'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
export const createLeadForm = async (req: Request, res: Response) => {
  try {
    const { name, email, phn_no } = req.body;

    if (!name || !email || !phn_no) {
      return res.status(400).json({
        error: "Missing required fields: name, email, and phn_no are required",
      });
    }

    const leadForm = await prisma.leadForm.create({
      data: {
        name,
        email,
        phn_no,
      },
    });

    res.status(201).json(leadForm);
  } catch (error) {
    console.error("Error creating lead form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/v1/leads:
 *   get:
 *     summary: Get all lead form entries
 *     tags: [LeadForm]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of lead forms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LeadForm'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Internal server error
 */
export const getAllLeadForms = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [leadForms, total] = await Promise.all([
      prisma.leadForm.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.leadForm.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: leadForms,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching lead forms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/v1/leads/view/{id}:
 *   get:
 *     summary: Get a lead form by ID
 *     tags: [LeadForm]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lead form ID
 *     responses:
 *       200:
 *         description: Lead form found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadForm'
 *       404:
 *         description: Lead form not found
 *       500:
 *         description: Internal server error
 */
export const getLeadFormById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const leadFormId = parseInt(id);

    if (isNaN(leadFormId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const leadForm = await prisma.leadForm.findUnique({
      where: { id: leadFormId },
    });

    if (!leadForm) {
      return res.status(404).json({ error: "Lead form not found" });
    }

    res.json(leadForm);
  } catch (error) {
    console.error("Error fetching lead form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/v1/leads/view/{id}:
 *   put:
 *     summary: Update a lead form
 *     tags: [LeadForm]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lead form ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phn_no:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lead form updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadForm'
 *       404:
 *         description: Lead form not found
 *       500:
 *         description: Internal server error
 */
export const updateLeadForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const leadFormId = parseInt(id);

    if (isNaN(leadFormId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const { name, email, phn_no } = req.body;

    const existingLeadForm = await prisma.leadForm.findUnique({
      where: { id: leadFormId },
    });

    if (!existingLeadForm) {
      return res.status(404).json({ error: "Lead form not found" });
    }

    const updatedLeadForm = await prisma.leadForm.update({
      where: { id: leadFormId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phn_no && { phn_no }),
      },
    });

    res.json(updatedLeadForm);
  } catch (error) {
    console.error("Error updating lead form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/v1/leads/view/{id}:
 *   delete:
 *     summary: Delete a lead form
 *     tags: [LeadForm]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lead form ID
 *     responses:
 *       200:
 *         description: Lead form deleted successfully
 *       404:
 *         description: Lead form not found
 *       500:
 *         description: Internal server error
 */
export const deleteLeadForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const leadFormId = parseInt(id);

    if (isNaN(leadFormId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const existingLeadForm = await prisma.leadForm.findUnique({
      where: { id: leadFormId },
    });

    if (!existingLeadForm) {
      return res.status(404).json({ error: "Lead form not found" });
    }

    await prisma.leadForm.delete({
      where: { id: leadFormId },
    });

    res.json({ message: "Lead form deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

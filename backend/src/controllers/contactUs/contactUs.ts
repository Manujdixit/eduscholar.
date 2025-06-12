import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 *
 * @swagger
 * /api/v1/contact-us:
 *   post:
 *     summary: Create a new contact us entry
 *     tags: [ContactUs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phn_no
 *               - email
 *               - user_msg
 *               - text1
 *               - text2
 *             properties:
 *               name:
 *                 type: string
 *               phn_no:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               user_msg:
 *                 type: string
 *               text1:
 *                 type: string
 *               text2:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact us entry created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
export const createContactUs = async (req: Request, res: Response) => {
  try {
    const { fname, lname, phn_no, email, user_msg, text1, text2 } = req.body;

    if (!fname || !email || !phn_no || !user_msg) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const contactUs = await prisma.contactUs.create({
      data: {
        first_name: fname,
        last_name: lname,
        email,
        user_msg,
        text1,
        text2,
        phn_no,
      },
    });

    res.status(201).json({
      data: contactUs,
    });
  } catch (error) {
    console.error("Error creating contact us entry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/v1/contact-us:
 *   get:
 *     summary: Get all contact us entries
 *     tags: [ContactUs]
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
 *         description: List of contact us entries
 *       500:
 *         description: Internal server error
 */
export const getAllContactUs = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [contactUsEntries, total] = await Promise.all([
      prisma.contactUs.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.contactUs.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: contactUsEntries,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching contact us entries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/v1/contact-us/view/{id}:
 *   get:
 *     summary: Get a contact us entry by ID
 *     tags: [ContactUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact us entry ID
 *     responses:
 *       200:
 *         description: Contact us entry found
 *       404:
 *         description: Contact us entry not found
 *       500:
 *         description: Internal server error
 */
export const getContactUsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contactUsId = parseInt(id);

    if (isNaN(contactUsId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const contactUs = await prisma.contactUs.findUnique({
      where: { id: contactUsId },
    });

    if (!contactUs) {
      return res.status(404).json({ error: "Contact us entry not found" });
    }

    res.json(contactUs);
  } catch (error) {
    console.error("Error fetching contact us entry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/v1/contact-us/view/{id}:
 *   put:
 *     summary: Update a contact us entry
 *     tags: [ContactUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact us entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phn_no:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               user_msg:
 *                 type: string
 *               text1:
 *                 type: string
 *               text2:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact us entry updated successfully
 *       404:
 *         description: Contact us entry not found
 *       500:
 *         description: Internal server error
 */
export const updateContactUs = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contactUsId = parseInt(id);

    if (isNaN(contactUsId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const { name, phn_no, email, user_msg, text1, text2 } = req.body;

    const existingContactUs = await prisma.contactUs.findUnique({
      where: { id: contactUsId },
    });

    if (!existingContactUs) {
      return res.status(404).json({ error: "Contact us entry not found" });
    }

    const updatedContactUs = await prisma.contactUs.update({
      where: { id: contactUsId },
      data: {
        ...(name && { name }),
        ...(phn_no && { phn_no }),
        ...(email && { email }),
        ...(user_msg && { user_msg }),
        ...(text1 && { text1 }),
        ...(text2 && { text2 }),
      },
    });

    res.json(updatedContactUs);
  } catch (error) {
    console.error("Error updating contact us entry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/v1/contact-us/view/{id}:
 *   delete:
 *     summary: Delete a contact us entry
 *     tags: [ContactUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact us entry ID
 *     responses:
 *       200:
 *         description: Contact us entry deleted successfully
 *       404:
 *         description: Contact us entry not found
 *       500:
 *         description: Internal server error
 */
export const deleteContactUs = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contactUsId = parseInt(id);

    if (isNaN(contactUsId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const existingContactUs = await prisma.contactUs.findUnique({
      where: { id: contactUsId },
    });

    if (!existingContactUs) {
      return res.status(404).json({ error: "Contact us entry not found" });
    }

    await prisma.contactUs.delete({
      where: { id: contactUsId },
    });

    res.json({ message: "Contact us entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact us entry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

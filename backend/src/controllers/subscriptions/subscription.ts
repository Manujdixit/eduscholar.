import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscription]
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
 *             properties:
 *               name:
 *                 type: string
 *               phn_no:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { name, phn_no, email } = req.body;

    if (!name || !phn_no || !email) {
      return res.status(400).json({
        error: "Missing required fields: name, phn_no, and email are required",
      });
    }

    const subscription = await prisma.subsciption.create({
      data: {
        name,
        phn_no,
        email,
      },
    });

    res.status(201).json(subscription);
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/v1/subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [Subscription]
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
 *         description: List of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subscription'
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
export const getAllSubscriptions = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [subscriptions, total] = await Promise.all([
      prisma.subsciption.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.subsciption.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: subscriptions,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/v1/subscriptions/view/{id}:
 *   get:
 *     summary: Get a subscription by ID
 *     tags: [Subscription]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Subscription found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */
export const getSubscriptionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subscriptionId = parseInt(id);

    if (isNaN(subscriptionId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const subscription = await prisma.subsciption.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    res.json(subscription);
  } catch (error) {
    console.error("Error fetching subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/v1/subscriptions/view/{id}:
 *   put:
 *     summary: Update a subscription
 *     tags: [Subscription]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subscription ID
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
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */
export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subscriptionId = parseInt(id);

    if (isNaN(subscriptionId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const { name, phn_no, email } = req.body;

    const existingSubscription = await prisma.subsciption.findUnique({
      where: { id: subscriptionId },
    });

    if (!existingSubscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    const updatedSubscription = await prisma.subsciption.update({
      where: { id: subscriptionId },
      data: {
        ...(name && { name }),
        ...(phn_no && { phn_no }),
        ...(email && { email }),
      },
    });

    res.json(updatedSubscription);
  } catch (error) {
    console.error("Error updating subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/v1/subscriptions/view/{id}:
 *   delete:
 *     summary: Delete a subscription
 *     tags: [Subscription]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Subscription deleted successfully
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */
export const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subscriptionId = parseInt(id);

    if (isNaN(subscriptionId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const existingSubscription = await prisma.subsciption.findUnique({
      where: { id: subscriptionId },
    });

    if (!existingSubscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    await prisma.subsciption.delete({
      where: { id: subscriptionId },
    });

    res.json({ message: "Subscription deleted successfully" });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

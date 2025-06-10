import express from "express";
import CollegeRouter from "./college/college";
import SearchRouter from "./search/search";
import LeadRouter from "./leads/leads";
import SubscriptionRouter from "./subscriptions/subscriptions";
import ContactUsRouter from "./contactUs/contactUs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Colleges
 *     description: College management and information endpoints
 *   - name: Search
 *     description: Search functionality for colleges, artciles and courses
 *   - name: LeadForm
 *     description: Lead form management endpoints
 *   - name: Subscription
 *     description: Subscription management endpoints
 *   - name: ContactUs
 *     description: Contact us form management endpoints
 */

router.use("/college", CollegeRouter);
router.use("/search", SearchRouter);
router.use("/leads", LeadRouter);
router.use("/subscriptions", SubscriptionRouter);
router.use("/contact-us", ContactUsRouter);

export default router;

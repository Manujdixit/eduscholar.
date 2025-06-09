import express from "express";
import CollegeRouter from "./college/college";
const router = express.Router();

router.use("/college", CollegeRouter);

export default router;

import express from "express";
import CollegeRouter from "./college/college";
import SearchRouter from "./search/search";
const router = express.Router();

router.use("/college", CollegeRouter);
router.use("/search", SearchRouter);

export default router;

import express from "express";
import {
  createLeadForm,
  getAllLeadForms,
  getLeadFormById,
  updateLeadForm,
  deleteLeadForm,
} from "../../controllers/leads/leadForm";

const LeadRouter = express.Router();

// Lead Form routes
LeadRouter.post("/", createLeadForm as any);
LeadRouter.get("/", getAllLeadForms as any);
LeadRouter.get("/view/:id", getLeadFormById as any);
LeadRouter.put("/view/:id", updateLeadForm as any);
LeadRouter.delete("/view/:id", deleteLeadForm as any);

export default LeadRouter;

import express from "express";
import {
  createContactUs,
  deleteContactUs,
  getAllContactUs,
  getContactUsById,
  updateContactUs,
} from "../../controllers/contactUs/contactUs";

const ContactUsRouter = express.Router();

ContactUsRouter.post("/", createContactUs as any);
ContactUsRouter.get("/", getAllContactUs as any);
ContactUsRouter.get("/view/:id", getContactUsById as any);
ContactUsRouter.put("/view/:id", updateContactUs as any);
ContactUsRouter.delete("/view/:id", deleteContactUs as any);

export default ContactUsRouter;

import express from "express";
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} from "../../controllers/subscriptions/subscription";

const SubscriptionRouter = express.Router();

SubscriptionRouter.post("/", createSubscription as any);
SubscriptionRouter.get("/", getAllSubscriptions as any);
SubscriptionRouter.get("/view/:id", getSubscriptionById as any);
SubscriptionRouter.put("/view/:id", updateSubscription as any);
SubscriptionRouter.delete("/view/:id", deleteSubscription as any);

export default SubscriptionRouter;

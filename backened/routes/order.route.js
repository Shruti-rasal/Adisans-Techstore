import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  markAsDelivered,
} from "../controllers/orderController.js";

import isAuthenticated from "../middleware/isAuthenticated.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/create", isAuthenticated, createOrder);
router.get("/my-orders", isAuthenticated, getMyOrders);
router.get("/all", isAuthenticated, isAdmin, getAllOrders);
router.put("/deliver/:id", isAuthenticated, isAdmin, markAsDelivered);

export default router;
import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isAdmin from "../middleware/isAdmin.js";

import {
  getDashboardStats,
  getAllUsers,
  deleteUser,
} from "../controllers/adminController.js";

const router = express.Router();


router.get("/dashboard", isAuthenticated, isAdmin, getDashboardStats);


router.get("/users", isAuthenticated, isAdmin, getAllUsers);
router.delete("/user/:id", isAuthenticated, isAdmin, deleteUser);

export default router;
import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isAdmin from "../middleware/isAdmin.js";
import isSuperAdmin from "../middleware/isSuperAdmin.js";

import {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../controllers/adminController.js";

import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { getAllReviews } from "../controllers/reviewController.js";

const router = express.Router();

// Dashboard
router.get("/dashboard", isAuthenticated, isAdmin, getDashboardStats);

// Users
router.get("/users", isAuthenticated, isAdmin, getAllUsers);
router.delete("/user/:id", isAuthenticated, isAdmin, deleteUser);

// Role change — Super Admin only
router.put("/user/:id/role", isAuthenticated, isSuperAdmin, updateUserRole);

// Products
router.get("/products", isAuthenticated, isAdmin, getProducts);
router.post("/products", isAuthenticated, isAdmin, addProduct);
router.put("/products/:id", isAuthenticated, isAdmin, updateProduct);
router.delete("/products/:id", isAuthenticated, isAdmin, deleteProduct);

// Reviews
router.get("/reviews", isAuthenticated, isAdmin, getAllReviews);

export default router;
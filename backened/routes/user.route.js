import express from "express";
import { register, login, updateProfile, logout } from "../controllers/authController.js";

import isAuthenticated from "../middleware/isAuthenticated.js";
import isAdmin from "../middleware/isAdmin.js";
import { addProduct, getProducts, getProductById} from "../controllers/productController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile/update", isAuthenticated, updateProfile);
router.post("/add-product", isAuthenticated, isAdmin, addProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/logout",logout)


export default router;
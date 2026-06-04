import express from "express";
const router = express.Router();

import { createReview, getProductReviews, deleteReview } from "../controllers/reviewController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";


router.post("/", isAuthenticated, createReview);


router.get("/:productId", getProductReviews);

router.delete("/:id", isAuthenticated, deleteReview);

export default router;
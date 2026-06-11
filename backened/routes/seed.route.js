import express from "express";
import { User } from "../models/user.model.js";

const router = express.Router();

// ONE-TIME route: promote a user to admin by email
// Usage: POST /api/seed/make-admin  { "email": "your@email.com" }
// DELETE this route after use in production
router.post("/make-admin", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOneAndUpdate(
            { email },
            { role: "admin" },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({
            message: `${user.fullname} is now an admin`,
            success: true,
            user,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;

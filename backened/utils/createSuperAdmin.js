import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

const createSuperAdmin = async () => {
    try {
        const existing = await User.findOne({
            email: process.env.SUPER_ADMIN_EMAIL,
        });

        if (existing) {
            // Make sure existing account always has superAdmin flags set
            if (!existing.isSuperAdmin || existing.role !== "admin") {
                existing.isSuperAdmin = true;
                existing.role = "admin";
                await existing.save();
                console.log("Super admin flags updated");
            } else {
                console.log("Super admin already exists");
            }
            return;
        }

        const hashedPassword = await bcrypt.hash(
            process.env.SUPER_ADMIN_PASSWORD,
            10
        );

        await User.create({
            fullname: process.env.SUPER_ADMIN_NAME,
            email: process.env.SUPER_ADMIN_EMAIL,
            phoneNumber: process.env.SUPER_ADMIN_PHONE,
            password: hashedPassword,
            role: "admin",
            isSuperAdmin: true,
        });

        console.log(`Super admin created: ${process.env.SUPER_ADMIN_EMAIL}`);
    } catch (error) {
        console.error("Error creating super admin:", error.message);
    }
};

export default createSuperAdmin;

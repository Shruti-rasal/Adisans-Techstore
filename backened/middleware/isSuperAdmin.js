import { User } from "../models/user.model.js";

const isSuperAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.id);

        if (!user || !user.isSuperAdmin) {
            return res.status(403).json({
                message: "Super Admin access only",
                success: false,
            });
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

export default isSuperAdmin;

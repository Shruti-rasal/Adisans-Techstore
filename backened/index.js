import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import createSuperAdmin from './utils/createSuperAdmin.js';
import userRoute from "./routes/user.route.js"
import orderRoute from "./routes/order.route.js";
import adminRoute from "./routes/admin.route.js";
import reviewRoutes from "./routes/review.route.js";
import seedRoute from "./routes/seed.route.js";
dotenv.config({});

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));

const PORT = process.env.PORT;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/reviews", reviewRoutes);
app.use("/api/seed", seedRoute);

app.listen(PORT, () => {
    connectDB().then(() => createSuperAdmin());
    console.log(`server is running on port ${PORT}`);
})


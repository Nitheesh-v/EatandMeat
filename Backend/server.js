import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authroutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import withdrawalRoutes from "./src/routes/withdrawalRoutes.js";
import couponRoutes from "./src/routes/couponRoutes.js";
import express from "express";
import cookieParser from "cookie-parser";

dotenv.config();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/withdrawals", withdrawalRoutes);
app.use("/api/coupons", couponRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

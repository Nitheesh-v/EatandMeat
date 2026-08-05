import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./src/config/db.js"
import authRoutes from "./src/routes/authroutes.js"
import userRoutes from "./src/routes/userRoutes.js";
import express from "express";
import profileRoutes from "./src/routes/userRoutes.js"
import testRoutes from "./src/routes/testRoutes.js"
import cookieParser from "cookie-parser";
import orderRoutes from "./src/routes/orderRoutes.js"



app.use(express.json());
app.use(cookieParser());
dotenv.config();

connectDB();





app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);


app.use("/api/test", testRoutes);

app.use("/api/orders", orderRoutes);






const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
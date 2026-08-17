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
import notificationRoutes from "./src/routes/notificationRoutes.js";
import supportRoutes from "./src/routes/supportRoutes.js";
import settingsRoutes from "./src/routes/settingsRoutes.js";
import express from "express";
import cookieParser from "cookie-parser";
import User from "./src/models/User.js";
import Category from "./src/models/Category.js";
import Product from "./src/models/Product.js";
import Coupon from "./src/models/Coupon.js";

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
app.use("/api/notifications", notificationRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/settings", settingsRoutes);

// ──────────────────────────────────────────────
// Seed endpoint — call once to populate DB
// POST /api/seed
// ──────────────────────────────────────────────
app.post("/api/seed", async (req, res) => {
  try {
    const { secret } = req.body;
    if (secret !== "eatandmeat-seed-2026") {
      return res.status(403).json({ success: false, message: "Invalid seed secret" });
    }

    // Clear
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Coupon.deleteMany({});

    // Admin user
    const admin = await User.create({
      fullName: "Admin", email: "admin@eatandmeat.com",
      phone: "9000000000", password: "admin123", role: "admin",
    });

    // Categories
    const cats = await Category.create([
      { name: "Fresh Chicken", description: "Farm-fresh chicken products", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=900&q=80", displayOrder: 1 },
      { name: "Masalas", description: "Authentic spice blends", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&q=80", displayOrder: 2 },
      { name: "Combos", description: "Value combo packs", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&q=80", displayOrder: 3 },
    ]);
    const chickenCat = cats.find((c) => c.name === "Fresh Chicken");
    const masalaCat = cats.find((c) => c.name === "Masalas");
    const comboCat = cats.find((c) => c.name === "Combos");

    // Products
    await Product.create([
      { name: "Chicken Curry Cut", description: "Fresh curry cut without skin", category: chickenCat._id, categoryName: "Fresh Chicken", basePrice: 250, sellingPrice: 220, discount: 12, unit: "500g", weight: "500 g", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&q=80", stock: 50, sku: "CHK-CUR-500", isFeatured: true },
      { name: "Chicken Breast Boneless", description: "Premium boneless breast", category: chickenCat._id, categoryName: "Fresh Chicken", basePrice: 310, sellingPrice: 280, discount: 10, unit: "500g", weight: "500 g", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80", stock: 40, sku: "CHK-BST-500", isFeatured: true },
      { name: "Chicken Boneless Cubes", description: "Boneless cubes for curries", category: chickenCat._id, categoryName: "Fresh Chicken", basePrice: 350, sellingPrice: 320, discount: 9, unit: "500g", weight: "500 g", image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&q=80", stock: 35, sku: "CHK-BNL-500" },
      { name: "Chicken Wings", description: "Meaty wings with skin", category: chickenCat._id, categoryName: "Fresh Chicken", basePrice: 210, sellingPrice: 190, discount: 10, unit: "500g", weight: "500 g", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=80", stock: 30, sku: "CHK-WNG-500" },
      { name: "Chicken Drumsticks", description: "Lower quarter leg cut", category: chickenCat._id, categoryName: "Fresh Chicken", basePrice: 260, sellingPrice: 240, discount: 8, unit: "500g", weight: "500 g", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&q=80", stock: 25, sku: "CHK-DRM-500" },
      { name: "Chicken Fry Masala", description: "Kongu region recipe mix", category: masalaCat._id, categoryName: "Masalas", basePrice: 140, sellingPrice: 120, discount: 14, unit: "pack", weight: "100 g", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80", stock: 8, sku: "MSL-FRY-100", isFeatured: true },
      { name: "Chicken 65 Masala", description: "Restaurant style chicken 65", category: masalaCat._id, categoryName: "Masalas", basePrice: 160, sellingPrice: 140, discount: 13, unit: "pack", weight: "100 g", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", stock: 3, sku: "MSL-65-100" },
      { name: "Biryani Cut + Liver Combo", description: "Biryani cut with liver", category: comboCat._id, categoryName: "Combos", basePrice: 290, sellingPrice: 260, discount: 10, unit: "pack", weight: "500 g", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80", stock: 0, sku: "CMB-BIR-500" },
    ]);

    // Coupons
    await Coupon.create([
      { code: "WELCOME50", description: "₹50 off on first order", discountType: "flat", discountValue: 50, minOrderAmount: 299, usageLimit: 100, expiresAt: new Date("2026-12-31") },
      { code: "SAVE10", description: "10% off up to ₹100", discountType: "percentage", discountValue: 10, minOrderAmount: 499, maxDiscount: 100, expiresAt: new Date("2026-12-31") },
    ]);

    res.json({
      success: true,
      message: "Database seeded successfully!",
      admin: { email: "admin@eatandmeat.com", password: "admin123" },
    });
  } catch (error) {
    console.error("Seed Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import Coupon from "./models/Coupon.js";

await connectDB();

// ──────────────────────────────────────────────
// Clear existing data
// ──────────────────────────────────────────────
await User.deleteMany({});
await Category.deleteMany({});
await Product.deleteMany({});
await Order.deleteMany({});
await Coupon.deleteMany({});

console.log("Old data cleared");

// ──────────────────────────────────────────────
// Seed Admin User ONLY
// ──────────────────────────────────────────────
const adminUser = await User.create({
  fullName: "Admin",
  email: "admin@eatandmeat.com",
  phone: "9000000000",
  password: "admin123",
  role: "admin",
});

console.log("Admin user seeded");

// ──────────────────────────────────────────────
// Seed Categories
// ──────────────────────────────────────────────
const categories = await Category.create([
  {
    name: "Fresh Chicken",
    description: "Farm-fresh, hygienically processed chicken products",
    image:
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=900&q=80",
    displayOrder: 1,
  },
  {
    name: "Masalas",
    description: "Authentic spice blends for your chicken recipes",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&q=80",
    displayOrder: 2,
  },
  {
    name: "Combos",
    description: "Value combo packs for family meals",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&q=80",
    displayOrder: 3,
  },
]);

const chickenCat = categories.find((c) => c.name === "Fresh Chicken");
const masalaCat = categories.find((c) => c.name === "Masalas");
const comboCat = categories.find((c) => c.name === "Combos");

console.log(`${categories.length} categories seeded`);

// ──────────────────────────────────────────────
// Seed Products
// ──────────────────────────────────────────────
const products = await Product.create([
  {
    name: "Chicken Curry Cut",
    description:
      "Our chicken curry cut without skin is a healthy alternative. A great source of lean, low-fat protein bursting with flavour.",
    category: chickenCat._id,
    categoryName: "Fresh Chicken",
    basePrice: 250,
    sellingPrice: 220,
    discount: 12,
    unit: "500g",
    weight: "500 g",
    image:
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&q=80",
    ],
    stock: 50,
    lowStockThreshold: 10,
    sku: "CHK-CUR-500",
    isFeatured: true,
  },
  {
    name: "Chicken Breast Boneless",
    description:
      "One of the most popular and versatile parts. Trimmed with no bone or skin. Excellent source of lean protein.",
    category: chickenCat._id,
    categoryName: "Fresh Chicken",
    basePrice: 310,
    sellingPrice: 280,
    discount: 10,
    unit: "500g",
    weight: "500 g",
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80",
    ],
    stock: 40,
    lowStockThreshold: 10,
    sku: "CHK-BST-500",
    isFeatured: true,
  },
  {
    name: "Chicken Boneless Cubes",
    description:
      "Fresh pack of boneless buttery chicken pieces cut in cubes. Perfect for absorbing masalas.",
    category: chickenCat._id,
    categoryName: "Fresh Chicken",
    basePrice: 350,
    sellingPrice: 320,
    discount: 9,
    unit: "500g",
    weight: "500 g",
    image:
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&q=80",
    ],
    stock: 35,
    lowStockThreshold: 10,
    sku: "CHK-BNL-500",
  },
  {
    name: "Chicken Wings",
    description:
      "A mix of meaty and bone-in cut. Succulent and flavourful pieces with skin.",
    category: chickenCat._id,
    categoryName: "Fresh Chicken",
    basePrice: 210,
    sellingPrice: 190,
    discount: 10,
    unit: "500g",
    weight: "500 g",
    image:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=80",
    ],
    stock: 30,
    lowStockThreshold: 10,
    sku: "CHK-WNG-500",
  },
  {
    name: "Chicken Drumsticks",
    description:
      "The lower quarter of the chicken leg, meticulously cut for even cooking.",
    category: chickenCat._id,
    categoryName: "Fresh Chicken",
    basePrice: 260,
    sellingPrice: 240,
    discount: 8,
    unit: "500g",
    weight: "500 g",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&q=80",
    ],
    stock: 25,
    lowStockThreshold: 10,
    sku: "CHK-DRM-500",
  },
  {
    name: "Chicken Fry Masala",
    description:
      "Thillais Easy Pallipalayam Mix — legendary chicken recipe from the Kongu region in a single serve pack.",
    category: masalaCat._id,
    categoryName: "Masalas",
    basePrice: 140,
    sellingPrice: 120,
    discount: 14,
    unit: "pack",
    weight: "100 g",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
    ],
    stock: 8,
    lowStockThreshold: 10,
    sku: "MSL-FRY-100",
    isFeatured: true,
  },
  {
    name: "Chicken 65 Masala",
    description:
      "Make restaurant-style chicken 65 at home. Single serve pack with all ingredients included.",
    category: masalaCat._id,
    categoryName: "Masalas",
    basePrice: 160,
    sellingPrice: 140,
    discount: 13,
    unit: "pack",
    weight: "100 g",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    ],
    stock: 3,
    lowStockThreshold: 10,
    sku: "MSL-65-100",
  },
  {
    name: "Biryani Cut + Chicken Liver Combo",
    description:
      "Biryani cut skin off + chicken liver combo for your favourite biryani and fry recipes.",
    category: comboCat._id,
    categoryName: "Combos",
    basePrice: 290,
    sellingPrice: 260,
    discount: 10,
    unit: "pack",
    weight: "500 g",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
    ],
    stock: 0,
    lowStockThreshold: 10,
    sku: "CMB-BIR-500",
  },
]);

console.log(`${products.length} products seeded`);

// ──────────────────────────────────────────────
// Seed Coupons
// ──────────────────────────────────────────────
const coupons = await Coupon.create([
  {
    code: "WELCOME50",
    description: "₹50 off on your first order",
    discountType: "flat",
    discountValue: 50,
    minOrderAmount: 299,
    usageLimit: 100,
    isActive: true,
    expiresAt: new Date("2026-12-31"),
  },
  {
    code: "SAVE10",
    description: "10% off up to ₹100",
    discountType: "percentage",
    discountValue: 10,
    minOrderAmount: 499,
    maxDiscount: 100,
    usageLimit: 0,
    isActive: true,
    expiresAt: new Date("2026-12-31"),
  },
  {
    code: "FRESH20",
    description: "Flat ₹20 off on orders above ₹199",
    discountType: "flat",
    discountValue: 20,
    minOrderAmount: 199,
    usageLimit: 200,
    isActive: true,
    expiresAt: new Date("2026-12-31"),
  },
]);

console.log(`${coupons.length} coupons seeded`);

console.log("\n═══════════════════════════════════════════");
console.log("  SEED COMPLETE");
console.log("═══════════════════════════════════════════");
console.log("  Admin : admin@eatandmeat.com / admin123");
console.log("");
console.log("  No customer/company/delivery users seeded.");
console.log("  Register them from the app.");
console.log("═══════════════════════════════════════════\n");

process.exit(0);

import express from "express";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import protect from "../middleware/protect.js";
import { authorize } from "../middleware/roleModdleware.js";

const router = express.Router();

// ──────────────────────────────────────────────
// Public: Get all active categories
// ──────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort(
      "displayOrder"
    );

    // Attach product count to each category
    const result = await Promise.all(
      categories.map(async (cat) => {
        const productCount = await Product.countDocuments({
          category: cat._id,
          isActive: true,
        });
        return { ...cat.toObject(), productCount };
      })
    );

    res.status(200).json({
      success: true,
      count: result.length,
      categories: result,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Public: Get single category by ID
// ──────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, category });
  } catch (error) {
    console.error("Get Category Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Admin: Create category
// ──────────────────────────────────────────────
router.post(
  "/",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const { name, description, image, isActive, displayOrder } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ success: false, message: "Category name is required" });
      }

      const existing = await Category.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") },
      });

      if (existing) {
        return res
          .status(400)
          .json({ success: false, message: "Category already exists" });
      }

      const category = await Category.create({
        name,
        description,
        image,
        isActive,
        displayOrder,
      });

      res.status(201).json({
        success: true,
        message: "Category created",
        category,
      });
    } catch (error) {
      console.error("Create Category Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// ──────────────────────────────────────────────
// Admin: Update category
// ──────────────────────────────────────────────
router.put(
  "/:id",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      const fields = [
        "name",
        "description",
        "image",
        "isActive",
        "displayOrder",
      ];

      fields.forEach((field) => {
        if (req.body[field] !== undefined) {
          category[field] = req.body[field];
        }
      });

      await category.save();

      // Update categoryName snapshot on all products in this category
      if (req.body.name && req.body.name !== category.name) {
        await Product.updateMany(
          { category: category._id },
          { $set: { categoryName: category.name } }
        );
      }

      res.status(200).json({
        success: true,
        message: "Category updated",
        category,
      });
    } catch (error) {
      console.error("Update Category Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// ──────────────────────────────────────────────
// Admin: Delete category
// ──────────────────────────────────────────────
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      // Check if products exist in this category
      const productCount = await Product.countDocuments({
        category: category._id,
      });

      if (productCount > 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete. ${productCount} products are in this category. Reassign them first.`,
        });
      }

      await Category.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Category deleted",
      });
    } catch (error) {
      console.error("Delete Category Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

export default router;

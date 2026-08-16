import express from "express";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import protect from "../middleware/protect.js";
import { authorize } from "../middleware/roleModdleware.js";

const router = express.Router();

// ──────────────────────────────────────────────
// Public: Get all active products
// ──────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const { category, search, sort, featured } = req.query;

    const filter = { isActive: true };

    if (category && category !== "All") {
      // Try to find category by name first, then by ID
      const catDoc = await Category.findOne({
        name: { $regex: new RegExp(`^${category}$`, "i") },
      });
      if (catDoc) {
        filter.category = catDoc._id;
      } else {
        filter.category = category;
      }
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { sellingPrice: 1 };
    if (sort === "price_desc") sortOption = { sellingPrice: -1 };
    if (sort === "name") sortOption = { name: 1 };
    if (sort === "newest") sortOption = { createdAt: -1 };

    const products = await Product.find(filter)
      .populate("category", "name")
      .sort(sortOption);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Public: Get single product by ID
// ──────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name description"
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Get Product Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Admin: Get all products (including inactive)
// ──────────────────────────────────────────────
router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const { category, search, stock } = req.query;

      const filter = {};

      if (category) {
        filter.category = category;
      }

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { sku: { $regex: search, $options: "i" } },
        ];
      }

      if (stock === "out") {
        filter.stock = 0;
      } else if (stock === "low") {
        filter.stock = { $gt: 0, $lte: 10 };
      } else if (stock === "in") {
        filter.stock = { $gt: 10 };
      }

      const products = await Product.find(filter)
        .populate("category", "name")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        count: products.length,
        products,
      });
    } catch (error) {
      console.error("Admin Get Products Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// ──────────────────────────────────────────────
// Admin: Create product
// ──────────────────────────────────────────────
router.post(
  "/",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const {
        name,
        description,
        category,
        basePrice,
        sellingPrice,
        discount,
        unit,
        weight,
        images,
        image,
        stock,
        lowStockThreshold,
        minOrderQty,
        maxOrderQty,
        sku,
        isFeatured,
      } = req.body;

      if (!name || !basePrice || !sellingPrice || !category) {
        return res.status(400).json({
          success: false,
          message: "Name, category, base price and selling price are required",
        });
      }

      // Get category name for snapshot
      const catDoc = await Category.findById(category);
      if (!catDoc) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category" });
      }

      const product = await Product.create({
        name,
        description,
        category,
        categoryName: catDoc.name,
        basePrice,
        sellingPrice,
        discount: discount || 0,
        unit: unit || "500g",
        weight,
        images: images || [],
        image: image || (images && images[0]) || "",
        stock: stock || 0,
        lowStockThreshold: lowStockThreshold || 10,
        minOrderQty: minOrderQty || 1,
        maxOrderQty: maxOrderQty || 50,
        sku,
        isFeatured: isFeatured || false,
      });

      res.status(201).json({
        success: true,
        message: "Product created",
        product,
      });
    } catch (error) {
      console.error("Create Product Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// ──────────────────────────────────────────────
// Admin: Update product
// ──────────────────────────────────────────────
router.put(
  "/:id",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      const fields = [
        "name",
        "description",
        "basePrice",
        "sellingPrice",
        "discount",
        "unit",
        "weight",
        "images",
        "image",
        "stock",
        "lowStockThreshold",
        "minOrderQty",
        "maxOrderQty",
        "sku",
        "isFeatured",
        "isActive",
      ];

      fields.forEach((field) => {
        if (req.body[field] !== undefined) {
          product[field] = req.body[field];
        }
      });

      // If category changed, update categoryName snapshot
      if (req.body.category) {
        const catDoc = await Category.findById(req.body.category);
        if (catDoc) {
          product.category = catDoc._id;
          product.categoryName = catDoc.name;
        }
      }

      await product.save();

      res.status(200).json({
        success: true,
        message: "Product updated",
        product,
      });
    } catch (error) {
      console.error("Update Product Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// ──────────────────────────────────────────────
// Admin: Delete product
// ──────────────────────────────────────────────
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      await Product.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Product deleted",
      });
    } catch (error) {
      console.error("Delete Product Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

export default router;

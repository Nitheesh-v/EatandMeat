import express from "express";
import Coupon from "../models/Coupon.js";
import protect from "../middleware/protect.js";
import { authorize } from "../middleware/roleModdleware.js";

const router = express.Router();

// ──────────────────────────────────────────────
// Public/Customer: Validate & apply coupon
// ──────────────────────────────────────────────
router.post("/apply", protect, async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a coupon code" });
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid coupon code" });
    }

    // Check expiry
    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon has expired" });
    }

    // Check usage limit
    if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon usage limit reached" });
    }

    // Check minimum order
    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ₹${coupon.minOrderAmount}`,
      });
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = Math.round((orderAmount * coupon.discountValue) / 100);
      if (coupon.maxDiscount > 0) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    } else {
      discount = coupon.discountValue;
    }

    discount = Math.min(discount, orderAmount);

    res.status(200).json({
      success: true,
      message: `Coupon applied! You save ₹${discount}`,
      discount,
      couponCode: coupon.code,
      description: coupon.description,
    });
  } catch (error) {
    console.error("Apply Coupon Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Admin: Get all coupons
// ──────────────────────────────────────────────
router.get(
  "/",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const coupons = await Coupon.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, coupons });
    } catch (error) {
      console.error("Get Coupons Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// ──────────────────────────────────────────────
// Admin: Create coupon
// ──────────────────────────────────────────────
router.post(
  "/",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const {
        code,
        description,
        discountType,
        discountValue,
        minOrderAmount,
        maxDiscount,
        usageLimit,
        expiresAt,
      } = req.body;

      if (!code || !discountValue) {
        return res.status(400).json({
          success: false,
          message: "Code and discount value are required",
        });
      }

      const existing = await Coupon.findOne({
        code: code.toUpperCase(),
      });

      if (existing) {
        return res
          .status(400)
          .json({ success: false, message: "Coupon code already exists" });
      }

      const coupon = await Coupon.create({
        code: code.toUpperCase(),
        description,
        discountType,
        discountValue,
        minOrderAmount,
        maxDiscount,
        usageLimit,
        expiresAt,
      });

      res.status(201).json({
        success: true,
        message: "Coupon created",
        coupon,
      });
    } catch (error) {
      console.error("Create Coupon Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// ──────────────────────────────────────────────
// Admin: Update coupon
// ──────────────────────────────────────────────
router.put(
  "/:id",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const coupon = await Coupon.findById(req.params.id);

      if (!coupon) {
        return res
          .status(404)
          .json({ success: false, message: "Coupon not found" });
      }

      const fields = [
        "description",
        "discountType",
        "discountValue",
        "minOrderAmount",
        "maxDiscount",
        "usageLimit",
        "isActive",
        "expiresAt",
      ];

      fields.forEach((field) => {
        if (req.body[field] !== undefined) {
          coupon[field] = req.body[field];
        }
      });

      await coupon.save();

      res.status(200).json({ success: true, message: "Coupon updated", coupon });
    } catch (error) {
      console.error("Update Coupon Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// ──────────────────────────────────────────────
// Admin: Delete coupon
// ──────────────────────────────────────────────
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      await Coupon.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: "Coupon deleted" });
    } catch (error) {
      console.error("Delete Coupon Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

export default router;

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleModdleware.js"

const router = express.Router();

// Any logged-in user
router.get(
  "/profile",
  protect,
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);

// Customer only
router.get(
  "/customer",
  protect,
  authorize("customer"),
  (req, res) => {
    res.json({
      message: "Customer Route",
    });
  }
);

// Company only
router.get(
  "/company",
  protect,
  authorize("company"),
  (req, res) => {
    res.json({
      message: "Company Route",
    });
  }
);

// Delivery only
router.get(
  "/delivery",
  protect,
  authorize("delivery"),
  (req, res) => {
    res.json({
      message: "Delivery Route",
    });
  }
);

// Admin only
router.get(
  "/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Admin Route",
    });
  }
);

export default router;
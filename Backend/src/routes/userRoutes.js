import express from "express";

import { getMyProfile } from "../controllers/userController.js";
import { authorize } from "../middleware/roleModdleware.js";
import protect from "../middleware/protect.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({ success: true, message: "Protected Route", user: req.user });
});

// Company: Get all delivery partners (with stats)
router.get(
  "/delivery-partners",
  protect,
  authorize("company", "admin"),
  async (req, res) => {
    try {
      const partners = await User.find({ role: "delivery" })
        .select("-password")
        .sort({ createdAt: -1 });

      const result = await Promise.all(
        partners.map(async (partner) => {
          const totalDeliveries = await Order.countDocuments({
            deliveryPartner: partner._id,
          });
          const completedDeliveries = await Order.countDocuments({
            deliveryPartner: partner._id,
            orderStatus: "Delivered",
          });
          const activeDeliveries = await Order.countDocuments({
            deliveryPartner: partner._id,
            orderStatus: { $in: ["Assigned", "Picked Up", "Out For Delivery"] },
          });

          return {
            ...partner.toObject(),
            totalDeliveries,
            completedDeliveries,
            activeDeliveries,
          };
        })
      );

      res.status(200).json({
        success: true,
        count: result.length,
        deliveryPartners: result,
      });
    } catch (error) {
      console.error("Get Delivery Partners Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

router.get(
  "/company-dashboard",
  protect,
  authorize("company"),
  (req, res) => {
    res.json({ message: "Welcome Company" });
  }
);

router.get(
  "/delivery-dashboard",
  protect,
  authorize("delivery"),
  (req, res) => {
    res.json({ message: "Welcome Delivery Partner" });
  }
);

router.get(
  "/admin-dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

export default router;
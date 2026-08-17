import express from "express";

import {
  createOrder,
  getMyOrders,
  getPendingOrders,
  acceptOrder,
  preparingOrder,
  packedOrder,
  getCompanyOrders,
  getAvailableOrders,
  acceptDelivery,
  getMyDeliveries,
  deliveredOrder,
  pickupOrder,
  outForDelivery,
  getDeliveryStats,
  getDeliveryEarnings,
  getDeliveryOrderDetail,
  getDeliveryHistory,
  getDeliveryOrderById,
} from "../controllers/orderController.js";
import protect from "../middleware/protect.js";
import { authorize } from "../middleware/roleModdleware.js";

const router = express.Router();

// Customer: Create order
router.post("/", protect, createOrder);

// Customer: My orders
router.get("/my-orders", protect, getMyOrders);

// Company: Pending orders
router.get(
  "/company/pending",
  protect,
  authorize("company"),
  getPendingOrders
);

// Company: Accept order
router.put(
  "/company/accept/:id",
  protect,
  authorize("company"),
  acceptOrder
);

// Company: Get all orders (with status filter)
router.get(
  "/company",
  protect,
  authorize("company"),
  getCompanyOrders
);

// Company: Mark as preparing
router.put(
  "/company/preparing/:id",
  protect,
  authorize("company"),
  preparingOrder
);

// Company: Mark as packed
router.put(
  "/company/packed/:id",
  protect,
  authorize("company"),
  packedOrder
);

// Delivery: Available orders
router.get(
  "/delivery/available",
  protect,
  authorize("delivery"),
  getAvailableOrders
);

// Delivery: Accept delivery
router.put(
  "/delivery/accept/:id",
  protect,
  authorize("delivery"),
  acceptDelivery
);

// Delivery: My deliveries
router.get(
  "/delivery/my-deliveries",
  protect,
  authorize("delivery"),
  getMyDeliveries
);

// Delivery: Pickup
router.put(
  "/delivery/pickup/:id",
  protect,
  authorize("delivery"),
  pickupOrder
);

// Delivery: Out for delivery
router.put(
  "/delivery/out-for-delivery/:id",
  protect,
  authorize("delivery"),
  outForDelivery
);

// Delivery: Delivered
router.put(
  "/delivery/delivered/:id",
  protect,
  authorize("delivery"),
  deliveredOrder
);

// Delivery: Dashboard stats
router.get(
  "/delivery/stats",
  protect,
  authorize("delivery"),
  getDeliveryStats
);

// Delivery: Earnings
router.get(
  "/delivery/earnings",
  protect,
  authorize("delivery"),
  getDeliveryEarnings
);

// Delivery: Get single order detail
router.get(
  "/delivery/order/:id",
  protect,
  authorize("delivery"),
  getDeliveryOrderById
);

// Delivery: Get delivery history
router.get(
  "/delivery/history",
  protect,
  authorize("delivery"),
  getDeliveryHistory
);

export default router;

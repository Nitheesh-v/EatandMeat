import express from "express";

import { createOrder,getMyOrders ,getPendingOrders,acceptOrder,preparingOrder,packedOrder,getCompanyOrders,
    getAvailableOrders, acceptDelivery, getMyDeliveries,deliveredOrder, pickupOrder, outForDelivery, 
} from "../controllers/orderController.js"
import protect from "../middleware/protect.js";
import {authorize} from  "../middleware/roleModdleware.js"


const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get(
  "/company/pending",
  protect,
  authorize("company"),
  getPendingOrders
);
router.put(
  "/company/accept/:id",
  protect,
  authorize("company"),
  acceptOrder
);

router.get("/company", getCompanyOrders);


router.put(
  "/company/preparing/:id",
  protect,
  authorize("company"),
  preparingOrder
);


router.put(
  "/company/packed/:id",
  protect,
  authorize("company"),
  packedOrder
);

router.get(
  "/delivery/available",
  protect,
  authorize("delivery"),
  getAvailableOrders
);

router.put(
  "/delivery/accept/:id",
  protect,
  authorize("delivery"),
  acceptDelivery
);


router.get(
  "/delivery/my-deliveries",
  protect,
  authorize("delivery"),
  getMyDeliveries
);


router.put(
  "/delivery/pickup/:id",
  protect,
  authorize("delivery"),
  pickupOrder
);


router.put(
  "/delivery/out-for-delivery/:id",
  protect,
  authorize("delivery"),
  outForDelivery
);


router.put(
  "/delivery/delivered/:id",
  protect,
  authorize("delivery"),
  deliveredOrder
);
export default router;
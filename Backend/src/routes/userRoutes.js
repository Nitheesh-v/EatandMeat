import express from "express";

import { getMyProfile } from "../controllers/userController.js";
import {authorize} from  "../middleware/roleModdleware.js"
import protect from "../middleware/protect.js";



const router = express.Router();

// Logged in user profile
// router.get("/me", protect, getMyProfile);


router.get("/profile", protect, (req, res) => {


  res.json({
    success: true,
    message: "Protected Route",
    user: req.user,
  });
});



router.get(
  "/company-dashboard",
  protect,
  authorize("company"),
  (req, res) => {
    res.json({
      message: "Welcome Company",
    });
  }
);

router.get(
  "/delivery-dashboard",
  protect,
  authorize("delivery"),
  (req, res) => {
    res.json({
      message: "Welcome Delivery Partner",
    });
  }
);

router.get(
  "/admin-dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);


export default router;
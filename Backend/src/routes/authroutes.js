import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authcontroller.js"
import protect from "../middleware/protect.js";



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get(
  "/me",
  protect,
  getCurrentUser
);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
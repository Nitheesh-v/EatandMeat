import express from "express";
import {
  registerUser,
  loginUser,logoutUser,getCurrentUser,
} from "../controllers/authcontroller.js"
import protect from "../middleware/Protect.js";



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get(
  "/me",
  protect,
  getCurrentUser
);

export default router;
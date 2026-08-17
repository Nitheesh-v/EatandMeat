import express from "express";
import Settings from "../models/Settings.js";
import protect from "../middleware/protect.js";

const router = express.Router();

// ──────────────────────────────────────────────
// Delivery Partner: Get my settings
// ──────────────────────────────────────────────
router.get("/", protect, async (req, res) => {
  try {
    let settings = await Settings.findOne({ user: req.user._id });

    // Auto-create default settings if none exist
    if (!settings) {
      settings = await Settings.create({ user: req.user._id });
    }

    res.status(200).json({ success: true, settings });
  } catch (error) {
    console.error("Get Settings Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Update notification settings
// ──────────────────────────────────────────────
router.put("/notifications", protect, async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { user: req.user._id },
      { notifications: req.body },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, message: "Notification settings updated", settings });
  } catch (error) {
    console.error("Update Notification Settings Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Update preferences
// ──────────────────────────────────────────────
router.put("/preferences", protect, async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { user: req.user._id },
      { preferences: req.body },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, message: "Preferences updated", settings });
  } catch (error) {
    console.error("Update Preferences Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Update security settings
// ──────────────────────────────────────────────
router.put("/security", protect, async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { user: req.user._id },
      { security: req.body },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, message: "Security settings updated", settings });
  } catch (error) {
    console.error("Update Security Settings Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Update delivery preferences
// ──────────────────────────────────────────────
router.put("/delivery", protect, async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { user: req.user._id },
      { delivery: req.body },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, message: "Delivery settings updated", settings });
  } catch (error) {
    console.error("Update Delivery Settings Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Change password
// ──────────────────────────────────────────────
router.put("/change-password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Both passwords are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "New password must be at least 6 characters" });
    }

    const User = (await import("../models/User.js")).default;
    const user = await User.findById(req.user._id);
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    await Settings.findOneAndUpdate(
      { user: req.user._id },
      { "security.lastPasswordChange": new Date() },
      { upsert: true }
    );

    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Delete account
// ──────────────────────────────────────────────
router.delete("/account", protect, async (req, res) => {
  try {
    const User = (await import("../models/User.js")).default;
    const Order = (await import("../models/Order.js")).default;

    // Check for active orders
    const activeOrders = await Order.countDocuments({
      deliveryPartner: req.user._id,
      orderStatus: { $in: ["Assigned", "Picked Up", "Out For Delivery"] },
    });

    if (activeOrders > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete account with active deliveries. Complete them first.",
      });
    }

    await Settings.findOneAndDelete({ user: req.user._id });
    await User.findByIdAndDelete(req.user._id);

    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete Account Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;

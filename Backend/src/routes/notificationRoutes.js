import express from "express";
import Notification from "../models/Notification.js";
import protect from "../middleware/protect.js";

const router = express.Router();

// ──────────────────────────────────────────────
// Delivery Partner: Get my notifications
// ──────────────────────────────────────────────
router.get("/", protect, async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = "false" } = req.query;

    const filter = { recipient: req.user._id };
    if (unreadOnly === "true") filter.read = false;

    const total = await Notification.countDocuments(filter);
    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate("relatedOrder", "orderNumber totalAmount");

    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      read: false,
    });

    res.status(200).json({
      success: true,
      notifications,
      unreadCount,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    console.error("Get Notifications Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Get unread count
// ──────────────────────────────────────────────
router.get("/unread-count", protect, async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      read: false,
    });

    res.status(200).json({ success: true, unreadCount });
  } catch (error) {
    console.error("Unread Count Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Mark one as read
// ──────────────────────────────────────────────
router.put("/:id/read", protect, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, notification });
  } catch (error) {
    console.error("Mark Read Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Mark all as read
// ──────────────────────────────────────────────
router.put("/read-all", protect, async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, read: false },
      { read: true }
    );

    res.status(200).json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    console.error("Mark All Read Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Delete one
// ──────────────────────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    console.error("Delete Notification Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Delete all read
// ──────────────────────────────────────────────
router.delete("/clear-read", protect, async (req, res) => {
  try {
    await Notification.deleteMany({ recipient: req.user._id, read: true });
    res.status(200).json({ success: true, message: "Read notifications cleared" });
  } catch (error) {
    console.error("Clear Read Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;

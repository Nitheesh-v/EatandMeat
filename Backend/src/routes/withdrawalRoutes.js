import express from "express";
import Withdrawal from "../models/Withdrawal.js";
import Order from "../models/Order.js";
import protect from "../middleware/protect.js";
import { authorize } from "../middleware/roleModdleware.js";

const router = express.Router();

// ──────────────────────────────────────────────
// Delivery Partner: Get wallet balance
// ──────────────────────────────────────────────
router.get(
  "/wallet",
  protect,
  authorize("delivery"),
  async (req, res) => {
    try {
      const partnerId = req.user._id;

      // Total earned (all delivered orders)
      const totalEarnedResult = await Order.aggregate([
        {
          $match: {
            deliveryPartner: partnerId,
            orderStatus: "Delivered",
          },
        },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]);
      const totalEarned =
        totalEarnedResult.length > 0 ? totalEarnedResult[0].total : 0;

      // Total withdrawn (approved/paid)
      const totalWithdrawnResult = await Withdrawal.aggregate([
        {
          $match: {
            deliveryPartner: partnerId,
            status: { $in: ["Approved", "Paid"] },
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);
      const totalWithdrawn =
        totalWithdrawnResult.length > 0 ? totalWithdrawnResult[0].total : 0;

      // Pending withdrawal amount
      const pendingWithdrawalResult = await Withdrawal.aggregate([
        {
          $match: {
            deliveryPartner: partnerId,
            status: "Pending",
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);
      const pendingWithdrawal =
        pendingWithdrawalResult.length > 0
          ? pendingWithdrawalResult[0].total
          : 0;

      const availableBalance = totalEarned - totalWithdrawn - pendingWithdrawal;

      res.status(200).json({
        success: true,
        wallet: {
          totalEarned,
          totalWithdrawn,
          pendingWithdrawal,
          availableBalance: Math.max(0, availableBalance),
        },
      });
    } catch (error) {
      console.error("Wallet Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// ──────────────────────────────────────────────
// Delivery Partner: Request withdrawal
// ──────────────────────────────────────────────
router.post(
  "/",
  protect,
  authorize("delivery"),
  async (req, res) => {
    try {
      const { amount, method, upiId, bankDetails } = req.body;
      const partnerId = req.user._id;

      if (!amount || amount < 1) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid amount" });
      }

      // Check available balance
      const totalEarnedResult = await Order.aggregate([
        {
          $match: {
            deliveryPartner: partnerId,
            orderStatus: "Delivered",
          },
        },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]);
      const totalEarned =
        totalEarnedResult.length > 0 ? totalEarnedResult[0].total : 0;

      const totalWithdrawnResult = await Withdrawal.aggregate([
        {
          $match: {
            deliveryPartner: partnerId,
            status: { $in: ["Approved", "Paid", "Pending"] },
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);
      const totalWithdrawn =
        totalWithdrawnResult.length > 0 ? totalWithdrawnResult[0].total : 0;

      const available = totalEarned - totalWithdrawn;

      if (amount > available) {
        return res.status(400).json({
          success: false,
          message: `Insufficient balance. Available: ₹${Math.max(0, available)}`,
        });
      }

      const withdrawal = await Withdrawal.create({
        deliveryPartner: partnerId,
        amount,
        method: method || "UPI",
        upiId,
        bankDetails,
      });

      res.status(201).json({
        success: true,
        message: "Withdrawal request submitted",
        withdrawal,
      });
    } catch (error) {
      console.error("Withdrawal Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// ──────────────────────────────────────────────
// Delivery Partner: Get my withdrawals
// ──────────────────────────────────────────────
router.get(
  "/my",
  protect,
  authorize("delivery"),
  async (req, res) => {
    try {
      const withdrawals = await Withdrawal.find({
        deliveryPartner: req.user._id,
      }).sort({ createdAt: -1 });

      res.status(200).json({ success: true, withdrawals });
    } catch (error) {
      console.error("My Withdrawals Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// ──────────────────────────────────────────────
// Admin: Get all withdrawal requests
// ──────────────────────────────────────────────
router.get(
  "/all",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const { status } = req.query;
      const filter = {};

      if (status) filter.status = status;

      const withdrawals = await Withdrawal.find(filter)
        .populate("deliveryPartner", "fullName phone email")
        .sort({ createdAt: -1 });

      res.status(200).json({ success: true, withdrawals });
    } catch (error) {
      console.error("Admin Withdrawals Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// ──────────────────────────────────────────────
// Admin: Approve/Reject withdrawal
// ──────────────────────────────────────────────
router.put(
  "/:id/process",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const { status, adminNote } = req.body;

      if (!["Approved", "Rejected", "Paid"].includes(status)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid status" });
      }

      const withdrawal = await Withdrawal.findById(req.params.id);

      if (!withdrawal) {
        return res
          .status(404)
          .json({ success: false, message: "Withdrawal not found" });
      }

      withdrawal.status = status;
      withdrawal.adminNote = adminNote || "";
      withdrawal.processedAt = new Date();

      await withdrawal.save();

      res.status(200).json({
        success: true,
        message: `Withdrawal ${status.toLowerCase()}`,
        withdrawal,
      });
    } catch (error) {
      console.error("Process Withdrawal Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

export default router;

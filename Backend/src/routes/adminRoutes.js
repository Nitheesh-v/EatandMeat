import express from "express";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import protect from "../middleware/protect.js";
import { authorize } from "../middleware/roleModdleware.js";

const router = express.Router();

// All admin routes require auth + admin role
router.use(protect, authorize("admin"));

// ──────────────────────────────────────────────
// Dashboard Stats
// ──────────────────────────────────────────────
router.get("/stats", async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // User counts
    const totalUsers = await User.countDocuments();
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalDeliveryPartners = await User.countDocuments({
      role: "delivery",
    });
    const totalCompanies = await User.countDocuments({ role: "company" });

    // Product counts
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.countDocuments({
      stock: { $gt: 0, $lte: 10 },
    });
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });

    // Order counts
    const totalOrders = await Order.countDocuments();
    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: startOfDay },
    });
    const pendingOrders = await Order.countDocuments({
      orderStatus: "Pending",
    });
    const acceptedOrders = await Order.countDocuments({
      orderStatus: "Accepted",
    });
    const preparingOrders = await Order.countDocuments({
      orderStatus: "Preparing",
    });
    const packedOrders = await Order.countDocuments({
      orderStatus: "Packed",
    });
    const deliveredOrders = await Order.countDocuments({
      orderStatus: "Delivered",
    });
    const cancelledOrders = await Order.countDocuments({
      orderStatus: "Cancelled",
    });

    // Revenue
    const totalRevenueResult = await Order.aggregate([
      { $match: { orderStatus: "Delivered" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue =
      totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

    const todayRevenueResult = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
          createdAt: { $gte: startOfDay },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const todayRevenue =
      todayRevenueResult.length > 0 ? todayRevenueResult[0].total : 0;

    const monthRevenueResult = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
          createdAt: { $gte: startOfMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const monthRevenue =
      monthRevenueResult.length > 0 ? monthRevenueResult[0].total : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalCustomers,
        totalDeliveryPartners,
        totalCompanies,
        totalProducts,
        lowStockProducts,
        outOfStockProducts,
        totalOrders,
        todayOrders,
        pendingOrders,
        acceptedOrders,
        preparingOrders,
        packedOrders,
        deliveredOrders,
        cancelledOrders,
        totalRevenue,
        todayRevenue,
        monthRevenue,
      },
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Users: List all
// ──────────────────────────────────────────────
router.get("/users", async (req, res) => {
  try {
    const { role, search } = req.query;

    const filter = {};

    if (role) {
      filter.role = role;
    }

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Admin Get Users Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Users: Toggle active / inactive
// ──────────────────────────────────────────────
router.put("/users/:id/toggle", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? "activated" : "deactivated"}`,
      user,
    });
  } catch (error) {
    console.error("Admin Toggle User Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Users: Delete
// ──────────────────────────────────────────────
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error("Admin Delete User Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Orders: List all (with optional status filter)
// ──────────────────────────────────────────────
router.get("/orders", async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};

    if (status) {
      filter.orderStatus = status;
    }

    const orders = await Order.find(filter)
      .populate("customer", "fullName email phone")
      .populate("deliveryPartner", "fullName phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Admin Get Orders Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Orders: Cancel order
// ──────────────────────────────────────────────
router.put("/orders/:id/cancel", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel a delivered order",
      });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled",
      order,
    });
  } catch (error) {
    console.error("Admin Cancel Order Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partners: List all
// ──────────────────────────────────────────────
router.get("/delivery-partners", async (req, res) => {
  try {
    const partners = await User.find({ role: "delivery" })
      .select("-password")
      .sort({ createdAt: -1 });

    // Attach delivery stats to each partner
    const result = await Promise.all(
      partners.map(async (partner) => {
        const totalDeliveries = await Order.countDocuments({
          deliveryPartner: partner._id,
        });
        const completedDeliveries = await Order.countDocuments({
          deliveryPartner: partner._id,
          orderStatus: "Delivered",
        });
        const cancelledDeliveries = await Order.countDocuments({
          deliveryPartner: partner._id,
          orderStatus: "Cancelled",
        });
        const activeDeliveries = await Order.countDocuments({
          deliveryPartner: partner._id,
          orderStatus: {
            $in: ["Assigned", "Picked Up", "Out For Delivery"],
          },
        });

        return {
          ...partner.toObject(),
          totalDeliveries,
          completedDeliveries,
          cancelledDeliveries,
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
    console.error("Admin Get Delivery Partners Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Customers: List all
// ──────────────────────────────────────────────
router.get("/customers", async (req, res) => {
  try {
    const { search } = req.query;

    const filter = { role: "customer" };

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const customers = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    // Attach order stats
    const result = await Promise.all(
      customers.map(async (customer) => {
        const totalOrders = await Order.countDocuments({
          customer: customer._id,
        });
        const totalSpentResult = await Order.aggregate([
          {
            $match: {
              customer: customer._id,
              orderStatus: "Delivered",
            },
          },
          { $group: { _id: null, total: { $sum: "$totalAmount" } } },
        ]);
        const totalSpent =
          totalSpentResult.length > 0 ? totalSpentResult[0].total : 0;
        const lastOrder = await Order.findOne({
          customer: customer._id,
        }).sort({ createdAt: -1 });

        return {
          ...customer.toObject(),
          totalOrders,
          totalSpent,
          lastOrderDate: lastOrder?.createdAt || null,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: result.length,
      customers: result,
    });
  } catch (error) {
    console.error("Admin Get Customers Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;

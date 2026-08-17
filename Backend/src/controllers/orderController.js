import Order from "../models/Order.js";
import User from "../models/User.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      deliveryAddress,
      paymentMethod,
      subtotal,
      deliveryCharge,
      tax,
      discount,
      couponCode,
      totalAmount,
    } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    // Generate Order Number
    const orderNumber = "ORD" + Date.now().toString().slice(-8);

    // Create Order
    const order = await Order.create({
      orderNumber,
      customer: req.user._id,
      items: items.map((item) => ({
        product: item.product || item.id || "",
        name: item.name || "Product",
        image: item.image || "",
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
      })),
      deliveryAddress: {
        fullName: deliveryAddress?.fullName || "",
        phone: deliveryAddress?.phone || "",
        address: deliveryAddress?.address || "",
        city: deliveryAddress?.city || "",
        state: deliveryAddress?.state || "",
        pincode: deliveryAddress?.pincode || "",
        latitude: deliveryAddress?.latitude || 0,
        longitude: deliveryAddress?.longitude || 0,
      },
      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentMethod === "ONLINE" ? "Paid" : "Pending",
      subtotal: Number(subtotal) || 0,
      deliveryCharge: Number(deliveryCharge) || 0,
      tax: Number(tax) || 0,
      discount: Number(discount) || 0,
      couponCode: couponCode || "",
      totalAmount: Number(totalAmount) || 0,
      placedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Order Created Successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error.message);
    console.error("Full error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
// Get Logged-in Customer Orders

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("deliveryPartner", "fullName phone")
      .populate("company", "fullName phone");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get My Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Pending Orders (Company)

export const getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      orderStatus: "Pending",
    })
      .sort({ createdAt: -1 })
      .populate("customer", "fullName phone email");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Pending Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Company Accept Order

export const acceptOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.orderStatus !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Order already processed",
      });
    }

    order.orderStatus = "Accepted";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Accepted",
      order,
    });
  } catch (error) {
    console.error("Accept Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Company - Preparing Order

export const preparingOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.orderStatus !== "Accepted") {
      return res.status(400).json({
        success: false,
        message: "Only accepted orders can be prepared",
      });
    }

    order.orderStatus = "Preparing";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order moved to Preparing",
      order,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Company - Packed Order

export const packedOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.orderStatus !== "Preparing") {
      return res.status(400).json({
        success: false,
        message: "Order is not preparing",
      });
    }

    order.orderStatus = "Packed";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Packed Successfully",
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


// Get Available Orders

export const getAvailableOrders = async (req, res) => {
  try {
    console.log("Logged in delivery partner:", req.user);

    const orders = await Order.find({
      orderStatus: "Packed",
      deliveryPartner: null,
    })
      .populate("customer", "fullName phone")
      .sort({ createdAt: -1 });
      console.log("Available Orders:", orders);

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Accept Delivery

export const acceptDelivery = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.deliveryPartner) {
      return res.status(400).json({
        success: false,
        message: "Already accepted",
      });
    }

    order.deliveryPartner = req.user._id;
    order.orderStatus = "Assigned";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Delivery Accepted",
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};



// My Deliveries

export const getMyDeliveries = async (req, res) => {

  try {

    const orders = await Order.find({
      deliveryPartner: req.user._id,
    })
      .populate("customer", "fullName phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};


export const pickupOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.orderStatus !== "Assigned") {
      return res.status(400).json({ success: false, message: "Order must be Assigned first" });
    }

    order.orderStatus = "Picked Up";
    order.pickedAt = new Date();
    await order.save();

    res.json({ success: true, message: "Order Picked Up", order });
  } catch (error) {
    console.error("Pickup Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const outForDelivery = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.orderStatus !== "Picked Up") {
      return res.status(400).json({ success: false, message: "Order must be Picked Up first" });
    }

    order.orderStatus = "Out For Delivery";
    await order.save();

    res.json({ success: true, message: "Out For Delivery", order });
  } catch (error) {
    console.error("Out For Delivery Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const deliveredOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.orderStatus !== "Out For Delivery") {
      return res.status(400).json({ success: false, message: "Order must be Out For Delivery first" });
    }

    order.orderStatus = "Delivered";
    order.deliveredAt = new Date();
    order.paymentStatus = "Paid";
    await order.save();

    res.json({ success: true, message: "Order Delivered", order });
  } catch (error) {
    console.error("Delivered Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delivery Dashboard Stats
export const getDeliveryStats = async (req, res) => {
  try {
    const partnerId = req.user._id;

    const availableCount = await Order.countDocuments({
      orderStatus: "Packed",
      deliveryPartner: null,
    });

    const activeCount = await Order.countDocuments({
      deliveryPartner: partnerId,
      orderStatus: { $in: ["Assigned", "Picked Up", "Out For Delivery"] },
    });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayDelivered = await Order.countDocuments({
      deliveryPartner: partnerId,
      orderStatus: "Delivered",
      deliveredAt: { $gte: todayStart },
    });

    const todayEarningsResult = await Order.aggregate([
      {
        $match: {
          deliveryPartner: partnerId,
          orderStatus: "Delivered",
          deliveredAt: { $gte: todayStart },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const todayEarnings =
      todayEarningsResult.length > 0 ? todayEarningsResult[0].total : 0;

    const totalDelivered = await Order.countDocuments({
      deliveryPartner: partnerId,
      orderStatus: "Delivered",
    });

    const recentDeliveries = await Order.find({
      deliveryPartner: partnerId,
      orderStatus: "Delivered",
    })
      .populate("customer", "fullName phone")
      .sort({ deliveredAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        availableOrders: availableCount,
        activeDeliveries: activeCount,
        todayDelivered,
        todayEarnings,
        totalDelivered,
      },
      recentDeliveries,
    });
  } catch (error) {
    console.error("Delivery Stats Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delivery Earnings
export const getDeliveryEarnings = async (req, res) => {
  try {
    const partnerId = req.user._id;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const getEarnings = async (startDate) => {
      const result = await Order.aggregate([
        {
          $match: {
            deliveryPartner: partnerId,
            orderStatus: "Delivered",
            ...(startDate ? { deliveredAt: { $gte: startDate } } : {}),
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" },
            count: { $sum: 1 },
          },
        },
      ]);
      return result.length > 0
        ? { amount: result[0].total, orders: result[0].count }
        : { amount: 0, orders: 0 };
    };

    const [today, week, month, allTime] = await Promise.all([
      getEarnings(todayStart),
      getEarnings(weekStart),
      getEarnings(monthStart),
      getEarnings(null),
    ]);

    // Recent deliveries for settlement history
    const recentOrders = await Order.find({
      deliveryPartner: partnerId,
      orderStatus: "Delivered",
    })
      .sort({ deliveredAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      earnings: { today, week, month, allTime },
      recentOrders,
    });
  } catch (error) {
    console.error("Delivery Earnings Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCompanyOrders = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};

    if (status) {
      filter.orderStatus = status;
    }

    const orders = await Order.find(filter)
      .populate("customer", "fullName phone email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ──────────────────────────────────────────────
// Delivery: Get single order detail
// ──────────────────────────────────────────────
export const getDeliveryOrderDetail = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      deliveryPartner: req.user._id,
    })
      .populate("customer", "fullName phone email")
      .populate("company", "fullName phone");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Delivery Order Detail Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ──────────────────────────────────────────────
// Delivery: Get delivery history (with pagination & filters)
// ──────────────────────────────────────────────
export const getDeliveryHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, from, to } = req.query;

    const filter = {
      deliveryPartner: req.user._id,
    };

    if (status) {
      filter.orderStatus = status;
    }

    if (from || to) {
      filter.deliveredAt = {};
      if (from) filter.deliveredAt.$gte = new Date(from);
      if (to) filter.deliveredAt.$lte = new Date(to);
    }

    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .populate("customer", "fullName phone")
      .sort({ deliveredAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    // Summary stats for the filtered period
    const summaryResult = await Order.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalEarnings: { $sum: "$totalAmount" },
          avgOrderValue: { $avg: "$totalAmount" },
        },
      },
    ]);

    const summary =
      summaryResult.length > 0
        ? summaryResult[0]
        : { totalOrders: 0, totalEarnings: 0, avgOrderValue: 0 };

    // Remove the _id from summary
    delete summary._id;

    res.status(200).json({
      success: true,
      orders,
      summary,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    console.error("Delivery History Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ──────────────────────────────────────────────
// Delivery: Get single order detail for delivery
// ──────────────────────────────────────────────
export const getDeliveryOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      deliveryPartner: req.user._id,
    })
      .populate("customer", "fullName phone email")
      .populate("company", "fullName phone");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Delivery Order Detail Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
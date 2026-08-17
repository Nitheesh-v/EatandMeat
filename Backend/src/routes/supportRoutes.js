import express from "express";
import Support from "../models/Support.js";
import protect from "../middleware/protect.js";

const router = express.Router();

// ──────────────────────────────────────────────
// Delivery Partner: Create support ticket
// ──────────────────────────────────────────────
router.post("/", protect, async (req, res) => {
  try {
    const { subject, category, description, orderId, priority } = req.body;

    if (!subject || !description) {
      return res.status(400).json({ success: false, message: "Subject and description are required" });
    }

    const ticket = await Support.create({
      user: req.user._id,
      userRole: req.user.role,
      subject,
      category: category || "other",
      description,
      orderId: orderId || null,
      priority: priority || "medium",
    });

    res.status(201).json({ success: true, message: "Support ticket created", ticket });
  } catch (error) {
    console.error("Create Support Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Get my tickets
// ──────────────────────────────────────────────
router.get("/my-tickets", protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filter = { user: req.user._id };
    if (status) filter.status = status;

    const total = await Support.countDocuments(filter);
    const tickets = await Support.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate("orderId", "orderNumber totalAmount");

    res.status(200).json({
      success: true,
      tickets,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    console.error("Get My Tickets Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Get single ticket
// ──────────────────────────────────────────────
router.get("/:id", protect, async (req, res) => {
  try {
    const ticket = await Support.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("orderId", "orderNumber totalAmount");

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    res.status(200).json({ success: true, ticket });
  } catch (error) {
    console.error("Get Ticket Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Reply to ticket
// ──────────────────────────────────────────────
router.post("/:id/reply", protect, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const ticket = await Support.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    ticket.replies.push({ sender: "user", message });
    await ticket.save();

    res.status(200).json({ success: true, ticket });
  } catch (error) {
    console.error("Reply Ticket Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Close ticket
// ──────────────────────────────────────────────
router.put("/:id/close", protect, async (req, res) => {
  try {
    const ticket = await Support.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: "closed" },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    res.status(200).json({ success: true, ticket });
  } catch (error) {
    console.error("Close Ticket Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ──────────────────────────────────────────────
// Delivery Partner: Get FAQ / help content
// ──────────────────────────────────────────────
router.get("/faq/list", protect, async (req, res) => {
  try {
    const faqs = [
      {
        question: "How do I accept a delivery order?",
        answer: "Go to 'Available Orders' in your dashboard. You will see pending orders nearby. Click 'Accept Order' to take a delivery. Once accepted, the order will appear in 'My Deliveries'.",
        category: "deliveries",
      },
      {
        question: "How does the payout work?",
        answer: "Your earnings are calculated from completed deliveries. Go to 'Wallet & Withdraw' to see your balance. You can withdraw via UPI or Bank Transfer. Withdrawals are processed within 2-3 business days.",
        category: "payments",
      },
      {
        question: "What happens if a customer is unavailable?",
        answer: "If the customer is unreachable after 2 attempts, contact support through the Support tab. The order will be marked for return and your earnings for that delivery will still be credited.",
        category: "deliveries",
      },
      {
        question: "How do I update my profile or documents?",
        answer: "Go to 'Profile' in the sidebar. You can edit your personal information, update vehicle details, and upload new KYC documents.",
        category: "account",
      },
      {
        question: "What is the delivery range?",
        answer: "By default, you will receive orders within a 15 km radius. You can adjust this in Settings under Delivery Preferences.",
        category: "settings",
      },
      {
        question: "How do I go offline?",
        answer: "Use the Online/Offline toggle in the top navigation bar. When offline, you won't receive new order assignments.",
        category: "settings",
      },
    ];

    res.status(200).json({ success: true, faqs });
  } catch (error) {
    console.error("FAQ Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;

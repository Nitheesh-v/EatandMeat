import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
  {
    deliveryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    method: {
      type: String,
      enum: ["UPI", "Bank Transfer"],
      default: "UPI",
    },

    upiId: {
      type: String,
      default: "",
    },

    bankDetails: {
      accountNumber: { type: String, default: "" },
      ifscCode: { type: String, default: "" },
      bankName: { type: String, default: "" },
      accountHolder: { type: String, default: "" },
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Paid"],
      default: "Pending",
    },

    adminNote: {
      type: String,
      default: "",
    },

    processedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Withdrawal", withdrawalSchema);

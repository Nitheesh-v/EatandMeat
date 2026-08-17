import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    notifications: {
      orderUpdates: { type: Boolean, default: true },
      newOrders: { type: Boolean, default: true },
      paymentAlerts: { type: Boolean, default: true },
      promotions: { type: Boolean, default: false },
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    preferences: {
      language: { type: String, default: "en" },
      theme: { type: String, enum: ["light", "dark", "system"], default: "light" },
      distanceUnit: { type: String, enum: ["km", "mi"], default: "km" },
      autoAcceptOrders: { type: Boolean, default: false },
    },
    security: {
      twoFactorEnabled: { type: Boolean, default: false },
      lastPasswordChange: { type: Date, default: null },
      loginAlerts: { type: Boolean, default: true },
    },
    delivery: {
      autoOfflineHours: { type: Number, default: 8 },
      maxDeliveryDistance: { type: Number, default: 15 },
    },
  },
  {
    timestamps: true,
  }
);

settingsSchema.index({ user: 1 });

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;

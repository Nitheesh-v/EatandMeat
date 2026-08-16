import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.Mixed,
    default: "",
  },

  name: String,

  image: String,

  quantity: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

const addressSchema = new mongoose.Schema({
  fullName: String,

  phone: String,

  address: String,

  city: String,

  state: String,

  pincode: String,

  latitude: Number,

  longitude: Number,
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    deliveryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    items: [orderItemSchema],

    deliveryAddress: addressSchema,

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Preparing",
        "Packed",
        "Assigned",
        "Picked Up",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    subtotal: Number,

    deliveryCharge: Number,

    tax: Number,

    totalAmount: Number,

    couponCode: {
      type: String,
      default: "",
    },

    discount: {
      type: Number,
      default: 0,
    },

    placedAt: Date,

    acceptedAt: Date,

    packedAt: Date,

    pickedAt: Date,

    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);

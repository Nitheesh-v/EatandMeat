import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // For backward compatibility — stores category name snapshot
    categoryName: {
      type: String,
      default: "",
    },

    basePrice: {
      type: Number,
      required: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    unit: {
      type: String,
      enum: ["kg", "g", "500g", "250g", "piece", "pack", "box"],
      default: "500g",
    },

    weight: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    // Single image for backward compatibility
    image: {
      type: String,
      default: "",
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 10,
    },

    minOrderQty: {
      type: Number,
      default: 1,
    },

    maxOrderQty: {
      type: Number,
      default: 50,
    },

    sku: {
      type: String,
      default: "",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual: stock status
productSchema.virtual("stockStatus").get(function () {
  if (this.stock <= 0) return "Out of Stock";
  if (this.stock <= this.lowStockThreshold) return "Low Stock";
  return "In Stock";
});

// Ensure virtuals are included in JSON
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

const Product = mongoose.model("Product", productSchema);

export default Product;

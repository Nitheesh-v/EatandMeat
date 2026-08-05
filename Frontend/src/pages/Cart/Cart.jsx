import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { ShoppingCart, Trash2, ArrowRight, Package, Minus, Plus, Flame, IndianRupee, Truck, Tag } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  const [removingId, setRemovingId] = useState(null);

  const deliveryCharge = cartItems.length > 0 ? 40 : 0;
  const grandTotal = totalPrice + deliveryCharge;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 300);
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <section
        className="relative overflow-hidden flex items-center justify-center min-h-screen px-4"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)",
        }}
      >
        {/* Background glows */}
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(212,33,60,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            bottom: "10%",
            right: "10%",
            background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 max-w-lg mx-auto text-center px-4">
          {/* Animated empty cart icon */}
          <div
            className="inline-flex items-center justify-center rounded-3xl mb-8"
            style={{
              width: "clamp(100px, 25vw, 140px)",
              height: "clamp(100px, 25vw, 140px)",
              background: "linear-gradient(135deg, rgba(212,33,60,0.1), rgba(212,175,55,0.05))",
              border: "1px solid rgba(212,33,60,0.2)",
              animation: "fadeSlideUp 0.6s ease both",
            }}
          >
            <ShoppingCart
              size={56}
              style={{ color: "rgba(212,33,60,0.8)" }}
            />
          </div>

          <h1
            className="font-extrabold tracking-tight leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              background: "linear-gradient(135deg, #ffffff 0%, #e0d0d0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "fadeSlideUp 0.6s ease 0.1s both",
            }}
          >
            Your Cart is{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #d4213c, #ff6b35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Empty
            </span>
          </h1>

          <p
            className="mt-4 text-base max-w-md mx-auto"
            style={{
              color: "rgba(255,255,255,0.4)",
              animation: "fadeSlideUp 0.6s ease 0.2s both",
            }}
          >
            Add fresh chicken and masalas to your cart and we'll deliver them
            fresh to your doorstep.
          </p>

          <div className="mt-8" style={{ animation: "fadeSlideUp 0.6s ease 0.3s both" }}>
            <Link to="/products">
              <button
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #d4213c 0%, #ff6b35 100%)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(212,33,60,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,33,60,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,33,60,0.4)";
                }}
              >
                <Package size={18} />
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className=" mt-10 relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Background glows */}
      <div
        className="absolute rounded-full"
        style={{
          width: 380,
          height: 380,
          top: "-5%",
          right: "-5%",
          background: "radial-gradient(circle, rgba(212,33,60,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 320,
          height: 320,
          bottom: "0%",
          left: "-5%",
          background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3" style={{ animation: "fadeSlideUp 0.5s ease both" }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #d4213c, #ff6b35)",
                boxShadow: "0 4px 15px rgba(212,33,60,0.4)",
              }}
            >
              <ShoppingCart size={20} color="white" />
            </div>
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(212,33,60,0.12)",
                color: "#d4213c",
                border: "1px solid rgba(212,33,60,0.25)",
              }}
            >
               Your Selection
            </span>
          </div>

          <h1
            className="font-extrabold tracking-tight leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              background: "linear-gradient(135deg, #ffffff 0%, #e0d0d0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "fadeSlideUp 0.5s ease 0.1s both",
            }}
          >
            Shopping{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #d4213c, #ff6b35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cart
            </span>
          </h1>

          <p
            className="mt-2 text-sm sm:text-base"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <span className="font-bold" style={{ color: "#d4af37" }}>{totalItems}</span>{" "}
            {totalItems === 1 ? "item" : "items"} in your cart ·{" "}
            <span style={{ color: "rgba(255,255,255,0.3)" }}>
              {cartItems.length} {cartItems.length === 1 ? "product" : "products"}
            </span>
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  background: removingId === item.id
                    ? "rgba(212,33,60,0.05)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                  border: removingId === item._id
                    ? "1px solid rgba(212,33,60,0.3)"
                    : "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  transform: removingId === item._id ? "translateX(20px)" : "translateX(0)",
                  opacity: removingId === item._id ? 0.5 : 1,
                  animation: `fadeSlideUp 0.5s ease ${0.1 + index * 0.08}s both`,
                }}
                onMouseEnter={(e) => {
                  if (removingId !== item._id) {
                    e.currentTarget.style.borderColor = "rgba(212,33,60,0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,33,60,0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (removingId !== item._id) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {/* Accent bar */}
                <div
                  className="h-1"
                  style={{ background: "linear-gradient(90deg, #d4213c, #ff6b35, #d4af37)" }}
                />

                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="flex gap-4 sm:gap-5">
                    {/* Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded-xl object-cover"
                        style={{
                          width: "clamp(80px, 20vw, 128px)",
                          height: "clamp(80px, 20vw, 128px)",
                          border: "1px solid rgba(212,175,55,0.2)",
                          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                        }}
                      />
                      {/* Quantity badge */}
                      <div
                        className="absolute -top-2 -right-2 rounded-full flex items-center justify-center text-white text-xs font-extrabold"
                        style={{
                          width: 28,
                          height: 28,
                          background: "linear-gradient(135deg, #d4213c, #ff6b35)",
                          boxShadow: "0 2px 8px rgba(212,33,60,0.5)",
                        }}
                      >
                        {item.quantity}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2
                            className="font-bold text-base sm:text-lg truncate"
                            style={{ color: "#fff" }}
                          >
                            {item.name}
                          </h2>
                          <p
                            className="text-xs sm:text-sm mt-1 flex items-center gap-1.5"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                          >
                            <Tag size={12} style={{ color: "#d4af37" }} />
                            {item.weight}
                          </p>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="flex-shrink-0 flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer"
                          style={{
                            width: 36,
                            height: 36,
                            background: "rgba(212,33,60,0.08)",
                            border: "1px solid rgba(212,33,60,0.15)",
                          }}
                          title="Remove item"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(212,33,60,0.2)";
                            e.currentTarget.style.borderColor = "rgba(212,33,60,0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(212,33,60,0.08)";
                            e.currentTarget.style.borderColor = "rgba(212,33,60,0.15)";
                          }}
                        >
                          <Trash2 size={15} style={{ color: "#d4213c" }} />
                        </button>
                      </div>

                      {/* Quantity + Price */}
                      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer"
                            style={{
                              width: 34,
                              height: 34,
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(212,33,60,0.15)";
                              e.currentTarget.style.borderColor = "rgba(212,33,60,0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                            }}
                          >
                            <Minus size={14} style={{ color: "rgba(255,255,255,0.7)" }} />
                          </button>

                          <span
                            className="font-extrabold text-base w-8 text-center"
                            style={{ color: "#fff" }}
                          >
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer"
                            style={{
                              width: 34,
                              height: 34,
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(16,185,129,0.15)";
                              e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                            }}
                          >
                            <Plus size={14} style={{ color: "rgba(255,255,255,0.7)" }} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                            ₹{item.price} each
                          </p>
                          <p
                            className="font-extrabold text-lg sm:text-xl"
                            style={{ color: "#d4af37" }}
                          >
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear cart button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => {
                  if (window.confirm("Clear all items from cart?")) {
                    cartItems.forEach((item) => removeFromCart(item.id));
                  }
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(212,33,60,0.08)",
                  border: "1px solid rgba(212,33,60,0.15)",
                  color: "#d4213c",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212,33,60,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212,33,60,0.08)";
                }}
              >
                <Trash2 size={14} />
                Clear All Items
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl overflow-hidden sticky top-24"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                animation: "fadeSlideUp 0.6s ease 0.3s both",
              }}
            >
              {/* Header */}
              <div className="h-1" style={{ background: "linear-gradient(90deg, #d4af37, #f6e3a1)" }} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #d4af37, #f6e3a1)",
                      boxShadow: "0 4px 15px rgba(212,175,55,0.3)",
                    }}
                  >
                    <IndianRupee size={20} color="#1a0e0e" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-lg" style={{ color: "#fff" }}>
                      Order Summary
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#d4af37" }}>
                      {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                      Subtotal
                    </span>
                    <span className="font-bold text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                      ₹{totalPrice}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Delivery
                      </span>
                      <Truck size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
                    </div>
                    {deliveryCharge === 0 ? (
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(16,185,129,0.15)",
                          color: "#10b981",
                          border: "1px solid rgba(16,185,129,0.3)",
                        }}
                      >
                        FREE
                      </span>
                    ) : (
                      <span className="font-bold text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                        ₹{deliveryCharge}
                      </span>
                    )}
                  </div>

                  {totalPrice > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Items
                      </span>
                      <span className="font-bold text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                        {totalItems}
                      </span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div
                  className="my-5 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }}
                />

                {/* Grand Total */}
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold" style={{ color: "#fff" }}>
                    Grand Total
                  </span>
                  <div className="text-right">
                    <p
                      className="font-extrabold text-2xl"
                      style={{ color: "#d4af37" }}
                    >
                      ₹{grandTotal}
                    </p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                      incl. all taxes
                    </p>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link to="/checkout" className="block mt-6">
                  <button
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, #d4213c 0%, #ff6b35 100%)",
                      color: "white",
                      boxShadow: "0 4px 20px rgba(212,33,60,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,33,60,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,33,60,0.4)";
                    }}
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </button>
                </Link>

                {/* Continue shopping */}
                <Link
                  to="/products"
                  className="block mt-3 text-center text-sm font-semibold transition-all duration-300 py-2"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#d4213c";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                  }}
                >
                  ← Continue Shopping
                </Link>

                {/* Trust badges */}
                <div
                  className="mt-6 pt-5 flex items-center justify-center gap-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {[
                    { icon: "🔒", label: "Secure" },
                    { icon: "⚡", label: "Fast Delivery" },
                    { icon: "✅", label: "Fresh" },
                  ].map((badge) => (
                    <div key={badge.label} className="flex items-center gap-1.5">
                      <span className="text-sm">{badge.icon}</span>
                      <span className="text-[10px] font-bold" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;

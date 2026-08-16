import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import {
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Banknote,
  Smartphone,
  Shield,
  Flame,
  IndianRupee,
  Truck,
  Check,
  ArrowRight,
  Tag,
  X,
} from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

import { createOrder } from "../../services/orderService";
import API from "../../api/axios.js";
import LocationPicker from "../../components/map/LocationPicker";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [location, setLocation] = useState({
  latitude: "",
  longitude: "",
});

  const tax = 0;
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("COD");


  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || "",
    phone: "",
    email: currentUser?.email || "",
    address: "",
    city: "",
    pincode: "",
  });


  const deliveryCharge = cartItems.length > 0 ? 40 : 0;

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage("Enter a coupon code");
      return;
    }
    setCouponLoading(true);
    setCouponMessage("");
    try {
      const { data } = await API.post("/coupons/apply", {
        code: couponCode,
        orderAmount: totalPrice,
      });
      if (data.success) {
        setCouponDiscount(data.discount);
        setCouponApplied(data.couponCode);
        setCouponMessage(data.message);
      }
    } catch (err) {
      setCouponDiscount(0);
      setCouponApplied("");
      setCouponMessage(err.response?.data?.message || "Invalid coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setCouponDiscount(0);
    setCouponApplied("");
    setCouponMessage("");
  };

  const grandTotal = totalPrice + deliveryCharge - couponDiscount;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      alert("Location selected successfully.");
    },
    () => {
      alert("Unable to fetch your location.");
    }
  );
};

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
console.log(cartItems);
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product: item.id.toString(),
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          price: item.price,
        })),

        deliveryAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
           latitude: location.latitude,
  longitude: location.longitude,
        },

        paymentMethod,

        subtotal: totalPrice,

        deliveryCharge,

        tax,

        discount: couponDiscount,

        couponCode: couponApplied,

        totalAmount: grandTotal,
      };
      console.log(orderData);

      const res = await createOrder(orderData);

      console.log(res);

      alert("Order Placed Successfully");

      clearCart();

      navigate("/my-orders");
    } catch (err) {
      console.log(err);

      alert("Order Failed");
    }
  };

 const paymentOptions = [
  {
    value: "COD",
    label: "Cash on Delivery",
    icon: Banknote,
    color: "#10b981",
  },
  {
    value: "ONLINE",
    label: "Online Payment (UPI / Card)",
    icon: Smartphone,
    color: "#8b5cf6",
  },
];

  return (
    <section
      className=" mt-10 relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Background glows */}
      <div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          top: "-10%",
          right: "-5%",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          bottom: "10%",
          left: "-5%",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div
            className="flex items-center gap-3 mb-3"
            style={{ animation: "fadeSlideUp 0.5s ease both" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                boxShadow: "0 4px 15px rgba(13,148,136,0.4)",
              }}
            >
              <Shield size={20} color="white" />
            </div>
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(16,185,129,0.12)",
                color: "#10b981",
                border: "1px solid rgba(16,185,129,0.25)",
              }}
            >
              Secure Checkout
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
            Complete Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Order
            </span>
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Form Sections */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Details */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  animation: "fadeSlideUp 0.5s ease 0.15s both",
                }}
              >
                <div
                  className="h-1"
                  style={{
                    background: "linear-gradient(90deg, #0d9488, #14b8a6)",
                  }}
                />
                <div className="p-5 sm:p-6">
                  <h2
                    className="font-extrabold text-lg flex items-center gap-3 mb-5"
                    style={{ color: "#fff" }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(13,148,136,0.12)" }}
                    >
                      <User size={18} style={{ color: "#0d9488" }} />
                    </div>
                    Customer Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative md:col-span-2">
                      <User
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      />
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          handleChange("fullName", e.target.value)
                        }
                        className="w-full rounded-xl text-sm font-medium transition-all duration-300"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          padding: "13px 16px 13px 44px",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#0d9488";
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(13,148,136,0.15)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full rounded-xl text-sm font-medium transition-all duration-300"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          padding: "13px 16px 13px 44px",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#0d9488";
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(13,148,136,0.15)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full rounded-xl text-sm font-medium transition-all duration-300"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          padding: "13px 16px 13px 44px",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#0d9488";
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(13,148,136,0.15)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  animation: "fadeSlideUp 0.5s ease 0.25s both",
                }}
              >
                <div
                  className="h-1"
                  style={{
                    background: "linear-gradient(90deg, #f59e0b, #f6e3a1)",
                  }}
                />
                <div className="p-5 sm:p-6">
                  <h2
                    className="font-extrabold text-lg flex items-center gap-3 mb-5"
                    style={{ color: "#fff" }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(245,158,11,0.12)" }}
                    >
                      <MapPin size={18} style={{ color: "#f59e0b" }} />
                    </div>
                    Delivery Address
                  </h2>

                  <div className="relative mb-4">
                    <MapPin
                      size={16}
                      className="absolute left-4 top-4"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    />
                    <textarea
                      rows={4}
                      placeholder="Enter your complete address with landmark..."
                      required
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="w-full rounded-xl text-sm font-medium transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff",
                        padding: "13px 16px 13px 44px",
                        outline: "none",
                        resize: "none",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#f59e0b";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 3px rgba(245,158,11,0.15)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City / Town"
                      required
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="w-full rounded-xl text-sm font-medium transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff",
                        padding: "13px 16px",
                        outline: "none",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#f59e0b";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 3px rgba(245,158,11,0.15)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <input
                      type="text"
                      placeholder="PIN Code"
                      required
                      value={formData.pincode}
                      onChange={(e) => handleChange("pincode", e.target.value)}
                      className="w-full rounded-xl text-sm font-medium transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff",
                        padding: "13px 16px",
                        outline: "none",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#f59e0b";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 3px rgba(245,158,11,0.15)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>
              </div>

              <button
  type="button"
  onClick={getCurrentLocation}
  className="bg-green-600 text-white px-4 py-2 rounded mb-4"
>
  📍 Use My Current Location
</button>
              <h3 className="text-lg font-semibold mt-6 mb-2">
  Select Delivery Location
</h3>


<div className="mt-3">
  <p>
    <strong>Latitude:</strong> {location.latitude}
  </p>

  <p>
    <strong>Longitude:</strong> {location.longitude}
  </p>
</div>

<LocationPicker
  onLocationSelect={(loc) => setLocation(loc)}
/>

              {/* Payment Method */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  animation: "fadeSlideUp 0.5s ease 0.35s both",
                }}
              >
                <div
                  className="h-1"
                  style={{
                    background: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
                  }}
                />
                <div className="p-5 sm:p-6">
                  <h2
                    className="font-extrabold text-lg flex items-center gap-3 mb-5"
                    style={{ color: "#fff" }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(139,92,246,0.12)" }}
                    >
                      <CreditCard size={18} style={{ color: "#8b5cf6" }} />
                    </div>
                    Payment Method
                  </h2>

                  <div className="space-y-3">
                    {paymentOptions.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300"
                        style={{
                          background:
                            paymentMethod === option.value
                              ? `${option.color}12`
                              : "rgba(255,255,255,0.02)",
                          border:
                            paymentMethod === option.value
                              ? `1px solid ${option.color}40`
                              : "1px solid rgba(255,255,255,0.06)",
                          boxShadow:
                            paymentMethod === option.value
                              ? `0 0 20px ${option.color}15`
                              : "none",
                        }}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={option.value}
                          checked={paymentMethod === option.value}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `${option.color}15`,
                          }}
                        >
                          <option.icon
                            size={20}
                            style={{ color: option.color }}
                          />
                        </div>
                        <span
                          className="font-semibold text-sm"
                          style={{ color: "#fff" }}
                        >
                          {option.label}
                        </span>
                        {paymentMethod === option.value && (
                          <div
                            className="ml-auto w-6 h-6 rounded-full flex items-center justify-center"
                            style={{
                              background: option.color,
                              boxShadow: `0 0 12px ${option.color}60`,
                            }}
                          >
                            <Check size={14} color="white" strokeWidth={3} />
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div
                className="rounded-2xl overflow-hidden sticky top-24"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  animation: "fadeSlideUp 0.6s ease 0.3s both",
                }}
              >
                <div
                  className="h-1"
                  style={{
                    background:
                      "linear-gradient(90deg, #0d9488, #14b8a6, #f59e0b)",
                  }}
                />
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                        boxShadow: "0 4px 15px rgba(13,148,136,0.4)",
                      }}
                    >
                      <IndianRupee size={20} color="white" />
                    </div>
                    <div>
                      <h2
                        className="font-extrabold text-lg"
                        style={{ color: "#fff" }}
                      >
                        Order Summary
                      </h2>
                      <p
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: "#f59e0b" }}
                      >
                        {cartItems.length} items
                      </p>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2 mb-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center text-sm"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        <span className="truncate mr-2">
                          {item.name}{" "}
                          <span style={{ color: "rgba(255,255,255,0.3)" }}>
                            × {item.quantity}
                          </span>
                        </span>
                        <span
                          className="font-bold whitespace-nowrap"
                          style={{ color: "#fff" }}
                        >
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="my-4 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)",
                    }}
                  />

                  {/* Coupon Section */}
                  <div style={{ marginBottom: 16 }}>
                    {couponApplied ? (
                      <div
                        className="flex items-center justify-between p-3 rounded-xl"
                        style={{
                          background: "rgba(16,185,129,0.08)",
                          border: "1px solid rgba(16,185,129,0.2)",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Tag size={14} style={{ color: "#10b981" }} />
                          <div>
                            <span className="text-xs font-bold" style={{ color: "#10b981" }}>
                              {couponApplied}
                            </span>
                            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                              You save ₹{couponDiscount}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            color: "#ef4444", padding: 4,
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            className="flex-1 rounded-xl text-sm font-medium transition-all duration-300"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "#fff",
                              padding: "10px 12px",
                              outline: "none",
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = "#0d9488";
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleApplyCoupon}
                            disabled={couponLoading}
                            className="rounded-xl text-xs font-bold px-4 cursor-pointer transition-all duration-300"
                            style={{
                              background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                              color: "white",
                              border: "none",
                              boxShadow: "0 2px 10px rgba(13,148,136,0.3)",
                            }}
                          >
                            {couponLoading ? "..." : "Apply"}
                          </button>
                        </div>
                        {couponMessage && (
                          <p
                            className="text-[11px] mt-1.5 font-semibold"
                            style={{
                              color: couponDiscount > 0 ? "#10b981" : "#ef4444",
                            }}
                          >
                            {couponMessage}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>
                        Subtotal
                      </span>
                      <span
                        className="font-bold"
                        style={{ color: "rgba(255,255,255,0.8)" }}
                      >
                        ₹{totalPrice}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div
                        className="flex items-center gap-2"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        Delivery
                        <Truck
                          size={13}
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        />
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
                        <span
                          className="font-bold"
                          style={{ color: "rgba(255,255,255,0.8)" }}
                        >
                          ₹{deliveryCharge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Coupon Discount */}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between items-center text-sm" style={{ marginTop: 12 }}>
                      <div className="flex items-center gap-1.5" style={{ color: "#10b981" }}>
                        <Tag size={13} />
                        Coupon ({couponApplied})
                      </div>
                      <span className="font-bold" style={{ color: "#10b981" }}>
                        -₹{couponDiscount}
                      </span>
                    </div>
                  )}

                  <div
                    className="my-5 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)",
                    }}
                  />

                  {/* Grand Total */}
                  <div className="flex justify-between items-center">
                    <span
                      className="text-base font-bold"
                      style={{ color: "#fff" }}
                    >
                      Grand Total
                    </span>
                    <div className="text-right">
                      <p
                        className="font-extrabold text-2xl"
                        style={{ color: "#f59e0b" }}
                      >
                        ₹{grandTotal}
                      </p>
                      <p
                        className="text-[10px]"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        incl. all taxes
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold mt-6 transition-all duration-300 cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)",
                      color: "white",
                      boxShadow: "0 4px 20px rgba(13,148,136,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 30px rgba(13,148,136,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(13,148,136,0.4)";
                    }}
                  >
                    <Shield size={18} />
                    Place Order — ₹{grandTotal}
                  </button>

                  <p
                    className="text-center text-xs mt-4 flex items-center justify-center gap-1.5"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    <Shield size={11} />
                    100% secure & encrypted checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;

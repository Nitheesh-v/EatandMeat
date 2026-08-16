import { useEffect, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle, Package, Clock, User, ArrowRight, Home, Flame, MapPin, IndianRupee, Bike, Truck, CircleCheckBig, Sparkles, Check } from "lucide-react";

const OrderSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const location = useLocation();
  const order = location.state;

  const confettiColors = ["#B4232C", "#C9A227", "#D4354A", "#10b981", "#8b5cf6"];

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <section
      className="mt-10 relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Background glows */}
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                backgroundColor: confettiColors[i % confettiColors.length],
                animation: `confettiFall ${2 + Math.random() * 3}s linear forwards`,
                animationDelay: `${Math.random() * 2}s`,
                width: `${4 + Math.random() * 6}px`,
                height: `${6 + Math.random() * 8}px`,
                borderRadius: `${Math.random() > 0.5 ? "50%" : "2px"}`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <div
        className="relative z-10 max-w-3xl w-full"
        style={{ animation: "fadeSlideUp 0.6s ease both" }}
      >
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)",
                transform: "scale(2)",
                filter: "blur(20px)",
              }}
            />
            {/* Icon */}
            <div
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mx-auto"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 8px 30px rgba(16,185,129,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                animation: "checkPop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both",
              }}
            >
              <CheckCircle size={48} color="white" strokeWidth={2.5} />
            </div>
            {/* Sparkles */}
            <div
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #C9A227, #f6e3a1)",
                boxShadow: "0 0 15px rgba(201,162,39,0.5)",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              <Sparkles size={14} color="#1a0e0e" />
            </div>
          </div>

          <h1
            className="font-extrabold tracking-tight leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
              background: "linear-gradient(135deg, #ffffff 0%, #e0d0d0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "fadeSlideUp 0.6s ease 0.2s both",
            }}
          >
            Order Placed{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #10b981, #34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Successfully!
            </span>
          </h1>

          <p
            className="mt-4 text-sm sm:text-base max-w-lg mx-auto"
            style={{
              color: "rgba(255,255,255,0.4)",
              animation: "fadeSlideUp 0.6s ease 0.3s both",
            }}
          >
            Thank you for choosing EatAndMeat. Your order has been received and is being prepared with care.
          </p>
        </div>

        {/* Order Details Card */}
        <div
          className="rounded-2xl overflow-hidden mb-8"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            animation: "fadeSlideUp 0.6s ease 0.4s both",
          }}
        >
          <div className="h-1" style={{ background: "linear-gradient(90deg, #10b981, #34d399)" }} />

          <div className="p-5 sm:p-6">
            {/* Order ID */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl mb-5"
              style={{
                background: "rgba(16,185,129,0.06)",
                border: "1px solid rgba(16,185,129,0.15)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(16,185,129,0.12)" }}
              >
                <Package size={18} style={{ color: "#10b981" }} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Order ID
                </p>
                <p className="font-extrabold text-lg" style={{ color: "#10b981" }}>
                  {order.id}
                </p>
              </div>
              <div
                className="text-[10px] font-bold px-2.5 py-1.5 rounded-full"
                style={{
                  background: "rgba(16,185,129,0.15)",
                  color: "#10b981",
                  border: "1px solid rgba(16,185,129,0.3)",
                }}
              >
                Confirmed
              </div>
            </div>

            {/* Order Items */}
            <h3 className="font-extrabold text-base mb-3" style={{ color: "#fff" }}>
              Order Summary
            </h3>
            <div className="space-y-2.5 mb-5">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2.5 px-3 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(180,35,44,0.15), rgba(201,162,39,0.1))",
                        color: "#B4232C",
                      }}
                    >
                      {item.quantity}×
                    </div>
                    <span className="text-sm truncate" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {item.name}
                    </span>
                  </div>
                  <span className="font-bold text-sm ml-3" style={{ color: "#fff" }}>
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="my-4 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.3), transparent)" }}
            />

            {/* Payment & Delivery info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(139,92,246,0.12)" }}
                >
                  <IndianRupee size={16} style={{ color: "#8b5cf6" }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Payment
                  </p>
                  <p className="font-bold text-sm truncate" style={{ color: "#fff" }}>
                    {order.paymentMethod?.toUpperCase() || "COD"}
                  </p>
                </div>
              </div>

              <div
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(201,162,39,0.12)" }}
                >
                  <Clock size={16} style={{ color: "#C9A227" }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
                    ETA
                  </p>
                  <p className="font-bold text-sm" style={{ color: "#fff" }}>
                    30–45 mins
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Partner Note */}
            <div
              className="mt-5 p-4 rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(201,162,39,0.06), rgba(201,162,39,0.02))",
                border: "1px solid rgba(201,162,39,0.15)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(201,162,39,0.12)" }}
                >
                  <User size={16} style={{ color: "#C9A227" }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#C9A227" }}>
                    Delivery Partner
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                    A trained women delivery partner will deliver your order safely to your doorstep.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Progress Steps */}
        <div
          className="rounded-2xl overflow-hidden mb-8"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            animation: "fadeSlideUp 0.6s ease 0.5s both",
          }}
        >
          <div className="h-1" style={{ background: "linear-gradient(90deg, #B4232C, #D4354A)" }} />
          <div className="p-5 sm:p-6">
            <h3 className="font-extrabold text-base mb-6 text-center" style={{ color: "#fff" }}>
              Order Progress
            </h3>

            <div className="flex items-center justify-between relative">
              {/* Connection line */}
              <div
                className="absolute left-0 right-0 top-5 h-0.5"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />
              <div
                className="absolute left-0 top-5 h-0.5"
                style={{
                  width: "12.5%",
                  background: "linear-gradient(90deg, #10b981, #34d399)",
                  boxShadow: "0 0 10px rgba(16,185,129,0.4)",
                  transition: "width 1s ease",
                }}
              />

              {[
                { label: "Confirmed", icon: CheckCircle },
                { label: "Preparing", icon: Flame },
                { label: "On the Way", icon: Bike },
                { label: "Delivered", icon: CircleCheckBig },
              ].map((step, index) => (
                <div key={step.label} className="flex flex-col items-center flex-1 relative z-10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
                    style={{
                      background: index === 0
                        ? "linear-gradient(135deg, #10b981, #059669)"
                        : "rgba(255,255,255,0.05)",
                      border: index === 0 ? "none" : "2px solid rgba(255,255,255,0.1)",
                      boxShadow: index === 0 ? "0 0 20px rgba(16,185,129,0.4)" : "none",
                      color: index === 0 ? "white" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {index === 0 ? <Check size={16} strokeWidth={3} /> : index + 1}
                  </div>
                  <span
                    className="text-[10px] sm:text-xs mt-2 font-bold"
                    style={{
                      color: index === 0 ? "#10b981" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          style={{ animation: "fadeSlideUp 0.6s ease 0.6s both" }}
        >
          <Link to="/products">
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #B4232C 0%, #D4354A 100%)",
                color: "white",
                boxShadow: "0 4px 20px rgba(180,35,44,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(180,35,44,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(180,35,44,0.4)";
              }}
            >
              Continue Shopping
              <ArrowRight size={16} />
            </button>
          </Link>

          <Link to="/track-order">
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201,162,39,0.12)";
                e.currentTarget.style.borderColor = "rgba(201,162,39,0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Track Order
              <ArrowRight size={16} />
            </button>
          </Link>

          <Link to="/">
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.03)",
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              }}
            >
              <Home size={16} />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;

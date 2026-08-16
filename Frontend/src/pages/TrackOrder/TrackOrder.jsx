import { useEffect, useRef, useState } from "react";
import { useOrder } from "../../Context/OrderContext";
import {
  CheckCircle2,
  ChefHat,
  PackageCheck,
  Bike,
  Home,
  Phone,
  User,
  Clock,
  Package,
  Mail,
  MapPin,
  Flame,
  IndianRupee,
  Navigation,
  MessageCircle,
  Shield,
  Star,
  Zap,
  Truck,
} from "lucide-react";

export const TrackOrder = () => {
  const { orders } = useOrder();
  const timelineRef = useRef(null);
  const [liveETA, setLiveETA] = useState(25);

  useEffect(() => {
    if (timelineRef.current) {
      const steps = timelineRef.current.querySelectorAll(".track-step");
      steps.forEach((step, i) => {
        step.style.animationDelay = `${i * 0.15}s`;
      });
    }
  }, [orders]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveETA((prev) => (prev > 1 ? prev - 1 : 1));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (orders.length === 0) {
    return (
      <section
        className="relative overflow-hidden flex items-center justify-center min-h-screen px-4"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(180,35,44,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="relative z-10 max-w-md mx-auto text-center px-4 rounded-2xl p-10"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            animation: "fadeSlideUp 0.6s ease both",
          }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(180,35,44,0.1), rgba(201,162,39,0.05))",
              border: "1px solid rgba(180,35,44,0.2)",
            }}
          >
            <Package size={36} style={{ color: "rgba(180,35,44,0.7)" }} />
          </div>
          <h1
            className="font-extrabold text-2xl mb-2"
            style={{
              background: "linear-gradient(135deg, #fff, #e0d0d0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            No Orders Found
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)" }}>Place an order to track it here.</p>
        </div>
      </section>
    );
  }

  const order = orders[orders.length - 1];

  const isStepActive = (step) => {
    const stepOrder = ["Confirmed", "Preparing", "Packed", "Assigned", "Delivered"];
    const currentStep =
      order.deliveryStatus === "Delivered"
        ? "Delivered"
        : order.assignedPartner
        ? "Assigned"
        : order.kitchenStatus === "Packed"
        ? "Packed"
        : order.kitchenStatus === "Preparing"
        ? "Preparing"
        : "Confirmed";
    return stepOrder.indexOf(step) <= stepOrder.indexOf(currentStep);
  };

  const stepConfig = {
    Confirmed: { icon: CheckCircle2, color: "#10b981", label: "Order Confirmed", desc: "Your order has been received" },
    Preparing: { icon: ChefHat, color: "#fbbf24", label: "Preparing", desc: "Kitchen is preparing your order" },
    Packed: { icon: PackageCheck, color: "#3b82f6", label: "Packed", desc: "Order is packed and ready" },
    Assigned: { icon: Bike, color: "#8b5cf6", label: order.assignedPartner ? `Assigned to ${order.assignedPartner.name}` : "Waiting for Partner", desc: order.assignedPartner ? "Partner is on the way" : "Looking for a delivery partner" },
    Delivered: { icon: Home, color: "#10b981", label: order.deliveryStatus === "Delivered" ? "Delivered Successfully" : "Waiting for Delivery", desc: order.deliveryStatus === "Delivered" ? "Order has been delivered" : "Order is on its way to you" },
  };

  const currentStepIdx = (() => {
    const stepOrder = ["Confirmed", "Preparing", "Packed", "Assigned", "Delivered"];
    const currentStep =
      order.deliveryStatus === "Delivered"
        ? "Delivered"
        : order.assignedPartner
        ? "Assigned"
        : order.kitchenStatus === "Packed"
        ? "Packed"
        : order.kitchenStatus === "Preparing"
        ? "Preparing"
        : "Confirmed";
    return stepOrder.indexOf(currentStep);
  })();

  return (
    <section
      className="relative overflow-hidden min-h-screen mt-10"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)",
      }}
    >
      {/* Background glows */}
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          top: "-10%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(180,35,44,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          bottom: "0%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #B4232C, #D4354A)",
                  boxShadow: "0 4px 15px rgba(180,35,44,0.4)",
                }}
              >
                <Flame size={20} color="white" />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(139,92,246,0.12)",
                  color: "#a78bfa",
                  border: "1px solid rgba(139,92,246,0.25)",
                }}
              >
                 Live Tracking
              </span>
            </div>
            <h1
              className="font-extrabold tracking-tight leading-tight"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                background: "linear-gradient(135deg, #ffffff 0%, #e0d0d0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Track Your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #B4232C, #D4354A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Order
              </span>
            </h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              Real-time order status updates
            </p>
          </div>

          {/* Kitchen Status Badge */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold"
            style={{
              background: (() => {
                const c = stepConfig[order.kitchenStatus]?.color || "#fbbf24";
                return `${c}15`;
              })(),
              border: (() => {
                const c = stepConfig[order.kitchenStatus]?.color || "#fbbf24";
                return `1px solid ${c}40`;
              })(),
              color: (() => {
                const c = stepConfig[order.kitchenStatus]?.color || "#fbbf24";
                return c;
              })(),
              boxShadow: (() => {
                const c = stepConfig[order.kitchenStatus]?.color || "#fbbf24";
                return `0 0 15px ${c}20`;
              })(),
              animation: "fadeSlideUp 0.5s ease 0.1s both",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: (() => {
                  const c = stepConfig[order.kitchenStatus]?.color || "#fbbf24";
                  return c;
                })(),
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            {order.kitchenStatus || "Processing"}
          </div>
        </div>

        {/* Main Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            animation: "fadeSlideUp 0.6s ease 0.2s both",
          }}
        >
          {/* Rainbow accent */}
          <div className="h-1" style={{ background: "linear-gradient(90deg, #B4232C, #D4354A, #C9A227, #10b981, #8b5cf6)" }} />

          <div className="p-5 sm:p-6 lg:p-8 space-y-8">
            {/* Order ID */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(201,162,39,0.08), rgba(201,162,39,0.02))",
                border: "1px solid rgba(201,162,39,0.2)",
              }}
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Order ID
                </p>
                <p className="font-extrabold text-xl sm:text-2xl mt-1" style={{ color: "#C9A227" }}>
                  {order.id}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>
                  ETA: <span style={{ color: "#10b981" }}>{liveETA} mins</span>
                </span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { icon: User, label: "Customer", value: order.customer?.fullName || order.customer?.name || "—", color: "#B4232C" },
                { icon: IndianRupee, label: "Payment", value: order.paymentMethod?.toUpperCase() || "Paid", color: "#10b981" },
                { icon: Package, label: "Order Total", value: `₹${order.total}`, color: "#C9A227" },
                { icon: Truck, label: "Delivery", value: order.deliveryStatus, color: "#8b5cf6" },
              ].map((info, i) => (
                <div
                  key={info.label}
                  className="p-4 rounded-xl transition-all duration-300"
                  style={{
                    background: `${info.color}06`,
                    border: `1px solid ${info.color}18`,
                    animation: `fadeSlideUp 0.4s ease ${0.3 + i * 0.08}s both`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${info.color}40`;
                    e.currentTarget.style.background = `${info.color}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${info.color}18`;
                    e.currentTarget.style.background = `${info.color}06`;
                  }}
                >
                  <info.icon size={16} style={{ color: info.color, marginBottom: 8 }} />
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {info.label}
                  </p>
                  <p className="font-bold text-sm mt-1 truncate" style={{ color: "#fff" }}>
                    {info.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Ordered Items */}
            <div>
              <h2 className="font-extrabold text-lg flex items-center gap-2 mb-4" style={{ color: "#fff" }}>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(201,162,39,0.12)" }}
                >
                  <Package size={16} style={{ color: "#C9A227" }} />
                </div>
                Ordered Items
              </h2>
              <div className="space-y-2">
                {order.items?.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center px-4 py-3 rounded-xl transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      animation: `fadeSlideUp 0.4s ease ${0.4 + i * 0.05}s both`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(201,162,39,0.15)";
                      e.currentTarget.style.background = "rgba(201,162,39,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold"
                        style={{
                          background: "linear-gradient(135deg, rgba(180,35,44,0.15), rgba(201,162,39,0.1))",
                          color: "#B4232C",
                        }}
                      >
                        {item.quantity}×
                      </div>
                      <div>
                        <div className="font-semibold text-sm" style={{ color: "#fff" }}>
                          {item.name}
                        </div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                          Qty: {item.quantity} · ₹{item.price} each
                        </div>
                      </div>
                    </div>
                    <div className="font-extrabold text-sm" style={{ color: "#C9A227" }}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="font-extrabold text-lg flex items-center gap-2 mb-6" style={{ color: "#fff" }}>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(139,92,246,0.12)" }}
                >
                  <Clock size={16} style={{ color: "#8b5cf6" }} />
                </div>
                Order Progress
              </h2>

              <div className="relative" ref={timelineRef}>
                {/* Timeline line background */}
                <div
                  className="absolute left-6 sm:left-7 top-0 bottom-0 w-0.5"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                {/* Timeline line active */}
                <div
                  className="absolute left-6 sm:left-7 top-0 w-0.5"
                  style={{
                    height: `${((currentStepIdx + 1) / 5) * 100}%`,
                    background: "linear-gradient(180deg, #B4232C, #D4354A, #C9A227)",
                    boxShadow: "0 0 10px rgba(180,35,44,0.4)",
                    transition: "height 1s ease",
                  }}
                />

                <div className="space-y-6 sm:space-y-8">
                  {Object.entries(stepConfig).map(([stepKey, step], i) => {
                    const active = isStepActive(stepKey);
                    const StepIcon = step.icon;
                    return (
                      <div
                        key={stepKey}
                        className="track-step flex items-start gap-4 sm:gap-5"
                      >
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
                          style={{
                            background: active
                              ? `linear-gradient(135deg, ${step.color}, ${step.color}cc)`
                              : "rgba(255,255,255,0.04)",
                            border: active ? "none" : "1px solid rgba(255,255,255,0.1)",
                            boxShadow: active ? `0 0 0 4px ${step.color}20, 0 6px 20px ${step.color}40` : "none",
                            color: active ? "white" : "rgba(255,255,255,0.25)",
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          <StepIcon size={22} />
                          {active && (
                            <div
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: `radial-gradient(circle, ${step.color}40 0%, transparent 70%)`,
                                animation: "pulse-dot 2s ease-in-out infinite",
                              }}
                            />
                          )}
                        </div>
                        <div className="pt-2 sm:pt-3">
                          <div
                            className="font-bold text-base sm:text-lg"
                            style={{
                              color: active ? "#fff" : "rgba(255,255,255,0.35)",
                              transition: "color 0.4s ease",
                            }}
                          >
                            {step.label}
                          </div>
                          <div className="text-sm mt-0.5" style={{ color: active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)" }}>
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Delivery Partner Card */}
            {order.assignedPartner && (
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.06), rgba(139,92,246,0.02))",
                  border: "1px solid rgba(139,92,246,0.2)",
                  animation: "fadeSlideUp 0.5s ease 0.5s both",
                }}
              >
                <div className="h-1" style={{ background: "linear-gradient(90deg, #8b5cf6, #a78bfa)" }} />
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-extrabold text-lg flex items-center gap-2" style={{ color: "#fff" }}>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(139,92,246,0.15)" }}
                      >
                        <Bike size={16} style={{ color: "#a78bfa" }} />
                      </div>
                      Delivery Partner
                    </h2>
                    <div className="flex items-center gap-1">
                      <Star size={12} fill="#fbbf24" color="#fbbf24" />
                      <span className="text-xs font-bold" style={{ color: "#fbbf24" }}>
                        4.9
                      </span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Partner Info */}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
                          color: "white",
                          boxShadow: "0 4px 15px rgba(139,92,246,0.4)",
                        }}
                      >
                        {order.assignedPartner.name?.charAt(0) || "D"}
                      </div>
                      <div>
                        <p className="font-extrabold" style={{ color: "#fff" }}>
                          {order.assignedPartner.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                          {order.assignedPartner.vehicle || "Bike"}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <Zap size={11} style={{ color: "#10b981" }} />
                          <span className="text-[10px] font-bold" style={{ color: "#10b981" }}>
                            Verified Partner
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions + ETA */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <button
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer"
                          style={{
                            background: "rgba(16,185,129,0.12)",
                            border: "1px solid rgba(16,185,129,0.25)",
                            color: "#10b981",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(16,185,129,0.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(16,185,129,0.12)";
                          }}
                        >
                          <Phone size={14} />
                          Call
                        </button>
                        <button
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer"
                          style={{
                            background: "rgba(59,130,246,0.12)",
                            border: "1px solid rgba(59,130,246,0.25)",
                            color: "#60a5fa",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(59,130,246,0.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(59,130,246,0.12)";
                          }}
                        >
                          <MessageCircle size={14} />
                          Message
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                          <Clock size={12} />
                          ETA
                        </div>
                        <span className="font-extrabold" style={{ color: "#10b981" }}>
                          20–30 mins
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                          <Navigation size={12} />
                          Status
                        </div>
                        <span className="font-extrabold" style={{ color: "#a78bfa" }}>
                          {order.deliveryStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer trust badges */}
            <div
              className="flex flex-wrap items-center justify-center gap-5 pt-5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {[
                { icon: Shield, label: "100% Secure", color: "#10b981" },
                { icon: Zap, label: "Fresh Quality", color: "#B4232C" },
                { icon: Star, label: "Top Rated", color: "#C9A227" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5">
                  <badge.icon size={13} style={{ color: badge.color }} />
                  <span className="text-[10px] font-bold" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


import {
  Package,
  Bike,
  CircleCheckBig,
  IndianRupee,
  Star,
  TrendingUp,
  Zap,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const cards = [
  {
    title: "Available Orders",
    value: 2,
    icon: Package,
    gradient: "linear-gradient(135deg, #d4213c, #ff6b35)",
    glow: "rgba(212,33,60,0.4)",
    accent: "#ff6b35",
  },
  {
    title: "Active Delivery",
    value: 3,
    icon: Bike,
    gradient: "linear-gradient(135deg, #d4af37, #f6e3a1)",
    glow: "rgba(212,175,55,0.4)",
    accent: "#d4af37",
  },
  {
    title: "Completed Today",
    value: 5,
    icon: CircleCheckBig,
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
    glow: "rgba(16,185,129,0.4)",
    accent: "#10b981",
  },
  {
    title: "Today's Earnings",
    value: "₹1,420",
    icon: IndianRupee,
    gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    glow: "rgba(139,92,246,0.4)",
    accent: "#a78bfa",
  },
];

const recentOrders = [
  { id: "#ORD2847", customer: "Arjun S.", area: "RS Puram", amount: "₹540", status: "Delivered", time: "12 min ago", rating: 5 },
  { id: "#ORD2846", customer: "Meena R.", area: "Gandhipuram", amount: "₹830", status: "Delivered", time: "34 min ago", rating: 5 },
  { id: "#ORD2845", customer: "Karthik V.", area: "Peelamedu", amount: "₹420", status: "Delivered", time: "1 hr ago", rating: 4 },
  { id: "#ORD2844", customer: "Divya M.", area: "Town Hall", amount: "₹680", status: "Delivered", time: "2 hr ago", rating: 5 },
];

export const DeliveryDashboard = () => {
  const [animatedValues, setAnimatedValues] = useState(cards.map(() => 0));

  useEffect(() => {
    const timers = cards.map((card, i) => {
      return setTimeout(() => {
        setAnimatedValues((prev) => {
          const next = [...prev];
          next[i] = typeof card.value === "number" ? card.value : 100;
          return next;
        });
      }, 300 + i * 150);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #d4213c 0%, #ff6b35 100%)",
              boxShadow: "0 4px 15px rgba(212,33,60,0.4)",
            }}
          >
            <Zap size={20} color="white" />
          </div>
          <div>
            <h1
              className="text-3xl font-extrabold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #e0d0d0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Dashboard
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Manage your deliveries efficiently
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="relative rounded-2xl overflow-hidden transition-all duration-500 group"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              animation: `fadeSlideUp 0.5s ease ${i * 0.1}s both`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${card.accent}60`;
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 12px 40px ${card.glow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
            }}
          >
            {/* Gradient accent bar */}
            <div className="h-1" style={{ background: card.gradient }} />

            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {card.title}
                </p>
                <h2
                  className="text-3xl font-extrabold tracking-tight"
                  style={{ color: "#fff" }}
                >
                  {card.value}
                </h2>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={12} style={{ color: "#10b981" }} />
                  <span className="text-[10px] font-bold" style={{ color: "#10b981" }}>
                    +12% from yesterday
                  </span>
                </div>
              </div>

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: card.gradient,
                  boxShadow: `0 8px 24px ${card.glow}`,
                  transform: "scale(1)",
                }}
              >
                <card.icon size={26} color="white" />
              </div>
            </div>

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 80% 50%, ${card.glow}20 0%, transparent 60%)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Current Status */}
        <div
          className="rounded-2xl overflow-hidden transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            animation: "fadeSlideUp 0.6s ease 0.4s both",
          }}
        >
          <div className="h-1" style={{ background: "linear-gradient(90deg, #d4213c, #ff6b35)" }} />
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-extrabold text-xl" style={{ color: "#fff" }}>
                Current Status
              </h2>
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: "rgba(16,185,129,0.15)",
                  color: "#10b981",
                  border: "1px solid rgba(16,185,129,0.3)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#10b981", animation: "pulse-dot 2s ease-in-out infinite" }}
                />
                Online
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Status", value: "Online", badge: true },
                { label: "Today's Orders", value: "12" },
                { label: "Completed", value: "9" },
                { label: "Pending", value: "3" },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className="flex justify-between items-center p-3 rounded-xl transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    animation: `fadeSlideUp 0.4s ease ${0.5 + i * 0.1}s both`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {row.label}
                  </span>
                  {row.badge ? (
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #10b981, #34d399)",
                        color: "white",
                        boxShadow: "0 2px 8px rgba(16,185,129,0.4)",
                      }}
                    >
                      {row.value}
                    </span>
                  ) : (
                    <span className="font-extrabold text-sm" style={{ color: "#fff" }}>
                      {row.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Mini progress */}
            <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex justify-between text-xs mb-2">
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Daily Goal</span>
                <span className="font-bold" style={{ color: "#d4af37" }}>75%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "75%",
                    background: "linear-gradient(90deg, #d4213c, #d4af37)",
                    boxShadow: "0 0 10px rgba(212,33,60,0.5)",
                    transition: "width 1s ease",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div
          className="rounded-2xl overflow-hidden transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            animation: "fadeSlideUp 0.6s ease 0.5s both",
          }}
        >
          <div className="h-1" style={{ background: "linear-gradient(90deg, #d4af37, #f6e3a1)" }} />
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-extrabold text-xl" style={{ color: "#fff" }}>
                Performance
              </h2>
              <ArrowUpRight size={18} style={{ color: "#d4af37" }} />
            </div>

            {/* Rating */}
            <div
              className="p-5 rounded-xl mb-5"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))",
                border: "1px solid rgba(212,175,55,0.15)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #d4af37, #f6e3a1)",
                    boxShadow: "0 4px 15px rgba(212,175,55,0.4)",
                  }}
                >
                  <Star size={22} color="#1a0e0e" fill="#1a0e0e" />
                </div>
                <div>
                  <p className="text-3xl font-extrabold" style={{ color: "#fff" }}>
                    4.9
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    (246 Reviews)
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={s <= 4 ? "text-amber-400" : "text-amber-400/50"}
                      fill={s <= 4 ? "#fbbf24" : "none"}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-4">
              {[
                { label: "Acceptance Rate", value: 98, color: "#d4af37" },
                { label: "On-time Delivery", value: 95, color: "#d4213c" },
                { label: "Customer Satisfaction", value: 92, color: "#10b981" },
              ].map((metric, i) => (
                <div
                  key={metric.label}
                  className="transition-all duration-300"
                  style={{ animation: `fadeSlideUp 0.4s ease ${0.6 + i * 0.1}s both` }}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>{metric.label}</span>
                    <span className="font-extrabold" style={{ color: metric.color }}>{metric.value}%</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${metric.value}%`,
                        background: `linear-gradient(90deg, ${metric.color}, ${metric.color}88)`,
                        boxShadow: `0 0 10px ${metric.color}60`,
                        transition: "width 1.2s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Deliveries Table */}
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          animation: "fadeSlideUp 0.6s ease 0.6s both",
        }}
      >
        <div className="h-1" style={{ background: "linear-gradient(90deg, #10b981, #34d399)" }} />
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-xl" style={{ color: "#fff" }}>
              Recent Deliveries
            </h2>
            <span className="text-xs font-bold" style={{ color: "#d4af37" }}>
              View All →
            </span>
          </div>

          <div className="space-y-2">
            {recentOrders.map((order, i) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  animation: `fadeSlideUp 0.4s ease ${0.7 + i * 0.1}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-extrabold"
                    style={{
                      background: "linear-gradient(135deg, rgba(212,33,60,0.15), rgba(212,175,55,0.1))",
                      color: "#d4213c",
                    }}
                  >
                    {order.id.slice(-3)}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#fff" }}>
                      {order.customer}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {order.area} · {order.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-sm" style={{ color: "#d4af37" }}>
                    {order.amount}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(order.rating)].map((_, s) => (
                      <Star key={s} size={10} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(16,185,129,0.15)",
                      color: "#10b981",
                      border: "1px solid rgba(16,185,129,0.3)",
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;

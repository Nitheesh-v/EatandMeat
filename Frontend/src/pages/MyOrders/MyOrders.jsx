import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../services/orderService";
import OrderTimeline from "../../components/Order/OrderTimeline";
import {
  ShoppingBag,
  ArrowRight,
  Package,
  Flame,
  Bike,
  CircleCheckBig,
  Clock,
  IndianRupee,
  Eye,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Calendar,
  TrendingUp,
  Filter,
} from "lucide-react";

const myOrdersStyles = `
.mo-page {
  position: relative; overflow: hidden;
  padding: 32px 16px 80px; min-height: 100vh;
  background: linear-gradient(180deg, #FAF7F2 0%, #FAF7F2 40%, #FAF7F2 100%);
}
@media (min-width: 768px) { .mo-page { padding: 48px 24px 80px; } }
@media (min-width: 1024px) { .mo-page { padding: 64px 32px 80px; } }

.mo-glow-1 {
  position: fixed; border-radius: 50%;
  width: 500px; height: 500px;
  top: -100px; right: -150px;
  background: radial-gradient(circle, rgba(180,35,44,0.08) 0%, transparent 70%);
  filter: blur(80px); pointer-events: none;
}
.mo-glow-2 {
  position: fixed; border-radius: 50%;
  width: 400px; height: 400px;
  bottom: -100px; left: -150px;
  background: radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%);
  filter: blur(80px); pointer-events: none;
}

.mo-container { position: relative; z-index: 10; max-width: 48rem; margin: 0 auto; }

/* Header */
.mo-header {
  margin-bottom: 40px;
  animation: moFadeUp 0.6s ease both;
}
.mo-header-row { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
.mo-logo-icon {
  width: 44px; height: 44px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #B4232C, #D4354A);
  box-shadow: 0 6px 20px rgba(180,35,44,0.4);
  position: relative;
}
.mo-logo-icon::after {
  content: ''; position: absolute; inset: -2px;
  border-radius: 16px;
  background: linear-gradient(135deg, #B4232C, #D4354A);
  z-index: -1; filter: blur(10px); opacity: 0.4;
}
.mo-header-tag {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.7rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  padding: 6px 14px; border-radius: 999px;
  background: rgba(201,162,39,0.1);
  color: #C9A227;
  border: 1px solid rgba(201,162,39,0.25);
}
.mo-title {
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 900; letter-spacing: -0.03em; line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #f5e6e6 50%, #C9A227 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: moShimmer 4s ease-in-out infinite;
}
@keyframes moShimmer {
  0%,100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.mo-subtitle {
  margin-top: 10px; font-size: 0.95rem;
  color: #94A3B8;
  max-width: 28rem;
}

/* Stats Row */
.mo-stats {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 12px; margin-bottom: 28px;
  animation: moFadeUp 0.6s ease 0.1s both;
}
@media (min-width: 640px) { .mo-stats { gap: 16px; } }

.mo-stat-card {
  padding: 16px; border-radius: 16px;
  background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative; overflow: hidden;
}
.mo-stat-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
}
.mo-stat-card:hover { transform: translateY(-2px); }
.mo-stat-icon { margin-bottom: 10px; }
.mo-stat-value {
  font-size: clamp(1.5rem, 3vw, 1.75rem);
  font-weight: 900; letter-spacing: -0.02em;
  line-height: 1;
}
.mo-stat-label {
  margin-top: 6px; font-size: 0.7rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.05em;
  color: #94A3B8;
}

/* Filter Bar */
.mo-filter-bar {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; margin-bottom: 32px;
  padding: 6px; border-radius: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  animation: moFadeUp 0.6s ease 0.2s both;
  flex-wrap: wrap;
}
.mo-filter-group { display: flex; gap: 4px; }
.mo-filter-pill {
  padding: 8px 16px; border-radius: 10px;
  font-size: 0.8rem; font-weight: 600;
  cursor: pointer; transition: all 0.3s ease;
  background: transparent;
  color: #64748B;
  border: none;
  position: relative;
}
.mo-filter-pill:hover { color: #30231E; }
.mo-filter-pill.active {
  background: linear-gradient(135deg, #B4232C, #D4354A);
  color: white;
  box-shadow: 0 4px 15px rgba(180,35,44,0.4);
}

.mo-result-count {
  font-size: 0.75rem; font-weight: 600;
  color: #94A3B8;
  padding: 0 12px;
}

/* Timeline */
.mo-timeline {
  position: relative;
  padding-left: 28px;
}
@media (min-width: 768px) { .mo-timeline { padding-left: 36px; } }

/* Main timeline line */
.mo-timeline::before {
  content: '';
  position: absolute;
  left: 11px; top: 8px; bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, 
    rgba(180,35,44,0.6) 0%, 
    rgba(201,162,39,0.3) 40%, 
    rgba(255,255,255,0.06) 100%
  );
}
@media (min-width: 768px) { .mo-timeline::before { left: 15px; } }

/* Date separator */
.mo-date-group { margin-bottom: 32px; }
.mo-date-label {
  position: relative;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px; border-radius: 999px;
  margin-bottom: 20px; margin-left: -4px;
  font-size: 0.75rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em;
  background: rgba(180,35,44,0.12);
  color: #B4232C;
  border: 1px solid rgba(180,35,44,0.2);
  z-index: 2;
}

/* Timeline Node */
.mo-node {
  position: relative;
  margin-bottom: 24px;
  animation: moFadeUp 0.5s ease both;
}

.mo-node-dot {
  position: absolute;
  left: -28px; top: 24px;
  width: 24px; height: 24px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;
}
@media (min-width: 768px) { .mo-node-dot { left: -36px; } }

.mo-node-dot-inner {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 12px currentColor;
}

.mo-node-card {
  border-radius: 18px; overflow: hidden;
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(.16,.84,.32,1);
  cursor: default;
}
.mo-node-card:hover {
  transform: translateX(4px);
  border-color: rgba(180,35,44,0.2);
  box-shadow: 0 12px 40px rgba(0,0,0,0.4);
}

/* Card header strip */
.mo-node-strip { height: 3px; }

.mo-node-content { padding: 20px; }
@media (min-width: 640px) { .mo-node-content { padding: 24px; } }

.mo-node-top {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 12px; margin-bottom: 16px;
}
.mo-node-id-block { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
.mo-node-thumb {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.mo-node-id {
  font-weight: 800; font-size: 1rem;
  color: #30231E;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.mo-node-date {
  display: flex; align-items: center; gap: 5px;
  font-size: 0.7rem; margin-top: 3px;
  color: #94A3B8;
}

.mo-node-status-pill {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 5px 12px; border-radius: 999px;
  font-size: 0.7rem; font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}
.mo-node-status-pill .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: currentColor;
  animation: moPulse 2s ease-in-out infinite;
}
@keyframes moPulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

.mo-node-amount {
  font-size: 1.25rem; font-weight: 900;
  color: #C9A227;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

/* Expandable items */
.mo-node-items-toggle {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px; border-radius: 10px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  color: #64748B;
  font-size: 0.8rem; font-weight: 600;
  cursor: pointer; transition: all 0.3s ease;
}
.mo-node-items-toggle:hover {
  background: rgba(255,255,255,0.06);
  color: #30231E;
}

.mo-node-items {
  margin-top: 12px;
  display: flex; flex-direction: column; gap: 8px;
  animation: moExpand 0.3s ease;
}
@keyframes moExpand {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.mo-item-row {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: 10px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
  transition: all 0.2s ease;
}
.mo-item-row:hover {
  background: rgba(255,255,255,0.04);
  border-color: rgba(201,162,39,0.15);
}
.mo-item-img {
  width: 44px; height: 44px; border-radius: 8px;
  object-fit: cover; flex-shrink: 0;
  border: 1px solid rgba(201,162,39,0.2);
}
.mo-item-info { flex: 1; min-width: 0; }
.mo-item-name {
  font-weight: 600; font-size: 0.85rem;
  color: #30231E;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  margin: 0;
}
.mo-item-qty {
  font-size: 0.7rem; color: #94A3B8;
  margin: 2px 0 0 0;
}
.mo-item-price {
  font-weight: 800; font-size: 0.85rem;
  color: #C9A227; margin: 0;
}

/* Node action bar */
.mo-node-actions {
  display: flex; gap: 10px; margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.06);
  flex-wrap: wrap;
}
.mo-action-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 18px; border-radius: 10px;
  font-size: 0.8rem; font-weight: 700;
  cursor: pointer; transition: all 0.3s ease;
  text-decoration: none; border: none;
}
.mo-action-btn:hover { transform: translateY(-1px); }

/* Timeline */
.mo-order-timeline { margin-top: 16px; }

/* Empty */
.mo-empty {
  position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  min-height: 100vh; padding: 32px 16px;
  background: linear-gradient(180deg, #FAF7F2 0%, #FAF7F2 40%, #FAF7F2 100%);
}
.mo-empty-glow {
  position: absolute; border-radius: 50%;
  width: 400px; height: 400px;
  top: 10%; left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(180,35,44,0.08), transparent 70%);
  filter: blur(60px); pointer-events: none;
}
.mo-empty-box {
  position: relative; z-index: 10;
  max-width: 28rem; text-align: center; padding: 0 16px;
  animation: moFadeUp 0.6s ease both;
}
.mo-empty-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 110px; height: 110px; border-radius: 28px;
  margin-bottom: 28px;
  background: linear-gradient(135deg, rgba(180,35,44,0.12), rgba(201,162,39,0.06));
  border: 1px solid rgba(180,35,44,0.2);
  position: relative;
}
.mo-empty-icon::before {
  content: ''; position: absolute; inset: -3px;
  border-radius: 30px;
  background: linear-gradient(135deg, rgba(180,35,44,0.3), rgba(201,162,39,0.15));
  z-index: -1; filter: blur(15px); opacity: 0.5;
}
.mo-empty-title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 900; letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #e0d0d0 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
}
.mo-empty-subtitle {
  font-size: 0.9rem; color: #94A3B8;
  margin-bottom: 28px;
}

/* Loading */
.mo-loading {
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 16px;
  background: linear-gradient(180deg, #FAF7F2 0%, #FAF7F2 40%, #FAF7F2 100%);
  color: #64748B;
  font-size: 0.95rem; font-weight: 600;
}
.mo-loader {
  width: 48px; height: 48px; border-radius: 50%;
  border: 3px solid rgba(180,35,44,0.15);
  border-top-color: #B4232C;
  border-right-color: #C9A227;
  animation: moSpin 1s linear infinite;
}
@keyframes moSpin { to { transform: rotate(360deg); } }

.mo-no-results {
  text-align: center; padding: 60px 20px; border-radius: 18px;
  background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.06);
}

@keyframes moFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
`;

const statusConfig = {
  "Order Confirmed": { color: "#3b82f6", label: "Confirmed", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)" },
  Preparing: { color: "#fbbf24", label: "Preparing", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)" },
  "Out for Delivery": { color: "#8b5cf6", label: "On the Way", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)" },
  Delivered: { color: "#10b981", label: "Delivered", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" },
  Waiting: { color: "#64748b", label: "Waiting", bg: "rgba(100,116,139,0.12)", border: "rgba(100,116,139,0.3)" },
  Pending: { color: "#C9A227", label: "Pending", bg: "rgba(201,162,39,0.12)", border: "rgba(201,162,39,0.3)" },
  Confirmed: { color: "#3b82f6", label: "Confirmed", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)" },
  Processing: { color: "#fbbf24", label: "Preparing", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)" },
  Shipped: { color: "#8b5cf6", label: "On the Way", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)" },
};

const groupByDate = (orders) => {
  const groups = {};
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  orders.forEach((o) => {
    const d = new Date(o.createdAt);
    const orderDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    let label;
    if (orderDay.getTime() === today.getTime()) label = "Today";
    else if (orderDay.getTime() === yesterday.getTime()) label = "Yesterday";
    else {
      const diff = Math.floor((today - orderDay) / (1000 * 60 * 60 * 24));
      if (diff < 7) label = "This Week";
      else if (diff < 30) label = "This Month";
      else label = d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
    }
    if (!groups[label]) groups[label] = [];
    groups[label].push(o);
  });
  return groups;
};

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState({});

  useEffect(() => { loadOrders(); }, []);

  const loadOrders = async () => {
    try {
      const res = await getMyOrders();
      console.log(res);
      setOrders(res.orders);
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  const filteredOrders = filter === "All"
    ? orders
    : orders.filter((o) => {
        if (filter === "Active") return o.orderStatus !== "Delivered";
        if (filter === "Completed") return o.orderStatus === "Delivered";
        return true;
      });

  const grouped = groupByDate(filteredOrders);
  const activeCount = orders.filter((o) => o.orderStatus !== "Delivered").length;
  const completedCount = orders.filter((o) => o.orderStatus === "Delivered").length;

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <>
        <style>{myOrdersStyles}</style>
        <div className="mo-loading">
          <div className="mo-loader" />
          Fetching your orders...
        </div>
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <style>{myOrdersStyles}</style>
        <section className="mo-empty">
          <div className="mo-empty-glow" />
          <div className="mo-empty-box ">
            <div className="mo-empty-icon">
              <Package size={44} style={{ color: "#B4232C" }} />
            </div>
            <h1 className="mo-empty-title">No Orders Yet</h1>
            <p className="mo-empty-subtitle">
              Your order journey starts here. Browse our fresh collection and place your first order.
            </p>
            <Link to="/products">
              <button className="mo-cta-btn" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 12, border: "none",
                background: "linear-gradient(135deg, #B4232C, #D4354A)",
                color: "white", fontWeight: 700, fontSize: "0.9rem",
                cursor: "pointer", boxShadow: "0 4px 20px rgba(180,35,44,0.4)",
                transition: "all 0.3s ease",
              }}>
                <ShoppingBag size={18} />
                Start Shopping
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <style>{myOrdersStyles}</style>
      <section className="mo-page mt-10">
        <div className="mo-glow-1" />
        <div className="mo-glow-2" />
        <div className="mo-container">
          {/* Header */}
          <div className="mo-header">
            <div className="mo-header-row">
              <div className="mo-logo-icon">
                <ShoppingBag size={22} color="white" />
              </div>
              <span className="mo-header-tag">
                <Sparkles size={12} />
                Order Journey
              </span>
            </div>
            <h1 className="mo-title">My Orders</h1>
            <p className="mo-subtitle">
              Track every order from kitchen to your doorstep, all in one place.
            </p>
          </div>

          {/* Stats */}
          <div className="mo-stats">
            {[
              { label: "Total Orders", value: orders.length, color: "#C9A227", icon: Package },
              { label: "Active", value: activeCount, color: "#3b82f6", icon: TrendingUp },
              { label: "Completed", value: completedCount, color: "#10b981", icon: CircleCheckBig },
            ].map((stat) => (
              <div
                key={stat.label}
                className="mo-stat-card"
                style={{
                  borderColor: `${stat.color}20`,
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${stat.color}, transparent)`,
                }} />
                <div className="mo-stat-icon">
                  <stat.icon size={18} style={{ color: stat.color }} />
                </div>
                <div className="mo-stat-value" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="mo-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="mo-filter-bar">
            <div className="mo-filter-group">
              {["All", "Active", "Completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`mo-filter-pill ${filter === f ? "active" : ""}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <span className="mo-result-count">
              {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"}
            </span>
          </div>

          {/* Timeline */}
          {Object.keys(grouped).length === 0 ? (
            <div className="mo-no-results">
              <Package size={32} style={{ color: "rgba(255,255,255,0.2)", margin: "0 auto 12px" }} />
              <p className="mo-no-results-text" style={{
                fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.4)",
              }}>
                No {filter.toLowerCase()} orders found
              </p>
            </div>
          ) : (
            <div className="mo-timeline">
              {Object.entries(grouped).map(([dateLabel, dateOrders], groupIdx) => (
                <div key={dateLabel} className="mo-date-group">
                  <div className="mo-date-label">
                    <Calendar size={12} />
                    {dateLabel}
                    <span style={{ opacity: 0.6, marginLeft: 4 }}>({dateOrders.length})</span>
                  </div>

                  {dateOrders.slice().reverse().map((order, i) => {
                    const config = statusConfig[order.orderStatus] || statusConfig["Waiting"];
                    const isDelivered = order.orderStatus === "Delivered";
                    const isExpanded = expanded[order._id];

                    return (
                      <div
                        key={order._id}
                        className="mo-node"
                        style={{ animationDelay: `${(groupIdx * 0.1) + (i * 0.05)}s` }}
                      >
                        {/* Node dot on timeline */}
                        <div className="mo-node-dot" style={{ color: config.color }}>
                          <div
                            className="mo-node-dot-inner"
                            style={{
                              background: config.color,
                              boxShadow: `0 0 12px ${config.color}`,
                            }}
                          />
                        </div>

                        {/* Card */}
                        <div className="mo-node-card">
                          <div className="mo-node-strip" style={{
                            background: `linear-gradient(90deg, ${config.color}, ${config.color}40, transparent)`,
                          }} />

                          <div className="mo-node-content">
                            {/* Top row */}
                            <div className="mo-node-top">
                              <div className="mo-node-id-block">
                                <div
                                  className="mo-node-thumb"
                                  style={{
                                    background: config.bg,
                                    boxShadow: `0 0 15px ${config.color}25`,
                                  }}
                                >
                                  {isDelivered
                                    ? <CircleCheckBig size={20} style={{ color: config.color }} />
                                    : <Package size={20} style={{ color: config.color }} />
                                  }
                                </div>
                                <div style={{ minWidth: 0 }}>
                                  <div className="mo-node-id">#{order.orderNumber}</div>
                                  <div className="mo-node-date">
                                    <Clock size={10} />
                                    {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                                      hour: "2-digit", minute: "2-digit",
                                    })}
                                  </div>
                                </div>
                              </div>

                              <div
                                className="mo-node-status-pill"
                                style={{
                                  background: config.bg,
                                  color: config.color,
                                  border: `1px solid ${config.border}`,
                                }}
                              >
                                <span className="dot" />
                                {config.label}
                              </div>
                            </div>

                            {/* Amount */}
                            <div className="mo-node-amount">₹{order.totalAmount}</div>

                            {/* Toggle items */}
                            {order.items && order.items.length > 0 && (
                              <>
                                <button
                                  onClick={() => toggleExpand(order._id)}
                                  className="mo-node-items-toggle"
                                >
                                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <Package size={14} />
                                    {order.items.length} {order.items.length === 1 ? "item" : "items"} in this order
                                  </span>
                                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>

                                {isExpanded && (
                                  <div className="mo-node-items">
                                    {order.items.map((item) => (
                                      <div key={item._id} className="mo-item-row">
                                        <img
                                          src={item.image}
                                          alt={item.name}
                                          className="mo-item-img"
                                        />
                                        <div className="mo-item-info">
                                          <p className="mo-item-name">{item.name}</p>
                                          <p className="mo-item-qty">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="mo-item-price">₹{item.price}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </>
                            )}

                            {/* Timeline */}
                            <div className="mo-order-timeline">
                              <OrderTimeline status={order.orderStatus} />
                            </div>

                            {/* Actions */}
                            <div className="mo-node-actions">
                              {!isDelivered ? (
                                <Link to="/track-order">
                                  <button
                                    className="mo-action-btn"
                                    style={{
                                      background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`,
                                      color: "white",
                                      boxShadow: `0 4px 15px ${config.color}40`,
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.boxShadow = `0 8px 25px ${config.color}60`;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.boxShadow = `0 4px 15px ${config.color}40`;
                                    }}
                                  >
                                    Track Order
                                    <ArrowRight size={14} />
                                  </button>
                                </Link>
                              ) : (
                                <button
                                  className="mo-action-btn"
                                  style={{
                                    background: "linear-gradient(135deg, #10b981, #059669)",
                                    color: "white",
                                    boxShadow: "0 4px 15px rgba(16,185,129,0.4)",
                                  }}
                                >
                                  <Eye size={14} />
                                  View Receipt
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MyOrders;

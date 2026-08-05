import { useEffect, useState } from "react";
import {
  getCompanyOrders,
  acceptOrder,
  preparingOrder,
  packedOrder,
} from "../../services/orderService";
import {
  Flame,
  Clock,
  CheckCircle2,
  ChefHat,
  PackageCheck,
  Package,
  MapPin,
  Phone,
  User,
  IndianRupee,
  ArrowRight,
  AlertCircle,
  TrendingUp,
  Eye,
} from "lucide-react";

const companyOrdersStyles = `
.co-page {
  position: relative; overflow: hidden;
  padding: 32px 16px 80px; min-height: 100vh;
  background: linear-gradient(180deg, #0a0a0a 0%, #0f0808 40%, #0a0a0a 100%);
}
@media (min-width: 768px) { .co-page { padding: 48px 24px 80px; } }
@media (min-width: 1024px) { .co-page { padding: 64px 32px 80px; } }

.co-glow-1 {
  position: fixed; border-radius: 50%;
  width: 500px; height: 500px;
  top: -100px; left: -150px;
  background: radial-gradient(circle, rgba(212,33,60,0.08) 0%, transparent 70%);
  filter: blur(80px); pointer-events: none;
}
.co-glow-2 {
  position: fixed; border-radius: 50%;
  width: 400px; height: 400px;
  bottom: -100px; right: -150px;
  background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%);
  filter: blur(80px); pointer-events: none;
}

.co-container { position: relative; z-index: 10; max-width: 72rem; margin: 0 auto; }

/* Header */
.co-header {
  margin-bottom: 32px;
  animation: coFadeUp 0.6s ease both;
}
.co-header-row { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; flex-wrap: wrap; }
.co-logo-icon {
  width: 44px; height: 44px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #d4213c, #ff6b35);
  box-shadow: 0 6px 20px rgba(212,33,60,0.4);
}
.co-header-tag {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.7rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  padding: 6px 14px; border-radius: 999px;
  background: rgba(212,33,60,0.1);
  color: #d4213c;
  border: 1px solid rgba(212,33,60,0.25);
}
.co-title {
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 900; letter-spacing: -0.03em; line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #f5e6e6 50%, #d4af37 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.co-subtitle {
  margin-top: 8px; font-size: 0.9rem;
  color: rgba(255,255,255,0.4);
}

/* Status Tabs */
.co-tabs {
  display: flex; gap: 8px; margin-bottom: 28px;
  flex-wrap: wrap;
  animation: coFadeUp 0.6s ease 0.1s both;
}
.co-tab {
  padding: 10px 20px; border-radius: 12px;
  font-size: 0.85rem; font-weight: 700;
  cursor: pointer; transition: all 0.3s ease;
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex; align-items: center; gap: 8px;
  position: relative; overflow: hidden;
}
.co-tab:hover {
  background: rgba(255,255,255,0.06);
  color: #fff;
  border-color: rgba(255,255,255,0.12);
}
.co-tab.active {
  background: linear-gradient(135deg, #d4213c, #ff6b35);
  color: white; border: none;
  box-shadow: 0 4px 15px rgba(212,33,60,0.4);
}
.co-tab-count {
  font-size: 0.7rem; font-weight: 800;
  padding: 2px 8px; border-radius: 999px;
  background: rgba(255,255,255,0.15);
}
.co-tab.active .co-tab-count {
  background: rgba(255,255,255,0.25);
}

/* Stats Row */
.co-stats {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px; margin-bottom: 28px;
  animation: coFadeUp 0.6s ease 0.15s both;
}
.co-stat {
  padding: 14px; border-radius: 14px;
  background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.06);
  position: relative; overflow: hidden;
}
.co-stat::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
}
.co-stat-value { font-size: 1.5rem; font-weight: 900; letter-spacing: -0.02em; }
.co-stat-label {
  margin-top: 4px; font-size: 0.7rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.05em;
  color: rgba(255,255,255,0.4);
}

/* Orders Grid */
.co-grid {
  display: grid; gap: 20px;
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .co-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .co-grid { grid-template-columns: repeat(3, 1fr); }
}

/* Order Card */
.co-card {
  border-radius: 18px; overflow: hidden;
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(.16,.84,.32,1);
  animation: coFadeUp 0.5s ease both;
}
.co-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

.co-card-strip { height: 3px; }

.co-card-body { padding: 20px; }

.co-card-top {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 10px; margin-bottom: 14px;
}
.co-order-num {
  font-weight: 900; font-size: 1.1rem;
  letter-spacing: -0.02em;
}
.co-order-time {
  display: flex; align-items: center; gap: 4px;
  font-size: 0.7rem; margin-top: 3px;
  color: rgba(255,255,255,0.4);
}

.co-status-badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 5px 12px; border-radius: 999px;
  font-size: 0.7rem; font-weight: 700;
  white-space: nowrap;
}
.co-status-badge .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: currentColor;
  animation: coPulse 2s ease-in-out infinite;
}
@keyframes coPulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.4); }
}

.co-customer-info {
  display: flex; align-items: center; gap: 10px;
  padding: 12px; border-radius: 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  margin-bottom: 14px;
}
.co-avatar {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  font-weight: 800; font-size: 0.85rem;
  color: white;
}
.co-customer-name { font-weight: 700; font-size: 0.85rem; color: #fff; margin: 0; }
.co-customer-phone {
  display: flex; align-items: center; gap: 4px;
  font-size: 0.7rem; color: rgba(255,255,255,0.4);
  margin: 2px 0 0 0;
}

.co-items-preview {
  display: flex; flex-wrap: wrap; gap: 6px;
  margin-bottom: 14px;
}
.co-item-chip {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 10px; border-radius: 999px;
  font-size: 0.7rem; font-weight: 600;
  background: rgba(212,175,55,0.08);
  border: 1px solid rgba(212,175,55,0.15);
  color: #d4af37;
}

.co-amount-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px; border-radius: 12px;
  background: rgba(212,175,55,0.06);
  border: 1px solid rgba(212,175,55,0.15);
  margin-bottom: 14px;
}
.co-amount-label {
  font-size: 0.7rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.05em;
  color: rgba(255,255,255,0.5);
}
.co-amount-value {
  font-size: 1.35rem; font-weight: 900;
  color: #d4af37;
  letter-spacing: -0.02em;
}

.co-map-link {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 9px 14px; border-radius: 10px;
  font-size: 0.75rem; font-weight: 600;
  background: rgba(59,130,246,0.1);
  border: 1px solid rgba(59,130,246,0.25);
  color: #60a5fa;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 14px;
}
.co-map-link:hover {
  background: rgba(59,130,246,0.18);
  color: #93bbfc;
}

.co-action-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px; border-radius: 12px;
  font-size: 0.85rem; font-weight: 700;
  cursor: pointer; transition: all 0.3s ease;
  border: none; color: white;
}
.co-action-btn:hover { transform: translateY(-2px); }
.co-action-btn:disabled {
  opacity: 0.6; cursor: not-allowed; transform: none;
}

/* Empty */
.co-empty {
  text-align: center; padding: 80px 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.06);
  animation: coFadeUp 0.5s ease both;
}
.co-empty-icon {
  width: 80px; height: 80px; border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, rgba(212,33,60,0.1), rgba(212,175,55,0.05));
  border: 1px solid rgba(212,33,60,0.2);
}
.co-empty-title {
  font-size: 1.5rem; font-weight: 900;
  background: linear-gradient(135deg, #fff, #e0d0d0);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}
.co-empty-subtitle { color: rgba(255,255,255,0.4); font-size: 0.9rem; }

.co-loading {
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 16px;
  background: linear-gradient(180deg, #0a0a0a, #0f0808 40%, #0a0a0a);
  color: rgba(255,255,255,0.6); font-weight: 600;
}
.co-loader {
  width: 48px; height: 48px; border-radius: 50%;
  border: 3px solid rgba(212,33,60,0.15);
  border-top-color: #d4213c;
  border-right-color: #d4af37;
  animation: coSpin 1s linear infinite;
}
@keyframes coSpin { to { transform: rotate(360deg); } }

@keyframes coFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
`;

const statusConfig = {
  Pending: {
    color: "#f59e0b",
    label: "Pending",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.3)",
    icon: AlertCircle,
    actionLabel: "Accept Order",
    actionIcon: CheckCircle2,
    actionColor: "#d4213c",
    actionGradient: "linear-gradient(135deg, #d4213c, #ff6b35)",
  },
  Accepted: {
    color: "#3b82f6",
    label: "Accepted",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.3)",
    icon: CheckCircle2,
    actionLabel: "Start Preparing",
    actionIcon: ChefHat,
    actionColor: "#8b5cf6",
    actionGradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
  },
  Preparing: {
    color: "#fbbf24",
    label: "Preparing",
    bg: "rgba(251,191,36,0.12)",
    border: "rgba(251,191,36,0.3)",
    icon: ChefHat,
    actionLabel: "Mark Packed",
    actionIcon: PackageCheck,
    actionColor: "#10b981",
    actionGradient: "linear-gradient(135deg, #10b981, #34d399)",
  },
  Packed: {
    color: "#10b981",
    label: "Packed",
    bg: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.3)",
    icon: PackageCheck,
    actionLabel: "Packed ✅",
    actionIcon: PackageCheck,
    actionColor: "#64748b",
    actionGradient: "linear-gradient(135deg, #64748b, #94a3b8)",
  },
};

const Orders = () => {
  const [status, setStatus] = useState("Pending");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadOrders(); }, [status]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await getCompanyOrders(status);
      console.log("Pending Orders API Response:", res);
      setOrders(res.orders);
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  const handleAccept = async (id) => {
    try { await acceptOrder(id); loadOrders(); }
    catch (err) { console.log(err); }
  };
  const handlePreparing = async (id) => {
    try { await preparingOrder(id); loadOrders(); }
    catch (err) { console.log(err); }
  };
  const handlePacked = async (id) => {
    try { await packedOrder(id); loadOrders(); }
    catch (err) { console.log(err); }
  };

  const handleAction = (order) => {
    switch (order.orderStatus) {
      case "Pending": return handleAccept(order._id);
      case "Accepted": return handlePreparing(order._id);
      case "Preparing": return handlePacked(order._id);
      default: break;
    }
  };

  const tabs = [
    { key: "Pending", icon: Clock, label: "Pending" },
    { key: "Accepted", icon: CheckCircle2, label: "Accepted" },
    { key: "Preparing", icon: ChefHat, label: "Preparing" },
    { key: "Packed", icon: PackageCheck, label: "Packed" },
  ];

  if (loading) {
    return (
      <>
        <style>{companyOrdersStyles}</style>
        <div className="co-loading">
          <div className="co-loader" />
          Loading orders...
        </div>
      </>
    );
  }

  return (
    <>
      <style>{companyOrdersStyles}</style>
      <section className="co-page">
        <div className="co-glow-1" />
        <div className="co-glow-2" />
        <div className="co-container">
          {/* Header */}
          <div className="co-header">
            <div className="co-header-row">
              <div className="co-logo-icon">
                <Flame size={22} color="white" />
              </div>
              <span className="co-header-tag">
                <ChefHat size={12} />
                Kitchen Dashboard
              </span>
            </div>
            <h1 className="co-title">Company Orders</h1>
            <p className="co-subtitle">
              Manage orders from kitchen to packed — stay on top of every request.
            </p>
          </div>

          {/* Status Tabs */}
          <div className="co-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatus(tab.key)}
                className={`co-tab ${status === tab.key ? "active" : ""}`}
              >
                <tab.icon size={15} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Orders Grid */}
          {orders.length === 0 ? (
            <div className="co-empty">
              <div className="co-empty-icon">
                <Package size={36} style={{ color: "#d4213c" }} />
              </div>
              <h2 className="co-empty-title">No {status} Orders</h2>
              <p className="co-empty-subtitle">
                {status === "Pending"
                  ? "All caught up! New orders will appear here."
                  : `No orders are currently ${status.toLowerCase()}.`}
              </p>
            </div>
          ) : (
            <div className="co-grid">
              {orders.map((order, i) => {
                const config = statusConfig[order.orderStatus] || statusConfig["Pending"];
                const StatusIcon = config.icon;
                const ActionIcon = config.actionIcon;
                const isDone = order.orderStatus === "Packed";
                const initials = order.customer?.fullName
                  ? order.customer.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
                  : "CU";

                return (
                  <div
                    key={order._id}
                    className="co-card"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    {/* Accent strip */}
                    <div
                      className="co-card-strip"
                      style={{
                        background: `linear-gradient(90deg, ${config.color}, ${config.color}50, transparent)`,
                      }}
                    />

                    <div className="co-card-body">
                      {/* Top row */}
                      <div className="co-card-top">
                        <div>
                          <div className="co-order-num" style={{ color: config.color }}>
                            #{order.orderNumber}
                          </div>
                          <div className="co-order-time">
                            <Clock size={10} />
                            {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                              hour: "2-digit", minute: "2-digit",
                            })}
                          </div>
                        </div>
                        <div
                          className="co-status-badge"
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

                      {/* Customer info */}
                      <div className="co-customer-info">
                        <div
                          className="co-avatar"
                          style={{
                            background: `linear-gradient(135deg, ${config.color}, ${config.color}aa)`,
                            boxShadow: `0 0 12px ${config.color}30`,
                          }}
                        >
                          {initials}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p className="co-customer-name">{order.customer?.fullName || "Customer"}</p>
                          <p className="co-customer-phone">
                            <Phone size={10} />
                            {order.customer?.phone || "—"}
                          </p>
                        </div>
                      </div>

                      {/* Items preview */}
                      <div className="co-items-preview">
                        {order.items?.map((item, idx) => (
                          <span key={idx} className="co-item-chip">
                            {item.name} × {item.quantity}
                          </span>
                        ))}
                      </div>

                      {/* Amount */}
                      <div className="co-amount-row">
                        <span className="co-amount-label">Order Total</span>
                        <span className="co-amount-value">₹{order.totalAmount}</span>
                      </div>

                      {/* Map link */}
                      {order.deliveryAddress?.latitude && order.deliveryAddress?.longitude && (
                        <a
                          href={`https://www.google.com/maps?q=${order.deliveryAddress.latitude},${order.deliveryAddress.longitude}`}
                          target="_blank"
                          rel="noreferrer"
                          className="co-map-link"
                        >
                          <MapPin size={13} />
                          Open in Google Maps
                        </a>
                      )}

                      {/* Action button */}
                      <button
                        onClick={() => handleAction(order)}
                        disabled={isDone}
                        className="co-action-btn"
                        style={{
                          background: isDone
                            ? "rgba(255,255,255,0.06)"
                            : config.actionGradient,
                          color: isDone ? "rgba(255,255,255,0.4)" : "white",
                          boxShadow: isDone ? "none" : `0 4px 15px ${config.actionColor}40`,
                        }}
                        onMouseEnter={(e) => {
                          if (!isDone) {
                            e.currentTarget.style.boxShadow = `0 8px 25px ${config.actionColor}60`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isDone) {
                            e.currentTarget.style.boxShadow = `0 4px 15px ${config.actionColor}40`;
                          }
                        }}
                      >
                        <ActionIcon size={16} />
                        {config.actionLabel}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Orders;

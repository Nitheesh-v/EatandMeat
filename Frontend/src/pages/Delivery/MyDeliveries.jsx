import { useEffect, useState } from "react";
import {
  getMyDeliveries,
  pickupOrder,
  outForDelivery,
  deliveredOrder,
} from "../../services/orderService";
import {
  Bike,
  Package,
  User,
  Phone,
  MapPin,
  IndianRupee,
  Clock,
  Navigation,
  CheckCircle2,
  CircleCheckBig,
  Flame,
  PackageCheck,
  TrendingUp,
} from "lucide-react";

const myDeliveriesStyles = `
.md-page {
  position: relative; overflow: hidden;
  padding: 32px 16px 80px; min-height: 100vh;
  background: linear-gradient(180deg, #0a0a0a 0%, #0f0808 40%, #0a0a0a 100%);
}
@media (min-width: 768px) { .md-page { padding: 48px 24px 80px; } }
@media (min-width: 1024px) { .md-page { padding: 64px 32px 80px; } }

.md-glow-1 {
  position: fixed; border-radius: 50%;
  width: 500px; height: 500px;
  top: -100px; right: -150px;
  background: radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%);
  filter: blur(80px); pointer-events: none;
}
.md-glow-2 {
  position: fixed; border-radius: 50%;
  width: 400px; height: 400px;
  bottom: -100px; left: -150px;
  background: radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%);
  filter: blur(80px); pointer-events: none;
}

.md-container { position: relative; z-index: 10; max-width: 48rem; margin: 0 auto; }

/* Header */
.md-header { margin-bottom: 32px; animation: mdFadeUp 0.6s ease both; }
.md-header-row { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
.md-logo-icon {
  width: 44px; height: 44px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #9333ea, #ec4899);
  box-shadow: 0 6px 20px rgba(147,51,234,0.4);
}
.md-header-tag {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.7rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  padding: 6px 14px; border-radius: 999px;
  background: rgba(139,92,246,0.1);
  color: #a78bfa;
  border: 1px solid rgba(139,92,246,0.25);
}
.md-title {
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 900; letter-spacing: -0.03em; line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #f5e6e6 50%, #f59e0b 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.md-subtitle {
  margin-top: 8px; font-size: 0.9rem;
  color: #94a3b8;
}

/* Stats */
.md-stats {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px; margin-bottom: 28px;
  animation: mdFadeUp 0.6s ease 0.1s both;
}
.md-stat {
  padding: 14px; border-radius: 14px;
  background: linear-gradient(135deg, rgba(147,51,234,0.03), rgba(147,51,234,0.01));
  border: 1px solid rgba(0,0,0,0.06);
  position: relative; overflow: hidden;
}
.md-stat::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
}
.md-stat-value { font-size: 1.5rem; font-weight: 900; letter-spacing: -0.02em; }
.md-stat-label {
  margin-top: 4px; font-size: 0.7rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.05em;
  color: #94a3b8;
}

/* Timeline */
.md-timeline {
  position: relative; padding-left: 28px;
}
@media (min-width: 768px) { .md-timeline { padding-left: 36px; } }

.md-timeline::before {
  content: '';
  position: absolute; left: 11px; top: 8px; bottom: 0;
  width: 2px;
  background: linear-gradient(180deg,
    rgba(139,92,246,0.6) 0%,
    rgba(245,158,11,0.3) 40%,
    rgba(0,0,0,0.06) 100%
  );
}
@media (min-width: 768px) { .md-timeline::before { left: 15px; } }

/* Timeline node */
.md-node {
  position: relative; margin-bottom: 24px;
  animation: mdFadeUp 0.5s ease both;
}
.md-node-dot {
  position: absolute; left: -28px; top: 24px;
  width: 24px; height: 24px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  z-index: 2;
}
@media (min-width: 768px) { .md-node-dot { left: -36px; } }
.md-node-dot-inner {
  width: 10px; height: 10px; border-radius: 50%;
  background: white;
  box-shadow: 0 0 12px currentColor;
}

/* Card */
.md-card {
  border-radius: 18px; overflow: hidden;
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(147,51,234,0.02));
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(.16,.84,.32,1);
}
.md-card:hover {
  transform: translateX(4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.4);
}

.md-card-strip { height: 3px; }
.md-card-body { padding: 20px; }
@media (min-width: 640px) { .md-card-body { padding: 24px; } }

.md-card-top {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 12px; margin-bottom: 16px;
}
.md-order-block { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
.md-order-icon {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.md-order-id { font-weight: 900; font-size: 1rem; color: #fff; }
.md-order-time {
  display: flex; align-items: center; gap: 4px;
  font-size: 0.7rem; color: #94a3b8;
  margin-top: 3px;
}

.md-status-pill {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 5px 12px; border-radius: 999px;
  font-size: 0.7rem; font-weight: 700;
  white-space: nowrap;
}
.md-status-pill .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: currentColor;
  animation: mdPulse 2s ease-in-out infinite;
}
@keyframes mdPulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.4); }
}

/* Customer */
.md-customer {
  display: flex; align-items: center; gap: 12px;
  padding: 12px; border-radius: 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  margin-bottom: 12px;
}
.md-avatar {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  font-weight: 800; font-size: 0.85rem;
  color: white;
}
.md-customer-name { font-weight: 700; font-size: 0.9rem; color: #fff; margin: 0; }
.md-customer-phone {
  display: flex; align-items: center; gap: 4px;
  font-size: 0.75rem; color: #94a3b8;
  margin: 3px 0 0 0;
}

/* Items */
.md-items {
  display: flex; flex-wrap: wrap; gap: 6px;
  margin-bottom: 12px;
}
.md-item-chip {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 10px; border-radius: 999px;
  font-size: 0.7rem; font-weight: 600;
  background: rgba(245,158,11,0.08);
  border: 1px solid rgba(245,158,11,0.15);
  color: #f59e0b;
}

/* Amount */
.md-amount-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px; border-radius: 12px;
  background: rgba(245,158,11,0.06);
  border: 1px solid rgba(245,158,11,0.15);
  margin-bottom: 12px;
}
.md-amount-label {
  font-size: 0.7rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.05em;
  color: rgba(255,255,255,0.5);
}
.md-amount-value {
  font-size: 1.35rem; font-weight: 900;
  color: #f59e0b;
  letter-spacing: -0.02em;
}

/* Map link */
.md-map-link {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 10px 14px; border-radius: 10px;
  font-size: 0.8rem; font-weight: 600;
  background: rgba(59,130,246,0.1);
  border: 1px solid rgba(59,130,246,0.25);
  color: #60a5fa;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 14px;
}
.md-map-link:hover {
  background: rgba(59,130,246,0.18);
  color: #93bbfc;
}

/* Action button */
.md-action-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 13px; border-radius: 12px;
  font-size: 0.9rem; font-weight: 700;
  cursor: pointer; transition: all 0.3s ease;
  border: none; color: white;
}
.md-action-btn:hover { transform: translateY(-2px); }
.md-action-btn:disabled {
  opacity: 0.6; cursor: not-allowed; transform: none;
}

/* Empty */
.md-empty {
  text-align: center; padding: 80px 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(147,51,234,0.01));
  border: 1px solid rgba(0,0,0,0.06);
  animation: mdFadeUp 0.5s ease both;
}
.md-empty-icon {
  width: 80px; height: 80px; border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, rgba(139,92,246,0.1), rgba(139,92,246,0.04));
  border: 1px solid rgba(139,92,246,0.2);
}
.md-empty-title {
  font-size: 1.5rem; font-weight: 900;
  background: linear-gradient(135deg, #fff, #e0d0d0);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}
.md-empty-subtitle { color: #94a3b8; font-size: 0.9rem; }

.md-loading {
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 16px;
  background: linear-gradient(180deg, #0a0a0a, #0f0808 40%, #0a0a0a);
  color: #475569; font-weight: 600;
}
.md-loader {
  width: 48px; height: 48px; border-radius: 50%;
  border: 3px solid rgba(139,92,246,0.15);
  border-top-color: #8b5cf6;
  border-right-color: #f59e0b;
  animation: mdSpin 1s linear infinite;
}
@keyframes mdSpin { to { transform: rotate(360deg); } }

@keyframes mdFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
`;

const statusConfig = {
  Assigned: {
    color: "#3b82f6",
    label: "Assigned",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.3)",
    icon: Package,
    actionLabel: "Picked Up",
    actionIcon: PackageCheck,
    actionGradient: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    actionColor: "#3b82f6",
  },
  "Picked Up": {
    color: "#f59e0b",
    label: "Picked Up",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.3)",
    icon: PackageCheck,
    actionLabel: "Out For Delivery",
    actionIcon: Navigation,
    actionGradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    actionColor: "#f59e0b",
  },
  "Out For Delivery": {
    color: "#8b5cf6",
    label: "On the Way",
    bg: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.3)",
    icon: Navigation,
    actionLabel: "Delivered",
    actionIcon: CircleCheckBig,
    actionGradient: "linear-gradient(135deg, #10b981, #34d399)",
    actionColor: "#10b981",
  },
  Delivered: {
    color: "#10b981",
    label: "Delivered",
    bg: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.3)",
    icon: CircleCheckBig,
    actionLabel: "Delivered ✅",
    actionIcon: CircleCheckBig,
    actionGradient: "linear-gradient(135deg, #64748b, #94a3b8)",
    actionColor: "#64748b",
  },
};

export const MyDeliveries = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadOrders(); }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await getMyDeliveries();
      setOrders(res.orders);
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  const handlePickup = async (id) => {
    try { await pickupOrder(id); loadOrders(); } catch (err) { console.log(err); }
  };
  const handleOutForDelivery = async (id) => {
    try { await outForDelivery(id); loadOrders(); } catch (err) { console.log(err); }
  };
  const handleDelivered = async (id) => {
    try { await deliveredOrder(id); loadOrders(); } catch (err) { console.log(err); }
  };

  const handleAction = (order) => {
    switch (order.orderStatus) {
      case "Assigned": return handlePickup(order._id);
      case "Picked Up": return handleOutForDelivery(order._id);
      case "Out For Delivery": return handleDelivered(order._id);
      default: break;
    }
  };

  const stats = {
    total: orders.length,
    active: orders.filter((o) => o.orderStatus !== "Delivered").length,
    delivered: orders.filter((o) => o.orderStatus === "Delivered").length,
  };

  if (loading) {
    return (
      <>
        <style>{myDeliveriesStyles}</style>
        <div className="md-loading">
          <div className="md-loader" />
          Loading your deliveries...
        </div>
      </>
    );
  }

  return (
    <>
      <style>{myDeliveriesStyles}</style>
      <section className="md-page">
        <div className="md-glow-1" />
        <div className="md-glow-2" />
        <div className="md-container">
          {/* Header */}
          <div className="md-header">
            <div className="md-header-row">
              <div className="md-logo-icon">
                <Bike size={22} color="white" />
              </div>
              <span className="md-header-tag">
                <Navigation size={12} />
                Delivery Dashboard
              </span>
            </div>
            <h1 className="md-title">My Deliveries</h1>
            <p className="md-subtitle">
              Your assigned deliveries — pick up, deliver, and earn.
            </p>
          </div>

          {/* Stats */}
          <div className="md-stats">
            {[
              { label: "Total", value: stats.total, color: "#f59e0b", icon: Package },
              { label: "Active", value: stats.active, color: "#8b5cf6", icon: TrendingUp },
              { label: "Delivered", value: stats.delivered, color: "#10b981", icon: CircleCheckBig },
            ].map((stat) => (
              <div key={stat.label} className="md-stat">
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${stat.color}, transparent)`,
                }} />
                <div style={{ marginBottom: 8 }}>
                  <stat.icon size={16} style={{ color: stat.color }} />
                </div>
                <div className="md-stat-value" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="md-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Timeline or Empty */}
          {orders.length === 0 ? (
            <div className="md-empty">
              <div className="md-empty-icon">
                <Bike size={36} style={{ color: "#a78bfa" }} />
              </div>
              <h2 className="md-empty-title">No Deliveries Assigned</h2>
              <p className="md-empty-subtitle">
                Check back soon — new delivery requests will appear here.
              </p>
            </div>
          ) : (
            <div className="md-timeline">
              {orders.map((order, i) => {
                const config = statusConfig[order.orderStatus] || statusConfig["Assigned"];
                const StatusIcon = config.icon;
                const ActionIcon = config.actionIcon;
                const isDone = order.orderStatus === "Delivered";
                const initials = order.customer?.fullName
                  ? order.customer.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
                  : "CU";

                return (
                  <div
                    key={order._id}
                    className="md-node"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    {/* Dot */}
                    <div className="md-node-dot" style={{ color: config.color }}>
                      <div
                        className="md-node-dot-inner"
                        style={{
                          background: config.color,
                          boxShadow: `0 0 12px ${config.color}`,
                        }}
                      />
                    </div>

                    {/* Card */}
                    <div className="md-card">
                      <div
                        className="md-card-strip"
                        style={{
                          background: `linear-gradient(90deg, ${config.color}, ${config.color}50, transparent)`,
                        }}
                      />

                      <div className="md-card-body">
                        {/* Top */}
                        <div className="md-card-top">
                          <div className="md-order-block">
                            <div
                              className="md-order-icon"
                              style={{
                                background: config.bg,
                                boxShadow: `0 0 15px ${config.color}25`,
                              }}
                            >
                              <StatusIcon size={20} style={{ color: config.color }} />
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div className="md-order-id">#{order.orderNumber}</div>
                              <div className="md-order-time">
                                <Clock size={10} />
                                {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                                  hour: "2-digit", minute: "2-digit",
                                })}
                              </div>
                            </div>
                          </div>

                          <div
                            className="md-status-pill"
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

                        {/* Customer */}
                        <div className="md-customer">
                          <div
                            className="md-avatar"
                            style={{
                              background: `linear-gradient(135deg, ${config.color}, ${config.color}aa)`,
                              boxShadow: `0 0 12px ${config.color}30`,
                            }}
                          >
                            {initials}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <p className="md-customer-name">{order.customer?.fullName || "Customer"}</p>
                            <p className="md-customer-phone">
                              <Phone size={10} />
                              {order.customer?.phone || "—"}
                            </p>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="md-items">
                          {order.items?.map((item, idx) => (
                            <span key={idx} className="md-item-chip">
                              {item.name} × {item.quantity}
                            </span>
                          ))}
                        </div>

                        {/* Amount */}
                        <div className="md-amount-row">
                          <span className="md-amount-label">Order Total</span>
                          <span className="md-amount-value">₹{order.totalAmount}</span>
                        </div>

                        {/* Map link */}
                        {order.deliveryAddress?.latitude && order.deliveryAddress?.longitude && (
                          <a
                            href={`https://www.google.com/maps?q=${order.deliveryAddress.latitude},${order.deliveryAddress.longitude}`}
                            target="_blank"
                            rel="noreferrer"
                            className="md-map-link"
                          >
                            <MapPin size={14} />
                            Navigate to Customer
                          </a>
                        )}

                        {/* Action */}
                        <button
                          onClick={() => handleAction(order)}
                          disabled={isDone}
                          className="md-action-btn"
                          style={{
                            background: isDone
                              ? "rgba(0,0,0,0.06)"
                              : config.actionGradient,
                            color: isDone ? "#94a3b8" : "white",
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
                          <ActionIcon size={18} />
                          {config.actionLabel}
                        </button>
                      </div>
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

export default MyDeliveries;

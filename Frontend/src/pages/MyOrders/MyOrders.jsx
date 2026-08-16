import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../services/orderService";
import OrderTimeline from "../../components/Order/OrderTimeline";
import {
  ShoppingBag, ArrowRight, Package, CircleCheckBig,
  Clock, ChevronDown, ChevronUp, Calendar, TrendingUp, Eye,
} from "lucide-react";

const primary = "#B4232C";
const gold = "#C9A227";
const deep = "#24140F";
const beige = "#F5F0E8";
const text = "#30231E";

const statusConfig = {
  Pending: { color: "#D97706", label: "Pending", bg: "rgba(217,119,6,0.08)", border: "rgba(217,119,6,0.2)" },
  Accepted: { color: "#2563EB", label: "Accepted", bg: "rgba(37,99,235,0.08)", border: "rgba(37,99,235,0.2)" },
  Preparing: { color: "#EA580C", label: "Preparing", bg: "rgba(234,88,12,0.08)", border: "rgba(234,88,12,0.2)" },
  Packed: { color: "#16A34A", label: "Packed", bg: "rgba(22,163,74,0.08)", border: "rgba(22,163,74,0.2)" },
  Assigned: { color: "#7C3AED", label: "Assigned", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)" },
  "Picked Up": { color: "#0891B2", label: "Picked Up", bg: "rgba(8,145,178,0.08)", border: "rgba(8,145,178,0.2)" },
  "Out For Delivery": { color: "#EA580C", label: "On the Way", bg: "rgba(234,88,12,0.08)", border: "rgba(234,88,12,0.2)" },
  Delivered: { color: "#16A34A", label: "Delivered", bg: "rgba(22,163,74,0.08)", border: "rgba(22,163,74,0.2)" },
  Cancelled: { color: "#DC2626", label: "Cancelled", bg: "rgba(220,38,38,0.08)", border: "rgba(220,38,38,0.2)" },
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

  useEffect(() => {
    const load = async () => {
      try { const res = await getMyOrders(); setOrders(res.orders || []); }
      catch (err) { console.log(err); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const filteredOrders = filter === "All" ? orders : orders.filter((o) => {
    if (filter === "Active") return o.orderStatus !== "Delivered";
    if (filter === "Completed") return o.orderStatus === "Delivered";
    return true;
  });

  const grouped = groupByDate(filteredOrders);
  const activeCount = orders.filter((o) => o.orderStatus !== "Delivered").length;
  const completedCount = orders.filter((o) => o.orderStatus === "Delivered").length;
  const toggleExpand = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  if (loading) {
    return (
      <div style={{ background: beige, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", border: `3px solid #E8DFD3`, borderTopColor: primary, animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ background: beige, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, paddingTop: 100 }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{ width: 100, height: 100, borderRadius: 24, margin: "0 auto 24px", background: "rgba(180,35,44,0.06)", border: "1px solid rgba(180,35,44,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Package size={44} style={{ color: primary }} />
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: deep, margin: "0 0 8px" }}>No Orders Yet</h1>
          <p style={{ color: "#8B7355", fontSize: "0.9rem", margin: "0 0 24px" }}>Your order journey starts here.</p>
          <Link to="/products">
            <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: primary, color: "white", fontWeight: 700, fontSize: "0.9rem", border: "none", cursor: "pointer" }}>
              <ShoppingBag size={18} /> Start Shopping <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section style={{ background: beige, minHeight: "100vh", paddingTop: 88, paddingBottom: 60 }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: deep, margin: "0 0 4px" }}>
            My <span style={{ color: primary }}>Orders</span>
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#8B7355" }}>Track every order from kitchen to doorstep</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Total", value: orders.length, color: gold },
            { label: "Active", value: activeCount, color: primary },
            { label: "Completed", value: completedCount, color: "#16A34A" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "#FFFFFF", borderRadius: 10, padding: "14px", border: "1px solid #E8DFD3",
              textAlign: "center",
            }}>
              <p style={{ fontSize: "1.25rem", fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: "0.68rem", fontWeight: 600, color: "#8B7355", textTransform: "uppercase", letterSpacing: "0.04em", margin: "4px 0 0" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div style={{
          display: "flex", gap: 4, marginBottom: 20, padding: 4,
          background: "#FFFFFF", borderRadius: 10, border: "1px solid #E8DFD3",
        }}>
          {["All", "Active", "Completed"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              flex: 1, padding: "8px 12px", borderRadius: 8, border: "none",
              fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              background: filter === f ? primary : "transparent",
              color: filter === f ? "white" : "#8B7355",
            }}>{f}</button>
          ))}
        </div>

        {/* Timeline */}
        {Object.keys(grouped).length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, background: "#FFFFFF", borderRadius: 12, border: "1px solid #E8DFD3" }}>
            <p style={{ color: "#8B7355", fontSize: "0.85rem" }}>No {filter.toLowerCase()} orders found</p>
          </div>
        ) : (
          <div>
            {Object.entries(grouped).map(([dateLabel, dateOrders]) => (
              <div key={dateLabel} style={{ marginBottom: 28 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "5px 12px", borderRadius: 8, marginBottom: 14,
                  background: "rgba(180,35,44,0.06)", border: "1px solid rgba(180,35,44,0.12)",
                  fontSize: "0.72rem", fontWeight: 700, color: primary, textTransform: "uppercase", letterSpacing: "0.04em",
                }}>
                  <Calendar size={12} /> {dateLabel} ({dateOrders.length})
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {dateOrders.slice().reverse().map((order) => {
                    const config = statusConfig[order.orderStatus] || statusConfig.Pending;
                    const isDelivered = order.orderStatus === "Delivered";
                    const isExpanded = expanded[order._id];

                    return (
                      <div key={order._id} style={{
                        background: "#FFFFFF", borderRadius: 12, overflow: "hidden",
                        border: "1px solid #E8DFD3", transition: "all 0.2s",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(36,20,15,0.06)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                      >
                        <div style={{ height: 3, background: `linear-gradient(90deg, ${config.color}, ${config.color}40, transparent)` }} />
                        <div style={{ padding: "16px 20px" }}>
                          {/* Top */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: config.bg, display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                {isDelivered ? <CircleCheckBig size={18} style={{ color: config.color }} /> : <Package size={18} style={{ color: config.color }} />}
                              </div>
                              <div>
                                <div style={{ fontWeight: 800, fontSize: "0.95rem", color: deep }}>#{order.orderNumber}</div>
                                <div style={{ fontSize: "0.72rem", color: "#8B7355", display: "flex", alignItems: "center", gap: 4 }}>
                                  <Clock size={10} /> {new Date(order.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                                </div>
                              </div>
                            </div>
                            <span style={{
                              display: "inline-flex", alignItems: "center", gap: 4,
                              padding: "4px 10px", borderRadius: 8,
                              fontSize: "0.72rem", fontWeight: 700,
                              background: config.bg, color: config.color, border: `1px solid ${config.border}`,
                            }}>
                              <span style={{ width: 5, height: 5, borderRadius: "50%", background: config.color }} />
                              {config.label}
                            </span>
                          </div>

                          {/* Amount */}
                          <div style={{ fontSize: "1.2rem", fontWeight: 800, color: primary, marginBottom: 12 }}>
                            ₹{order.totalAmount}
                          </div>

                          {/* Items toggle */}
                          {order.items?.length > 0 && (
                            <>
                              <button onClick={() => toggleExpand(order._id)} style={{
                                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                                padding: "8px 12px", borderRadius: 8, background: beige,
                                border: "1px solid #E8DFD3", color: "#8B7355", fontSize: "0.78rem", fontWeight: 600,
                                cursor: "pointer", transition: "all 0.2s",
                              }}>
                                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <Package size={13} /> {order.items.length} items
                                </span>
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </button>

                              {isExpanded && (
                                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                                  {order.items.map((item) => (
                                    <div key={item._id} style={{
                                      display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                                      borderRadius: 8, background: beige, border: "1px solid #E8DFD3",
                                    }}>
                                      <img src={item.image} alt={item.name} style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }} />
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontWeight: 600, fontSize: "0.82rem", color: deep, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                                        <p style={{ fontSize: "0.68rem", color: "#8B7355", margin: "2px 0 0" }}>Qty: {item.quantity}</p>
                                      </div>
                                      <p style={{ fontWeight: 800, fontSize: "0.82rem", color: gold, margin: 0 }}>₹{item.price}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          )}

                          {/* Timeline */}
                          <div style={{ marginTop: 12 }}>
                            <OrderTimeline status={order.orderStatus} />
                          </div>

                          {/* Actions */}
                          <div style={{ display: "flex", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "1px solid #F5F0E8" }}>
                            {!isDelivered ? (
                              <Link to="/track-order">
                                <button style={{
                                  display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px",
                                  borderRadius: 8, background: primary, color: "white", fontWeight: 700,
                                  fontSize: "0.78rem", border: "none", cursor: "pointer",
                                }}>
                                  Track Order <ArrowRight size={13} />
                                </button>
                              </Link>
                            ) : (
                              <button style={{
                                display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px",
                                borderRadius: 8, background: "#16A34A", color: "white", fontWeight: 700,
                                fontSize: "0.78rem", border: "none", cursor: "pointer",
                              }}>
                                <Eye size={13} /> View Receipt
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;

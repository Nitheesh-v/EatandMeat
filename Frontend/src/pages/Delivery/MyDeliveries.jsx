import { useEffect, useState } from "react";
import { getMyDeliveries, pickupOrder, outForDelivery, deliveredOrder } from "../../services/orderService";
import { Bike, Package, User, Phone, MapPin, Clock, Navigation, CircleCheckBig, PackageCheck, TrendingUp } from "lucide-react";

const c = { plum: "#5B3A57", rose: "#D9829B", champagne: "#D6B77A", bg: "#FCF8FA", text: "#352832", textSec: "#8B7585" };

const statusConfig = {
  Assigned: { color: "#7C3AED", label: "Assigned", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", icon: Package, actionLabel: "Picked Up", actionIcon: PackageCheck, actionBg: "linear-gradient(135deg, #7C3AED, #8B5CF6)" },
  "Picked Up": { color: "#D97706", label: "Picked Up", bg: "rgba(217,119,6,0.08)", border: "rgba(217,119,6,0.2)", icon: PackageCheck, actionLabel: "Out For Delivery", actionIcon: Navigation, actionBg: "linear-gradient(135deg, #D97706, #F59E0B)" },
  "Out For Delivery": { color: "#0891B2", label: "On the Way", bg: "rgba(8,145,178,0.08)", border: "rgba(8,145,178,0.2)", icon: Navigation, actionLabel: "Mark Delivered", actionIcon: CircleCheckBig, actionBg: "linear-gradient(135deg, #16A34A, #22C55E)" },
  Delivered: { color: "#16A34A", label: "Delivered", bg: "rgba(22,163,74,0.08)", border: "rgba(22,163,74,0.2)", icon: CircleCheckBig, actionLabel: "Delivered ✓", actionIcon: CircleCheckBig, actionBg: "#E2E8F0" },
};

export const MyDeliveries = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);
    try { const res = await getMyDeliveries(); setOrders(res.orders || []); }
    catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadOrders(); }, []);

  const handleAction = async (order) => {
    try {
      if (order.orderStatus === "Assigned") await pickupOrder(order._id);
      else if (order.orderStatus === "Picked Up") await outForDelivery(order._id);
      else if (order.orderStatus === "Out For Delivery") await deliveredOrder(order._id);
      loadOrders();
    } catch (err) { alert(err.response?.data?.message || "Error"); }
  };

  const stats = {
    total: orders.length,
    active: orders.filter((o) => o.orderStatus !== "Delivered").length,
    delivered: orders.filter((o) => o.orderStatus === "Delivered").length,
  };

  if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, color: c.textSec }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: c.text, margin: 0 }}>My Deliveries</h1>
        <p style={{ fontSize: "0.82rem", color: c.textSec, margin: "2px 0 0" }}>Pick up, deliver, and earn</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total", value: stats.total, color: c.champagne },
          { label: "Active", value: stats.active, color: c.plum },
          { label: "Delivered", value: stats.delivered, color: "#16A34A" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#FFFFFF", borderRadius: 10, padding: "14px", border: "1px solid rgba(91,58,87,0.08)", textAlign: "center" }}>
            <p style={{ fontSize: "1.25rem", fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</p>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, color: c.textSec, textTransform: "uppercase", letterSpacing: "0.04em", margin: "4px 0 0" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {orders.length === 0 ? (
        <div style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid rgba(91,58,87,0.08)", padding: "48px 20px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(91,58,87,0.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: c.plum }}>
            <Bike size={26} />
          </div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: c.text, margin: "0 0 4px" }}>No Deliveries Assigned</h2>
          <p style={{ color: c.textSec, fontSize: "0.82rem", margin: 0 }}>Check back soon for new requests.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {orders.map((order) => {
            const config = statusConfig[order.orderStatus] || statusConfig.Assigned;
            const isDone = order.orderStatus === "Delivered";
            const initials = order.customer?.fullName?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "CU";

            return (
              <div key={order._id} style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(91,58,87,0.08)", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(91,58,87,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ height: 3, background: `linear-gradient(90deg, ${config.color}, ${config.color}40, transparent)` }} />
                <div style={{ padding: "16px 20px" }}>
                  {/* Top */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: config.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <config.icon size={18} style={{ color: config.color }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "0.95rem", color: c.text }}>#{order.orderNumber}</div>
                        <div style={{ fontSize: "0.7rem", color: c.textSec, display: "flex", alignItems: "center", gap: 4 }}>
                          <Clock size={10} /> {new Date(order.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 8, fontSize: "0.72rem", fontWeight: 700, background: config.bg, color: config.color, border: `1px solid ${config.border}` }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: config.color }} />
                      {config.label}
                    </span>
                  </div>

                  {/* Customer */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "rgba(91,58,87,0.02)", border: "1px solid rgba(91,58,87,0.05)", marginBottom: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: `linear-gradient(135deg, ${c.plum}, ${c.rose})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "0.75rem" }}>{initials}</div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: "0.85rem", color: c.text, margin: 0 }}>{order.customer?.fullName || "Customer"}</p>
                      <p style={{ fontSize: "0.72rem", color: c.textSec, margin: 0, display: "flex", alignItems: "center", gap: 4 }}><Phone size={10} /> {order.customer?.phone || "—"}</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                    {order.items?.map((item, idx) => (
                      <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "3px 10px", borderRadius: 999, fontSize: "0.7rem", fontWeight: 600, background: "rgba(214,183,122,0.08)", border: "1px solid rgba(214,183,122,0.15)", color: c.champagne }}>
                        {item.name} × {item.quantity}
                      </span>
                    ))}
                  </div>

                  {/* Amount */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 10, background: "rgba(214,183,122,0.06)", border: "1px solid rgba(214,183,122,0.12)", marginBottom: 10 }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: c.textSec }}>Order Total</span>
                    <span style={{ fontSize: "1.2rem", fontWeight: 900, color: c.champagne }}>₹{order.totalAmount}</span>
                  </div>

                  {/* Map */}
                  {order.deliveryAddress?.latitude && (
                    <a href={`https://www.google.com/maps?q=${order.deliveryAddress.latitude},${order.deliveryAddress.longitude}`} target="_blank" rel="noreferrer"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 14px", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)", color: "#2563EB", textDecoration: "none", marginBottom: 10 }}>
                      <MapPin size={13} /> Navigate to Customer
                    </a>
                  )}

                  {/* Action */}
                  <button onClick={() => handleAction(order)} disabled={isDone} style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "11px", borderRadius: 10, fontSize: "0.85rem", fontWeight: 700,
                    cursor: isDone ? "not-allowed" : "pointer", border: "none", transition: "all 0.2s",
                    background: isDone ? "#F1F5F9" : config.actionBg, color: isDone ? c.textSec : "white",
                    boxShadow: isDone ? "none" : `0 2px 8px ${config.color}30`,
                  }}>
                    <config.actionIcon size={16} /> {config.actionLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyDeliveries;

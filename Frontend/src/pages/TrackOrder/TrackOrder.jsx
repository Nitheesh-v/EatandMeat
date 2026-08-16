import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../services/orderService";
import OrderTimeline from "../../components/Order/OrderTimeline";
import {
  Package, Clock, Phone, User, MapPin, IndianRupee,
  Truck, Navigation, Flame, ShoppingBag, ArrowRight,
} from "lucide-react";

const primary = "#B4232C";
const gold = "#C9A227";
const deep = "#24140F";
const cream = "#FAF7F2";
const text = "#30231E";

const statusColors = {
  Pending: { color: "#D97706", label: "Pending", bg: "rgba(217,119,6,0.08)" },
  Accepted: { color: "#2563EB", label: "Accepted", bg: "rgba(37,99,235,0.08)" },
  Preparing: { color: "#EA580C", label: "Preparing", bg: "rgba(234,88,12,0.08)" },
  Packed: { color: "#16A34A", label: "Packed", bg: "rgba(22,163,74,0.08)" },
  Assigned: { color: "#7C3AED", label: "Assigned", bg: "rgba(124,58,237,0.08)" },
  "Picked Up": { color: "#0891B2", label: "Picked Up", bg: "rgba(8,145,178,0.08)" },
  "Out For Delivery": { color: "#EA580C", label: "On the Way", bg: "rgba(234,88,12,0.08)" },
  Delivered: { color: "#16A34A", label: "Delivered", bg: "rgba(22,163,74,0.08)" },
  Cancelled: { color: "#DC2626", label: "Cancelled", bg: "rgba(220,38,38,0.08)" },
};

export const TrackOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyOrders();
        const activeOrders = (res.orders || []).filter(
          (o) => o.orderStatus !== "Delivered" && o.orderStatus !== "Cancelled"
        );
        setOrders(activeOrders);
        if (activeOrders.length > 0) setSelectedId(activeOrders[0]._id);
      } catch (err) { console.log(err); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div style={{ background: cream, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", border: `3px solid #E8DFD3`, borderTopColor: primary, animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ background: cream, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, paddingTop: 100 }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{ width: 100, height: 100, borderRadius: 24, margin: "0 auto 24px", background: "rgba(180,35,44,0.06)", border: "1px solid rgba(180,35,44,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Package size={44} style={{ color: primary }} />
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: deep, margin: "0 0 8px" }}>No Active Orders</h1>
          <p style={{ color: "#8B7355", fontSize: "0.9rem", margin: "0 0 24px" }}>Place an order to track it here.</p>
          <Link to="/products">
            <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: primary, color: "white", fontWeight: 700, fontSize: "0.9rem", border: "none", cursor: "pointer" }}>
              <ShoppingBag size={18} /> Browse Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const order = orders.find((o) => o._id === selectedId) || orders[0];
  const sc = statusColors[order.orderStatus] || statusColors.Pending;

  return (
    <section style={{ background: cream, minHeight: "100vh", paddingTop: 88, paddingBottom: 60 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Navigation size={16} style={{ color: primary }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: primary, textTransform: "uppercase", letterSpacing: "0.04em" }}>Live Tracking</span>
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: deep, margin: 0 }}>
            Track Your <span style={{ color: primary }}>Order</span>
          </h1>
        </div>

        {/* Order selector */}
        {orders.length > 1 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {orders.map((o) => (
              <button key={o._id} onClick={() => setSelectedId(o._id)} style={{
                padding: "6px 14px", borderRadius: 8, border: "none", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                background: selectedId === o._id ? primary : "#FFFFFF",
                color: selectedId === o._id ? "white" : text,
                border: `1px solid ${selectedId === o._id ? primary : "#E8DFD3"}`,
              }}>
                #{o.orderNumber}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}
          className="track-grid">

          {/* Left: Order Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Order Card */}
            <div style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid #E8DFD3", overflow: "hidden" }}>
              <div style={{ height: 3, background: `linear-gradient(90deg, ${sc.color}, ${sc.color}40, transparent)` }} />
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: deep, margin: 0 }}>#{order.orderNumber}</h2>
                    <p style={{ fontSize: "0.72rem", color: "#8B7355", margin: "2px 0 0", display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={10} /> {new Date(order.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 4, padding: "5px 12px", borderRadius: 8,
                    fontSize: "0.72rem", fontWeight: 700, background: sc.bg, color: sc.color,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.color }} />
                    {sc.label}
                  </span>
                </div>

                {/* Customer */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: beige, border: "1px solid #E8DFD3", marginBottom: 12 }}>
                  <User size={16} style={{ color: primary }} />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", color: text, margin: 0 }}>{order.deliveryAddress?.fullName || order.customer?.fullName || "You"}</p>
                    <p style={{ fontSize: "0.72rem", color: "#8B7355", margin: 0 }}>{order.deliveryAddress?.phone || order.customer?.phone || ""}</p>
                  </div>
                </div>

                {/* Items */}
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#8B7355", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Items</p>
                  {order.items?.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #F5F0E8" }}>
                      <span style={{ fontSize: "0.82rem", color: text }}>{item.name} × {item.quantity}</span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 700, color: text }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #E8DFD3" }}>
                  <span style={{ fontWeight: 700, color: deep }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: "1.1rem", color: primary }}>₹{order.totalAmount}</span>
                </div>

                {/* Map Link */}
                {order.deliveryAddress?.latitude && (
                  <a href={`https://www.google.com/maps?q=${order.deliveryAddress.latitude},${order.deliveryAddress.longitude}`} target="_blank" rel="noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 14px", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)", color: "#2563EB", textDecoration: "none", marginTop: 12 }}>
                    <MapPin size={13} /> Open in Google Maps
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right: Timeline */}
          <div style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid #E8DFD3", overflow: "hidden" }}>
            <div style={{ height: 3, background: `linear-gradient(90deg, ${primary}, ${gold})` }} />
            <div style={{ padding: 20 }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: deep, margin: "0 0 16px" }}>Order Progress</h2>
              <OrderTimeline status={order.orderStatus} />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) { .track-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
};

import { useEffect, useState } from "react";
import { getCompanyOrders } from "../../services/orderService";
import { LayoutDashboard, Clock, ChefHat, PackageCheck, IndianRupee, TrendingUp, ShoppingBag } from "lucide-react";

const c = { red: "#641F28", gold: "#C9A227", bg: "#F6F3EF", card: "#FFFFFF", text: "#2B1B14", textSec: "#8B7355", border: "#E2D5C8" };

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try { const res = await getCompanyOrders(""); setOrders(res.orders || []); }
      catch (err) { console.log(err); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === "Pending").length;
  const preparingOrders = orders.filter((o) => o.orderStatus === "Preparing").length;
  const packedOrders = orders.filter((o) => o.orderStatus === "Packed").length;
  const deliveredOrders = orders.filter((o) => o.orderStatus === "Delivered").length;
  const revenue = orders.filter((o) => o.orderStatus === "Delivered").reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const stats = [
    { label: "Total Orders", value: totalOrders, icon: ShoppingBag, color: c.red, bg: "rgba(100,31,40,0.08)" },
    { label: "Pending", value: pendingOrders, icon: Clock, color: "#D97706", bg: "rgba(217,119,6,0.08)" },
    { label: "Preparing", value: preparingOrders, icon: ChefHat, color: "#EA580C", bg: "rgba(234,88,12,0.08)" },
    { label: "Packed", value: packedOrders, icon: PackageCheck, color: "#16A34A", bg: "rgba(22,163,74,0.08)" },
    { label: "Delivered", value: deliveredOrders, icon: TrendingUp, color: "#16A34A", bg: "rgba(22,163,74,0.08)" },
    { label: "Revenue", value: `₹${revenue}`, icon: IndianRupee, color: c.gold, bg: "rgba(201,162,39,0.08)" },
  ];

  if (loading) return <div style={{ textAlign: "center", padding: 40, color: c.textSec }}>Loading...</div>;

  const statusColors = {
    Pending: { color: "#D97706", bg: "rgba(217,119,6,0.08)" },
    Accepted: { color: "#2563EB", bg: "rgba(37,99,235,0.08)" },
    Preparing: { color: "#EA580C", bg: "rgba(234,88,12,0.08)" },
    Packed: { color: "#16A34A", bg: "rgba(22,163,74,0.08)" },
    Delivered: { color: "#16A34A", bg: "rgba(22,163,74,0.08)" },
    Cancelled: { color: "#DC2626", bg: "rgba(220,38,38,0.08)" },
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: c.text, margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: "0.82rem", color: c.textSec, margin: "2px 0 0" }}>Store overview</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: 16, transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(43,27,20,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              <s.icon size={17} style={{ color: s.color }} />
            </div>
            <div style={{ fontSize: "0.68rem", fontWeight: 600, color: c.textSec, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: c.text }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${c.border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <ShoppingBag size={15} style={{ color: c.red }} />
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: c.text, margin: 0 }}>Recent Orders</h2>
        </div>
        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: 32, color: c.textSec, fontSize: "0.85rem" }}>No orders yet</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["Order", "Customer", "Items", "Total", "Status", "Date"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 18px", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: c.textSec, background: c.bg, borderBottom: `1px solid ${c.border}` }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => {
                  const sc = statusColors[order.orderStatus] || statusColors.Pending;
                  return (
                    <tr key={order._id} style={{ borderBottom: `1px solid ${c.border}` }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = c.bg; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                      <td style={{ padding: "10px 18px", fontSize: "0.82rem", fontWeight: 600, color: c.red }}>#{order.orderNumber}</td>
                      <td style={{ padding: "10px 18px", fontSize: "0.82rem", color: c.text }}>{order.customer?.fullName || "—"}</td>
                      <td style={{ padding: "10px 18px", fontSize: "0.82rem", color: c.textSec }}>{order.items?.length || 0} items</td>
                      <td style={{ padding: "10px 18px", fontSize: "0.82rem", fontWeight: 700, color: c.text }}>₹{order.totalAmount}</td>
                      <td style={{ padding: "10px 18px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 600, background: sc.bg, color: sc.color }}>{order.orderStatus}</span>
                      </td>
                      <td style={{ padding: "10px 18px", fontSize: "0.78rem", color: c.textSec }}>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

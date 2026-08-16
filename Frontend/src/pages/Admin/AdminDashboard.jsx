import { useEffect, useState } from "react";
import { getAdminStats } from "../../services/adminService";
import { getAdminOrders } from "../../services/adminService";
import {
  Users,
  ShoppingBag,
  Package,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Clock,
  Truck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChefHat,
  Calendar,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

const c = {
  blue: "#2563EB",
  cyan: "#06B6D4",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  text: "#172033",
  textSec: "#64748B",
  border: "#E2E8F0",
  green: "#16A34A",
  greenBg: "rgba(22,163,74,0.08)",
  red: "#DC2626",
  redBg: "rgba(220,38,38,0.08)",
  orange: "#EA580C",
  orangeBg: "rgba(234,88,12,0.08)",
  purple: "#7C3AED",
  purpleBg: "rgba(124,58,237,0.08)",
};

const StatCard = ({ icon: Icon, label, value, trend, trendUp, color, colorBg }) => (
  <div style={{
    background: c.card, border: `1px solid ${c.border}`, borderRadius: 12,
    padding: "20px", transition: "all 0.2s ease",
  }}
    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: colorBg, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={20} style={{ color }} />
      </div>
      {trend && (
        <div style={{
          display: "flex", alignItems: "center", gap: 3, fontSize: "0.72rem", fontWeight: 600,
          color: trendUp ? c.green : c.red, background: trendUp ? c.greenBg : c.redBg,
          padding: "3px 8px", borderRadius: 6,
        }}>
          {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trend}
        </div>
      )}
    </div>
    <div style={{ fontSize: "0.72rem", fontWeight: 600, color: c.textSec, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>
      {label}
    </div>
    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: c.text, letterSpacing: "-0.02em" }}>
      {value}
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          getAdminStats(),
          getAdminOrders({}),
        ]);
        setStats(statsRes.stats);
        setRecentOrders((ordersRes.orders || []).slice(0, 8));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300, color: c.textSec }}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${c.border}`, borderTopColor: c.blue, animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const statusColors = {
    Pending: { color: "#D97706", bg: "rgba(217,119,6,0.08)" },
    Accepted: { color: c.blue, bg: "rgba(37,99,235,0.08)" },
    Preparing: { color: c.orange, bg: c.orangeBg },
    Packed: { color: c.green, bg: c.greenBg },
    Assigned: { color: c.purple, bg: c.purpleBg },
    "Picked Up": { color: "#0891B2", bg: "rgba(8,145,178,0.08)" },
    "Out For Delivery": { color: c.orange, bg: c.orangeBg },
    Delivered: { color: c.green, bg: c.greenBg },
    Cancelled: { color: c.red, bg: c.redBg },
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: c.text, margin: 0 }}>
          Dashboard
        </h1>
        <p style={{ fontSize: "0.85rem", color: c.textSec, margin: "4px 0 0" }}>
          Overview of your store performance
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard icon={ShoppingBag} label="Total Orders" value={stats?.totalOrders || 0} trend="+12%" trendUp color={c.blue} colorBg="rgba(37,99,235,0.08)" />
        <StatCard icon={Clock} label="Pending" value={stats?.pendingOrders || 0} color={c.orange} colorBg={c.orangeBg} />
        <StatCard icon={ChefHat} label="Preparing" value={stats?.preparingOrders || 0} color="#D97706" colorBg="rgba(217,119,6,0.08)" />
        <StatCard icon={Package} label="Packed" value={stats?.packedOrders || 0} color={c.green} colorBg={c.greenBg} />
        <StatCard icon={CheckCircle2} label="Delivered" value={stats?.deliveredOrders || 0} trend="+8%" trendUp color={c.green} colorBg={c.greenBg} />
        <StatCard icon={IndianRupee} label="Total Revenue" value={`₹${stats?.totalRevenue || 0}`} trend="+15%" trendUp color="#7C3AED" colorBg={c.purpleBg} />
        <StatCard icon={IndianRupee} label="Today's Revenue" value={`₹${stats?.todayRevenue || 0}`} color={c.cyan} colorBg="rgba(6,182,212,0.08)" />
        <StatCard icon={Users} label="Customers" value={stats?.totalCustomers || 0} color={c.blue} colorBg="rgba(37,99,235,0.08)" />
      </div>

      {/* Low Stock Alert */}
      {(stats?.lowStockProducts > 0 || stats?.outOfStockProducts > 0) && (
        <div style={{
          display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
          borderRadius: 10, marginBottom: 24,
          background: "rgba(234,88,12,0.06)", border: "1px solid rgba(234,88,12,0.15)",
        }}>
          <AlertTriangle size={18} style={{ color: c.orange, flexShrink: 0 }} />
          <span style={{ fontSize: "0.82rem", color: c.text, fontWeight: 500 }}>
            <strong>{stats.lowStockProducts}</strong> products low on stock
            {stats.outOfStockProducts > 0 && <> · <strong style={{ color: c.red }}>{stats.outOfStockProducts}</strong> out of stock</>}
          </span>
        </div>
      )}

      {/* Recent Orders Table */}
      <div style={{
        background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, overflow: "hidden",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px", borderBottom: `1px solid ${c.border}`,
        }}>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: c.text, margin: 0 }}>
            Recent Orders
          </h2>
          <a href="/admin/orders" style={{ fontSize: "0.78rem", fontWeight: 600, color: c.blue, textDecoration: "none" }}>
            View All →
          </a>
        </div>

        {recentOrders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: c.textSec, fontSize: "0.85rem" }}>
            No orders yet
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Order", "Customer", "Items", "Total", "Status", "Date"].map((h) => (
                    <th key={h} style={{
                      textAlign: "left", padding: "10px 20px", fontSize: "0.7rem",
                      fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em",
                      color: c.textSec, background: c.bg, borderBottom: `1px solid ${c.border}`,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const sc = statusColors[order.orderStatus] || statusColors.Pending;
                  return (
                    <tr key={order._id} style={{ borderBottom: `1px solid ${c.border}` }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = c.bg; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <td style={{ padding: "12px 20px", fontSize: "0.82rem", fontWeight: 600, color: c.blue }}>
                        #{order.orderNumber}
                      </td>
                      <td style={{ padding: "12px 20px", fontSize: "0.82rem", color: c.text }}>
                        {order.customer?.fullName || "—"}
                      </td>
                      <td style={{ padding: "12px 20px", fontSize: "0.82rem", color: c.textSec }}>
                        {order.items?.length || 0} items
                      </td>
                      <td style={{ padding: "12px 20px", fontSize: "0.82rem", fontWeight: 700, color: c.text }}>
                        ₹{order.totalAmount}
                      </td>
                      <td style={{ padding: "12px 20px" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 4,
                          padding: "3px 10px", borderRadius: 6,
                          fontSize: "0.72rem", fontWeight: 600,
                          background: sc.bg, color: sc.color,
                        }}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td style={{ padding: "12px 20px", fontSize: "0.78rem", color: c.textSec }}>
                        {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                      </td>
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

export default AdminDashboard;

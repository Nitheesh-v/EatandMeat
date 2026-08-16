import { useEffect, useState } from "react";
import { getAdminStats } from "../../services/adminService";
import { getAdminOrders } from "../../services/adminService";
import {
  BarChart3,
  IndianRupee,
  ShoppingBag,
  Users,
  Truck,
  Package,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const arStyles = `
.ar-wrap { animation: arIn 0.4s ease-out; }
@keyframes arIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.ar-header { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; }
.ar-title {
  font-family: 'Fraunces', serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
}
.ar-title-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, #10b981, #34d399);
  display: flex; align-items: center; justify-content: center;
}
.ar-section {
  background: linear-gradient(135deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01));
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 24px;
}
.ar-section-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
.ar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
}
.ar-card {
  background: linear-gradient(135deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01));
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 18px;
  transition: all 0.25s ease;
}
.ar-card:hover {
  transform: translateY(-2px);
  border-color: rgba(212,175,55,0.2);
}
.ar-card-icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 10px;
}
.ar-card-icon.gold { background: rgba(212, 175, 55, 0.15); color: #2563EB; }
.ar-card-icon.red { background: rgba(226, 55, 68, 0.12); color: #e23744; }
.ar-card-icon.blue { background: rgba(59, 130, 246, 0.12); color: #3b82f6; }
.ar-card-icon.green { background: rgba(34, 197, 94, 0.12); color: #22c55e; }
.ar-card-icon.orange { background: rgba(249, 115, 22, 0.12); color: #f97316; }
.ar-card-icon.purple { background: rgba(139, 92, 246, 0.12); color: #8b5cf6; }
.ar-card-label {
  color: #64748B; font-size: 0.65rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;
}
.ar-card-value { color: #fff; font-size: 1.4rem; font-weight: 800; line-height: 1; }

/* Funnel */
.ar-funnel { display: flex; flex-direction: column; gap: 10px; }
.ar-funnel-row { display: flex; align-items: center; gap: 12px; }
.ar-funnel-label { width: 120px; font-size: 0.82rem; color: rgba(255,255,255,0.6); font-weight: 600; flex-shrink: 0; }
.ar-funnel-track { flex: 1; height: 12px; background: rgba(0,0,0,0.02); border-radius: 999px; overflow: hidden; }
.ar-funnel-fill { height: 100%; border-radius: 999px; transition: width 0.8s cubic-bezier(.16,.84,.32,1); }
.ar-funnel-value { width: 40px; text-align: right; font-size: 0.82rem; font-weight: 700; color: #fff; flex-shrink: 0; }

/* Table */
.ar-table-wrap {
  border: 1px solid rgba(0,0,0,0.02);
  border-radius: 12px;
  overflow: hidden;
}
.ar-tbl { width: 100%; border-collapse: collapse; }
.ar-tbl th {
  text-align: left; padding: 12px 16px; font-size: 0.65rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px; color: #94A3B8;
  background: #F8FAFC; border-bottom: 1px solid rgba(0,0,0,0.02);
}
.ar-tbl td { padding: 10px 16px; font-size: 0.82rem; color: rgba(255,255,255,0.7); border-bottom: 1px solid #F8FAFC; }
.ar-tbl tbody tr:hover { background: rgba(212,175,55,0.03); }
.ar-tbl tbody tr:last-child td { border-bottom: none; }
.ar-loading { display: flex; align-items: center; justify-content: center; min-height: 200px; color: #64748B; }
`;

const AdminReports = () => {
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
        setRecentOrders((ordersRes.orders || []).slice(0, 10));
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
      <>
        <style>{arStyles}</style>
        <div className="ar-loading">Loading reports...</div>
      </>
    );
  }

  const funnel = [
    { label: "Pending", value: stats?.pendingOrders || 0, color: "linear-gradient(90deg,#f59e0b,#d97706)" },
    { label: "Accepted", value: stats?.acceptedOrders || 0, color: "linear-gradient(90deg,#3b82f6,#2563eb)" },
    { label: "Preparing", value: stats?.preparingOrders || 0, color: "linear-gradient(90deg,#fbbf24,#f59e0b)" },
    { label: "Packed", value: stats?.packedOrders || 0, color: "linear-gradient(90deg,#22c55e,#16a34a)" },
    { label: "Delivered", value: stats?.deliveredOrders || 0, color: "linear-gradient(90deg,#10b981,#059669)" },
    { label: "Cancelled", value: stats?.cancelledOrders || 0, color: "linear-gradient(90deg,#ef4444,#dc2626)" },
  ];
  const funnelMax = Math.max(1, ...funnel.map((f) => f.value));

  const statusColors = {
    Pending: "#f59e0b",
    Accepted: "#3b82f6",
    Preparing: "#fbbf24",
    Packed: "#22c55e",
    Assigned: "#8b5cf6",
    "Picked Up": "#06b6d4",
    "Out For Delivery": "#f97316",
    Delivered: "#10b981",
    Cancelled: "#ef4444",
  };

  return (
    <>
      <style>{arStyles}</style>
      <div className="ar-wrap">
        <div className="ar-header">
          <span className="ar-title-icon">
            <BarChart3 size={18} color="white" />
          </span>
          <h1 className="ar-title">Reports & Analytics</h1>
        </div>

        {/* Revenue */}
        <div className="ar-section">
          <h2 className="ar-section-title">
            <IndianRupee size={16} style={{ color: "#2563EB" }} />
            Revenue Overview
          </h2>
          <div className="ar-grid">
            {[
              { label: "Total Revenue", value: `₹${stats?.totalRevenue || 0}`, icon: IndianRupee, color: "gold" },
              { label: "Today's Revenue", value: `₹${stats?.todayRevenue || 0}`, icon: TrendingUp, color: "green" },
              { label: "This Month", value: `₹${stats?.monthRevenue || 0}`, icon: BarChart3, color: "blue" },
              { label: "Avg Order Value", value: `₹${stats?.totalOrders ? Math.round((stats?.totalRevenue || 0) / stats.totalOrders) : 0}`, icon: ShoppingBag, color: "purple" },
            ].map((s) => (
              <div key={s.label} className="ar-card">
                <div className={`ar-card-icon ${s.color}`}>
                  <s.icon size={16} />
                </div>
                <div className="ar-card-label">{s.label}</div>
                <div className="ar-card-value">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Funnel */}
        <div className="ar-section">
          <h2 className="ar-section-title">
            <ShoppingBag size={16} style={{ color: "#2563EB" }} />
            Order Funnel
          </h2>
          <div className="ar-funnel">
            {funnel.map((f) => (
              <div key={f.label} className="ar-funnel-row">
                <span className="ar-funnel-label">{f.label}</span>
                <div className="ar-funnel-track">
                  <div
                    className="ar-funnel-fill"
                    style={{
                      width: `${(f.value / funnelMax) * 100}%`,
                      background: f.color,
                    }}
                  />
                </div>
                <span className="ar-funnel-value">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Users */}
        <div className="ar-section">
          <h2 className="ar-section-title">
            <Users size={16} style={{ color: "#3b82f6" }} />
            User Statistics
          </h2>
          <div className="ar-grid">
            {[
              { label: "Total Users", value: stats?.totalUsers || 0, icon: Users, color: "purple" },
              { label: "Customers", value: stats?.totalCustomers || 0, icon: Users, color: "blue" },
              { label: "Delivery Partners", value: stats?.totalDeliveryPartners || 0, icon: Truck, color: "orange" },
              { label: "Companies", value: stats?.totalCompanies || 0, icon: Users, color: "green" },
            ].map((s) => (
              <div key={s.label} className="ar-card">
                <div className={`ar-card-icon ${s.color}`}>
                  <s.icon size={16} />
                </div>
                <div className="ar-card-label">{s.label}</div>
                <div className="ar-card-value">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="ar-section">
          <h2 className="ar-section-title">
            <Clock size={16} style={{ color: "#f97316" }} />
            Recent Orders
          </h2>
          {recentOrders.length === 0 ? (
            <p style={{ color: "#94A3B8", textAlign: "center", padding: 20 }}>
              No orders yet
            </p>
          ) : (
            <div className="ar-table-wrap">
              <table className="ar-tbl">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td style={{ fontWeight: 600, color: "#2563EB" }}>
                        #{order.orderNumber}
                      </td>
                      <td>{order.customer?.fullName || "—"}</td>
                      <td style={{ fontWeight: 700 }}>₹{order.totalAmount}</td>
                      <td>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "3px 10px",
                            borderRadius: 14,
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            color: statusColors[order.orderStatus] || "#fff",
                            background: `${statusColors[order.orderStatus] || "#fff"}18`,
                            border: `1px solid ${statusColors[order.orderStatus] || "#fff"}30`,
                          }}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td style={{ fontSize: "0.78rem", color: "#94A3B8" }}>
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminReports;

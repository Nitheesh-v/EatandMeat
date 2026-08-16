import { useEffect, useState } from "react";
import { getCompanyOrders } from "../../services/orderService";
import {
  LayoutDashboard,
  Clock,
  ChefHat,
  PackageCheck,
  IndianRupee,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";

const dashboardStyles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;800;900&display=swap');
.dash-wrap { animation: dashIn 0.4s ease-out; }
@keyframes dashIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.dash-welcome {
  font-family: 'Fraunces', serif;
  font-size: 1.6rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 4px 0;
}
.dash-welcome .accent {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.dash-desc { color: #64748b; font-size: 0.85rem; margin: 0 0 22px 0; }
.dash-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 26px;
}
.dash-card {
  background: white;
  border: 1px solid rgba(59, 130, 246, 0.08);
  border-radius: 14px;
  padding: 18px;
  transition: all 0.25s ease;
}
.dash-card:hover {
  transform: translateY(-2px);
  border-color: rgba(59, 130, 246, 0.25);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.08);
}
.dash-card-icon {
  width: 38px; height: 38px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 12px;
}
.dash-card-icon.blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.dash-card-icon.red { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.dash-card-icon.orange { background: rgba(249, 115, 22, 0.1); color: #f97316; }
.dash-card-icon.green { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
.dash-card-icon.gold { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.dash-card-label {
  color: #64748b; font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;
}
.dash-card-value { color: #1e293b; font-size: 1.6rem; font-weight: 800; line-height: 1; }
.dash-card-trend {
  display: inline-flex; align-items: center; gap: 3px; margin-top: 8px;
  font-size: 0.68rem; font-weight: 600; color: #16a34a;
  background: rgba(34, 197, 94, 0.08); padding: 3px 9px; border-radius: 14px;
}
.dash-section-head { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.dash-section-head h2 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0; }
.dash-table-box { background: white; border: 1px solid rgba(59, 130, 246, 0.08); border-radius: 14px; overflow: hidden; }
.dash-tbl { width: 100%; border-collapse: collapse; }
.dash-tbl th {
  text-align: left; padding: 12px 16px; font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px; color: #64748b;
  background: #f8fafc; border-bottom: 1px solid rgba(59, 130, 246, 0.06);
}
.dash-tbl td { padding: 12px 16px; font-size: 0.88rem; color: #334155; border-bottom: 1px solid rgba(59, 130, 246, 0.04); }
.dash-tbl tbody tr:hover { background: rgba(59, 130, 246, 0.02); }
.dash-tbl tbody tr:last-child td { border-bottom: none; }
.dash-badge { display: inline-flex; align-items: center; padding: 4px 11px; border-radius: 14px; font-size: 0.72rem; font-weight: 600; }
.dash-badge.Pending { background: rgba(245, 158, 11, 0.1); color: #d97706; }
.dash-badge.Accepted { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.dash-badge.Preparing { background: rgba(249, 115, 22, 0.1); color: #ea580c; }
.dash-badge.Packed { background: rgba(34, 197, 94, 0.1); color: #16a34a; }
.dash-badge.Delivered { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.dash-badge.Cancelled { background: rgba(107, 114, 128, 0.1); color: #6b7280; }
.dash-empty { text-align: center; padding: 36px 20px; color: #94a3b8; font-size: 0.9rem; }
.dash-loading { display: flex; align-items: center; justify-content: center; min-height: 200px; color: #94a3b8; }
@media (max-width: 768px) {
  .dash-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .dash-card-value { font-size: 1.3rem; }
  .dash-card { padding: 14px; }
}
`;

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCompanyOrders("");
        setOrders(res.orders || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === "Pending").length;
  const preparingOrders = orders.filter((o) => o.orderStatus === "Preparing").length;
  const packedOrders = orders.filter((o) => o.orderStatus === "Packed").length;
  const revenue = orders
    .filter((o) => o.orderStatus === "Delivered")
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const stats = [
    { label: "Total Orders", value: totalOrders, icon: LayoutDashboard, color: "blue", trend: "All time" },
    { label: "Pending", value: pendingOrders, icon: Clock, color: "orange", trend: "Needs attention" },
    { label: "Preparing", value: preparingOrders, icon: ChefHat, color: "orange", trend: "In kitchen" },
    { label: "Packed", value: packedOrders, icon: PackageCheck, color: "green", trend: "Ready" },
    { label: "Revenue", value: `₹${revenue}`, icon: IndianRupee, color: "gold", trend: "Delivered orders" },
  ];

  if (loading) {
    return (
      <>
        <style>{dashboardStyles}</style>
        <div className="dash-loading">Loading dashboard...</div>
      </>
    );
  }

  return (
    <>
      <style>{dashboardStyles}</style>
      <div className="dash-wrap">
        <h1 className="dash-welcome">
          Welcome back, <span className="accent">Admin</span> 👋
        </h1>
        <p className="dash-desc">Here's what's happening with your store today.</p>

        <div className="dash-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="dash-card">
              <div className={`dash-card-icon ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <div className="dash-card-label">{stat.label}</div>
              <div className="dash-card-value">{stat.value}</div>
              <div className="dash-card-trend">
                <TrendingUp size={10} />
                {stat.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="dash-section-head">
          <ShoppingBag size={16} style={{ color: "#3b82f6" }} />
          <h2>Recent Orders</h2>
        </div>
        <div className="dash-table-box">
          {orders.length === 0 ? (
            <div className="dash-empty">No orders yet</div>
          ) : (
            <table className="dash-tbl">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => (
                  <tr key={order._id}>
                    <td>
                      <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                        #{order.orderNumber}
                      </span>
                    </td>
                    <td>{order.customer?.fullName || "—"}</td>
                    <td style={{ fontWeight: 700 }}>₹{order.totalAmount}</td>
                    <td>
                      <span className={`dash-badge ${order.orderStatus}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

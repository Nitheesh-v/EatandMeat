import {
  LayoutDashboard,
  Clock,
  ChefHat,
  PackageCheck,
  IndianRupee,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";
import { useOrder } from "../../Context/OrderContext";

const dashboardStyles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;800;900&display=swap');
.dash-wrap { animation: dashIn 0.4s ease-out; }
@keyframes dashIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.dash-welcome {
  font-family: 'Fraunces', serif;
  font-size: 1.6rem;
  font-weight: 800;
  color: #2a1a12;
  margin: 0 0 4px 0;
}
.dash-welcome .accent {
  background: linear-gradient(135deg, #e23744, #d4af37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.dash-desc { color: #8a7a6d; font-size: 0.85rem; margin: 0 0 22px 0; }
.dash-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 26px;
}
.dash-card {
  background: white;
  border: 1px solid rgba(42, 26, 18, 0.08);
  border-radius: 14px;
  padding: 18px;
  transition: all 0.25s ease;
}
.dash-card:hover {
  transform: translateY(-2px);
  border-color: rgba(226, 55, 68, 0.25);
  box-shadow: 0 6px 16px rgba(42, 26, 18, 0.06);
}
.dash-card-icon {
  width: 38px; height: 38px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 12px;
}
.dash-card-icon.blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.dash-card-icon.red { background: rgba(226, 55, 68, 0.1); color: #e23744; }
.dash-card-icon.orange { background: rgba(249, 115, 22, 0.1); color: #f97316; }
.dash-card-icon.green { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
.dash-card-icon.gold { background: rgba(212, 175, 55, 0.14); color: #a9871f; }
.dash-card-label {
  color: #8a7a6d; font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;
}
.dash-card-value { color: #2a1a12; font-size: 1.6rem; font-weight: 800; line-height: 1; }
.dash-card-trend {
  display: inline-flex; align-items: center; gap: 3px; margin-top: 8px;
  font-size: 0.68rem; font-weight: 600; color: #16a34a;
  background: rgba(34, 197, 94, 0.08); padding: 3px 9px; border-radius: 14px;
}
.dash-section-head { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.dash-section-head h2 { font-size: 1.1rem; font-weight: 700; color: #2a1a12; margin: 0; }
.dash-table-box { background: white; border: 1px solid rgba(42, 26, 18, 0.08); border-radius: 14px; overflow: hidden; }
.dash-tbl { width: 100%; border-collapse: collapse; }
.dash-tbl th {
  text-align: left; padding: 12px 16px; font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px; color: #8a7a6d;
  background: #fff8f1; border-bottom: 1px solid rgba(42, 26, 18, 0.06);
}
.dash-tbl td { padding: 12px 16px; font-size: 0.88rem; color: #4a3b30; border-bottom: 1px solid rgba(42, 26, 18, 0.04); }
.dash-tbl tbody tr:hover { background: rgba(226, 55, 68, 0.02); }
.dash-tbl tbody tr:last-child td { border-bottom: none; }
.dash-badge { display: inline-flex; align-items: center; padding: 4px 11px; border-radius: 14px; font-size: 0.72rem; font-weight: 600; }
.dash-badge.pending { background: rgba(226, 38, 38, 0.1); color: #e23744; }
.dash-badge.preparing { background: rgba(249, 115, 22, 0.1); color: #ea580c; }
.dash-badge.packed { background: rgba(34, 197, 94, 0.1); color: #16a34a; }
.dash-empty { text-align: center; padding: 36px 20px; color: #a89a8d; font-size: 0.9rem; }
@media (max-width: 768px) {
  .dash-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .dash-card-value { font-size: 1.3rem; }
  .dash-card { padding: 14px; }
}
`;

const Dashboard = () => {
  const {
    totalOrders,
    pendingOrders,
    preparingOrders,
    packedOrders,
    revenue,
    orders,
  } = useOrder();

  const stats = [
    { label: "Total Orders", value: totalOrders, icon: LayoutDashboard, color: "blue", trend: "+12%" },
    { label: "Pending", value: pendingOrders, icon: Clock, color: "red", trend: "Needs attention" },
    { label: "Preparing", value: preparingOrders, icon: ChefHat, color: "orange", trend: "In kitchen" },
    { label: "Packed", value: packedOrders, icon: PackageCheck, color: "green", trend: "Ready" },
    { label: "Revenue", value: `₹${revenue}`, icon: IndianRupee, color: "gold", trend: "+8.2%" },
  ];

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
          <ShoppingBag size={16} style={{ color: "#e23744" }} />
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
                {orders.slice().reverse().map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span style={{ color: "#e23744", fontWeight: 600 }}>{order.id}</span>
                    </td>
                    <td>{order.customer?.name || "—"}</td>
                    <td style={{ fontWeight: 700 }}>₹{order.total}</td>
                    <td>
                      <span
                        className={`dash-badge ${
                          order.kitchenStatus === "Pending"
                            ? "pending"
                            : order.kitchenStatus === "Preparing"
                            ? "preparing"
                            : "packed"
                        }`}
                      >
                        {order.kitchenStatus}
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
import { useOrder } from "../../Context/OrderContext";
import { BarChart3, IndianRupee, ShoppingBag, PackageCheck, TrendingUp, Bike } from "lucide-react";

const reportsStyles = `
.rp-wrap { animation: rpIn 0.4s ease-out; }
@keyframes rpIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.rp-head { display: flex; align-items: center; gap: 10px; margin-bottom: 22px; }
.rp-head h1 { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 800; color: #2a1a12; margin: 0; }
.rp-head-icon {
  width: 38px; height: 38px; background: rgba(212,175,55,0.14); border: 1px solid rgba(212,175,55,0.3);
  border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #a9871f;
}
.rp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; margin-bottom: 28px; }
.rp-card { background: white; border: 1px solid rgba(42,26,18,0.08); border-radius: 14px; padding: 20px; transition: all .25s ease; }
.rp-card:hover { transform: translateY(-2px); border-color: rgba(226,55,68,0.2); box-shadow: 0 6px 16px rgba(42,26,18,0.06); }
.rp-card-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
.rp-label { color: #8a7a6d; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
.rp-value { color: #2a1a12; font-size: 1.7rem; font-weight: 800; }
.rp-section { background: white; border: 1px solid rgba(42,26,18,0.08); border-radius: 14px; padding: 22px; margin-bottom: 20px; }
.rp-section h2 { font-size: 1.05rem; font-weight: 700; color: #2a1a12; margin: 0 0 16px 0; }
.rp-bar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.rp-bar-label { width: 110px; font-size: 0.82rem; color: #4a3b30; font-weight: 600; flex-shrink: 0; }
.rp-bar-track { flex: 1; height: 10px; background: #fff1e2; border-radius: 999px; overflow: hidden; }
.rp-bar-fill { height: 100%; border-radius: 999px; transition: width .6s cubic-bezier(.16,.84,.32,1); }
.rp-bar-value { width: 40px; text-align: right; font-size: 0.82rem; font-weight: 700; color: #2a1a12; flex-shrink: 0; }
`;

const Reports = () => {
  const { totalOrders, pendingOrders, preparingOrders, packedOrders, revenue, orders } = useOrder();

  const deliveredCount = orders.filter((o) => o.deliveryStatus === "Delivered").length;
  const inTransitCount = orders.filter(
    (o) => o.deliveryStatus && o.deliveryStatus !== "Delivered" && o.deliveryStatus !== "Waiting"
  ).length;
  const avgOrderValue = totalOrders > 0 ? Math.round(revenue / totalOrders) : 0;

  const funnel = [
    { label: "Pending", value: pendingOrders, color: "linear-gradient(90deg,#e23744,#b81f2b)" },
    { label: "Preparing", value: preparingOrders, color: "linear-gradient(90deg,#f97316,#ea580c)" },
    { label: "Packed", value: packedOrders, color: "linear-gradient(90deg,#22c55e,#16a34a)" },
    { label: "Delivered", value: deliveredCount, color: "linear-gradient(90deg,#d4af37,#a9871f)" },
  ];
  const funnelMax = Math.max(1, ...funnel.map((f) => f.value));

  const stats = [
    { label: "Total Revenue", value: `₹${revenue}`, icon: IndianRupee, bg: "rgba(212,175,55,0.14)", color: "#a9871f" },
    { label: "Total Orders", value: totalOrders, icon: ShoppingBag, bg: "rgba(226,55,68,0.1)", color: "#e23744" },
    { label: "Avg. Order Value", value: `₹${avgOrderValue}`, icon: TrendingUp, bg: "rgba(59,130,246,0.1)", color: "#3b82f6" },
    { label: "Delivered", value: deliveredCount, icon: PackageCheck, bg: "rgba(34,197,94,0.1)", color: "#16a34a" },
    { label: "In Transit", value: inTransitCount, icon: Bike, bg: "rgba(139,92,246,0.1)", color: "#8b5cf6" },
  ];

  return (
    <>
      <style>{reportsStyles}</style>
      <div className="rp-wrap">
        <div className="rp-head">
          <span className="rp-head-icon"><BarChart3 size={16} /></span>
          <h1>Reports & Analytics</h1>
        </div>

        <div className="rp-grid">
          {stats.map((s) => (
            <div key={s.label} className="rp-card">
              <div className="rp-card-icon" style={{ background: s.bg, color: s.color }}>
                <s.icon size={20} />
              </div>
              <div className="rp-label">{s.label}</div>
              <div className="rp-value">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="rp-section">
          <h2>Order Funnel</h2>
          {funnel.map((f) => (
            <div key={f.label} className="rp-bar-row">
              <span className="rp-bar-label">{f.label}</span>
              <div className="rp-bar-track">
                <div
                  className="rp-bar-fill"
                  style={{ width: `${(f.value / funnelMax) * 100}%`, background: f.color }}
                />
              </div>
              <span className="rp-bar-value">{f.value}</span>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="rp-section" style={{ textAlign: "center", color: "#a89a8d" }}>
            No order data yet — reports will populate as orders come in.
          </div>
        )}
      </div>
    </>
  );
};

export default Reports;
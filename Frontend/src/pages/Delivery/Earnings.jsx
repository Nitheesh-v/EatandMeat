import {
  IndianRupee,
  Wallet,
  CalendarDays,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getDeliveryEarnings } from "../../services/deliveryService";

export const Earnings = () => {
  const [earnings, setEarnings] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDeliveryEarnings();
        if (res.success) {
          setEarnings(res.earnings);
          setRecentOrders(res.recentOrders || []);
        }
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
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 rounded-full border-3 border-purple-200 border-t-purple-600 animate-spin" />
      </div>
    );
  }

  const cards = [
    { title: "Today", amount: `₹${earnings?.today?.amount || 0}`, orders: earnings?.today?.orders || 0, icon: IndianRupee, accent: "#5B3A57", bg: "rgba(91,58,87,0.08)" },
    { title: "This Week", amount: `₹${earnings?.week?.amount || 0}`, orders: earnings?.week?.orders || 0, icon: Wallet, accent: "#D9829B", bg: "rgba(217,130,155,0.08)" },
    { title: "This Month", amount: `₹${earnings?.month?.amount || 0}`, orders: earnings?.month?.orders || 0, icon: CalendarDays, accent: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
    { title: "Total", amount: `₹${earnings?.allTime?.amount || 0}`, orders: earnings?.allTime?.orders || 0, icon: TrendingUp, accent: "#10b981", bg: "rgba(16,185,129,0.08)" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold" style={{ color: "#352832" }}>Earnings</h1>
        <p className="text-sm mt-1" style={{ color: "#8B7585" }}>Track your delivery income</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: "#fff",
              border: "1px solid rgba(91,58,87,0.08)",
              boxShadow: "0 1px 8px rgba(91,58,87,0.04)",
              animation: `fadeSlideUp 0.4s ease ${i * 0.08}s both`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(91,58,87,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 8px rgba(91,58,87,0.04)";
            }}
          >
            <div className="h-1" style={{ background: `linear-gradient(90deg, ${card.accent}, ${card.accent}80)` }} />
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold" style={{ color: "#8B7585" }}>{card.title}</p>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                  <card.icon size={18} style={{ color: card.accent }} />
                </div>
              </div>
              <h2 className="text-2xl font-extrabold" style={{ color: "#352832" }}>{card.amount}</h2>
              <p className="text-[11px] mt-1 flex items-center gap-1" style={{ color: "#8B7585" }}>
                <ShoppingBag size={10} /> {card.orders} deliveries
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* History */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(91,58,87,0.08)" }}>
        <div className="h-1" style={{ background: "linear-gradient(90deg, #5B3A57, #D9829B)" }} />
        <div className="p-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <h2 className="font-bold text-lg" style={{ color: "#352832" }}>Delivery History</h2>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-center py-6" style={{ color: "#8B7585" }}>No deliveries yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "rgba(91,58,87,0.02)" }}>
                  {["Order", "Date", "Items", "Amount", "Status"].map((h) => (
                    <th key={h} className="p-3 text-left text-[11px] font-bold uppercase tracking-wider" style={{ color: "#8B7585" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                    <td className="p-3">
                      <span className="font-bold text-sm" style={{ color: "#5B3A57" }}>#{order.orderNumber}</span>
                    </td>
                    <td className="p-3 text-sm" style={{ color: "#6B5A65" }}>
                      {new Date(order.deliveredAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="p-3 text-sm" style={{ color: "#6B5A65" }}>{order.items?.length || 0}</td>
                    <td className="p-3 font-bold text-sm" style={{ color: "#352832" }}>₹{order.totalAmount}</td>
                    <td className="p-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>Delivered</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Earnings;

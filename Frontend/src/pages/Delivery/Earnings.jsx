import { IndianRupee, Wallet, CalendarDays, TrendingUp, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { getDeliveryEarnings } from "../../services/deliveryService";

const c = { plum: "#5B3A57", rose: "#D9829B", champagne: "#D6B77A", bg: "#FCF8FA", text: "#352832", textSec: "#8B7585" };

export const Earnings = () => {
  const [earnings, setEarnings] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDeliveryEarnings();
        if (res.success) { setEarnings(res.earnings); setRecentOrders(res.recentOrders || []); }
      } catch (err) { console.log(err); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, color: c.textSec }}>Loading...</div>;

  const cards = [
    { title: "Today", amount: `₹${earnings?.today?.amount || 0}`, orders: earnings?.today?.orders || 0, icon: IndianRupee, color: c.plum, bg: "rgba(91,58,87,0.08)" },
    { title: "This Week", amount: `₹${earnings?.week?.amount || 0}`, orders: earnings?.week?.orders || 0, icon: Wallet, color: c.rose, bg: "rgba(217,130,155,0.08)" },
    { title: "This Month", amount: `₹${earnings?.month?.amount || 0}`, orders: earnings?.month?.orders || 0, icon: CalendarDays, color: c.champagne, bg: "rgba(214,183,122,0.08)" },
    { title: "Total", amount: `₹${earnings?.allTime?.amount || 0}`, orders: earnings?.allTime?.orders || 0, icon: TrendingUp, color: "#16A34A", bg: "rgba(22,163,74,0.08)" },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: c.text, margin: 0 }}>Earnings</h1>
        <p style={{ fontSize: "0.82rem", color: c.textSec, margin: "2px 0 0" }}>Track your delivery income</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
        {cards.map((card) => (
          <div key={card.title} style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(91,58,87,0.08)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(91,58,87,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ height: 3, background: card.color }} />
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 600, color: c.textSec }}>{card.title}</p>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <card.icon size={15} style={{ color: card.color }} />
                </div>
              </div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: c.text, margin: 0 }}>{card.amount}</h2>
              <p style={{ fontSize: "0.68rem", color: c.textSec, margin: "4px 0 0", display: "flex", alignItems: "center", gap: 3 }}>
                <ShoppingBag size={10} /> {card.orders} deliveries
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid rgba(91,58,87,0.08)", overflow: "hidden" }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${c.plum}, ${c.rose})` }} />
        <div style={{ padding: 16, borderBottom: "1px solid rgba(91,58,87,0.06)" }}>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: c.text, margin: 0 }}>Delivery History</h2>
        </div>
        {recentOrders.length === 0 ? (
          <p style={{ textAlign: "center", padding: 24, color: c.textSec, fontSize: "0.85rem" }}>No deliveries yet</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["Order", "Date", "Items", "Amount", "Status"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: c.textSec, background: c.bg, borderBottom: "1px solid rgba(91,58,87,0.06)" }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: "1px solid rgba(91,58,87,0.04)" }}>
                    <td style={{ padding: "10px 16px", fontSize: "0.82rem", fontWeight: 600, color: c.plum }}>#{order.orderNumber}</td>
                    <td style={{ padding: "10px 16px", fontSize: "0.82rem", color: c.textSec }}>{new Date(order.deliveredAt).toLocaleDateString("en-IN")}</td>
                    <td style={{ padding: "10px 16px", fontSize: "0.82rem", color: c.textSec }}>{order.items?.length || 0}</td>
                    <td style={{ padding: "10px 16px", fontSize: "0.82rem", fontWeight: 700, color: c.text }}>₹{order.totalAmount}</td>
                    <td style={{ padding: "10px 16px" }}><span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "rgba(22,163,74,0.08)", color: "#16A34A" }}>Delivered</span></td>
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

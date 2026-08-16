import { Package, Bike, CircleCheckBig, IndianRupee, Clock, MapPin, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { getDeliveryStats } from "../../services/deliveryService";
import { useAuth } from "../../Context/AuthContext";

const c = { plum: "#5B3A57", rose: "#D9829B", softRose: "#F5E6EB", champagne: "#D6B77A", bg: "#FCF8FA", text: "#352832", textSec: "#8B7585" };

export const DeliveryDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentDeliveries, setRecentDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDeliveryStats();
        if (res.success) { setStats(res.stats); setRecentDeliveries(res.recentDeliveries || []); }
      } catch (err) { console.log(err); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, color: c.textSec }}>Loading...</div>;

  const cards = [
    { title: "Available Orders", value: stats?.availableOrders || 0, icon: Package, color: c.plum, bg: "rgba(91,58,87,0.08)" },
    { title: "Active Delivery", value: stats?.activeDeliveries || 0, icon: Bike, color: c.rose, bg: "rgba(217,130,155,0.08)" },
    { title: "Delivered Today", value: stats?.todayDelivered || 0, icon: CircleCheckBig, color: "#16A34A", bg: "rgba(22,163,74,0.08)" },
    { title: "Today's Earnings", value: `₹${stats?.todayEarnings || 0}`, icon: IndianRupee, color: c.champagne, bg: "rgba(214,183,122,0.08)" },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: c.text, margin: 0 }}>
          Hello, {currentUser?.fullName} 👋
        </h1>
        <p style={{ fontSize: "0.82rem", color: c.textSec, margin: "2px 0 0" }}>Your delivery overview</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
        {cards.map((card, i) => (
          <div key={card.title} style={{
            background: "#FFFFFF", borderRadius: 12, overflow: "hidden",
            border: "1px solid rgba(91,58,87,0.08)", transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 4px 12px ${card.color}15`; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ height: 3, background: card.color }} />
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 600, color: c.textSec }}>{card.title}</p>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <card.icon size={16} style={{ color: card.color }} />
                </div>
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: c.text, margin: 0 }}>{card.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid rgba(91,58,87,0.08)", overflow: "hidden" }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${c.plum}, ${c.rose})` }} />
        <div style={{ padding: 18 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: c.text, margin: "0 0 14px" }}>Recent Deliveries</h2>
          {recentDeliveries.length === 0 ? (
            <p style={{ textAlign: "center", padding: 20, color: c.textSec, fontSize: "0.85rem" }}>No deliveries completed yet</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {recentDeliveries.map((order) => (
                <div key={order._id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 12px", borderRadius: 8, background: "rgba(91,58,87,0.02)", border: "1px solid rgba(91,58,87,0.05)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(91,58,87,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: c.plum }}>
                      {order.orderNumber?.slice(-3) || "000"}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.82rem", color: c.text, margin: 0 }}>{order.customer?.fullName || "Customer"}</p>
                      <p style={{ fontSize: "0.68rem", color: c.textSec, margin: 0 }}>{order.deliveredAt ? new Date(order.deliveredAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : ""}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: "0.82rem", color: c.champagne }}>₹{order.totalAmount}</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "rgba(22,163,74,0.08)", color: "#16A34A" }}>Delivered</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;

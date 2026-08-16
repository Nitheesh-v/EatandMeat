import { useEffect, useState } from "react";
import { getCompanyOrders } from "../../services/orderService";
import { getDeliveryPartners } from "../../services/adminService";
import { Bike, User, Phone, IndianRupee, PackageCheck, CheckCircle2, Truck } from "lucide-react";

const c = { red: "#641F28", gold: "#C9A227", bg: "#F6F3EF", card: "#FFFFFF", text: "#2B1B14", textSec: "#8B7355", border: "#E2D5C8" };

export const DeliveryPartners = () => {
  const [packedOrders, setPackedOrders] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [ordersRes, partnersRes] = await Promise.all([
          getCompanyOrders("Packed"),
          getDeliveryPartners(),
        ]);
        setPackedOrders(ordersRes.orders || []);
        setPartners(partnersRes.deliveryPartners || []);
      } catch (err) { console.log(err); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <div style={{ textAlign: "center", padding: 40, color: c.textSec }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(100,31,40,0.08)", border: "1px solid rgba(100,31,40,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: c.red }}><Bike size={16} /></span>
        <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: c.text, margin: 0 }}>Delivery Partners</h1>
      </div>

      {/* Available Partners */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: c.text, marginBottom: 12 }}>Available Partners</h2>
        {partners.length === 0 ? (
          <p style={{ color: c.textSec, fontSize: "0.82rem" }}>No delivery partners registered yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {partners.map((p) => (
              <div key={p._id} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: `linear-gradient(135deg, ${c.red}, ${c.gold})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "0.8rem" }}>
                    {p.fullName?.charAt(0) || "D"}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.85rem", color: c.text, margin: 0 }}>{p.fullName}</p>
                    <p style={{ fontSize: "0.72rem", color: c.textSec, margin: 0 }}>{p.phone}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: p.isActive ? "rgba(22,163,74,0.08)" : "rgba(220,38,38,0.08)", color: p.isActive ? "#16A34A" : "#DC2626" }}>
                    {p.isActive ? "Active" : "Inactive"}
                  </span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: "rgba(100,31,40,0.06)", color: c.red }}>
                    {p.completedDeliveries || 0} deliveries
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Packed Orders awaiting assignment */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: c.text, marginBottom: 12 }}>
          Packed Orders Awaiting Assignment ({packedOrders.length})
        </h2>
        {packedOrders.length === 0 ? (
          <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: "36px 20px", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, background: "rgba(22,163,74,0.06)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", color: "#16A34A" }}><PackageCheck size={22} /></div>
            <h2 style={{ color: c.text, fontSize: "1rem", fontWeight: 700, margin: "0 0 4px" }}>No Packed Orders</h2>
            <p style={{ color: c.textSec, margin: 0, fontSize: "0.82rem" }}>Packed orders will appear here for delivery assignment.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {packedOrders.map((order) => (
              <div key={order._id} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <div>
                    <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: c.text, margin: "0 0 4px" }}>#{order.orderNumber}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: c.textSec, fontSize: "0.8rem" }}><User size={12} /> {order.customer?.fullName || "Customer"}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.95rem", fontWeight: 800, color: c.gold, marginTop: 4 }}><IndianRupee size={13} /> {order.totalAmount}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: "rgba(217,119,6,0.06)", border: "1px solid rgba(217,119,6,0.15)", fontSize: "0.78rem", fontWeight: 600, color: "#D97706" }}>
                    <Truck size={14} /> Awaiting Assignment
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryPartners;

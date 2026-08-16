import { useEffect, useState } from "react";
import { getCompanyOrders, packedOrder } from "../../services/orderService";
import { ChefHat, User, Phone, IndianRupee, PackageCheck, MapPin } from "lucide-react";

const c = { red: "#641F28", gold: "#C9A227", bg: "#F6F3EF", card: "#FFFFFF", text: "#2B1B14", textSec: "#8B7355", border: "#E2D5C8" };

export const Preparing = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try { const res = await getCompanyOrders("Preparing"); setOrders(res.orders || []); }
    catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadOrders(); }, []);

  const handlePacked = async (id) => {
    try { await packedOrder(id); loadOrders(); }
    catch (err) { alert(err.response?.data?.message || "Error"); }
  };

  if (loading) return <div style={{ textAlign: "center", padding: 40, color: c.textSec }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 34, height: 34, background: "rgba(234,88,12,0.08)", border: "1px solid rgba(234,88,12,0.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#EA580C" }}><ChefHat size={16} /></span>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: c.text, margin: 0 }}>Preparing</h1>
        </div>
        <span style={{ background: "rgba(234,88,12,0.08)", color: "#EA580C", padding: "4px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700 }}>{orders.length} in kitchen</span>
      </div>

      {orders.length === 0 ? (
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: "40px 20px", textAlign: "center" }}>
          <div style={{ width: 48, height: 48, background: "rgba(234,88,12,0.06)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", color: "#EA580C" }}><ChefHat size={22} /></div>
          <h2 style={{ color: c.text, fontSize: "1rem", fontWeight: 700, margin: "0 0 4px" }}>Nothing Cooking</h2>
          <p style={{ color: c.textSec, margin: 0, fontSize: "0.82rem" }}>Orders being prepared will show here.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {orders.map((order) => (
            <div key={order._id} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: "16px 18px 16px 22px", borderLeft: "4px solid #EA580C" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div>
                  <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: c.text, margin: "0 0 6px" }}>#{order.orderNumber}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: c.textSec, fontSize: "0.8rem", marginBottom: 3 }}><User size={12} /> {order.customer?.fullName || "Customer"}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: c.textSec, fontSize: "0.8rem" }}><Phone size={12} /> {order.customer?.phone || "—"}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "1rem", fontWeight: 800, color: c.red, marginTop: 6 }}><IndianRupee size={14} />{order.totalAmount}</div>
                </div>
                <button onClick={() => handlePacked(order._id)} style={{
                  padding: "9px 16px", borderRadius: 8, border: "none", fontWeight: 600, fontSize: "0.82rem",
                  cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
                  color: "white", background: `linear-gradient(135deg, ${c.red}, #8B2A35)`,
                  boxShadow: `0 2px 8px ${c.red}30`, transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                ><PackageCheck size={14} /> Mark Packed</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Preparing;

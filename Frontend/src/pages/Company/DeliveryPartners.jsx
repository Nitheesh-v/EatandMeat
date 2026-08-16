import { useEffect, useState } from "react";
import { getCompanyOrders } from "../../services/orderService";
import { getDeliveryPartners } from "../../services/adminService";
import { Bike, User, Phone, IndianRupee, PackageCheck, CheckCircle2, Truck } from "lucide-react";

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
      <div className="flex items-center justify-center min-h-[200px]" style={{ color: "rgba(255,255,255,0.5)" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ width: 38, height: 38, background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#ec4899" }}>
          <Bike size={16} />
        </span>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.4rem", fontWeight: 800, color: "#fff", margin: 0 }}>Delivery Partners</h1>
      </div>

      {/* Available Partners */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 14 }}>Available Partners</h2>
        {partners.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>No delivery partners registered yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
            {partners.map((p) => (
              <div
                key={p._id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "linear-gradient(135deg, #ec4899, #a855f7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 800, fontSize: "0.85rem",
                  }}>
                    {p.fullName?.charAt(0) || "D"}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff", margin: 0 }}>{p.fullName}</p>
                    <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", margin: 0 }}>{p.phone}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{
                    fontSize: "0.7rem", fontWeight: 600, padding: "3px 8px", borderRadius: 8,
                    background: p.isActive ? "rgba(34,197,94,0.1)" : "rgba(226,55,68,0.1)",
                    color: p.isActive ? "#22c55e" : "#e23744",
                    border: `1px solid ${p.isActive ? "rgba(34,197,94,0.2)" : "rgba(226,55,68,0.2)"}`,
                  }}>
                    {p.isActive ? "Active" : "Inactive"}
                  </span>
                  <span style={{
                    fontSize: "0.7rem", fontWeight: 600, padding: "3px 8px", borderRadius: 8,
                    background: "rgba(100,31,40,0.1)", color: "#641F28",
                    border: "1px solid rgba(100,31,40,0.2)",
                  }}>
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
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 14 }}>
          Packed Orders Awaiting Assignment ({packedOrders.length})
        </h2>
        {packedOrders.length === 0 ? (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "44px 24px", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, background: "rgba(34,197,94,0.08)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: "#16a34a" }}>
              <PackageCheck size={24} />
            </div>
            <h2 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, margin: "0 0 6px 0" }}>No Packed Orders</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: "0.85rem" }}>Packed orders will appear here for delivery assignment.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {packedOrders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <div>
                    <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", margin: "0 0 4px 0" }}>#{order.orderNumber}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: "0.83rem", marginTop: 3 }}>
                      <User size={14} /> {order.customer?.fullName || "Customer"}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#f59e0b", fontSize: "1rem", fontWeight: 800, marginTop: 6 }}>
                      <IndianRupee size={14} /> {order.totalAmount}
                    </div>
                  </div>
                  <div style={{
                    background: "rgba(245,158,11,0.06)",
                    border: "1px solid rgba(245,158,11,0.2)",
                    borderRadius: 11,
                    padding: "12px 16px",
                    display: "flex", alignItems: "center", gap: 6,
                    color: "#f59e0b",
                    fontWeight: 600, fontSize: "0.83rem",
                  }}>
                    <Truck size={15} />
                    Awaiting Assignment
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

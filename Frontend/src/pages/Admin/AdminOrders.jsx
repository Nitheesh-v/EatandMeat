import { useEffect, useState } from "react";
import { getAdminOrders, cancelOrder } from "../../services/adminService";
import {
  ShoppingBag,
  Search,
  XCircle,
  MapPin,
  Phone,
  User,
  Clock,
  IndianRupee,
} from "lucide-react";

const aoStyles = `
.ao-wrap { animation: aoIn 0.4s ease-out; }
@keyframes aoIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.ao-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
.ao-title {
  font-family: 'Fraunces', serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.ao-title-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, #2563EB, #06B6D4);
  display: flex; align-items: center; justify-content: center;
}
.ao-filters { display: flex; gap: 8px; flex-wrap: wrap; }
.ao-filter-btn {
  padding: 8px 16px; border-radius: 10px;
  font-size: 0.8rem; font-weight: 700;
  cursor: pointer; transition: all 0.25s ease;
  background: rgba(0,0,0,0.02);
  color: #64748B;
  border: 1px solid rgba(255,255,255,0.08);
}
.ao-filter-btn:hover { border-color: rgba(212,175,55,0.3); color: #fff; }
.ao-filter-btn.active {
  background: linear-gradient(135deg, #2563EB, #06B6D4);
  border-color: transparent; color: white;
  box-shadow: 0 4px 14px rgba(212,33,60,0.3);
}
.ao-grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 768px) { .ao-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .ao-grid { grid-template-columns: repeat(3, 1fr); } }
.ao-card {
  border-radius: 16px; overflow: hidden;
  background: linear-gradient(135deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01));
  border: 1px solid #E2E8F0;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}
.ao-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
.ao-card-strip { height: 3px; }
.ao-card-body { padding: 18px; }
.ao-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
.ao-order-num { font-weight: 900; font-size: 1rem; letter-spacing: -0.02em; }
.ao-order-time { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; margin-top: 3px; color: #94A3B8; }
.ao-status-badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 5px 12px; border-radius: 999px;
  font-size: 0.7rem; font-weight: 700; white-space: nowrap;
}
.ao-status-badge .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: currentColor;
  animation: aoPulse 2s ease-in-out infinite;
}
@keyframes aoPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
.ao-customer-info {
  display: flex; align-items: center; gap: 10px;
  padding: 10px; border-radius: 10px;
  background: #F8FAFC;
  border: 1px solid rgba(0,0,0,0.02);
  margin-bottom: 12px;
}
.ao-avatar {
  width: 34px; height: 34px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-weight: 800; font-size: 0.8rem; color: white;
  background: linear-gradient(135deg, #2563EB, #06B6D4);
}
.ao-customer-name { font-weight: 700; font-size: 0.85rem; color: #fff; margin: 0; }
.ao-customer-phone { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; color: #94A3B8; margin: 2px 0 0 0; }
.ao-items-row { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 12px; }
.ao-item-chip {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 9px; border-radius: 999px;
  font-size: 0.68rem; font-weight: 600;
  background: rgba(212,175,55,0.08);
  border: 1px solid rgba(212,175,55,0.15);
  color: #2563EB;
}
.ao-amount-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px; border-radius: 10px;
  background: rgba(212,175,55,0.06);
  border: 1px solid rgba(212,175,55,0.15);
  margin-bottom: 12px;
}
.ao-amount-label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748B; }
.ao-amount-value { font-size: 1.2rem; font-weight: 900; color: #2563EB; }
.ao-map-link {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 8px 14px; border-radius: 8px;
  font-size: 0.72rem; font-weight: 600;
  background: rgba(59,130,246,0.1);
  border: 1px solid rgba(59,130,246,0.25);
  color: #60a5fa; text-decoration: none;
  transition: all 0.3s ease; margin-bottom: 12px;
}
.ao-map-link:hover { background: rgba(59,130,246,0.18); }
.ao-cancel-btn {
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 10px; border-radius: 10px;
  font-size: 0.82rem; font-weight: 700;
  cursor: pointer; transition: all 0.3s ease;
  background: rgba(226,55,68,0.12);
  border: 1px solid rgba(226,55,68,0.25);
  color: #e23744;
}
.ao-cancel-btn:hover { background: #e23744; color: white; border-color: #e23744; }
.ao-cancel-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.ao-empty {
  text-align: center; padding: 60px 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, #F8FAFC, rgba(0,0,0,0.01));
  border: 1px solid #E2E8F0;
}
.ao-empty-icon {
  width: 60px; height: 60px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
  background: rgba(212,33,60,0.1);
  border: 1px solid rgba(212,33,60,0.2);
}
.ao-empty-title { font-size: 1.2rem; font-weight: 900; color: #fff; margin-bottom: 6px; }
.ao-empty-sub { color: #94A3B8; font-size: 0.85rem; }
.ao-loading { display: flex; align-items: center; justify-content: center; min-height: 200px; color: #64748B; }
`;

const statusColors = {
  Pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)" },
  Accepted: { color: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)" },
  Preparing: { color: "#fbbf24", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)" },
  Packed: { color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" },
  Assigned: { color: "#8b5cf6", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)" },
  "Picked Up": { color: "#06b6d4", bg: "rgba(6,182,212,0.12)", border: "rgba(6,182,212,0.3)" },
  "Out For Delivery": { color: "#f97316", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.3)" },
  Delivered: { color: "#22c55e", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)" },
  Cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)" },
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  const loadOrders = async () => {
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      const res = await getAdminOrders(params);
      setOrders(res.orders);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      await cancelOrder(id);
      loadOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Error cancelling order");
    }
  };

  const statuses = [
    "",
    "Pending",
    "Accepted",
    "Preparing",
    "Packed",
    "Assigned",
    "Picked Up",
    "Out For Delivery",
    "Delivered",
    "Cancelled",
  ];

  return (
    <>
      <style>{aoStyles}</style>
      <div className="ao-wrap">
        {/* Header */}
        <div className="ao-header">
          <h1 className="ao-title">
            <span className="ao-title-icon">
              <ShoppingBag size={18} color="white" />
            </span>
            Orders
          </h1>
          <div className="ao-filters">
            {statuses.map((s) => (
              <button
                key={s || "all"}
                className={`ao-filter-btn ${
                  statusFilter === s ? "active" : ""
                }`}
                onClick={() => setStatusFilter(s)}
              >
                {s || "All"}
              </button>
            ))}
          </div>
        </div>

        {/* Orders */}
        {loading ? (
          <div className="ao-loading">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="ao-empty">
            <div className="ao-empty-icon">
              <ShoppingBag size={28} style={{ color: "#2563EB" }} />
            </div>
            <h2 className="ao-empty-title">No Orders</h2>
            <p className="ao-empty-sub">
              {statusFilter
                ? `No ${statusFilter.toLowerCase()} orders found.`
                : "No orders have been placed yet."}
            </p>
          </div>
        ) : (
          <div className="ao-grid">
            {orders.map((order, i) => {
              const sc = statusColors[order.orderStatus] || statusColors.Pending;
              const initials = order.customer?.fullName
                ? order.customer.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "CU";

              return (
                <div
                  key={order._id}
                  className="ao-card"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div
                    className="ao-card-strip"
                    style={{
                      background: `linear-gradient(90deg, ${sc.color}, ${sc.color}50, transparent)`,
                    }}
                  />
                  <div className="ao-card-body">
                    {/* Top */}
                    <div className="ao-card-top">
                      <div>
                        <div
                          className="ao-order-num"
                          style={{ color: sc.color }}
                        >
                          #{order.orderNumber}
                        </div>
                        <div className="ao-order-time">
                          <Clock size={10} />
                          {new Date(order.createdAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                      <div
                        className="ao-status-badge"
                        style={{
                          background: sc.bg,
                          color: sc.color,
                          border: `1px solid ${sc.border}`,
                        }}
                      >
                        <span className="dot" />
                        {order.orderStatus}
                      </div>
                    </div>

                    {/* Customer */}
                    <div className="ao-customer-info">
                      <div className="ao-avatar">{initials}</div>
                      <div style={{ minWidth: 0 }}>
                        <p className="ao-customer-name">
                          {order.customer?.fullName || "Customer"}
                        </p>
                        <p className="ao-customer-phone">
                          <Phone size={10} />
                          {order.customer?.phone || "—"}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="ao-items-row">
                      {order.items?.map((item, idx) => (
                        <span key={idx} className="ao-item-chip">
                          {item.name} × {item.quantity}
                        </span>
                      ))}
                    </div>

                    {/* Amount */}
                    <div className="ao-amount-row">
                      <span className="ao-amount-label">Total</span>
                      <span className="ao-amount-value">
                        ₹{order.totalAmount}
                      </span>
                    </div>

                    {/* Map */}
                    {order.deliveryAddress?.latitude &&
                      order.deliveryAddress?.longitude && (
                        <a
                          href={`https://www.google.com/maps?q=${order.deliveryAddress.latitude},${order.deliveryAddress.longitude}`}
                          target="_blank"
                          rel="noreferrer"
                          className="ao-map-link"
                        >
                          <MapPin size={13} />
                          Open in Google Maps
                        </a>
                      )}

                    {/* Cancel */}
                    {order.orderStatus !== "Delivered" &&
                      order.orderStatus !== "Cancelled" && (
                        <button
                          className="ao-cancel-btn"
                          onClick={() => handleCancel(order._id)}
                        >
                          <XCircle size={15} />
                          Cancel Order
                        </button>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminOrders;

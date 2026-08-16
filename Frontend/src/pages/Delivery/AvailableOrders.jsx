import { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  IndianRupee,
  Package,
  Navigation,
  CheckCircle2,
  ArrowRight,
  Phone,
  User,
} from "lucide-react";
import {
  getAvailableOrders,
  acceptDelivery,
} from "../../services/deliveryService";

export const AvailableOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptedId, setAcceptedId] = useState(null);

  const loadOrders = async () => {
    try {
      const res = await getAvailableOrders();
      if (res.success) setOrders(res.orders || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleAccept = async (orderId) => {
    try {
      const res = await acceptDelivery(orderId);
      if (res.success) {
        setAcceptedId(orderId);
        setTimeout(() => loadOrders(), 1000);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error accepting order");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 rounded-full border-3 border-purple-200 border-t-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #9333ea, #ec4899)",
              boxShadow: "0 4px 15px rgba(147,51,234,0.35)",
            }}
          >
            <Package size={20} color="white" />
          </div>
          <div>
            <h1
              className="text-2xl font-extrabold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Available Orders
            </h1>
            <p className="text-sm" style={{ color: "#94a3b8" }}>
              Accept nearby delivery requests
            </p>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
          style={{
            background: "rgba(147,51,234,0.1)",
            color: "#a78bfa",
            border: "1px solid rgba(147,51,234,0.25)",
          }}
        >
          {orders.length} Available
        </span>
      </div>

      {/* Orders */}
      {orders.length === 0 ? (
        <div
          className="text-center py-16 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(147,51,234,0.01))",
            border: "1px solid rgba(147,51,234,0.1)",
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background: "rgba(147,51,234,0.08)",
              border: "1px solid rgba(147,51,234,0.15)",
            }}
          >
            <Package size={28} style={{ color: "#a78bfa" }} />
          </div>
          <h2 className="text-lg font-bold" style={{ color: "#1e293b" }}>
            No Available Orders
          </h2>
          <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
            Check back soon for new delivery requests.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {orders.map((order, i) => (
            <div
              key={order._id}
              className="rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                background:
                  "linear-gradient(135deg, rgba(147,51,234,0.03) 0%, rgba(147,51,234,0.01) 100%)",
                border:
                  acceptedId === order._id
                    ? "1px solid rgba(16,185,129,0.4)"
                    : "1px solid rgba(147,51,234,0.1)",
                backdropFilter: "blur(20px)",
                animation: `fadeSlideUp 0.5s ease ${i * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                if (acceptedId !== order._id) {
                  e.currentTarget.style.borderColor = "rgba(147,51,234,0.25)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (acceptedId !== order._id) {
                  e.currentTarget.style.borderColor = "rgba(147,51,234,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {/* Accent bar */}
              <div
                className="h-1"
                style={{
                  background: "linear-gradient(90deg, #9333ea, #ec4899, #f59e0b)",
                }}
              />

              <div className="p-5 sm:p-6">
                {/* Top */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg"
                      style={{
                        background: "rgba(147,51,234,0.12)",
                        border: "1px solid rgba(147,51,234,0.2)",
                        color: "#a78bfa",
                      }}
                    >
                      {order.orderNumber?.slice(-2) || "01"}
                    </div>
                    <div>
                      <h2 className="font-extrabold text-lg" style={{ color: "#1e293b" }}>
                        #{order.orderNumber}
                      </h2>
                      <p className="text-sm" style={{ color: "#94a3b8" }}>
                        <User size={12} style={{ display: "inline", marginRight: 4 }} />
                        {order.customer?.fullName || "Customer"}
                      </p>
                    </div>
                  </div>
                  <div
                    className="text-right px-4 py-2 rounded-xl"
                    style={{
                      background: "rgba(147,51,234,0.08)",
                      border: "1px solid rgba(147,51,234,0.15)",
                    }}
                  >
                    <p className="text-[10px] font-bold uppercase" style={{ color: "#a78bfa" }}>
                      Order Value
                    </p>
                    <p className="font-extrabold text-lg" style={{ color: "#a78bfa" }}>
                      ₹{order.totalAmount}
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                <div
                  className="flex items-center gap-4 p-3 rounded-xl mb-4"
                  style={{
                    background: "rgba(147,51,234,0.02)",
                    border: "1px solid rgba(147,51,234,0.03)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Phone size={14} style={{ color: "#a78bfa" }} />
                    <span className="text-sm" style={{ color: "#475569" }}>
                      {order.customer?.phone || "—"}
                    </span>
                  </div>
                  {order.deliveryAddress?.address && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} style={{ color: "#ec4899" }} />
                      <span className="text-sm" style={{ color: "#475569" }}>
                        {order.deliveryAddress.address}
                      </span>
                    </div>
                  )}
                </div>

                {/* Items */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {order.items?.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: "rgba(245,158,11,0.08)",
                        border: "1px solid rgba(245,158,11,0.15)",
                        color: "#f59e0b",
                      }}
                    >
                      {item.name} × {item.quantity}
                    </span>
                  ))}
                </div>

                {/* Map link */}
                {order.deliveryAddress?.latitude && (
                  <a
                    href={`https://www.google.com/maps?q=${order.deliveryAddress.latitude},${order.deliveryAddress.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold mb-4 transition-all duration-300"
                    style={{
                      background: "rgba(59,130,246,0.08)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      color: "#60a5fa",
                      textDecoration: "none",
                    }}
                  >
                    <Navigation size={14} />
                    Open in Google Maps
                  </a>
                )}

                {/* Accept Button */}
                {acceptedId === order._id ? (
                  <div
                    className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold"
                    style={{
                      background: "linear-gradient(135deg, #10b981, #34d399)",
                      color: "white",
                    }}
                  >
                    <CheckCircle2 size={18} />
                    Order Accepted!
                  </div>
                ) : (
                  <button
                    onClick={() => handleAccept(order._id)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold cursor-pointer transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #9333ea, #ec4899)",
                      color: "white",
                      boxShadow: "0 4px 20px rgba(147,51,234,0.35)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(147,51,234,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(147,51,234,0.35)";
                    }}
                  >
                    Accept Order
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableOrders;

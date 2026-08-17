import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  User,
  Phone,
  MapPin,
  Clock,
  Navigation,
  CircleCheckBig,
  PackageCheck,
  CreditCard,
  IndianRupee,
  ShoppingBag,
  Calendar,
} from "lucide-react";
import { getDeliveryOrderDetail } from "../../services/deliveryService";
import { pickupOrder, outForDelivery, deliveredOrder } from "../../services/orderService";

const c = { plum: "#5B3A57", rose: "#D9829B", champagne: "#D6B77A", bg: "#FCF8FA", text: "#352832", textSec: "#8B7585" };

const statusConfig = {
  Assigned: { color: "#7C3AED", label: "Assigned", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", icon: Package, actionLabel: "Picked Up" },
  "Picked Up": { color: "#D97706", label: "Picked Up", bg: "rgba(217,119,6,0.08)", border: "rgba(217,119,6,0.2)", icon: PackageCheck, actionLabel: "Out For Delivery" },
  "Out For Delivery": { color: "#0891B2", label: "On the Way", bg: "rgba(8,145,178,0.08)", border: "rgba(8,145,178,0.2)", icon: Navigation, actionLabel: "Mark Delivered" },
  Delivered: { color: "#16A34A", label: "Delivered", bg: "rgba(22,163,74,0.08)", border: "rgba(22,163,74,0.2)", icon: CircleCheckBig, actionLabel: "Delivered ✓" },
};

const statusTimeline = ["Assigned", "Picked Up", "Out For Delivery", "Delivered"];

export const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const res = await getDeliveryOrderDetail(id);
      if (res.success) setOrder(res.order);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    setActionLoading(true);
    try {
      if (order.orderStatus === "Assigned") await pickupOrder(order._id);
      else if (order.orderStatus === "Picked Up") await outForDelivery(order._id);
      else if (order.orderStatus === "Out For Delivery") await deliveredOrder(order._id);
      loadOrder();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, color: c.textSec }}>
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2 style={{ color: c.text }}>Order not found</h2>
        <button onClick={() => navigate(-1)} style={{ marginTop: 12, color: c.plum, cursor: "pointer", background: "none", border: "none", fontWeight: 600 }}>
          Go Back
        </button>
      </div>
    );
  }

  const config = statusConfig[order.orderStatus] || statusConfig.Assigned;
  const isDone = order.orderStatus === "Delivered";
  const currentStep = statusTimeline.indexOf(order.orderStatus);
  const initials = order.customer?.fullName?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "CU";

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
          color: c.plum, fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", marginBottom: 16, padding: 0,
        }}
      >
        <ArrowLeft size={16} /> Back to My Deliveries
      </button>

      {/* Order Card */}
      <div style={{
        background: "white", borderRadius: 16, border: "1px solid rgba(91,58,87,0.08)",
        overflow: "hidden", marginBottom: 18,
      }}>
        <div style={{ height: 4, background: `linear-gradient(90deg, ${config.color}, ${config.color}40, transparent)` }} />
        <div style={{ padding: 24 }}>

          {/* Top Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 50, height: 50, borderRadius: 14, background: config.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${config.border}`,
              }}>
                <config.icon size={22} style={{ color: config.color }} />
              </div>
              <div>
                <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: c.text, margin: 0 }}>
                  #{order.orderNumber}
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <Calendar size={12} style={{ color: c.textSec }} />
                  <span style={{ fontSize: "0.78rem", color: c.textSec }}>
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
            <span style={{
              padding: "6px 14px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700,
              background: config.bg, color: config.color, border: `1px solid ${config.border}`,
              display: "flex", alignItems: "center", gap: 5,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: config.color }} />
              {config.label}
            </span>
          </div>

          {/* Status Timeline */}
          <div style={{
            display: "flex", gap: 0, marginBottom: 24, background: "rgba(91,58,87,0.03)",
            borderRadius: 12, padding: "16px 12px", border: "1px solid rgba(91,58,87,0.06)",
          }}>
            {statusTimeline.map((step, i) => {
              const isCompleted = i <= currentStep;
              const isCurrent = i === currentStep;
              return (
                <div key={step} style={{ flex: 1, textAlign: "center", position: "relative" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", margin: "0 auto 6px",
                    background: isCompleted ? config.color : "rgba(91,58,87,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: isCurrent ? `3px solid ${config.color}30` : "none",
                    transition: "all 0.3s",
                  }}>
                    {isCompleted ? (
                      <CircleCheckBig size={14} style={{ color: "white" }} />
                    ) : (
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(91,58,87,0.2)" }} />
                    )}
                  </div>
                  <span style={{
                    fontSize: "0.65rem", fontWeight: isCurrent ? 700 : 500,
                    color: isCompleted ? config.color : c.textSec,
                  }}>
                    {step}
                  </span>
                  {i < statusTimeline.length - 1 && (
                    <div style={{
                      position: "absolute", top: 13, right: -10, width: 20, height: 2,
                      background: i < currentStep ? config.color : "rgba(91,58,87,0.12)",
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Customer Info */}
          <div style={{
            padding: "16px", borderRadius: 12, background: "rgba(91,58,87,0.02)",
            border: "1px solid rgba(91,58,87,0.06)", marginBottom: 18,
          }}>
            <h3 style={{ fontSize: "0.78rem", fontWeight: 600, color: c.textSec, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Customer Details
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `linear-gradient(135deg, ${c.plum}, ${c.rose})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 800, fontSize: "0.85rem",
              }}>
                {initials}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.95rem", color: c.text, margin: 0 }}>{order.customer?.fullName || "Customer"}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Phone size={12} style={{ color: c.textSec }} />
                  <span style={{ fontSize: "0.82rem", color: c.textSec }}>{order.customer?.phone || "—"}</span>
                </div>
              </div>
            </div>
            {order.deliveryAddress?.address && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 8 }}>
                <MapPin size={14} style={{ color: c.rose, marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: "0.82rem", color: c.text, margin: 0 }}>{order.deliveryAddress.address}</p>
                  {[order.deliveryAddress.city, order.deliveryAddress.state, order.deliveryAddress.pincode].filter(Boolean).join(", ") && (
                    <p style={{ fontSize: "0.75rem", color: c.textSec, margin: "2px 0 0" }}>
                      {[order.deliveryAddress.city, order.deliveryAddress.state, order.deliveryAddress.pincode].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>
              </div>
            )}
            {order.deliveryAddress?.latitude && (
              <a
                href={`https://www.google.com/maps?q=${order.deliveryAddress.latitude},${order.deliveryAddress.longitude}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10,
                  padding: "8px 14px", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600,
                  background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)",
                  color: "#2563EB", textDecoration: "none",
                }}
              >
                <Navigation size={14} /> Open in Google Maps
              </a>
            )}
          </div>

          {/* Items */}
          <div style={{
            padding: "16px", borderRadius: 12, background: "rgba(91,58,87,0.02)",
            border: "1px solid rgba(91,58,87,0.06)", marginBottom: 18,
          }}>
            <h3 style={{ fontSize: "0.78rem", fontWeight: 600, color: c.textSec, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <ShoppingBag size={12} style={{ display: "inline", marginRight: 4 }} /> Order Items
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {order.items?.map((item, idx) => (
                <div key={idx} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 12px", borderRadius: 10, background: "white",
                  border: "1px solid rgba(91,58,87,0.05)",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: "rgba(214,183,122,0.1)", display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: c.champagne,
                  }}>
                    ×{item.quantity}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", color: c.text, margin: 0 }}>{item.name}</p>
                    <p style={{ fontSize: "0.72rem", color: c.textSec, margin: 0 }}>₹{item.price} each</p>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: "0.88rem", color: c.text }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div style={{
            padding: "16px", borderRadius: 12, background: "rgba(91,58,87,0.02)",
            border: "1px solid rgba(91,58,87,0.06)", marginBottom: 20,
          }}>
            <h3 style={{ fontSize: "0.78rem", fontWeight: 600, color: c.textSec, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <CreditCard size={12} style={{ display: "inline", marginRight: 4 }} /> Payment Summary
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                <span style={{ color: c.textSec }}>Subtotal</span>
                <span style={{ color: c.text }}>₹{order.subtotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                <span style={{ color: c.textSec }}>Delivery</span>
                <span style={{ color: c.text }}>₹{order.deliveryCharge}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                <span style={{ color: c.textSec }}>Tax</span>
                <span style={{ color: c.text }}>₹{order.tax}</span>
              </div>
              {order.discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  <span style={{ color: c.textSec }}>Discount {order.couponCode && `(${order.couponCode})`}</span>
                  <span style={{ color: "#16A34A" }}>-₹{order.discount}</span>
                </div>
              )}
              <div style={{ borderTop: "1px solid rgba(91,58,87,0.08)", paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: "0.95rem", color: c.text }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: "1.2rem", color: c.champagne }}>₹{order.totalAmount}</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 600, padding: "3px 8px", borderRadius: 6,
                  background: order.paymentStatus === "Paid" ? "rgba(22,163,74,0.08)" : "rgba(245,158,11,0.08)",
                  color: order.paymentStatus === "Paid" ? "#16A34A" : "#f59e0b",
                }}>
                  {order.paymentStatus}
                </span>
                <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: "rgba(91,58,87,0.05)", color: c.textSec }}>
                  {order.paymentMethod}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {!isDone && (
            <button
              onClick={handleAction}
              disabled={actionLoading}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "14px", borderRadius: 12, fontSize: "0.95rem", fontWeight: 700,
                border: "none", cursor: "pointer",
                background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`,
                color: "white", boxShadow: `0 4px 20px ${config.color}30`,
              }}
            >
              {actionLoading ? "Processing..." : config.actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

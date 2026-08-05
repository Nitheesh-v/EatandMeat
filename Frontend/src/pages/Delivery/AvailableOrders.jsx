import {
  MapPin,
  Clock3,
  IndianRupee,
  Package,
  Navigation,
  CheckCircle2,
  ArrowRight,
  Flame,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAvailableOrders,
  acceptDelivery,
} from "../../services/deliveryService";
import { useAuth } from "../../Context/AuthContext";


const availableOrdersStyles = `
.ao-page { min-height: 100vh; }

.ao-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
.ao-header-left { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.ao-header-icon {
  width: 40px; height: 40px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #d4213c 0%, #ff6b35 100%);
  box-shadow: 0 4px 15px rgba(212,33,60,0.4);
}
.ao-title {
  font-size: clamp(1.5rem, 4vw, 1.875rem);
  font-weight: 800; letter-spacing: -0.02em; line-height: 1.2;
  background: linear-gradient(135deg, #ffffff 0%, #e0d0d0 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.ao-subtitle { font-size: 0.875rem; color: rgba(255,255,255,0.4); }

.ao-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 16px; border-radius: 999px;
  font-size: 0.875rem; font-weight: 700;
  background: rgba(212,33,60,0.12);
  border: 1px solid rgba(212,33,60,0.25);
  color: #d4213c;
}

.ao-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 24px; }
.ao-stat-card {
  display: flex; align-items: center; gap: 16px;
  padding: 16px; border-radius: 12px;
  background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: default;
}
.ao-stat-card:hover { transform: translateY(-2px); }
.ao-stat-icon {
  width: 44px; height: 44px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.ao-stat-label { font-size: 0.75rem; font-weight: 500; color: rgba(255,255,255,0.4); }
.ao-stat-value { font-size: 1.25rem; font-weight: 800; color: #fff; }

.ao-orders { display: grid; gap: 20px; margin-top: 24px; }
.ao-order-card {
  border-radius: 16px; overflow: hidden;
  background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  transition: all 0.5s ease;
}
.ao-order-card:hover { transform: translateY(-2px); }
.ao-order-card.accepted {
  border-color: rgba(16,185,129,0.4);
  box-shadow: 0 8px 30px rgba(16,185,129,0.15);
}

.ao-accent-bar { height: 4px; background: linear-gradient(90deg, #d4213c, #ff6b35, #d4af37); }

.ao-card-body { padding: 20px; }
@media (min-width: 640px) { .ao-card-body { padding: 24px; } }

.ao-card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
.ao-card-top-left { display: flex; align-items: center; gap: 12px; }
.ao-order-num {
  width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 1.125rem;
  background: linear-gradient(135deg, rgba(212,33,60,0.15), rgba(212,175,55,0.1));
  border: 1px solid rgba(212,33,60,0.2);
  color: #d4213c;
  flex-shrink: 0;
}
.ao-order-id { font-weight: 800; font-size: 1.125rem; color: #fff; }
.ao-order-customer { font-size: 0.875rem; color: rgba(255,255,255,0.4); }

.ao-earnings-box {
  text-align: right; padding: 8px 16px; border-radius: 12px;
  background: linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 100%);
  border: 1px solid rgba(212,175,55,0.2);
}
.ao-earnings-label { font-size: 0.625rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #d4af37; }
.ao-earnings-value { font-size: 1.25rem; font-weight: 800; color: #d4af37; }

.ao-details { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 24px; }
@media (min-width: 768px) { .ao-details { grid-template-columns: 1fr 1fr; } }
.ao-detail-col { display: flex; flex-direction: column; gap: 14px; }

.ao-detail-row { display: flex; align-items: center; gap: 12px; }
.ao-detail-icon {
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.ao-detail-text { font-size: 0.875rem; color: rgba(255,255,255,0.7); }

.ao-footer {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 24px; padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.06);
  flex-wrap: wrap; gap: 12px;
}
.ao-distance { display: flex; align-items: center; gap: 8px; }
.ao-distance-label { font-size: 0.875rem; color: rgba(255,255,255,0.4); }
.ao-distance-value { font-weight: 800; font-size: 0.875rem; color: #fff; }

.ao-accept-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 24px; border-radius: 12px;
  font-size: 0.875rem; font-weight: 700;
  background: linear-gradient(135deg, #d4213c 0%, #96101f 60%, #6e0f1c 100%);
  color: white; border: none; cursor: pointer;
  box-shadow: 0 4px 20px rgba(212,33,60,0.4);
  transition: all 0.3s ease;
}
.ao-accept-btn:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 30px rgba(212,33,60,0.6); }

.ao-accepted-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 24px; border-radius: 12px;
  font-size: 0.875rem; font-weight: 700;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 4px 20px rgba(16,185,129,0.4);
}

.ao-empty {
  text-align: center; padding: 60px 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
}
.ao-empty-icon {
  width: 80px; height: 80px; border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, rgba(212,33,60,0.1), rgba(212,175,55,0.05));
  border: 1px solid rgba(212,33,60,0.2);
}

@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse-dot { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }
`;

export const AvailableOrders = () => {

  const { currentUser } = useAuth();
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
const [acceptedOrder, setAcceptedOrder] = useState(null);

 const availableOrders = orders;
 useEffect(() => {
  loadOrders();
}, []);

const loadOrders = async () => {
  try {
    const res = await getAvailableOrders();

    if (res.success) {
      setOrders(res.orders);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

const handleAccept = async (orderId) => {
  try {
    const res = await acceptDelivery(orderId);

    if (res.success) {
      setAcceptedOrder(orderId);
      loadOrders();
    }
  } catch (err) {
    console.log(err);
  }
};

  const stats = [
    { label: "Total Available", value: availableOrders.length, color: "#d4213c", icon: Package },
    { label: "Avg. Distance", value: "3.2 km", color: "#d4af37", icon: Navigation },
    { label: "Avg. Earnings", value: "₹65", color: "#10b981", icon: IndianRupee },
  ];



  if (loading) {
  return <h2>Loading...</h2>;
}
  if (availableOrders.length === 0) {
    return (
      <>
        <style>{availableOrdersStyles}</style>
        <div className="ao-page">
          <div className="ao-empty" style={{ animation: "fadeSlideUp 0.5s ease both" }}>
            <div className="ao-empty-icon">
              <Package size={36} style={{ color: "rgba(212,33,60,0.7)" }} />
            </div>
            <h2 className="text-xl font-extrabold mb-2" style={{ color: "#fff" }}>
              No Available Orders
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Check back soon for new delivery requests in your zone.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{availableOrdersStyles}</style>
      <div className="ao-page">
        {/* Header */}
        <div className="ao-header">
          <div>
            <div className="ao-header-left">
              <div className="ao-header-icon">
                <Package size={20} color="white" />
              </div>
              <div>
                <h1 className="ao-title">Available Orders</h1>
                <p className="ao-subtitle">Accept nearby delivery requests in your zone</p>
              </div>
            </div>
          </div>
          <div className="ao-badge">
            <Flame size={16} />
            {availableOrders.length} New Orders
          </div>
        </div>

        {/* Stats row */}
        <div className="ao-stats">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="ao-stat-card"
              style={{
                animation: `fadeSlideUp 0.5s ease ${i * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${stat.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <div
                className="ao-stat-icon"
                style={{
                  background: `${stat.color}15`,
                  boxShadow: `0 0 15px ${stat.color}25`,
                }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div>
                <p className="ao-stat-label">{stat.label}</p>
                <p className="ao-stat-value">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Orders List */}
        <div className="ao-orders">
          {availableOrders.map((order, i) => (
            <div
              key={order.id}
              className={`ao-order-card ${acceptedOrder === order.id ? "accepted" : ""}`}
              style={{
                animation: `fadeSlideUp 0.5s ease ${i * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                if (acceptedOrder !== order.id) {
                  e.currentTarget.style.borderColor = "rgba(212,33,60,0.2)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(212,33,60,0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (acceptedOrder !== order.id) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
                }
              }}
            >
              {/* Accent bar */}
              <div className="ao-accent-bar" />

              <div className="ao-card-body">
                <div className="ao-card-top">
                  <div className="ao-card-top-left">
                    <div className="ao-order-num">
                      {order.id?.slice(-2) || "01"}
                    </div>
                    <div>
                      <h2 className="ao-order-id">{order.id}</h2>
                      <p className="ao-order-customer">{order.customer?.fullName}</p>
                    </div>
                  </div>
                  <div className="ao-earnings-box">
                    <p className="ao-earnings-label">You Earn</p>
                    <p className="ao-earnings-value">{order.earnings}</p>
                  </div>
                </div>

                {/* Details grid */}
                <div className="ao-details">
                  <div className="ao-detail-col">
                    <div className="ao-detail-row">
                      <div
                        className="ao-detail-icon"
                        style={{ background: "rgba(212,33,60,0.1)" }}
                      >
                        <MapPin size={16} style={{ color: "#d4213c" }} />
                      </div>
                      <span className="ao-detail-text">{order.address}</span>
                    </div>
                    <div className="ao-detail-row">
                      <div
                        className="ao-detail-icon"
                        style={{ background: "rgba(212,175,55,0.1)" }}
                      >
                        <Clock3 size={16} style={{ color: "#d4af37" }} />
                      </div>
                      <span className="ao-detail-text">{order.time}</span>
                    </div>
                  </div>

                  <div className="ao-detail-col">
                    <div className="ao-detail-row">
                      <div
                        className="ao-detail-icon"
                        style={{ background: "rgba(16,185,129,0.1)" }}
                      >
                        <Package size={16} style={{ color: "#10b981" }} />
                      </div>
                      <span className="ao-detail-text">
                        {order.items?.map((item) => item.name).join(", ")}
                      </span>
                    </div>
                    <div className="ao-detail-row">
                      <div
                        className="ao-detail-icon"
                        style={{ background: "rgba(212,175,55,0.1)" }}
                      >
                        <IndianRupee size={16} style={{ color: "#d4af37" }} />
                      </div>
                      <span className="ao-detail-text">
                        Order: <span className="font-bold" style={{ color: "#fff" }}>{order.amount}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="ao-footer">
                  <div className="ao-distance">
                    <Navigation size={16} style={{ color: "#d4af37" }} />
                    <span className="ao-distance-label">Distance:</span>
                    <span className="ao-distance-value">{order.distance}</span>
                  </div>

                  {acceptedOrder === order._id ? (
                    <div className="ao-accepted-badge">
                      <CheckCircle2 size={18} />
                      Order Accepted!
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAccept(order._id)}
                      className="ao-accept-btn"
                    >
                      Accept Order
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


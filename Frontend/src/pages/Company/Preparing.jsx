import { useEffect, useState } from "react";
import { getCompanyOrders, packedOrder } from "../../services/orderService";
import { ChefHat, User, Phone, IndianRupee, PackageCheck, MapPin } from "lucide-react";

const styles = `
.pk-wrap { animation: pkIn 0.4s ease-out; }
@keyframes pkIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.pk-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 10px; }
.pk-head-left { display: flex; align-items: center; gap: 10px; }
.pk-head h1 { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 800; color: #1e293b; margin: 0; }
.pk-head-icon {
  width: 38px; height: 38px; background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.25);
  border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #f97316;
}
.pk-count-tag { background: rgba(249,115,22,0.1); color: #ea580c; padding: 5px 13px; border-radius: 14px; font-size: 0.78rem; font-weight: 700; }
.pk-empty { background: white; border: 1px solid rgba(59,130,246,0.08); border-radius: 14px; padding: 44px 24px; text-align: center; }
.pk-empty .icon-circle {
  width: 56px; height: 56px; background: rgba(249,115,22,0.08); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; color: #f97316;
}
.pk-empty h2 { color: #1e293b; font-size: 1.2rem; font-weight: 700; margin: 0 0 6px 0; }
.pk-empty p { color: #64748b; margin: 0; font-size: 0.85rem; }
.pk-stack { display: flex; flex-direction: column; gap: 12px; }
.pk-card {
  background: white; border: 1px solid rgba(59,130,246,0.08); border-radius: 14px;
  padding: 18px 18px 18px 22px; position: relative; transition: all 0.25s ease;
}
.pk-card::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
  background: linear-gradient(180deg, #f97316, #ea580c); border-radius: 14px 0 0 14px;
}
.pk-card:hover { border-color: rgba(59,130,246,0.2); box-shadow: 0 4px 12px rgba(59,130,246,0.06); }
.pk-row { display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap; }
.pk-id { font-size: 1rem; font-weight: 700; color: #1e293b; margin: 0 0 8px 0; }
.pk-meta { display: flex; align-items: center; gap: 7px; color: #64748b; font-size: 0.83rem; margin-bottom: 5px; }
.pk-total { display: flex; align-items: center; gap: 4px; font-size: 1.05rem; font-weight: 800; color: #3b82f6; margin-top: 8px; }
.pk-btn {
  padding: 10px 18px; border-radius: 9px; border: none; font-weight: 600; font-size: 0.85rem;
  cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 6px;
  color: white; background: linear-gradient(135deg, #3b82f6, #2563eb); box-shadow: 0 4px 14px rgba(59,130,246,0.28);
}
.pk-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(59,130,246,0.36); }
`;

export const Preparing = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const res = await getCompanyOrders("Preparing");
      setOrders(res.orders || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handlePacked = async (id) => {
    try {
      await packedOrder(id);
      loadOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Loading...</div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="pk-wrap">
        <div className="pk-head">
          <div className="pk-head-left">
            <span className="pk-head-icon"><ChefHat size={16} /></span>
            <h1>Preparing</h1>
          </div>
          <span className="pk-count-tag">{orders.length} in kitchen</span>
        </div>

        {orders.length === 0 ? (
          <div className="pk-empty">
            <div className="icon-circle"><ChefHat size={24} /></div>
            <h2>Nothing Cooking Right Now</h2>
            <p>Orders being prepared will show up here.</p>
          </div>
        ) : (
          <div className="pk-stack">
            {orders.map((order) => (
              <div key={order._id} className="pk-card">
                <div className="pk-row">
                  <div>
                    <h2 className="pk-id">#{order.orderNumber}</h2>
                    <div className="pk-meta"><User size={13} /> {order.customer?.fullName || "Customer"}</div>
                    <div className="pk-meta"><Phone size={13} /> {order.customer?.phone || "—"}</div>
                    {order.deliveryAddress?.address && (
                      <div className="pk-meta"><MapPin size={13} /> {order.deliveryAddress.address}</div>
                    )}
                    <div className="pk-total"><IndianRupee size={15} />{order.totalAmount}</div>
                  </div>
                  <button onClick={() => handlePacked(order._id)} className="pk-btn">
                    <PackageCheck size={15} />
                    Mark as Packed
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Preparing;

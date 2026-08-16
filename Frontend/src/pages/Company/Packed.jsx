import { useEffect, useState } from "react";
import { getCompanyOrders } from "../../services/orderService";
import { PackageCheck, User, Phone, IndianRupee, CheckCircle2, MapPin } from "lucide-react";

const styles = `
.pk-wrap { animation: pkIn 0.4s ease-out; }
@keyframes pkIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.pk-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 10px; }
.pk-head-left { display: flex; align-items: center; gap: 10px; }
.pk-head h1 { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 800; color: #1e293b; margin: 0; }
.pk-head-icon {
  width: 38px; height: 38px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25);
  border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #16a34a;
}
.pk-count-tag { background: rgba(34,197,94,0.1); color: #16a34a; padding: 5px 13px; border-radius: 14px; font-size: 0.78rem; font-weight: 700; }
.pk-empty { background: white; border: 1px solid rgba(59,130,246,0.08); border-radius: 14px; padding: 44px 24px; text-align: center; }
.pk-empty .icon-circle {
  width: 56px; height: 56px; background: rgba(34,197,94,0.08); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; color: #16a34a;
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
  background: linear-gradient(180deg, #22c55e, #16a34a); border-radius: 14px 0 0 14px;
}
.pk-card:hover { border-color: rgba(59,130,246,0.2); box-shadow: 0 4px 12px rgba(59,130,246,0.06); }
.pk-row { display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap; }
.pk-id { font-size: 1rem; font-weight: 700; color: #1e293b; margin: 0 0 8px 0; }
.pk-meta { display: flex; align-items: center; gap: 7px; color: #64748b; font-size: 0.83rem; margin-bottom: 5px; }
.pk-total { display: flex; align-items: center; gap: 4px; font-size: 1.05rem; font-weight: 800; color: #3b82f6; margin-top: 8px; }
.pk-status-pill {
  display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 10px;
  font-weight: 600; font-size: 0.83rem; background: rgba(34,197,94,0.08); color: #16a34a;
  border: 1px solid rgba(34,197,94,0.2);
}
`;

export const Packed = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCompanyOrders("Packed");
        setOrders(res.orders || []);
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
            <span className="pk-head-icon"><PackageCheck size={16} /></span>
            <h1>Packed</h1>
          </div>
          <span className="pk-count-tag">{orders.length} ready</span>
        </div>

        {orders.length === 0 ? (
          <div className="pk-empty">
            <div className="icon-circle"><PackageCheck size={24} /></div>
            <h2>No Orders Packed Yet</h2>
            <p>Once orders are packed in the kitchen, they'll show up here.</p>
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
                  <div className="pk-status-pill">
                    <CheckCircle2 size={15} />
                    Awaiting Delivery Partner
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Packed;

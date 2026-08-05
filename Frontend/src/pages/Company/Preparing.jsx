import { useOrder } from "../../Context/OrderContext";
import { ChefHat, User, Phone, IndianRupee, PackageCheck } from "lucide-react";

const preparingStyles = `
.kv-wrap { animation: kvIn 0.4s ease-out; }
@keyframes kvIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.kv-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 10px; }
.kv-head-left { display: flex; align-items: center; gap: 10px; }
.kv-head h1 { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 800; color: #2a1a12; margin: 0; }
.kv-head-icon {
  width: 38px; height: 38px; background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.25);
  border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #ea580c;
}
.kv-count-tag { background: rgba(249,115,22,0.1); color: #ea580c; padding: 5px 13px; border-radius: 14px; font-size: 0.78rem; font-weight: 700; }
.kv-empty { background: white; border: 1px solid rgba(42,26,18,0.08); border-radius: 14px; padding: 44px 24px; text-align: center; }
.kv-empty .icon-circle {
  width: 56px; height: 56px; background: rgba(249,115,22,0.08); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; color: #ea580c;
}
.kv-empty h2 { color: #2a1a12; font-size: 1.2rem; font-weight: 700; margin: 0 0 6px 0; }
.kv-empty p { color: #8a7a6d; margin: 0; font-size: 0.85rem; }
.kv-stack { display: flex; flex-direction: column; gap: 12px; }
.kv-card {
  background: white; border: 1px solid rgba(42,26,18,0.08); border-radius: 14px;
  padding: 18px 18px 18px 22px; position: relative; transition: all 0.25s ease;
}
.kv-card::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
  background: linear-gradient(180deg, #f97316, #ea580c); border-radius: 14px 0 0 14px;
}
.kv-card:hover { border-color: rgba(249,115,22,0.25); box-shadow: 0 4px 12px rgba(42,26,18,0.05); }
.kv-row { display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap; }
.kv-id { font-size: 1rem; font-weight: 700; color: #2a1a12; margin: 0 0 8px 0; }
.kv-meta { display: flex; align-items: center; gap: 7px; color: #6b5b4f; font-size: 0.83rem; margin-bottom: 5px; }
.kv-total { display: flex; align-items: center; gap: 4px; font-size: 1.05rem; font-weight: 800; color: #e23744; margin-top: 8px; }
.kv-btn {
  padding: 10px 18px; border-radius: 9px; border: none; font-weight: 600; font-size: 0.85rem;
  cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 6px;
  color: white; background: linear-gradient(135deg, #3b82f6, #2563eb); box-shadow: 0 4px 14px rgba(59,130,246,0.28);
}
.kv-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(59,130,246,0.36); }
`;

export const Preparing = () => {
  const { orders, markPacked, assignDeliveryPartner } = useOrder();

  const preparingOrders = orders.filter((o) => o.kitchenStatus === "Preparing");

  return (
    <>
      <style>{preparingStyles}</style>
      <div className="kv-wrap">
        <div className="kv-head">
          <div className="kv-head-left">
            <span className="kv-head-icon"><ChefHat size={16} /></span>
            <h1>Preparing</h1>
          </div>
          <span className="kv-count-tag">{preparingOrders.length} in kitchen</span>
        </div>

        {preparingOrders.length === 0 ? (
          <div className="kv-empty">
            <div className="icon-circle"><ChefHat size={24} /></div>
            <h2>Nothing Cooking Right Now</h2>
            <p>Orders being prepared will show up here.</p>
          </div>
        ) : (
          <div className="kv-stack">
            {preparingOrders.map((order) => (
              <div key={order.id} className="kv-card">
                <div className="kv-row">
                  <div>
                    <h2 className="kv-id">{order.id}</h2>
                    <div className="kv-meta"><User size={13} /> {order.customer?.name || "Customer"}</div>
                    <div className="kv-meta"><Phone size={13} /> {order.customer?.phone || "—"}</div>
                    <div className="kv-total"><IndianRupee size={15} />{order.total}</div>
                  </div>
                  <button
                    onClick={() => {
                      markPacked(order.id);
                      assignDeliveryPartner(order.id);
                    }}
                    className="kv-btn"
                  >
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
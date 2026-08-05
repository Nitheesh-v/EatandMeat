import { useOrder } from "../../Context/OrderContext";
import { PackageCheck, User, Phone, IndianRupee, Bike, CheckCircle2 } from "lucide-react";

const packedStyles = `
.kv-wrap { animation: kvIn 0.4s ease-out; }
@keyframes kvIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.kv-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 10px; }
.kv-head-left { display: flex; align-items: center; gap: 10px; }
.kv-head h1 { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 800; color: #2a1a12; margin: 0; }
.kv-head-icon {
  width: 38px; height: 38px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25);
  border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #16a34a;
}
.kv-count-tag { background: rgba(34,197,94,0.1); color: #16a34a; padding: 5px 13px; border-radius: 14px; font-size: 0.78rem; font-weight: 700; }
.kv-empty { background: white; border: 1px solid rgba(42,26,18,0.08); border-radius: 14px; padding: 44px 24px; text-align: center; }
.kv-empty .icon-circle {
  width: 56px; height: 56px; background: rgba(34,197,94,0.08); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; color: #16a34a;
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
  background: linear-gradient(180deg, #22c55e, #16a34a); border-radius: 14px 0 0 14px;
}
.kv-card:hover { border-color: rgba(34,197,94,0.25); box-shadow: 0 4px 12px rgba(42,26,18,0.05); }
.kv-row { display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap; }
.kv-id { font-size: 1rem; font-weight: 700; color: #2a1a12; margin: 0 0 8px 0; }
.kv-meta { display: flex; align-items: center; gap: 7px; color: #6b5b4f; font-size: 0.83rem; margin-bottom: 5px; }
.kv-total { display: flex; align-items: center; gap: 4px; font-size: 1.05rem; font-weight: 800; color: #e23744; margin-top: 8px; }
.kv-status-pill {
  display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 10px;
  font-weight: 600; font-size: 0.83rem; background: rgba(34,197,94,0.08); color: #16a34a;
  border: 1px solid rgba(34,197,94,0.2);
}
`;

export const Packed = () => {
  const { orders } = useOrder();

  const packedOrders = orders.filter((o) => o.kitchenStatus === "Packed");

  return (
    <>
      <style>{packedStyles}</style>
      <div className="kv-wrap">
        <div className="kv-head">
          <div className="kv-head-left">
            <span className="kv-head-icon"><PackageCheck size={16} /></span>
            <h1>Packed</h1>
          </div>
          <span className="kv-count-tag">{packedOrders.length} ready</span>
        </div>

        {packedOrders.length === 0 ? (
          <div className="kv-empty">
            <div className="icon-circle"><PackageCheck size={24} /></div>
            <h2>No Orders Packed Yet</h2>
            <p>Once orders are packed in the kitchen, they'll show up here.</p>
          </div>
        ) : (
          <div className="kv-stack">
            {packedOrders.map((order) => (
              <div key={order.id} className="kv-card">
                <div className="kv-row">
                  <div>
                    <h2 className="kv-id">{order.id}</h2>
                    <div className="kv-meta"><User size={13} /> {order.customer?.name || "Customer"}</div>
                    <div className="kv-meta"><Phone size={13} /> {order.customer?.phone || "—"}</div>
                    <div className="kv-total"><IndianRupee size={15} />{order.total}</div>
                  </div>

                  {order.assignedPartner ? (
                    <div className="kv-status-pill">
                      <Bike size={15} />
                      With {order.assignedPartner.name}
                    </div>
                  ) : (
                    <div className="kv-status-pill" style={{ background: "rgba(212,175,55,0.1)", color: "#a9871f", borderColor: "rgba(212,175,55,0.3)" }}>
                      <CheckCircle2 size={15} />
                      Awaiting Partner Assignment
                    </div>
                  )}
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
import { useOrder } from "../../Context/OrderContext";
import { Bike, User, Phone, IndianRupee, PackageCheck, CheckCircle2 } from "lucide-react";

const dpStyles = `
.dp-wrap { animation: dpIn 0.4s ease-out; }
@keyframes dpIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.dp-head { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
.dp-head h1 { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 800; color: #2a1a12; margin: 0; }
.dp-head-icon {
  width: 38px; height: 38px; background: rgba(226,55,68,0.1); border: 1px solid rgba(226,55,68,0.2);
  border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #e23744;
}
.dp-empty { background: white; border: 1px solid rgba(42,26,18,0.08); border-radius: 14px; padding: 44px 24px; text-align: center; }
.dp-empty .icon-circle {
  width: 56px; height: 56px; background: rgba(226,55,68,0.08); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; color: #e23744;
}
.dp-empty h2 { color: #2a1a12; font-size: 1.2rem; font-weight: 700; margin: 0 0 6px 0; }
.dp-empty p { color: #8a7a6d; margin: 0; font-size: 0.85rem; }
.dp-stack { display: flex; flex-direction: column; gap: 12px; }
.dp-card {
  background: white; border: 1px solid rgba(42,26,18,0.08); border-radius: 14px; padding: 20px;
  transition: all 0.25s ease;
}
.dp-card:hover { border-color: rgba(226,55,68,0.2); box-shadow: 0 4px 14px rgba(42,26,18,0.05); }
.dp-row { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
.dp-id { font-size: 1.05rem; font-weight: 700; color: #2a1a12; margin: 0 0 4px 0; }
.dp-meta { display: flex; align-items: center; gap: 6px; color: #6b5b4f; font-size: 0.85rem; margin-top: 3px; }
.dp-btn {
  display: inline-flex; align-items: center; gap: 7px; background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white; padding: 10px 20px; border-radius: 10px; border: none; font-weight: 600; font-size: 0.85rem;
  cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(34,197,94,0.28);
}
.dp-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(34,197,94,0.36); }
.dp-assigned {
  background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.2); border-radius: 11px;
  padding: 12px 16px; min-width: 200px;
}
.dp-assigned-label { display: flex; align-items: center; gap: 6px; color: #16a34a; font-weight: 700; font-size: 0.82rem; margin-bottom: 6px; }
.dp-assigned-row { display: flex; align-items: center; gap: 6px; color: #4a3b30; font-size: 0.83rem; margin-top: 3px; }
`;

export const DeliveryPartners = () => {
  const { orders, assignDeliveryPartner } = useOrder();

  const packedOrders = orders.filter((order) => order.kitchenStatus === "Packed");

  return (
    <>
      <style>{dpStyles}</style>
      <div className="dp-wrap">
        <div className="dp-head">
          <span className="dp-head-icon"><Bike size={16} /></span>
          <h1>Delivery Assignment</h1>
        </div>

        {packedOrders.length === 0 ? (
          <div className="dp-empty">
            <div className="icon-circle"><PackageCheck size={24} /></div>
            <h2>No Packed Orders</h2>
            <p>Packed orders will appear here, ready for assignment.</p>
          </div>
        ) : (
          <div className="dp-stack">
            {packedOrders.map((order) => (
              <div key={order.id} className="dp-card">
                <div className="dp-row">
                  <div>
                    <h2 className="dp-id">{order.id}</h2>
                    <div className="dp-meta"><User size={14} /> {order.customer?.name || "Customer"}</div>
                    <div className="dp-meta"><IndianRupee size={14} /> {order.total}</div>
                  </div>

                  {order.assignedPartner ? (
                    <div className="dp-assigned">
                      <div className="dp-assigned-label"><CheckCircle2 size={15} /> Assigned</div>
                      <div className="dp-assigned-row"><User size={13} /> {order.assignedPartner.name}</div>
                      <div className="dp-assigned-row"><Phone size={13} /> {order.assignedPartner.phone}</div>
                    </div>
                  ) : (
                    <button onClick={() => assignDeliveryPartner(order.id)} className="dp-btn">
                      <Bike size={16} />
                      Assign Partner
                    </button>
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

export default DeliveryPartners;
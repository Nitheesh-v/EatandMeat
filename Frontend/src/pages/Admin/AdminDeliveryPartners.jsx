import { useEffect, useState } from "react";
import { getDeliveryPartners, toggleUser } from "../../services/adminService";
import {
  Truck,
  Search,
  UserCheck,
  UserX,
  Phone,
  Mail,
  Package,
  CheckCircle,
  XCircle,
  IndianRupee,
  Bike,
} from "lucide-react";

const adpStyles = `
.adp-wrap { animation: adpIn 0.4s ease-out; }
@keyframes adpIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.adp-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
.adp-title {
  font-family: 'Fraunces', serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.adp-title-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, #f97316, #fb923c);
  display: flex; align-items: center; justify-content: center;
}
.adp-search-wrap { position: relative; flex: 1; min-width: 250px; max-width: 400px; }
.adp-search-input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 10px 14px 10px 40px;
  color: #fff; font-size: 0.9rem;
  transition: all 0.25s ease; box-sizing: border-box;
}
.adp-search-input::placeholder { color: rgba(255,255,255,0.3); }
.adp-search-input:focus { outline: none; border-color: #d4af37; box-shadow: 0 0 0 3px rgba(212,175,55,0.12); }
.adp-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.3); }
.adp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}
.adp-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 20px;
  transition: all 0.3s ease;
}
.adp-card:hover {
  transform: translateY(-3px);
  border-color: rgba(249,115,22,0.25);
  box-shadow: 0 12px 30px rgba(0,0,0,0.3);
}
.adp-card-header { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
.adp-card-avatar {
  width: 44px; height: 44px; border-radius: 12px;
  background: linear-gradient(135deg, #f97316, #fb923c);
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 800; font-size: 1rem;
  flex-shrink: 0;
}
.adp-card-name { font-weight: 700; color: #fff; font-size: 1rem; margin: 0; }
.adp-card-contact { display: flex; flex-direction: column; gap: 2px; margin-top: 4px; }
.adp-card-contact span { display: flex; align-items: center; gap: 4px; font-size: 0.75rem; color: rgba(255,255,255,0.4); }
.adp-stats-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 14px; }
.adp-stat {
  padding: 10px; border-radius: 10px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
}
.adp-stat-label { font-size: 0.65rem; font-weight: 600; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.5px; }
.adp-stat-value { font-size: 1.1rem; font-weight: 800; color: #fff; margin-top: 2px; }
.adp-card-footer { display: flex; align-items: center; justify-content: space-between; }
.adp-status-badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 12px; border-radius: 14px;
  font-size: 0.72rem; font-weight: 600;
}
.adp-status-badge.active { background: rgba(34,197,94,0.12); color: #22c55e; border: 1px solid rgba(34,197,94,0.25); }
.adp-status-badge.inactive { background: rgba(226,55,68,0.12); color: #e23744; border: 1px solid rgba(226,55,68,0.25); }
.adp-action-btn {
  padding: 8px 14px; border-radius: 8px;
  font-size: 0.78rem; font-weight: 700;
  cursor: pointer; transition: all 0.2s ease;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.6);
  display: flex; align-items: center; gap: 6px;
}
.adp-action-btn:hover { background: rgba(212,175,55,0.12); color: #d4af37; border-color: rgba(212,175,55,0.3); }
.adp-empty { text-align: center; padding: 60px 20px; color: rgba(255,255,255,0.4); }
.adp-loading { display: flex; align-items: center; justify-content: center; min-height: 200px; color: rgba(255,255,255,0.5); }
`;

const AdminDeliveryPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadPartners = async () => {
    try {
      const res = await getDeliveryPartners();
      setPartners(res.deliveryPartners || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const handleToggle = async (id) => {
    try {
      await toggleUser(id);
      loadPartners();
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = partners.filter((p) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      p.fullName?.toLowerCase().includes(s) ||
      p.email?.toLowerCase().includes(s) ||
      p.phone?.includes(s)
    );
  });

  return (
    <>
      <style>{adpStyles}</style>
      <div className="adp-wrap">
        <div className="adp-header">
          <h1 className="adp-title">
            <span className="adp-title-icon">
              <Truck size={18} color="white" />
            </span>
            Delivery Partners
          </h1>
          <div className="adp-search-wrap">
            <Search size={16} className="adp-search-icon" />
            <input
              type="text"
              placeholder="Search partners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="adp-search-input"
            />
          </div>
        </div>

        {loading ? (
          <div className="adp-loading">Loading delivery partners...</div>
        ) : filtered.length === 0 ? (
          <div className="adp-empty">No delivery partners found</div>
        ) : (
          <div className="adp-grid">
            {filtered.map((p) => {
              const initials = p.fullName
                ? p.fullName
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "DP";

              return (
                <div key={p._id} className="adp-card">
                  <div className="adp-card-header">
                    <div className="adp-card-avatar">{initials}</div>
                    <div>
                      <h3 className="adp-card-name">{p.fullName}</h3>
                      <div className="adp-card-contact">
                        <span>
                          <Mail size={10} /> {p.email}
                        </span>
                        <span>
                          <Phone size={10} /> {p.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="adp-stats-row">
                    <div className="adp-stat">
                      <div className="adp-stat-label">Total Deliveries</div>
                      <div className="adp-stat-value">
                        {p.totalDeliveries || 0}
                      </div>
                    </div>
                    <div className="adp-stat">
                      <div className="adp-stat-label">Completed</div>
                      <div className="adp-stat-value" style={{ color: "#22c55e" }}>
                        {p.completedDeliveries || 0}
                      </div>
                    </div>
                    <div className="adp-stat">
                      <div className="adp-stat-label">Active</div>
                      <div className="adp-stat-value" style={{ color: "#f97316" }}>
                        {p.activeDeliveries || 0}
                      </div>
                    </div>
                    <div className="adp-stat">
                      <div className="adp-stat-label">Cancelled</div>
                      <div className="adp-stat-value" style={{ color: "#e23744" }}>
                        {p.cancelledDeliveries || 0}
                      </div>
                    </div>
                  </div>

                  <div className="adp-card-footer">
                    <span
                      className={`adp-status-badge ${
                        p.isActive ? "active" : "inactive"
                      }`}
                    >
                      {p.isActive ? "Active" : "Suspended"}
                    </span>
                    <button
                      className="adp-action-btn"
                      onClick={() => handleToggle(p._id)}
                    >
                      {p.isActive ? (
                        <>
                          <UserX size={13} /> Suspend
                        </>
                      ) : (
                        <>
                          <UserCheck size={13} /> Activate
                        </>
                      )}
                    </button>
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

export default AdminDeliveryPartners;

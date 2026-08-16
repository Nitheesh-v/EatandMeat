import { useEffect, useState } from "react";
import { getAdminCustomers, toggleUser } from "../../services/adminService";
import {
  Users,
  Search,
  UserCheck,
  UserX,
  Phone,
  Mail,
  ShoppingBag,
  IndianRupee,
  Calendar,
} from "lucide-react";

const acuStyles = `
.acu-wrap { animation: acuIn 0.4s ease-out; }
@keyframes acuIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.acu-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
.acu-title {
  font-family: 'Fraunces', serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.acu-title-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  display: flex; align-items: center; justify-content: center;
}
.acu-search-wrap { position: relative; flex: 1; min-width: 250px; max-width: 400px; }
.acu-search-input {
  width: 100%;
  background: rgba(0,0,0,0.02);
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 10px 14px 10px 40px;
  color: #fff; font-size: 0.9rem;
  transition: all 0.25s ease; box-sizing: border-box;
}
.acu-search-input::placeholder { color: #CBD5E1; }
.acu-search-input:focus { outline: none; border-color: #2563EB; box-shadow: 0 0 0 3px rgba(212,175,55,0.12); }
.acu-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #CBD5E1; }
.acu-table-wrap {
  background: linear-gradient(135deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01));
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  overflow: hidden;
  overflow-x: auto;
}
.acu-tbl { width: 100%; border-collapse: collapse; min-width: 700px; }
.acu-tbl th {
  text-align: left; padding: 14px 16px; font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px; color: #94A3B8;
  background: #F8FAFC; border-bottom: 1px solid #E2E8F0;
}
.acu-tbl td { padding: 12px 16px; font-size: 0.88rem; color: #172033; border-bottom: 1px solid rgba(0,0,0,0.02); }
.acu-tbl tbody tr:hover { background: rgba(212,175,55,0.04); }
.acu-tbl tbody tr:last-child td { border-bottom: none; }
.acu-status-badge {
  display: inline-flex; padding: 3px 10px; border-radius: 14px;
  font-size: 0.72rem; font-weight: 600;
}
.acu-status-badge.active { background: rgba(34,197,94,0.12); color: #22c55e; border: 1px solid rgba(34,197,94,0.25); }
.acu-status-badge.inactive { background: rgba(226,55,68,0.12); color: #e23744; border: 1px solid rgba(226,55,68,0.25); }
.acu-action-btn {
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid #E2E8F0;
  background: #F8FAFC;
  color: #64748B;
  cursor: pointer; transition: all 0.2s ease;
}
.acu-action-btn:hover { background: rgba(212,175,55,0.12); color: #2563EB; border-color: rgba(212,175,55,0.3); }
.acu-empty { text-align: center; padding: 48px 20px; color: #94A3B8; }
.acu-loading { display: flex; align-items: center; justify-content: center; min-height: 200px; color: #64748B; }
`;

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadCustomers = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      const res = await getAdminCustomers(params);
      setCustomers(res.customers || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [search]);

  const handleToggle = async (id) => {
    try {
      await toggleUser(id);
      loadCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <style>{acuStyles}</style>
      <div className="acu-wrap">
        <div className="acu-header">
          <h1 className="acu-title">
            <span className="acu-title-icon">
              <Users size={18} color="white" />
            </span>
            Customers
          </h1>
          <div className="acu-search-wrap">
            <Search size={16} className="acu-search-icon" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="acu-search-input"
            />
          </div>
        </div>

        {loading ? (
          <div className="acu-loading">Loading customers...</div>
        ) : customers.length === 0 ? (
          <div className="acu-empty">No customers found</div>
        ) : (
          <div className="acu-table-wrap">
            <table className="acu-tbl">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Total Orders</th>
                  <th>Total Spent</th>
                  <th>Last Order</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c._id}>
                    <td style={{ fontWeight: 600, color: "#172033" }}>
                      {c.fullName}
                    </td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem" }}>
                          <Mail size={11} /> {c.email}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", color: "#64748B" }}>
                          <Phone size={11} /> {c.phone}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <ShoppingBag size={13} style={{ color: "#2563EB" }} />
                        {c.totalOrders || 0}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: "#2563EB" }}>
                      ₹{c.totalSpent || 0}
                    </td>
                    <td>
                      {c.lastOrderDate
                        ? new Date(c.lastOrderDate).toLocaleDateString("en-IN")
                        : "Never"}
                    </td>
                    <td>
                      <span
                        className={`acu-status-badge ${
                          c.isActive ? "active" : "inactive"
                        }`}
                      >
                        {c.isActive ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="acu-action-btn"
                        title={c.isActive ? "Block" : "Unblock"}
                        onClick={() => handleToggle(c._id)}
                      >
                        {c.isActive ? <UserX size={14} /> : <UserCheck size={14} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminCustomers;

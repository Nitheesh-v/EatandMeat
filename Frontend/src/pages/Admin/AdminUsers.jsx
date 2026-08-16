import { useEffect, useState } from "react";
import { getAdminUsers, toggleUser, deleteUser } from "../../services/adminService";
import { Users, Search, UserCheck, UserX, Trash2, Mail, Phone, Shield, Briefcase, Bike } from "lucide-react";

const c = { blue: "#2563EB", bg: "#F8FAFC", card: "#FFFFFF", text: "#172033", textSec: "#64748B", border: "#E2E8F0", green: "#16A34A", red: "#DC2626", orange: "#EA580C", purple: "#7C3AED" };

const roleStyles = {
  admin: { background: "rgba(17,24,39,0.06)", color: "#111827" },
  customer: { background: "rgba(37,99,235,0.08)", color: c.blue },
  company: { background: "rgba(124,58,237,0.08)", color: c.purple },
  delivery: { background: "rgba(234,88,12,0.08)", color: c.orange },
};
const roleIcons = { admin: Shield, customer: Users, company: Briefcase, delivery: Bike };

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const load = async () => {
    try { const p = {}; if (search) p.search = search; if (roleFilter) p.role = roleFilter; const r = await getAdminUsers(p); setUsers(r.users); }
    catch (e) {} finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [search, roleFilter]);

  const handleToggle = async (id) => { try { await toggleUser(id); load(); } catch(e){} };
  const handleDelete = async (id) => { if (!window.confirm("Delete this user?")) return; try { await deleteUser(id); load(); } catch(e){} };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: c.text, margin: 0 }}>Users</h1>
        <p style={{ fontSize: "0.82rem", color: c.textSec, margin: "2px 0 0" }}>{users.length} users</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#CBD5E1" }} />
          <input type="text" placeholder="Search by name, email or phone..." value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "8px 12px 8px 32px", color: c.text, fontSize: "0.82rem", boxSizing: "border-box", outline: "none" }} />
        </div>
        {["", "customer", "company", "delivery", "admin"].map((r) => (
          <button key={r || "all"} onClick={() => setRoleFilter(r)} style={{
            padding: "7px 14px", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
            background: roleFilter === r ? c.blue : c.card, color: roleFilter === r ? "white" : c.textSec,
            border: `1px solid ${roleFilter === r ? c.blue : c.border}`,
          }}>{r ? r.charAt(0).toUpperCase() + r.slice(1) : "All"}</button>
        ))}
      </div>

      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, overflow: "hidden" }}>
        {loading ? <div style={{ textAlign: "center", padding: 40, color: c.textSec }}>Loading...</div> : users.length === 0 ? <div style={{ textAlign: "center", padding: 40, color: c.textSec }}>No users found</div> : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Name", "Email", "Phone", "Role", "Status", "Joined", "Actions"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: c.textSec, background: c.bg, borderBottom: `1px solid ${c.border}` }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {users.map((u) => {
                  const rs = roleStyles[u.role] || roleStyles.customer;
                  const RoleIcon = roleIcons[u.role] || Users;
                  return (
                    <tr key={u._id} style={{ borderBottom: `1px solid ${c.border}` }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = c.bg; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                      <td style={{ padding: "10px 16px", fontSize: "0.85rem", fontWeight: 600, color: c.text }}>{u.fullName}</td>
                      <td style={{ padding: "10px 16px", fontSize: "0.82rem", color: c.textSec }}>{u.email}</td>
                      <td style={{ padding: "10px 16px", fontSize: "0.82rem", color: c.textSec }}>{u.phone}</td>
                      <td style={{ padding: "10px 16px" }}><span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 600, ...rs }}><RoleIcon size={11} />{u.role}</span></td>
                      <td style={{ padding: "10px 16px" }}><span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 4, fontSize: "0.72rem", fontWeight: 600, background: u.isActive ? "rgba(22,163,74,0.08)" : "rgba(220,38,38,0.08)", color: u.isActive ? c.green : c.red }}>{u.isActive ? "Active" : "Inactive"}</span></td>
                      <td style={{ padding: "10px 16px", fontSize: "0.78rem", color: c.textSec }}>{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                      <td style={{ padding: "10px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => handleToggle(u._id)} style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${c.border}`, background: c.card, color: c.textSec, cursor: "pointer" }}
                            title={u.isActive ? "Deactivate" : "Activate"}>
                            {u.isActive ? <UserX size={13} /> : <UserCheck size={13} />}
                          </button>
                          <button onClick={() => handleDelete(u._id)} style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${c.border}`, background: c.card, color: c.textSec, cursor: "pointer" }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.red; e.currentTarget.style.color = c.red; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textSec; }}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

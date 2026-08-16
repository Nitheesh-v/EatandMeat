import { useEffect, useState } from "react";
import API from "../../api/axios.js";
import {
  Tag,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    code: "",
    description: "",
    discountType: "flat",
    discountValue: "",
    minOrderAmount: "",
    maxDiscount: "",
    usageLimit: "",
    expiresAt: "",
  });

  const loadCoupons = async () => {
    try {
      const { data } = await API.get("/coupons");
      setCoupons(data.coupons || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const openCreate = () => {
    setEditId(null);
    setForm({ code: "", description: "", discountType: "flat", discountValue: "", minOrderAmount: "", maxDiscount: "", usageLimit: "", expiresAt: "" });
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditId(c._id);
    setForm({
      code: c.code,
      description: c.description || "",
      discountType: c.discountType,
      discountValue: c.discountValue,
      minOrderAmount: c.minOrderAmount || "",
      maxDiscount: c.maxDiscount || "",
      usageLimit: c.usageLimit || "",
      expiresAt: c.expiresAt ? new Date(c.expiresAt).toISOString().split("T")[0] : "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const data = {
        ...form,
        discountValue: Number(form.discountValue),
        minOrderAmount: Number(form.minOrderAmount) || 0,
        maxDiscount: Number(form.maxDiscount) || 0,
        usageLimit: Number(form.usageLimit) || 0,
      };
      if (editId) {
        await API.put(`/coupons/${editId}`, data);
      } else {
        await API.post("/coupons", data);
      }
      setShowModal(false);
      loadCoupons();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving coupon");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      await API.delete(`/coupons/${id}`);
      loadCoupons();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #2563EB, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Tag size={18} color="white" />
          </span>
          Coupons & Offers
        </h1>
        <button
          onClick={openCreate}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, background: "linear-gradient(135deg, #2563EB, #2563EB)", color: "white", fontWeight: 700, fontSize: "0.85rem", border: "none", cursor: "pointer" }}
        >
          <Plus size={16} /> Add Coupon
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Loading...</div>
      ) : coupons.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>No coupons yet</div>
      ) : (
        <div style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01))", border: "1px solid #E2E8F0", borderRadius: 14, overflow: "hidden", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr>
                {["Code", "Description", "Discount", "Min Order", "Used", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "14px 16px", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#94A3B8", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id} style={{ borderBottom: "1px solid rgba(0,0,0,0.02)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "#2563EB", fontSize: "0.9rem" }}>{c.code}</td>
                  <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>{c.description || "—"}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "#172033" }}>
                    {c.discountType === "percentage" ? `${c.discountValue}%` : `₹${c.discountValue}`}
                    {c.maxDiscount > 0 && c.discountType === "percentage" && <span style={{ fontSize: "0.7rem", color: "#94A3B8", marginLeft: 4 }}>max ₹{c.maxDiscount}</span>}
                  </td>
                  <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.6)" }}>₹{c.minOrderAmount || 0}</td>
                  <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.6)" }}>{c.usedCount}{c.usageLimit > 0 ? `/${c.usageLimit}` : ""}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 14,
                      fontSize: "0.72rem", fontWeight: 600,
                      background: c.isActive ? "rgba(34,197,94,0.12)" : "rgba(226,55,68,0.12)",
                      color: c.isActive ? "#22c55e" : "#e23744",
                      border: `1px solid ${c.isActive ? "rgba(34,197,94,0.25)" : "rgba(226,55,68,0.25)"}`,
                    }}>
                      {c.isActive ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                      {c.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => openEdit(c)} style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #E2E8F0", background: "#F8FAFC", color: "#64748B", cursor: "pointer" }}>
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => handleDelete(c._id)} style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #E2E8F0", background: "#F8FAFC", color: "#64748B", cursor: "pointer" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div style={{ background: "linear-gradient(135deg, #1a0a0a, #0f0808)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 18, width: "100%", maxWidth: 480, maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #E2E8F0" }}>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#172033" }}>{editId ? "Edit Coupon" : "Add Coupon"}</span>
              <button onClick={() => setShowModal(false)} style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #E2E8F0", background: "#F8FAFC", color: "#64748B", cursor: "pointer" }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ padding: 24 }}>
              {[
                { label: "Coupon Code *", field: "code", placeholder: "WELCOME50", disabled: !!editId },
                { label: "Description", field: "description", placeholder: "₹50 off on first order" },
              ].map((f) => (
                <div key={f.field} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={form[f.field]}
                    onChange={(e) => handleChange(f.field, e.target.value)}
                    disabled={f.disabled}
                    style={{ width: "100%", background: "rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 14px", color: "#172033", fontSize: "0.9rem", boxSizing: "border-box", opacity: f.disabled ? 0.5 : 1 }}
                  />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Type</label>
                  <select value={form.discountType} onChange={(e) => handleChange("discountType", e.target.value)} style={{ width: "100%", background: "rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 14px", color: "#172033", fontSize: "0.9rem", boxSizing: "border-box" }}>
                    <option value="flat">Flat (₹)</option>
                    <option value="percentage">Percentage (%)</option>
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Discount Value *</label>
                  <input type="number" placeholder="50" value={form.discountValue} onChange={(e) => handleChange("discountValue", e.target.value)} style={{ width: "100%", background: "rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 14px", color: "#172033", fontSize: "0.9rem", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Min Order (₹)</label>
                  <input type="number" placeholder="299" value={form.minOrderAmount} onChange={(e) => handleChange("minOrderAmount", e.target.value)} style={{ width: "100%", background: "rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 14px", color: "#172033", fontSize: "0.9rem", boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Max Discount (₹)</label>
                  <input type="number" placeholder="100" value={form.maxDiscount} onChange={(e) => handleChange("maxDiscount", e.target.value)} style={{ width: "100%", background: "rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 14px", color: "#172033", fontSize: "0.9rem", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Usage Limit</label>
                  <input type="number" placeholder="0 = unlimited" value={form.usageLimit} onChange={(e) => handleChange("usageLimit", e.target.value)} style={{ width: "100%", background: "rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 14px", color: "#172033", fontSize: "0.9rem", boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Expires At</label>
                  <input type="date" value={form.expiresAt} onChange={(e) => handleChange("expiresAt", e.target.value)} style={{ width: "100%", background: "rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 14px", color: "#172033", fontSize: "0.9rem", boxSizing: "border-box" }} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 24px", borderTop: "1px solid #E2E8F0" }}>
              <button onClick={() => setShowModal(false)} style={{ padding: "10px 18px", borderRadius: 10, background: "rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10, background: "linear-gradient(135deg, #2563EB, #2563EB)", border: "none", color: "white", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
                <Save size={14} /> {editId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;

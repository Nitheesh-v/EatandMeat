import { useEffect, useState } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../services/categoryService";
import { Tag, Plus, Edit3, Trash2, X, Save } from "lucide-react";

const c = { blue: "#2563EB", bg: "#F8FAFC", card: "#FFFFFF", text: "#172033", textSec: "#64748B", border: "#E2E8F0", green: "#16A34A", red: "#DC2626" };

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", image: "", isActive: true, displayOrder: 0 });

  const load = async () => { try { const r = await getCategories(); setCategories(r.categories || []); } catch(e){} finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditId(null); setForm({ name: "", description: "", image: "", isActive: true, displayOrder: 0 }); setShowModal(true); };
  const openEdit = (cat) => { setEditId(cat._id); setForm({ name: cat.name, description: cat.description || "", image: cat.image || "", isActive: cat.isActive, displayOrder: cat.displayOrder || 0 }); setShowModal(true); };

  const handleSave = async () => {
    try { if (editId) await updateCategory(editId, form); else await createCategory(form); setShowModal(false); load(); }
    catch (err) { alert(err.response?.data?.message || "Error"); }
  };
  const handleDelete = async (id) => { if (!window.confirm("Delete this category?")) return; try { await deleteCategory(id); load(); } catch(e){ alert(e.response?.data?.message || "Error"); } };
  const handleChange = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const input = { width: "100%", background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "9px 12px", color: c.text, fontSize: "0.85rem", boxSizing: "border-box", outline: "none" };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div><h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: c.text, margin: 0 }}>Categories</h1><p style={{ fontSize: "0.82rem", color: c.textSec, margin: "2px 0 0" }}>{categories.length} categories</p></div>
        <button onClick={openCreate} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, background: c.blue, color: "white", fontWeight: 600, fontSize: "0.82rem", border: "none", cursor: "pointer" }}><Plus size={16} /> Add Category</button>
      </div>

      {loading ? <div style={{ textAlign: "center", padding: 40, color: c.textSec }}>Loading...</div> : categories.length === 0 ? <div style={{ textAlign: "center", padding: 40, color: c.textSec }}>No categories</div> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {categories.map((cat) => (
            <div key={cat._id} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, overflow: "hidden", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ height: 100, background: cat.image ? `url(${cat.image}) center/cover` : "linear-gradient(135deg, #E2E8F0, #F1F5F9)", position: "relative" }}>
                <div style={{ position: "absolute", bottom: 8, right: 8, display: "flex", gap: 4 }}>
                  <button onClick={() => openEdit(cat)} style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.9)", border: "none", color: c.textSec, cursor: "pointer" }}><Edit3 size={13} /></button>
                  <button onClick={() => handleDelete(cat._id)} style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.9)", border: "none", color: c.red, cursor: "pointer" }}><Trash2 size={13} /></button>
                </div>
              </div>
              <div style={{ padding: "12px 16px" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: c.text, margin: "0 0 4px" }}>{cat.name}</h3>
                <p style={{ fontSize: "0.78rem", color: c.textSec, margin: "0 0 8px", lineHeight: 1.4 }}>{cat.description || "No description"}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: "rgba(37,99,235,0.08)", color: c.blue }}>{cat.productCount || 0} products</span>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: cat.isActive ? "rgba(22,163,74,0.08)" : "rgba(220,38,38,0.08)", color: cat.isActive ? c.green : c.red }}>{cat.isActive ? "Active" : "Inactive"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, width: "100%", maxWidth: 440, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${c.border}` }}>
              <span style={{ fontSize: "1rem", fontWeight: 700, color: c.text }}>{editId ? "Edit Category" : "Add Category"}</span>
              <button onClick={() => setShowModal(false)} style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${c.border}`, background: "transparent", color: c.textSec, cursor: "pointer" }}><X size={14} /></button>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ marginBottom: 14 }}><label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Name *</label><input type="text" placeholder="Fresh Chicken" value={form.name} onChange={(e) => handleChange("name", e.target.value)} style={input} /></div>
              <div style={{ marginBottom: 14 }}><label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Description</label><textarea placeholder="Category description..." value={form.description} onChange={(e) => handleChange("description", e.target.value)} style={{ ...input, resize: "vertical", minHeight: 60 }} /></div>
              <div style={{ marginBottom: 14 }}><label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Image URL</label><input type="text" placeholder="https://..." value={form.image} onChange={(e) => handleChange("image", e.target.value)} style={input} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div><label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Display Order</label><input type="number" placeholder="0" value={form.displayOrder} onChange={(e) => handleChange("displayOrder", e.target.value)} style={input} /></div>
                <div style={{ display: "flex", alignItems: "flex-end" }}><label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", paddingBottom: 9 }}><input type="checkbox" checked={form.isActive} onChange={(e) => handleChange("isActive", e.target.checked)} style={{ accentColor: c.blue, width: 16, height: 16 }} /><span style={{ fontSize: "0.82rem", color: c.text }}>Active</span></label></div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "14px 20px", borderTop: `1px solid ${c.border}` }}>
              <button onClick={() => setShowModal(false)} style={{ padding: "8px 16px", borderRadius: 8, background: c.bg, border: `1px solid ${c.border}`, color: c.textSec, fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 16px", borderRadius: 8, background: c.blue, border: "none", color: "white", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}><Save size={14} /> {editId ? "Update" : "Create"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;

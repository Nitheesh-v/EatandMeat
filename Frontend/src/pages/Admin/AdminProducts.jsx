import { useEffect, useState } from "react";
import { getAdminProducts, createProduct, updateProduct, deleteProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";
import { Package, Plus, Edit3, Trash2, X, Save, Search, AlertTriangle, Eye, ChevronDown } from "lucide-react";

const c = {
  blue: "#2563EB", cyan: "#06B6D4", bg: "#F8FAFC", card: "#FFFFFF",
  text: "#172033", textSec: "#64748B", border: "#E2E8F0",
  green: "#16A34A", red: "#DC2626", orange: "#EA580C",
};

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "", description: "", category: "", basePrice: "", sellingPrice: "",
    discount: 0, unit: "500g", weight: "", image: "", stock: "",
    lowStockThreshold: 10, minOrderQty: 1, maxOrderQty: 50, sku: "", isFeatured: false,
  });

  const loadProducts = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (stockFilter) params.stock = stockFilter;
      const res = await getAdminProducts(params);
      setProducts(res.products);
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.categories || []);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { loadCategories(); }, []);
  useEffect(() => { loadProducts(); }, [search, stockFilter]);

  const openCreate = () => {
    setEditId(null);
    setForm({ name: "", description: "", category: "", basePrice: "", sellingPrice: "", discount: 0, unit: "500g", weight: "", image: "", stock: "", lowStockThreshold: 10, minOrderQty: 1, maxOrderQty: 50, sku: "", isFeatured: false });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditId(p._id);
    setForm({
      name: p.name, description: p.description || "", category: p.category?._id || p.category || "",
      basePrice: p.basePrice || "", sellingPrice: p.sellingPrice || "", discount: p.discount || 0,
      unit: p.unit || "500g", weight: p.weight || "", image: p.image || "",
      stock: p.stock, lowStockThreshold: p.lowStockThreshold || 10,
      minOrderQty: p.minOrderQty || 1, maxOrderQty: p.maxOrderQty || 50,
      sku: p.sku || "", isFeatured: p.isFeatured || false,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const data = { ...form, basePrice: Number(form.basePrice), sellingPrice: Number(form.sellingPrice), discount: Number(form.discount), stock: Number(form.stock), lowStockThreshold: Number(form.lowStockThreshold), minOrderQty: Number(form.minOrderQty), maxOrderQty: Number(form.maxOrderQty) };
      if (editId) await updateProduct(editId, data);
      else await createProduct(data);
      setShowModal(false);
      loadProducts();
    } catch (err) { alert(err.response?.data?.message || "Error saving product"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try { await deleteProduct(id); loadProducts(); } catch (err) { console.log(err); }
  };

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const getStockBadge = (p) => {
    const s = p.stockStatus || (p.stock <= 0 ? "Out of Stock" : p.stock <= (p.lowStockThreshold || 10) ? "Low Stock" : "In Stock");
    if (s === "Out of Stock") return <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 8px", borderRadius: 4, fontSize: "0.7rem", fontWeight: 600, background: "rgba(220,38,38,0.08)", color: c.red }}><X size={10} />Out of Stock</span>;
    if (s === "Low Stock") return <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 8px", borderRadius: 4, fontSize: "0.7rem", fontWeight: 600, background: "rgba(234,88,12,0.08)", color: c.orange }}><AlertTriangle size={10} />Low ({p.stock})</span>;
    return <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 8px", borderRadius: 4, fontSize: "0.7rem", fontWeight: 600, background: "rgba(22,163,74,0.08)", color: c.green }}>{p.stock}</span>;
  };

  const inputStyle = {
    width: "100%", background: c.bg, border: `1px solid ${c.border}`,
    borderRadius: 8, padding: "9px 12px", color: c.text, fontSize: "0.85rem",
    boxSizing: "border-box", outline: "none",
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: c.text, margin: 0 }}>Products</h1>
          <p style={{ fontSize: "0.82rem", color: c.textSec, margin: "2px 0 0" }}>{products.length} products</p>
        </div>
        <button onClick={openCreate} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
          borderRadius: 8, background: c.blue, color: "white", fontWeight: 600,
          fontSize: "0.82rem", border: "none", cursor: "pointer",
          boxShadow: `0 1px 3px ${c.blue}40`, transition: "all 0.15s ease",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#1D4ED8"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = c.blue; }}
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#CBD5E1" }} />
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: 32 }} />
        </div>
        {[{ v: "", l: "All Stock" }, { v: "in", l: "In Stock" }, { v: "low", l: "Low Stock" }, { v: "out", l: "Out of Stock" }].map((f) => (
          <button key={f.v} onClick={() => setStockFilter(f.v)} style={{
            padding: "8px 14px", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600,
            cursor: "pointer", transition: "all 0.15s ease",
            background: stockFilter === f.v ? c.blue : c.card,
            color: stockFilter === f.v ? "white" : c.textSec,
            border: `1px solid ${stockFilter === f.v ? c.blue : c.border}`,
          }}>{f.l}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, overflow: "hidden" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: c.textSec }}>Loading...</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: c.textSec }}>No products found</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
              <thead>
                <tr>
                  {["Product", "Category", "SKU", "MRP", "Price", "Stock", "Featured", "Actions"].map((h) => (
                    <th key={h} style={{
                      textAlign: "left", padding: "10px 16px", fontSize: "0.7rem",
                      fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em",
                      color: c.textSec, background: c.bg, borderBottom: `1px solid ${c.border}`,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} style={{ borderBottom: `1px solid ${c.border}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = c.bg; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <td style={{ padding: "10px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img src={p.image} alt={p.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover", border: `1px solid ${c.border}` }} />
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: c.text }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: "0.82rem", color: c.textSec }}>{p.category?.name || p.categoryName || "—"}</td>
                    <td style={{ padding: "10px 16px", fontSize: "0.75rem", color: c.textSec, fontFamily: "monospace" }}>{p.sku || "—"}</td>
                    <td style={{ padding: "10px 16px", fontSize: "0.82rem", color: c.textSec, textDecoration: "line-through" }}>₹{p.basePrice}</td>
                    <td style={{ padding: "10px 16px", fontSize: "0.85rem", fontWeight: 700, color: c.text }}>₹{p.sellingPrice}</td>
                    <td style={{ padding: "10px 16px" }}>{getStockBadge(p)}</td>
                    <td style={{ padding: "10px 16px" }}>
                      {p.isFeatured && <span style={{ fontSize: "0.7rem", color: "#D97706" }}>★</span>}
                    </td>
                    <td style={{ padding: "10px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => openEdit(p)} style={{ width: 30, height: 30, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${c.border}`, background: c.card, color: c.textSec, cursor: "pointer" }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.blue; e.currentTarget.style.color = c.blue; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textSec; }}
                        ><Edit3 size={13} /></button>
                        <button onClick={() => handleDelete(p._id)} style={{ width: 30, height: 30, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${c.border}`, background: c.card, color: c.textSec, cursor: "pointer" }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.red; e.currentTarget.style.color = c.red; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textSec; }}
                        ><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, width: "100%", maxWidth: 560, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${c.border}` }}>
              <span style={{ fontSize: "1rem", fontWeight: 700, color: c.text }}>{editId ? "Edit Product" : "Add Product"}</span>
              <button onClick={() => setShowModal(false)} style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${c.border}`, background: "transparent", color: c.textSec, cursor: "pointer" }}><X size={14} /></button>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Product Name *</label>
                <input type="text" className="ap-input" placeholder="e.g. Chicken Breast" value={form.name} onChange={(e) => handleChange("name", e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Description</label>
                <textarea placeholder="Product description..." value={form.description} onChange={(e) => handleChange("description", e.target.value)} style={{ ...inputStyle, resize: "vertical", minHeight: 70 }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Category *</label>
                  <select value={form.category} onChange={(e) => handleChange("category", e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
                    <option value="">Select category</option>
                    {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>SKU</label>
                  <input type="text" placeholder="CHK-BST-500" value={form.sku} onChange={(e) => handleChange("sku", e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>MRP (₹) *</label>
                  <input type="number" placeholder="299" value={form.basePrice} onChange={(e) => handleChange("basePrice", e.target.value)} style={inputStyle} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Selling Price (₹) *</label>
                  <input type="number" placeholder="249" value={form.sellingPrice} onChange={(e) => handleChange("sellingPrice", e.target.value)} style={inputStyle} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Discount %</label>
                  <input type="number" placeholder="0" value={form.discount} onChange={(e) => handleChange("discount", e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Unit</label>
                  <select value={form.unit} onChange={(e) => handleChange("unit", e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
                    {["kg", "g", "500g", "250g", "piece", "pack", "box"].map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Weight</label>
                  <input type="text" placeholder="500 g" value={form.weight} onChange={(e) => handleChange("weight", e.target.value)} style={inputStyle} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Stock *</label>
                  <input type="number" placeholder="50" value={form.stock} onChange={(e) => handleChange("stock", e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Low Stock Threshold</label>
                  <input type="number" placeholder="10" value={form.lowStockThreshold} onChange={(e) => handleChange("lowStockThreshold", e.target.value)} style={inputStyle} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 4 }}>Image URL</label>
                  <input type="text" placeholder="https://..." value={form.image} onChange={(e) => handleChange("image", e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input type="checkbox" checked={form.isFeatured} onChange={(e) => handleChange("isFeatured", e.target.checked)} style={{ accentColor: c.blue, width: 16, height: 16 }} />
                  <span style={{ fontSize: "0.82rem", color: c.text }}>Featured Product</span>
                </label>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "14px 20px", borderTop: `1px solid ${c.border}` }}>
              <button onClick={() => setShowModal(false)} style={{ padding: "8px 16px", borderRadius: 8, background: c.bg, border: `1px solid ${c.border}`, color: c.textSec, fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 16px", borderRadius: 8, background: c.blue, border: "none", color: "white", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}>
                <Save size={14} /> {editId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;

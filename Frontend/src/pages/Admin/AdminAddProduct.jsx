import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { Package, Save, ArrowLeft } from "lucide-react";

const aapStyles = `
.aap-wrap { animation: aapIn 0.4s ease-out; max-width: 700px; }
@keyframes aapIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.aap-back {
  display: inline-flex; align-items: center; gap: 6px;
  color: rgba(255,255,255,0.4); font-size: 0.85rem; font-weight: 500;
  margin-bottom: 20px; cursor: pointer; text-decoration: none;
  transition: color 0.2s;
}
.aap-back:hover { color: #d4af37; }
.aap-title {
  font-family: 'Fraunces', serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.aap-title-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, #d4af37, #d4213c);
  display: flex; align-items: center; justify-content: center;
}
.aap-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 28px;
}
.aap-field { margin-bottom: 18px; }
.aap-label { display: block; color: rgba(255,255,255,0.5); font-size: 0.78rem; font-weight: 600; margin-bottom: 6px; }
.aap-required { color: #e23744; }
.aap-input {
  width: 100%; background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; padding: 12px 14px;
  color: #fff; font-size: 0.9rem;
  transition: all 0.25s ease; box-sizing: border-box;
}
.aap-input::placeholder { color: rgba(255,255,255,0.25); }
.aap-input:focus { outline: none; border-color: #d4af37; box-shadow: 0 0 0 3px rgba(212,175,55,0.12); }
.aap-textarea { resize: vertical; min-height: 100px; }
.aap-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
}
.aap-select option { background: #1a0a0a; color: #fff; }
.aap-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.aap-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.aap-checkbox-row { display: flex; align-items: center; gap: 8px; }
.aap-checkbox-row input[type="checkbox"] { accent-color: #d4af37; width: 16px; height: 16px; }
.aap-checkbox-row span { color: rgba(255,255,255,0.6); font-size: 0.85rem; }
.aap-submit-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 12px;
  background: linear-gradient(135deg, #d4af37, #d4213c);
  border: none; color: white;
  font-weight: 700; font-size: 0.95rem;
  cursor: pointer; transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(212,175,55,0.3);
  margin-top: 8px;
}
.aap-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(212,175,55,0.5); }
.aap-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
`;

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    basePrice: "",
    sellingPrice: "",
    discount: 0,
    unit: "500g",
    weight: "",
    image: "",
    stock: "",
    lowStockThreshold: 10,
    minOrderQty: 1,
    maxOrderQty: 50,
    sku: "",
    isFeatured: false,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCategories();
        setCategories(res.categories || []);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createProduct({
        ...form,
        basePrice: Number(form.basePrice),
        sellingPrice: Number(form.sellingPrice),
        discount: Number(form.discount),
        stock: Number(form.stock),
        lowStockThreshold: Number(form.lowStockThreshold),
        minOrderQty: Number(form.minOrderQty),
        maxOrderQty: Number(form.maxOrderQty),
      });
      alert("Product created successfully!");
      navigate("/admin/products");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <style>{aapStyles}</style>
      <div className="aap-wrap">
        <a className="aap-back" onClick={() => navigate("/admin/products")}>
          <ArrowLeft size={14} /> Back to Products
        </a>

        <h1 className="aap-title">
          <span className="aap-title-icon">
            <Package size={18} color="white" />
          </span>
          Add New Product
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="aap-card">
            <div className="aap-field">
              <label className="aap-label">
                Product Name <span className="aap-required">*</span>
              </label>
              <input
                type="text"
                className="aap-input"
                placeholder="e.g. Chicken Breast"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div className="aap-field">
              <label className="aap-label">Description</label>
              <textarea
                className="aap-input aap-textarea"
                placeholder="Product description..."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <div className="aap-row">
              <div className="aap-field">
                <label className="aap-label">
                  Category <span className="aap-required">*</span>
                </label>
                <select
                  className="aap-input aap-select"
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="aap-field">
                <label className="aap-label">SKU</label>
                <input
                  type="text"
                  className="aap-input"
                  placeholder="e.g. CHK-BST-500"
                  value={form.sku}
                  onChange={(e) => handleChange("sku", e.target.value)}
                />
              </div>
            </div>

            <div className="aap-row-3">
              <div className="aap-field">
                <label className="aap-label">
                  Base Price (₹) <span className="aap-required">*</span>
                </label>
                <input
                  type="number"
                  className="aap-input"
                  placeholder="310"
                  value={form.basePrice}
                  onChange={(e) => handleChange("basePrice", e.target.value)}
                  required
                />
              </div>
              <div className="aap-field">
                <label className="aap-label">
                  Selling Price (₹) <span className="aap-required">*</span>
                </label>
                <input
                  type="number"
                  className="aap-input"
                  placeholder="280"
                  value={form.sellingPrice}
                  onChange={(e) => handleChange("sellingPrice", e.target.value)}
                  required
                />
              </div>
              <div className="aap-field">
                <label className="aap-label">Discount (%)</label>
                <input
                  type="number"
                  className="aap-input"
                  placeholder="10"
                  value={form.discount}
                  onChange={(e) => handleChange("discount", e.target.value)}
                />
              </div>
            </div>

            <div className="aap-row-3">
              <div className="aap-field">
                <label className="aap-label">Unit</label>
                <select
                  className="aap-input aap-select"
                  value={form.unit}
                  onChange={(e) => handleChange("unit", e.target.value)}
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="500g">500g</option>
                  <option value="250g">250g</option>
                  <option value="piece">piece</option>
                  <option value="pack">pack</option>
                  <option value="box">box</option>
                </select>
              </div>
              <div className="aap-field">
                <label className="aap-label">Weight</label>
                <input
                  type="text"
                  className="aap-input"
                  placeholder="500 g"
                  value={form.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
              </div>
              <div className="aap-field">
                <label className="aap-label">
                  Stock Quantity <span className="aap-required">*</span>
                </label>
                <input
                  type="number"
                  className="aap-input"
                  placeholder="50"
                  value={form.stock}
                  onChange={(e) => handleChange("stock", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="aap-row-3">
              <div className="aap-field">
                <label className="aap-label">Low Stock Threshold</label>
                <input
                  type="number"
                  className="aap-input"
                  placeholder="10"
                  value={form.lowStockThreshold}
                  onChange={(e) => handleChange("lowStockThreshold", e.target.value)}
                />
              </div>
              <div className="aap-field">
                <label className="aap-label">Min Order Qty</label>
                <input
                  type="number"
                  className="aap-input"
                  placeholder="1"
                  value={form.minOrderQty}
                  onChange={(e) => handleChange("minOrderQty", e.target.value)}
                />
              </div>
              <div className="aap-field">
                <label className="aap-label">Max Order Qty</label>
                <input
                  type="number"
                  className="aap-input"
                  placeholder="50"
                  value={form.maxOrderQty}
                  onChange={(e) => handleChange("maxOrderQty", e.target.value)}
                />
              </div>
            </div>

            <div className="aap-field">
              <label className="aap-label">Image URL</label>
              <input
                type="text"
                className="aap-input"
                placeholder="https://images.unsplash.com/..."
                value={form.image}
                onChange={(e) => handleChange("image", e.target.value)}
              />
            </div>

            <div className="aap-field">
              <div className="aap-checkbox-row">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => handleChange("isFeatured", e.target.checked)}
                />
                <span>Featured Product (shown on home page)</span>
              </div>
            </div>

            <button type="submit" className="aap-submit-btn" disabled={saving}>
              <Save size={18} />
              {saving ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminAddProduct;

import { useEffect, useState } from "react";
import { getAdminProducts, updateProduct } from "../../services/productService";
import {
  AlertTriangle,
  Package,
  XCircle,
  CheckCircle,
  Edit3,
  Save,
  X,
  TrendingDown,
} from "lucide-react";

const aiStyles = `
.ai-wrap { animation: aiIn 0.4s ease-out; }
@keyframes aiIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.ai-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
.ai-title {
  font-family: 'Fraunces', serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.ai-title-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, #f97316, #eab308);
  display: flex; align-items: center; justify-content: center;
}
.ai-filters { display: flex; gap: 8px; flex-wrap: wrap; }
.ai-filter-btn {
  padding: 8px 16px; border-radius: 10px;
  font-size: 0.8rem; font-weight: 700;
  cursor: pointer; transition: all 0.25s ease;
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.08);
}
.ai-filter-btn:hover { border-color: rgba(212,175,55,0.3); color: #fff; }
.ai-filter-btn.active {
  background: linear-gradient(135deg, #d4af37, #d4213c);
  border-color: transparent; color: white;
}
.ai-table-wrap {
  background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  overflow: hidden;
  overflow-x: auto;
}
.ai-tbl { width: 100%; border-collapse: collapse; min-width: 700px; }
.ai-tbl th {
  text-align: left; padding: 14px 16px; font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px; color: rgba(255,255,255,0.4);
  background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.06);
}
.ai-tbl td { padding: 12px 16px; font-size: 0.88rem; color: rgba(255,255,255,0.8); border-bottom: 1px solid rgba(255,255,255,0.04); }
.ai-tbl tbody tr:hover { background: rgba(212,175,55,0.04); }
.ai-tbl tbody tr:last-child td { border-bottom: none; }
.ai-badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 10px; border-radius: 14px;
  font-size: 0.72rem; font-weight: 600;
}
.ai-badge.in-stock { background: rgba(34,197,94,0.12); color: #22c55e; border: 1px solid rgba(34,197,94,0.25); }
.ai-badge.low-stock { background: rgba(234,179,8,0.12); color: #eab308; border: 1px solid rgba(234,179,8,0.25); }
.ai-badge.out-of-stock { background: rgba(226,55,68,0.12); color: #e23744; border: 1px solid rgba(226,55,68,0.25); }
.ai-stock-input {
  width: 80px; background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; padding: 6px 10px;
  color: #fff; font-size: 0.85rem; font-weight: 600;
  text-align: center;
}
.ai-stock-input:focus { outline: none; border-color: #d4af37; }
.ai-save-stock {
  padding: 6px 12px; border-radius: 8px;
  background: linear-gradient(135deg, #d4af37, #d4213c);
  border: none; color: white;
  font-size: 0.75rem; font-weight: 700;
  cursor: pointer;
}
.ai-save-stock:hover { opacity: 0.9; }
.ai-loading { display: flex; align-items: center; justify-content: center; min-height: 200px; color: rgba(255,255,255,0.5); }
.ai-empty { text-align: center; padding: 48px 20px; color: rgba(255,255,255,0.4); }
.ai-alert-bar {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 18px; border-radius: 12px;
  margin-bottom: 20px;
  font-size: 0.85rem; font-weight: 600;
}
.ai-alert-bar.warning {
  background: rgba(234,179,8,0.08);
  border: 1px solid rgba(234,179,8,0.2);
  color: #eab308;
}
.ai-alert-bar.danger {
  background: rgba(226,55,68,0.08);
  border: 1px solid rgba(226,55,68,0.2);
  color: #e23744;
}
`;

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editingStock, setEditingStock] = useState({});
  const [savingId, setSavingId] = useState(null);

  const loadProducts = async () => {
    try {
      const params = {};
      if (filter === "low") params.stock = "low";
      if (filter === "out") params.stock = "out";
      if (filter === "in") params.stock = "in";
      const res = await getAdminProducts(params);
      setProducts(res.products || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [filter]);

  const handleStockChange = (id, value) => {
    setEditingStock((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveStock = async (product) => {
    const newStock = Number(editingStock[product._id]);
    if (isNaN(newStock) || newStock < 0) {
      alert("Enter a valid stock quantity");
      return;
    }
    setSavingId(product._id);
    try {
      await updateProduct(product._id, { stock: newStock });
      setEditingStock((prev) => {
        const next = { ...prev };
        delete next[product._id];
        return next;
      });
      loadProducts();
    } catch (err) {
      alert("Error updating stock");
    } finally {
      setSavingId(null);
    }
  };

  const lowCount = products.filter(
    (p) => p.stock > 0 && p.stock <= (p.lowStockThreshold || 10)
  ).length;
  const outCount = products.filter((p) => p.stock <= 0).length;

  return (
    <>
      <style>{aiStyles}</style>
      <div className="ai-wrap">
        <div className="ai-header">
          <h1 className="ai-title">
            <span className="ai-title-icon">
              <AlertTriangle size={18} color="white" />
            </span>
            Inventory Management
          </h1>
          <div className="ai-filters">
            {[
              { key: "all", label: "All Products" },
              { key: "in", label: "In Stock" },
              { key: "low", label: "Low Stock" },
              { key: "out", label: "Out of Stock" },
            ].map((f) => (
              <button
                key={f.key}
                className={`ai-filter-btn ${
                  filter === f.key ? "active" : ""
                }`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Alert bars */}
        {lowCount > 0 && filter === "all" && (
          <div className="ai-alert-bar warning">
            <AlertTriangle size={16} />
            {lowCount} product{lowCount > 1 ? "s" : ""} running low on stock
          </div>
        )}
        {outCount > 0 && filter === "all" && (
          <div className="ai-alert-bar danger">
            <XCircle size={16} />
            {outCount} product{outCount > 1 ? "s" : ""} out of stock
          </div>
        )}

        {loading ? (
          <div className="ai-loading">Loading inventory...</div>
        ) : products.length === 0 ? (
          <div className="ai-empty">No products found</div>
        ) : (
          <div className="ai-table-wrap">
            <table className="ai-tbl">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Low Threshold</th>
                  <th>Status</th>
                  <th>Update Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const status =
                    p.stockStatus ||
                    (p.stock <= 0
                      ? "Out of Stock"
                      : p.stock <= (p.lowStockThreshold || 10)
                      ? "Low Stock"
                      : "In Stock");
                  return (
                    <tr key={p._id}>
                      <td style={{ fontWeight: 600, color: "#fff" }}>
                        {p.name}
                      </td>
                      <td>
                        {p.category?.name || p.categoryName || "—"}
                      </td>
                      <td style={{ fontWeight: 700 }}>{p.stock}</td>
                      <td>{p.lowStockThreshold || 10}</td>
                      <td>
                        {status === "Out of Stock" ? (
                          <span className="ai-badge out-of-stock">
                            <XCircle size={10} /> Out of Stock
                          </span>
                        ) : status === "Low Stock" ? (
                          <span className="ai-badge low-stock">
                            <AlertTriangle size={10} /> Low Stock
                          </span>
                        ) : (
                          <span className="ai-badge in-stock">
                            <CheckCircle size={10} /> In Stock
                          </span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <input
                            type="number"
                            className="ai-stock-input"
                            placeholder={p.stock}
                            value={editingStock[p._id] ?? ""}
                            onChange={(e) =>
                              handleStockChange(p._id, e.target.value)
                            }
                            min="0"
                          />
                          <button
                            className="ai-save-stock"
                            onClick={() => handleSaveStock(p)}
                            disabled={savingId === p._id || editingStock[p._id] === undefined}
                          >
                            {savingId === p._id ? "..." : "Save"}
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
    </>
  );
};

export default AdminInventory;

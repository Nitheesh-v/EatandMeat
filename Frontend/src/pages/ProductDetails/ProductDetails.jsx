import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import { ShoppingCart, ArrowLeft, Weight, ShieldCheck, Sparkles, Truck, AlertTriangle } from "lucide-react";

const primary = "#B4232C";
const deep = "#24140F";
const cream = "#FAF7F2";
const gold = "#C9A227";
const text = "#30231E";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try { const res = await getProductById(id); setProduct(res.product); }
      catch (err) { setNotFound(true); }
      finally { setLoading(false); }
    };
    loadProduct();
  }, [id]);

  if (loading) return <div style={{ background: cream, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8" }}>Loading...</div>;
  if (notFound || !product) return (
    <div style={{ background: cream, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
      <h1 style={{ color: deep, fontSize: "1.5rem", fontWeight: 800 }}>Product Not Found</h1>
      <Link to="/products" style={{ color: primary, fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>← Back to Products</Link>
    </div>
  );

  const price = product.sellingPrice || product.price;
  const basePrice = product.basePrice;
  const category = product.category?.name || product.categoryName || product.category;
  const stockQty = typeof product.stock === "number" ? product.stock : 0;
  const stockStatus = product.stockStatus || (stockQty <= 0 ? "Out of Stock" : stockQty <= (product.lowStockThreshold || 10) ? "Low Stock" : "In Stock");
  const isOutOfStock = stockQty <= 0;
  const hasDiscount = basePrice && basePrice > price;

  const handleAddToCart = () => {
    if (!currentUser) { alert("Please login to add to cart."); return; }
    if (isOutOfStock) { alert("Out of stock."); return; }
    addToCart({ ...product, id: product._id, price });
    alert("Added to cart!");
  };

  return (
    <section style={{ background: cream, minHeight: "100vh", paddingTop: 88, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        <Link to="/products" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: primary, fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", marginBottom: 20 }}>
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}
          className="pd-grid">
          {/* Image */}
          <div style={{ borderRadius: 16, overflow: "hidden", background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
            <div style={{ position: "relative" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "auto", minHeight: 400, objectFit: "cover", display: "block" }} />
              {category && <span style={{ position: "absolute", top: 16, left: 16, background: primary, color: "white", padding: "4px 12px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 700 }}>{category}</span>}
              {hasDiscount && <span style={{ position: "absolute", top: 16, right: 16, background: gold, color: "#FFFFFF", padding: "4px 10px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 700 }}>{Math.round(((basePrice - price) / basePrice) * 100)}% OFF</span>}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: deep, margin: "0 0 8px", lineHeight: 1.2 }}>{product.name}</h1>
            <p style={{ fontSize: "0.9rem", color: "#64748B", margin: "0 0 16px", lineHeight: 1.6 }}>{product.description}</p>

            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: "1.75rem", fontWeight: 800, color: primary }}>₹{price}</span>
              {hasDiscount && <span style={{ fontSize: "1rem", color: "#94A3B8", textDecoration: "line-through" }}>₹{basePrice}</span>}
              {hasDiscount && <span style={{ fontSize: "0.78rem", fontWeight: 700, color: gold, background: "rgba(201,162,39,0.1)", padding: "3px 8px", borderRadius: 4 }}>Save ₹{basePrice - price}</span>}
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: "#FFFFFF", border: "1px solid #E2E8F0", marginBottom: 16, fontSize: "0.82rem", fontWeight: 600, color: text }}>
              <Weight size={14} style={{ color: "#94A3B8" }} />
              {product.weight || product.unit}
            </div>

            {/* Stock */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 6,
              fontSize: "0.78rem", fontWeight: 600, marginLeft: 8,
              background: stockStatus === "Out of Stock" ? "rgba(220,38,38,0.08)" : stockStatus === "Low Stock" ? "rgba(234,88,12,0.08)" : "rgba(22,163,74,0.08)",
              color: stockStatus === "Out of Stock" ? "#DC2626" : stockStatus === "Low Stock" ? "#EA580C" : "#16A34A",
            }}>
              {stockStatus === "Out of Stock" && <AlertTriangle size={12} />}
              {stockStatus}{stockStatus !== "Out of Stock" && ` — ${stockQty} available`}
            </div>

            {/* Features */}
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: Sparkles, text: "Freshly Cut & Prepared", bg: "rgba(22,163,74,0.06)", color: "#16A34A" },
                { icon: ShieldCheck, text: "Hygienically Packed", bg: "rgba(37,99,235,0.06)", color: "#2563EB" },
                { icon: Truck, text: "Fast Doorstep Delivery", bg: "rgba(201,162,39,0.06)", color: gold },
              ].map((f) => (
                <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <f.icon size={16} style={{ color: f.color }} />
                  </div>
                  <span style={{ fontSize: "0.85rem", color: text, fontWeight: 500 }}>{f.text}</span>
                </div>
              ))}
            </div>

            <button onClick={handleAddToCart} disabled={isOutOfStock} style={{
              width: "100%", marginTop: 28, padding: "14px 24px", borderRadius: 10,
              border: "none", cursor: isOutOfStock ? "not-allowed" : "pointer",
              background: isOutOfStock ? "#E2E8F0" : primary, color: isOutOfStock ? "#94A3B8" : "white",
              fontWeight: 700, fontSize: "0.95rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s", boxShadow: isOutOfStock ? "none" : "0 4px 12px rgba(180,35,44,0.25)",
            }}
              onMouseEnter={(e) => { if (!isOutOfStock) { e.currentTarget.style.background = "#9A1D25"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
              onMouseLeave={(e) => { if (!isOutOfStock) { e.currentTarget.style.background = primary; e.currentTarget.style.transform = "translateY(0)"; } }}
            >
              <ShoppingCart size={18} />
              {isOutOfStock ? "Out of Stock" : `Add to Cart — ₹${price}`}
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .pd-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default ProductDetails;

import { useCart } from "../../Context/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { ShoppingCart } from "lucide-react";

const primary = "#B4232C";
const gold = "#C9A227";
const deep = "#24140F";
const cream = "#FAF7F2";
const text = "#30231E";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = product._id || product.id;
  const price = product.sellingPrice || product.price;
  const basePrice = product.basePrice;
  const category = product.category?.name || product.categoryName || product.category;
  const stockQty = typeof product.stock === "number" ? product.stock : 999;
  const isOutOfStock = stockQty <= 0;
  const hasDiscount = basePrice && basePrice > price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) { alert("Please login to add products to cart."); navigate("/login", { state: { from: location.pathname } }); return; }
    if (isOutOfStock) { alert("This product is out of stock."); return; }
    addToCart({ ...product, id: productId, price });
    alert("Product added to cart.");
  };

  return (
    <Link to={`/products/${productId}`} style={{ textDecoration: "none", display: "block" }}>
      <div style={{
        background: "#FFFFFF", borderRadius: 12, overflow: "hidden",
        border: "1px solid #E2E8F0", transition: "all 0.25s ease",
        cursor: "pointer",
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(36,20,15,0.08)";
          e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", overflow: "hidden", height: 200 }}>
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }} />
          {isOutOfStock && (
            <div style={{
              position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ background: "#FFFFFF", color: primary, padding: "4px 14px", borderRadius: 6, fontSize: "0.75rem", fontWeight: 700 }}>
                Out of Stock
              </span>
            </div>
          )}
          {category && (
            <span style={{
              position: "absolute", top: 10, left: 10, background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)", padding: "3px 10px", borderRadius: 6,
              fontSize: "0.68rem", fontWeight: 700, color: primary, textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}>{category}</span>
          )}
          {hasDiscount && (
            <span style={{
              position: "absolute", top: 10, right: 10, background: primary,
              color: "white", padding: "3px 8px", borderRadius: 4,
              fontSize: "0.65rem", fontWeight: 700,
            }}>{Math.round(((basePrice - price) / basePrice) * 100)}% OFF</span>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: "14px 16px 16px" }}>
          <h3 style={{
            fontSize: "0.95rem", fontWeight: 700, color: deep, margin: "0 0 4px",
            lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>{product.name}</h3>
          <p style={{ fontSize: "0.75rem", color: "#94A3B8", margin: "0 0 10px" }}>{product.weight || product.unit}</p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 800, color: primary }}>₹{price}</span>
              {hasDiscount && <span style={{ fontSize: "0.78rem", color: "#94A3B8", textDecoration: "line-through" }}>₹{basePrice}</span>}
            </div>
            <button onClick={handleAddToCart} disabled={isOutOfStock} style={{
              display: "flex", alignItems: "center", gap: 4, padding: "7px 14px",
              borderRadius: 8, border: "none", cursor: isOutOfStock ? "not-allowed" : "pointer",
              background: isOutOfStock ? "#F1F5F9" : primary, color: isOutOfStock ? "#94A3B8" : "white",
              fontSize: "0.75rem", fontWeight: 700, transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { if (!isOutOfStock) e.currentTarget.style.background = "#9A1D25"; }}
              onMouseLeave={(e) => { if (!isOutOfStock) e.currentTarget.style.background = primary; }}
            >
              <ShoppingCart size={13} />
              {isOutOfStock ? "Sold Out" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { useCart } from "../../Context/CartContext";
import {
  ShoppingCart,
  ArrowLeft,
  Tag,
  Weight,
  ShieldCheck,
  Sparkles,
  Truck,
  AlertTriangle,
} from "lucide-react";

const productDetailsStyles = `
.pd-glass-card {
  background: linear-gradient(135deg, rgba(127, 29, 29, 0.2) 0%, rgba(69, 10, 10, 0.4) 100%);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 24px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  overflow: hidden;
  transition: all 0.4s ease;
}
.pd-glass-card:hover {
  border-color: rgba(220, 38, 38, 0.4);
  box-shadow: 0 20px 60px rgba(220, 38, 38, 0.15);
}
.pd-image-wrap { position: relative; overflow: hidden; }
.pd-image-wrap img { width: 100%; height: 100%; min-height: 420px; object-fit: cover; transition: transform 0.6s ease; }
.pd-glass-card:hover .pd-image-wrap img { transform: scale(1.05); }
.pd-image-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%); pointer-events: none; }
.pd-category-badge {
  position: absolute; top: 20px; left: 20px;
  background: rgba(220, 38, 38, 0.9); color: white;
  font-size: 0.8rem; font-weight: 700; padding: 8px 18px;
  border-radius: 30px; backdrop-filter: blur(8px);
  display: inline-flex; align-items: center; gap: 6px; z-index: 2;
}
.pd-price-tag {
  position: absolute; bottom: 20px; right: 20px;
  background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(12px);
  border: 1px solid rgba(251, 146, 60, 0.4);
  border-radius: 16px; padding: 12px 20px; z-index: 2;
}
.pd-price-tag .price-label { color: #9ca3af; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; }
.pd-price-tag .price-value { color: #fb923c; font-size: 1.75rem; font-weight: 800; }
.pd-price-tag .price-original { color: #9ca3af; font-size: 0.85rem; text-decoration: line-through; margin-right: 8px; }
.pd-price-tag .price-discount { color: #22c55e; font-size: 0.75rem; font-weight: 700; margin-left: 8px; }
.pd-back-link { display: inline-flex; align-items: center; gap: 6px; color: #fca5a5; font-size: 0.9rem; font-weight: 500; transition: color 0.3s ease; margin-bottom: 20px; }
.pd-back-link:hover { color: white; }
.pd-title { color: white; font-size: 2.25rem; font-weight: 800; line-height: 1.2; margin-top: 12px; }
.pd-weight-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(220, 38, 38, 0.15); border: 1px solid rgba(212, 175, 55, 0.22);
  color: #fca5a5; padding: 8px 16px; border-radius: 30px;
  font-size: 0.875rem; font-weight: 600; margin-top: 16px;
}
.pd-features { margin-top: 28px; display: flex; flex-direction: column; gap: 14px; }
.pd-feature-item { display: flex; align-items: center; gap: 12px; color: #d1d5db; font-size: 1rem; transition: all 0.3s ease; }
.pd-feature-item:hover { color: white; transform: translateX(6px); }
.pd-feature-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pd-feature-icon.green { background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3); color: #4ade80; }
.pd-feature-icon.blue { background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; }
.pd-feature-icon.pink { background: rgba(236, 72, 153, 0.15); border: 1px solid rgba(236, 72, 153, 0.3); color: #f472b6; }
.pd-add-btn {
  background: linear-gradient(135deg, #dc2626 0%, #92721e 100%);
  border: none; border-radius: 16px; color: white;
  font-weight: 700; font-size: 1.05rem; padding: 16px 32px;
  cursor: pointer; position: relative; overflow: hidden;
  box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
  transition: all 0.3s ease;
  display: inline-flex; align-items: center; gap: 10px;
  margin-top: 32px; width: 100%; justify-content: center;
}
.pd-add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(220, 38, 38, 0.6); }
.pd-add-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
.pd-desc-text { color: #9ca3af; line-height: 1.8; margin-top: 16px; font-size: 1.05rem; }
.pd-not-found { text-align: center; padding: 80px 20px; }
.pd-not-found h1 { color: white; font-size: 2rem; font-weight: 700; }
.pd-not-found p { color: #9ca3af; margin-top: 12px; }
.pd-fade-in { animation: pdFadeIn 0.7s ease-out forwards; }
@keyframes pdFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.pd-fade-in-right { animation: pdFadeInRight 0.7s ease-out 0.2s both; }
@keyframes pdFadeInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
.pd-loading { text-align: center; padding: 120px 20px; color: rgba(255,255,255,0.5); font-size: 1rem; }
.pd-stock-badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 6px 14px; border-radius: 20px;
  font-size: 0.8rem; font-weight: 600; margin-top: 12px;
}
.pd-stock-badge.in-stock { background: rgba(34,197,94,0.12); color: #22c55e; border: 1px solid rgba(34,197,94,0.25); }
.pd-stock-badge.low-stock { background: rgba(234,179,8,0.12); color: #eab308; border: 1px solid rgba(234,179,8,0.25); }
.pd-stock-badge.out-of-stock { background: rgba(226,55,68,0.12); color: #e23744; border: 1px solid rgba(226,55,68,0.25); }
@media (max-width: 768px) {
  .pd-title { font-size: 1.5rem !important; }
  .pd-image-wrap img { min-height: 280px; }
}
`;

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.product);
      } catch (err) {
        console.log(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <style>{productDetailsStyles}</style>
        <div className="pd-loading">Loading product...</div>
      </>
    );
  }

  if (notFound || !product) {
    return (
      <>
        <style>{productDetailsStyles}</style>
        <div className="pd-not-found">
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/products" className="pd-back-link" style={{ marginTop: 20, justifyContent: "center" }}>
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </>
    );
  }

  const price = product.sellingPrice || product.price;
  const category = product.category?.name || product.categoryName || product.category;
  const stockQty = typeof product.stock === "number" ? product.stock : 0;
  const stockStatus = product.stockStatus || (stockQty <= 0 ? "Out of Stock" : stockQty <= (product.lowStockThreshold || 10) ? "Low Stock" : "In Stock");
  const isOutOfStock = stockQty <= 0;

  return (
    <>
      <style>{productDetailsStyles}</style>
      <section className="max-w-7xl mx-auto px-6 py-12 mt-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="pd-glass-card pd-fade-in">
            <div className="pd-image-wrap">
              <img src={product.image} alt={product.name} />
              <div className="pd-image-overlay"></div>
              <span className="pd-category-badge">
                <Tag size={14} />
                {category}
              </span>
              <div className="pd-price-tag">
                <div className="price-label">Price</div>
                <div>
                  {product.basePrice && product.basePrice > price && (
                    <span className="price-original">₹{product.basePrice}</span>
                  )}
                  <span className="price-value">₹{price}</span>
                  {product.discount > 0 && (
                    <span className="price-discount">{product.discount}% OFF</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="pd-fade-in-right">
            <Link to="/products" className="pd-back-link">
              <ArrowLeft size={16} />
              Back to Products
            </Link>

            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-desc-text">{product.description}</p>
            <div className="pd-weight-badge">
              <Weight size={16} />
              {product.weight || product.unit}
            </div>

            {/* Stock Status */}
            <div className={`pd-stock-badge ${
              stockStatus === "Out of Stock" ? "out-of-stock" :
              stockStatus === "Low Stock" ? "low-stock" : "in-stock"
            }`}>
              {stockStatus === "Out of Stock" && <AlertTriangle size={14} />}
              {stockStatus}
              {stockStatus !== "Out of Stock" && ` — ${stockQty} available`}
            </div>

            {/* Features */}
            <div className="pd-features">
              <div className="pd-feature-item">
                <div className="pd-feature-icon green">
                  <Sparkles size={18} />
                </div>
                <span>Freshly Cut & Prepared</span>
              </div>
              <div className="pd-feature-item">
                <div className="pd-feature-icon blue">
                  <ShieldCheck size={18} />
                </div>
                <span>Hygienically Packed</span>
              </div>
              <div className="pd-feature-item">
                <div className="pd-feature-icon pink">
                  <Truck size={18} />
                </div>
                <span>Women-Led Doorstep Delivery</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart({ ...product, id: product._id, price })}
              className="pd-add-btn"
              disabled={isOutOfStock}
            >
              <ShoppingCart size={20} />
              {isOutOfStock ? "Out of Stock" : `Add to Cart — ₹${price}`}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

import { useCart } from "../../Context/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { ShoppingCart, Tag, Flame } from "lucide-react";
import "./ProductsStyle/ProductCardStyle.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Use _id from MongoDB or fallback to id
  const productId = product._id || product.id;
  const price = product.sellingPrice || product.price;
  const category = product.category?.name || product.categoryName || product.category;
  const stockQty = typeof product.stock === "number" ? product.stock : (product.stock ? 999 : 0);
  const isOutOfStock = stockQty <= 0;

  const handleAddToCart = () => {
    if (!currentUser) {
      alert("Please login to add products to cart.");
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }
    if (isOutOfStock) {
      alert("This product is out of stock.");
      return;
    }
    addToCart({ ...product, id: productId, price });
    alert("Product added to cart.");
  };

  return (
    <div className="product-card-footer-dark group">
      <div className="relative overflow-hidden">
        <Link to={`/products/${productId}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <span className="product-card-badge">
          <Flame size={10} />
          {category}
        </span>
        {isOutOfStock && (
          <span
            className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full"
          >
            Out of Stock
          </span>
        )}
      </div>

      <div className="p-[18px] relative z-10">
        <span className="inline-flex items-center gap-[5px] text-[#fca5a5] text-[0.7rem] font-semibold uppercase tracking-wider">
          <Tag size={12} />
          {category}
        </span>

        <Link to={`/products/${productId}`}>
          <h3 className="text-white text-[1.1rem] font-bold mt-2 transition-colors duration-300 hover:text-[#fca5a5] leading-tight">
            {product.name}
          </h3>
        </Link>

        <p className="text-[#9ca3af] text-[0.85rem] mt-1">{product.weight}</p>

        <div className="flex justify-between items-center mt-[14px]">
          <div>
            {product.basePrice && product.basePrice > price && (
              <span className="text-[#9ca3af] text-[0.85rem] line-through mr-1">
                ₹{product.basePrice}
              </span>
            )}
            <h2 className="text-[#fb923c] text-[1.4rem] font-extrabold inline">
              <span className="text-[0.95rem] mr-[2px]">₹</span>
              {price}
            </h2>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`product-card-btn inline-flex items-center gap-[6px] text-white text-[0.82rem] font-semibold ${
              isOutOfStock ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            <ShoppingCart size={14} />
            {isOutOfStock ? "Sold Out" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

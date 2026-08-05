import { useCart } from "../../Context/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { ShoppingCart, Tag, Flame } from "lucide-react";
import "./ProductsStyle/ProductCardStyle.css"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = () => {
    if (!currentUser) {
      alert("Please login to add products to cart.");
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });
      return;
    }
    addToCart(product);
    alert("Product added to cart.");
  };

  return (
    <div className="product-card-footer-dark group">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <span className="product-card-badge">
          <Flame size={10} />
          {product.category}
        </span>
      </div>

      <div className="p-[18px] relative z-10">
        <span className="inline-flex items-center gap-[5px] text-[#fca5a5] text-[0.7rem] font-semibold uppercase tracking-wider">
          <Tag size={12} />
          {product.category}
        </span>

        <Link to={`/products/${product.id}`}>
          <h3 className="text-white text-[1.1rem] font-bold mt-2 transition-colors duration-300 hover:text-[#fca5a5] leading-tight">
            {product.name}
          </h3>
        </Link>

        <p className="text-[#9ca3af] text-[0.85rem] mt-1">{product.weight}</p>

        <div className="flex justify-between items-center mt-[14px]">
          <h2 className="text-[#fb923c] text-[1.4rem] font-extrabold">
            <span className="text-[0.95rem] mr-[2px]">₹</span>
            {product.price}
          </h2>

          <button
            onClick={handleAddToCart}
            className="product-card-btn inline-flex items-center gap-[6px] text-white text-[0.82rem] font-semibold"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import { useCart } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { ShoppingCart, Tag } from "lucide-react";

const productCardStyles = `
.product-card-dark {
  background: linear-gradient(135deg, rgba(127, 29, 29, 0.2) 0%, rgba(69, 10, 10, 0.4) 100%);
  border: 1px solid rgba(220, 38, 38, 0.15);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}
.product-card-dark::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.08), transparent);
  transition: left 0.6s ease;
  z-index: 0;
}
.product-card-dark:hover::before {
  left: 100%;
}
.product-card-dark:hover {
  transform: translateY(-8px);
  border-color: rgba(220, 38, 38, 0.5);
  box-shadow: 0 20px 40px rgba(220, 38, 38, 0.2);
}
.product-card-img-wrap {
  position: relative;
  overflow: hidden;
}
.product-card-img-wrap img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.product-card-dark:hover .product-card-img-wrap img {
  transform: scale(1.08);
}
.product-card-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(220, 38, 38, 0.9);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  z-index: 2;
}
.product-card-body {
  padding: 20px;
  position: relative;
  z-index: 1;
}
.product-card-category {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #fca5a5;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.product-card-name {
  color: white;
  font-size: 1.15rem;
  font-weight: 700;
  margin-top: 8px;
  transition: color 0.3s ease;
  line-height: 1.3;
}
.product-card-name:hover {
  color: #fca5a5;
}
.product-card-weight {
  color: #9ca3af;
  font-size: 0.9rem;
  margin-top: 4px;
}
.product-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
.product-card-price {
  color: #fb923c;
  font-size: 1.5rem;
  font-weight: 800;
}
.product-card-price .rupee {
  font-size: 1rem;
  margin-right: 2px;
}
.product-card-btn {
  background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 10px 18px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.product-card-btn::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
  transform: scale(0);
  transition: transform 0.5s ease;
}
.product-card-btn:hover::after {
  transform: scale(1);
}
.product-card-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(220, 38, 38, 0.5);
}
.product-card-btn:active {
  transform: translateY(0);
}
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <>
      <style>{productCardStyles}</style>
      <div className="product-card-dark">
        <div className="product-card-img-wrap">
          <Link to={`/products/${product.id}`}>
            <img src={product.image} alt={product.name} />
          </Link>
          <span className="product-card-badge">{product.category}</span>
        </div>

        <div className="product-card-body">
          <span className="product-card-category">
            <Tag size={12} />
            {product.category}
          </span>

          <Link to={`/products/${product.id}`}>
            <h3 className="product-card-name">{product.name}</h3>
          </Link>

          <p className="product-card-weight">{product.weight}</p>

          <div className="product-card-footer">
            <h2 className="product-card-price">
              <span className="rupee">₹</span>{product.price}
            </h2>

            <button
              onClick={() => addToCart(product)}
              className="product-card-btn"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

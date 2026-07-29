import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { ShoppingCart, Trash2, ArrowRight, Package } from "lucide-react";

const cartStyles = `
.meathub-dark-section {
  background: linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #1a0505 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.bg-mesh-gradient {
  background: radial-gradient(ellipse at 10% 20%, rgba(185, 28, 28, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 80%, rgba(234, 88, 12, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(127, 29, 29, 0.4) 0%, transparent 70%),
    linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #1a0505 100%);
  animation: meshMove 20s ease-in-out infinite;
  position: absolute; inset: 0;
}
@keyframes meshMove {
  0%, 100% { background-position: 0% 0%; filter: hue-rotate(0deg); }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; filter: hue-rotate(10deg); }
  75% { background-position: 0% 100%; }
}
.hex-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(30deg, rgba(220, 38, 38, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(220, 38, 38, 0.06) 87.5%, rgba(220, 38, 38, 0.06)),
    linear-gradient(150deg, rgba(220, 38, 38, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(220, 38, 38, 0.06) 87.5%, rgba(220, 38, 38, 0.06)),
    linear-gradient(60deg, rgba(234, 88, 12, 0.04) 25%, transparent 25.5%, transparent 75%, rgba(234, 88, 12, 0.04) 75%, rgba(234, 88, 12, 0.04));
  background-size: 80px 140px;
  animation: hexScroll 25s linear infinite;
  opacity: 0.5;
}
@keyframes hexScroll {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 70px); }
}
.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  animation: particleFloat linear infinite;
}
.particle-1 { width: 4px; height: 4px; background: radial-gradient(circle, #ef4444, transparent); left: 10%; bottom: -10px; animation-duration: 12s; animation-delay: 0s; }
.particle-2 { width: 6px; height: 6px; background: radial-gradient(circle, #f97316, transparent); left: 20%; bottom: -10px; animation-duration: 15s; animation-delay: 2s; }
.particle-3 { width: 3px; height: 3px; background: radial-gradient(circle, #ef4444, transparent); left: 35%; bottom: -10px; animation-duration: 10s; animation-delay: 4s; }
.particle-4 { width: 5px; height: 5px; background: radial-gradient(circle, #fbbf24, transparent); left: 50%; bottom: -10px; animation-duration: 14s; animation-delay: 1s; }
.particle-5 { width: 4px; height: 4px; background: radial-gradient(circle, #ef4444, transparent); left: 65%; bottom: -10px; animation-duration: 11s; animation-delay: 3s; }
.particle-6 { width: 7px; height: 7px; background: radial-gradient(circle, #f97316, transparent); left: 75%; bottom: -10px; animation-duration: 16s; animation-delay: 5s; }
@keyframes particleFloat {
  0% { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
  10% { opacity: 1; transform: translateY(-10vh) translateX(10px) scale(1); }
  90% { opacity: 0.6; }
  100% { transform: translateY(-110vh) translateX(-20px) scale(0.3); opacity: 0; }
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.orb-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(220, 38, 38, 0.25), transparent 70%);
  top: -10%; left: -5%;
  animation: orbMove1 15s ease-in-out infinite;
}
.orb-2 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(234, 88, 12, 0.2), transparent 70%);
  bottom: -10%; right: -5%;
  animation: orbMove2 18s ease-in-out infinite;
}
@keyframes orbMove1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(100px, 80px) scale(1.2); }
  66% { transform: translate(-50px, 120px) scale(0.9); }
}
@keyframes orbMove2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-80px, -60px) scale(1.15); }
  66% { transform: translate(60px, -100px) scale(0.85); }
}
.vignette-overlay {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.6) 100%);
  pointer-events: none; z-index: 1;
}
.glass-card {
  background: linear-gradient(135deg, rgba(127, 29, 29, 0.25) 0%, rgba(69, 10, 10, 0.45) 100%);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative; overflow: hidden;
}
.glass-card::before {
  content: ''; position: absolute; top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.1), transparent);
  transition: left 0.6s ease;
}
.glass-card:hover::before { left: 100%; }
.glass-card:hover {
  border-color: rgba(220, 38, 38, 0.5);
  box-shadow: 0 8px 32px rgba(220, 38, 38, 0.2);
}
.meathub-btn {
  background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
  border: none; border-radius: 14px; color: white; font-weight: 600;
  padding: 14px 28px; cursor: pointer; position: relative; overflow: hidden;
  box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
  transition: all 0.3s ease;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
}
.meathub-btn::after {
  content: ''; position: absolute; top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
  transform: scale(0); transition: transform 0.5s ease;
}
.meathub-btn:hover::after { transform: scale(1); }
.meathub-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(220, 38, 38, 0.6); }
.qty-btn {
  width: 36px; height: 36px; border-radius: 10px;
  border: 1px solid rgba(220, 38, 38, 0.3);
  background: rgba(69, 10, 10, 0.4); color: #fca5a5;
  font-size: 18px; font-weight: bold; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s ease;
}
.qty-btn:hover {
  background: rgba(220, 38, 38, 0.3);
  border-color: rgba(220, 38, 38, 0.6); color: white;
}
.page-title { color: white; font-size: 2.5rem; font-weight: 800; }
.page-title .accent {
  background: linear-gradient(135deg, #ef4444, #f97316);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.section-label {
  display: inline-block; background: rgba(220, 38, 38, 0.15);
  border: 1px solid rgba(220, 38, 38, 0.3); color: #fca5a5;
  padding: 8px 20px; border-radius: 30px;
  font-size: 0.875rem; font-weight: 600; margin-bottom: 16px;
}
.meathub-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.3), transparent);
  margin: 20px 0;
}
.fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in-up-delay-1 { animation-delay: 0.1s; opacity: 0; }
.fade-in-up-delay-2 { animation-delay: 0.2s; opacity: 0; }
.fade-in-up-delay-3 { animation-delay: 0.3s; opacity: 0; }
.fade-in-up-delay-4 { animation-delay: 0.4s; opacity: 0; }
@media (max-width: 768px) {
  .page-title { font-size: 1.75rem !important; }
  .orb { display: none; }
}
`;

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  const deliveryCharge = cartItems.length > 0 ? 40 : 0;
  const grandTotal = totalPrice + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <>
        <style>{cartStyles}</style>
        <section className="meathub-dark-section relative overflow-hidden py-24 px-6">
          <div className="bg-mesh-gradient"></div>
          <div className="hex-grid"></div>
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="vignette-overlay"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="fade-in-up">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
                <ShoppingCart size={56} className="text-red-400" />
              </div>
              <h1 className="page-title">Your Cart is Empty</h1>
              <p className="text-gray-400 mt-4 text-lg max-w-md mx-auto">
                Add fresh chicken and masalas to your cart and we'll deliver them
                fresh to your doorstep.
              </p>
              <Link to="/products" className="inline-block mt-8">
                <button className="meathub-btn px-10 py-4 text-lg">
                  <Package size={20} />
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <style>{cartStyles}</style>
      <section className="meathub-dark-section relative overflow-hidden py-16 px-6 mt-20">
        <div className="bg-mesh-gradient"></div>
        <div className="hex-grid"></div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>

        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="vignette-overlay"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-10 fade-in-up">
            <span className="section-label">🛒 Your Selection</span>
            <h1 className="page-title">
              Shopping <span className="accent">Cart</span>
            </h1>
            <p className="text-gray-400 mt-2">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`glass-card p-6 flex gap-5 fade-in-up fade-in-up-delay-${
                    index < 4 ? index + 1 : 4
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-xl border border-red-500/10"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {item.quantity}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          {item.name}
                        </h2>
                        <p className="text-gray-400 mt-1 text-sm">{item.weight}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors p-2"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="qty-btn"
                        >
                          −
                        </button>
                        <span className="text-white font-bold text-lg w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-gray-400 text-sm">₹{item.price} each</p>
                        <p className="text-orange-400 font-bold text-xl">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
{/* order summary */}
            <div className="fade-in-up fade-in-up-delay-3 mb-10 ">
              <div className="glass-card p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Delivery Fee</span>
                    <span className="font-medium">
                      {deliveryCharge === 0 ? (
                        <span className="text-green-400">FREE</span>
                      ) : (
                        `₹${deliveryCharge}`
                      )}
                    </span>
                  </div>
                  <div className="meathub-divider"></div>
                  <div className="flex justify-between text-white">
                    <span className="text-lg font-semibold">Grand Total</span>
                    <span className="text-2xl font-bold text-orange-400">
                      ₹{grandTotal}
                    </span>
                  </div>
                </div>

                <Link to="/checkout" className="block mt-8">
                  <button className="meathub-btn w-full py-4 text-lg">
                    Proceed to Checkout
                    <ArrowRight size={20} />
                  </button>
                </Link>

                <Link
                  to="/products"
                  className="block mt-4 text-center text-red-400 hover:text-red-300 text-sm transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;

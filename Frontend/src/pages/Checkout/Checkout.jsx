import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import {
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowRight,
  Shield,
} from "lucide-react";

const checkoutStyles = `
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
.particle-1 { width: 4px; height: 4px; background: radial-gradient(circle, #ef4444, transparent); left: 10%; bottom: -10px; animation-duration: 12s; }
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
.orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
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
.glass-card:hover { border-color: rgba(220, 38, 38, 0.5); box-shadow: 0 8px 32px rgba(220, 38, 38, 0.2); }
.glass-input {
  background: rgba(69, 10, 10, 0.4);
  border: 1px solid rgba(220, 38, 38, 0.25);
  border-radius: 12px;
  padding: 14px 18px;
  color: #f3f4f6;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  width: 100%;
}
.glass-input::placeholder { color: rgba(209, 213, 219, 0.5); }
.glass-input:focus {
  outline: none;
  border-color: rgba(220, 38, 38, 0.6);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
  background: rgba(69, 10, 10, 0.6);
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
.meathub-radio {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 18px;
  background: rgba(69, 10, 10, 0.3);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #e5e7eb;
}
.meathub-radio:hover { border-color: rgba(220, 38, 38, 0.5); background: rgba(69, 10, 10, 0.5); }
.meathub-radio input[type="radio"] { accent-color: #ef4444; width: 18px; height: 18px; }
.meathub-radio input[type="radio"]:checked + span { color: #fca5a5; font-weight: 600; }
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
@media (max-width: 768px) {
  .page-title { font-size: 1.75rem !important; }
  .orb { display: none; }
}
`;

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const deliveryCharge = cartItems.length > 0 ? 40 : 0;
  const grandTotal = totalPrice + deliveryCharge;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    navigate("/order-success");
  };

  return (
    <>
      <style>{checkoutStyles}</style>
      <section className="meathub-dark-section relative overflow-hidden py-16 px-6">
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

        <div className="relative z-10 max-w-7xl mx-auto mt-10">
          <div className="mb-10 fade-in-up">
            <span className="section-label"> Secure Checkout</span>
            <h1 className="page-title">
              Complete Your <span className="accent">Order</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-8">
              <div className="glass-card p-8 fade-in-up fade-in-up-delay-1">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <User size={24} className="text-red-400" />
                  Customer Details
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative md:col-span-2">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="glass-input pl-12"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="glass-input pl-12"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="glass-input pl-12"
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 fade-in-up fade-in-up-delay-2">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <MapPin size={24} className="text-red-400" />
                  Delivery Address
                </h2>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-5 text-gray-500" />
                  <textarea
                    rows="4"
                    placeholder="Enter your complete address with landmark..."
                    className="glass-input pl-12 resize-none"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <input type="text" placeholder="City / Town" className="glass-input" required />
                  <input type="text" placeholder="PIN Code" className="glass-input" required />
                </div>
              </div>

              <div className="glass-card p-8 fade-in-up fade-in-up-delay-3">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <CreditCard size={24} className="text-red-400" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="meathub-radio">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Banknote size={20} className="text-green-400" />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="meathub-radio">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Smartphone size={20} className="text-purple-400" />
                    <span>UPI (GPay / PhonePe / Paytm)</span>
                  </label>
                  <label className="meathub-radio">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <CreditCard size={20} className="text-blue-400" />
                    <span>Credit / Debit Card</span>
                  </label>
                </div>
              </div>
            </form>

            <div className="fade-in-up fade-in-up-delay-2">
              <div className="glass-card p-8 sticky top-8">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Order Summary
                </h2>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-gray-300 text-sm"
                    >
                      <span className="truncate mr-2">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium text-white whitespace-nowrap">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="meathub-divider"></div>
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Delivery</span>
                    <span>₹{deliveryCharge}</span>
                  </div>
                </div>
                <div className="meathub-divider"></div>
                <div className="flex justify-between mt-4">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold text-orange-400">
                    ₹{grandTotal}
                  </span>
                </div>
                <button
                  type="submit"
                  onClick={handlePlaceOrder}
                  className="meathub-btn w-full mt-8 py-4 text-lg"
                >
                  <Shield size={20} />
                  Place Order — ₹{grandTotal}
                </button>
                <p className="text-center text-gray-500 text-xs mt-4 flex items-center justify-center gap-1">
                  <Shield size={12} />
                  100% secure & encrypted checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;

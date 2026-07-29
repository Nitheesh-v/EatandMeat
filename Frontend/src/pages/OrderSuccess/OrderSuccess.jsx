import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Package,
  Clock,
  User,
  ArrowRight,
  Home,
} from "lucide-react";

const orderSuccessStyles = `
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
.meathub-btn-outline {
  background: transparent;
  border: 2px solid rgba(220, 38, 38, 0.6);
  color: #fca5a5; border-radius: 14px; font-weight: 600;
  padding: 12px 26px; cursor: pointer; transition: all 0.3s ease;
  display: inline-flex; align-items: center; gap: 8px;
}
.meathub-btn-outline:hover {
  background: rgba(220, 38, 38, 0.2);
  border-color: #ef4444; color: white;
}
.meathub-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.3), transparent);
  margin: 20px 0;
}
@keyframes checkPop {
  0% { transform: scale(0) rotate(-45deg); opacity: 0; }
  50% { transform: scale(1.3) rotate(0deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
.check-animate {
  animation: checkPop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}
.confetti {
  position: absolute;
  border-radius: 50%;
  animation: confettiFall linear forwards;
}
@keyframes confettiFall {
  0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
.fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 768px) {
  .orb { display: none; }
}
`;

const OrderSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [orderId] = useState(
    `ORD${Math.floor(100000 + Math.random() * 900000)}`
  );

  const confettiColors = ["#ef4444", "#f97316", "#fbbf24", "#ec4899", "#8b5cf6"];

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{orderSuccessStyles}</style>
      <section className="meathub-dark-section relative overflow-hidden py-24 px-6 flex items-center justify-center min-h-screen">
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

        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10px`,
                  backgroundColor: confettiColors[i % confettiColors.length],
                  animationDuration: `${2 + Math.random() * 3}s`,
                  animationDelay: `${Math.random() * 2}s`,
                  width: `${6 + Math.random() * 6}px`,
                  height: `${6 + Math.random() * 6}px`,
                }}
              ></div>
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-2xl w-full">
          <div className="glass-card p-10 text-center fade-in-up">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl scale-150"></div>
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center check-animate mx-auto">
                <CheckCircle size={56} className="text-white" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white mt-8">
              Order Placed{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Successfully!
              </span>
            </h1>

            <p className="text-gray-400 mt-4 text-lg">
              Thank you for choosing MeatHub. Your order has been received and is
              being prepared with care.
            </p>

            <div className="mt-8 text-left space-y-4">
              <div className="bg-black/20 rounded-xl p-5 border border-red-500/10">
                <div className="flex items-center gap-3 text-gray-300">
                  <Package size={20} className="text-red-400" />
                  <span className="font-semibold">Order ID:</span>
                  <span className="text-orange-400 font-mono font-bold text-lg">
                    {orderId}
                  </span>
                </div>
                <div className="meathub-divider"></div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock size={20} className="text-red-400" />
                  <span className="font-semibold">Estimated Delivery:</span>
                  <span className="text-white font-medium">30 – 45 Minutes</span>
                </div>
                <div className="meathub-divider"></div>
                <div className="flex items-start gap-3 text-gray-300">
                  <User size={20} className="text-red-400 mt-1" />
                  <div>
                    <span className="font-semibold">Delivery Partner:</span>
                    <p className="text-gray-400 text-sm mt-1">
                      A trained women delivery partner will deliver your order
                      safely to your doorstep.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between px-4">
              {["Confirmed", "Preparing", "On the Way", "Delivered"].map(
                (step, index) => (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        index === 0
                          ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
                          : "bg-white/10 text-gray-500 border border-white/10"
                      }`}
                    >
                      {index === 0 ? "✓" : index + 1}
                    </div>
                    <span
                      className={`text-xs mt-2 ${
                        index === 0 ? "text-green-400" : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                )
              )}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <button className="meathub-btn px-8 py-3">
                  Continue Shopping
                  <ArrowRight size={18} />
                </button>
              </Link>
              <Link to="/">
                <button className="meathub-btn-outline px-8 py-3">
                  <Home size={18} />
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderSuccess;

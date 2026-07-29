import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";

const registerStyles = `
.reg-section {
  background: linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #1a0505 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.reg-bg-mesh {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 10% 20%, rgba(185, 28, 28, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 80%, rgba(234, 88, 12, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(127, 29, 29, 0.4) 0%, transparent 70%),
    linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #1a0505 100%);
  animation: regMeshMove 20s ease-in-out infinite;
}
@keyframes regMeshMove {
  0%, 100% { background-position: 0% 0%; filter: hue-rotate(0deg); }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; filter: hue-rotate(10deg); }
  75% { background-position: 0% 100%; }
}
.reg-hex-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(30deg, rgba(220, 38, 38, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(220, 38, 38, 0.06) 87.5%, rgba(220, 38, 38, 0.06)),
    linear-gradient(150deg, rgba(220, 38, 38, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(220, 38, 38, 0.06) 87.5%, rgba(220, 38, 38, 0.06)),
    linear-gradient(60deg, rgba(234, 88, 12, 0.04) 25%, transparent 25.5%, transparent 75%, rgba(234, 88, 12, 0.04) 75%, rgba(234, 88, 12, 0.04));
  background-size: 80px 140px;
  animation: regHexScroll 25s linear infinite;
  opacity: 0.5;
}
@keyframes regHexScroll {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 70px); }
}
.reg-particle {
  position: absolute; border-radius: 50%; pointer-events: none; opacity: 0;
  animation: regParticleFloat linear infinite;
}
.reg-particle-1 { width: 4px; height: 4px; background: radial-gradient(circle, #ef4444, transparent); left: 10%; bottom: -10px; animation-duration: 12s; }
.reg-particle-2 { width: 6px; height: 6px; background: radial-gradient(circle, #f97316, transparent); left: 20%; bottom: -10px; animation-duration: 15s; animation-delay: 2s; }
.reg-particle-3 { width: 3px; height: 3px; background: radial-gradient(circle, #ef4444, transparent); left: 35%; bottom: -10px; animation-duration: 10s; animation-delay: 4s; }
.reg-particle-4 { width: 5px; height: 5px; background: radial-gradient(circle, #fbbf24, transparent); left: 50%; bottom: -10px; animation-duration: 14s; animation-delay: 1s; }
.reg-particle-5 { width: 4px; height: 4px; background: radial-gradient(circle, #ef4444, transparent); left: 65%; bottom: -10px; animation-duration: 11s; animation-delay: 3s; }
.reg-particle-6 { width: 7px; height: 7px; background: radial-gradient(circle, #f97316, transparent); left: 75%; bottom: -10px; animation-duration: 16s; animation-delay: 5s; }
@keyframes regParticleFloat {
  0% { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
  10% { opacity: 1; transform: translateY(-10vh) translateX(10px) scale(1); }
  90% { opacity: 0.6; }
  100% { transform: translateY(-110vh) translateX(-20px) scale(0.3); opacity: 0; }
}
.reg-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
.reg-orb-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(220, 38, 38, 0.25), transparent 70%);
  top: -10%; left: -5%;
  animation: regOrbMove1 15s ease-in-out infinite;
}
.reg-orb-2 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(234, 88, 12, 0.2), transparent 70%);
  bottom: -10%; right: -5%;
  animation: regOrbMove2 18s ease-in-out infinite;
}
@keyframes regOrbMove1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(100px, 80px) scale(1.2); }
  66% { transform: translate(-50px, 120px) scale(0.9); }
}
@keyframes regOrbMove2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-80px, -60px) scale(1.15); }
  66% { transform: translate(60px, -100px) scale(0.85); }
}
.reg-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.6) 100%);
  pointer-events: none; z-index: 1;
}
.reg-card {
  background: linear-gradient(135deg, rgba(127, 29, 29, 0.25) 0%, rgba(69, 10, 10, 0.5) 100%);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 40px 36px;
  position: relative;
  overflow: hidden;
  animation: regCardIn 0.8s ease-out;
}
.reg-card::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.08), transparent);
  transition: left 0.8s ease;
}
.reg-card:hover::before { left: 100%; }
@keyframes regCardIn {
  from { opacity: 0; transform: translateY(30px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.reg-logo-wrap {
  width: 64px; height: 64px;
  background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
  border-radius: 18px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(220, 38, 38, 0.4);
}
.reg-title {
  color: white;
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.2;
}
.reg-title .accent {
  background: linear-gradient(135deg, #ef4444, #f97316);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.reg-subtitle {
  color: #9ca3af;
  font-size: 0.95rem;
  margin-top: 8px;
}
.reg-input-group {
  position: relative;
  margin-top: 18px;
}
.reg-input-label {
  display: block;
  color: #d1d5db;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.reg-input {
  width: 100%;
  background: rgba(69, 10, 10, 0.4);
  border: 1px solid rgba(220, 38, 38, 0.25);
  border-radius: 12px;
  padding: 14px 18px 14px 48px;
  color: #f3f4f6;
  font-size: 0.95rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-sizing: border-box;
}
.reg-input::placeholder { color: rgba(209, 213, 219, 0.4); }
.reg-input:focus {
  outline: none;
  border-color: rgba(220, 38, 38, 0.6);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
  background: rgba(69, 10, 10, 0.6);
}
.reg-input-icon {
  position: absolute;
  left: 16px;
  top: 42px;
  color: #6b7280;
  pointer-events: none;
}
.reg-toggle-pw {
  position: absolute;
  right: 16px;
  top: 42px;
  color: #6b7280;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
  transition: color 0.2s;
}
.reg-toggle-pw:hover { color: #fca5a5; }
.reg-terms-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px;
}
.reg-terms-row input[type="checkbox"] {
  accent-color: #ef4444;
  width: 18px; height: 18px;
  cursor: pointer;
  margin-top: 2px;
}
.reg-terms-label {
  color: #9ca3af;
  font-size: 0.85rem;
  line-height: 1.5;
}
.reg-terms-link {
  color: #fca5a5;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}
.reg-terms-link:hover { color: white; }
.reg-submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
  border: none;
  border-radius: 14px;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  padding: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 28px;
}
.reg-submit-btn::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
  transform: scale(0);
  transition: transform 0.5s ease;
}
.reg-submit-btn:hover::after { transform: scale(1); }
.reg-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(220, 38, 38, 0.6);
}
.reg-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.3), transparent);
  margin: 24px 0;
}
.reg-login-text {
  color: #9ca3af;
  font-size: 0.9rem;
  text-align: center;
}
.reg-login-link {
  color: #fca5a5;
  font-weight: 600;
  text-decoration: none;
  margin-left: 6px;
  transition: color 0.2s;
}
.reg-login-link:hover { color: white; }
.reg-secure-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #6b7280;
  font-size: 0.75rem;
  margin-top: 20px;
}
@media (max-width: 768px) {
  .reg-card { padding: 28px 20px; margin: 0 16px; }
  .reg-orb { display: none; }
}
`;

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <style>{registerStyles}</style>
      <section className="reg-section flex items-center justify-center px-6 py-8">
        {/* Background layers */}
        <div className="reg-bg-mesh"></div>
        <div className="reg-hex-grid"></div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="reg-particle reg-particle-1"></div>
          <div className="reg-particle reg-particle-2"></div>
          <div className="reg-particle reg-particle-3"></div>
          <div className="reg-particle reg-particle-4"></div>
          <div className="reg-particle reg-particle-5"></div>
          <div className="reg-particle reg-particle-6"></div>
        </div>

        <div className="reg-orb reg-orb-1"></div>
        <div className="reg-orb reg-orb-2"></div>
        <div className="reg-vignette"></div>

        {/* Card */}
        <div className="relative z-10 w-full  sm:max-w-md mt-20">
          <div className="reg-card">
            {/* Logo */}
            <div className="reg-logo-wrap">
              <UserPlus size={28} className="text-white" />
            </div>

            <h1 className="reg-title">
              Join <span className="accent">MeatHub</span>
            </h1>
            <p className="reg-subtitle">
              Create your account to get started
            </p>

            <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
              {/* Email */}
              <div className="reg-input-group">
                <label htmlFor="email" className="reg-input-label">
                  Email Address
                </label>
                <Mail size={18} className="reg-input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="reg-input"
                  placeholder="name@company.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="reg-input-group">
                <label htmlFor="password" className="reg-input-label">
                  Password
                </label>
                <Lock size={18} className="reg-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="reg-input"
                  placeholder="••••••••"
                  required
                  style={{ paddingRight: 48 }}
                />
                <button
                  type="button"
                  className="reg-toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="reg-input-group">
                <label htmlFor="confirm-password" className="reg-input-label">
                  Confirm Password
                </label>
                <Lock size={18} className="reg-input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  name="confirm-password"
                  className="reg-input"
                  placeholder="••••••••"
                  required
                  style={{ paddingRight: 48 }}
                />
                <button
                  type="button"
                  className="reg-toggle-pw"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Terms */}
              <div className="reg-terms-row">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms" className="reg-terms-label">
                  I accept the{" "}
                  <a href="#" className="reg-terms-link">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              {/* Submit */}
              <button type="submit" className="reg-submit-btn">
                <UserPlus size={20} />
                Create Account
              </button>
            </form>

            <div className="reg-divider"></div>

            <p className="reg-login-text">
              Already have an account?
              <Link to="/login" className="reg-login-link">
                Login here
              </Link>
            </p>

            <div className="reg-secure-badge">
              <Shield size={12} />
              Your data is safe with us
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;

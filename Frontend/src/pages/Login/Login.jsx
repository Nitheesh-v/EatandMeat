import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, Shield } from "lucide-react";
import { useState } from "react";

const loginStyles = `
.login-section {
  background: linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #1a0505 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.login-bg-mesh {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 10% 20%, rgba(185, 28, 28, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 80%, rgba(234, 88, 12, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(127, 29, 29, 0.4) 0%, transparent 70%),
    linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #1a0505 100%);
  animation: loginMeshMove 20s ease-in-out infinite;
}
@keyframes loginMeshMove {
  0%, 100% { background-position: 0% 0%; filter: hue-rotate(0deg); }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; filter: hue-rotate(10deg); }
  75% { background-position: 0% 100%; }
}
.login-hex-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(30deg, rgba(220, 38, 38, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(220, 38, 38, 0.06) 87.5%, rgba(220, 38, 38, 0.06)),
    linear-gradient(150deg, rgba(220, 38, 38, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(220, 38, 38, 0.06) 87.5%, rgba(220, 38, 38, 0.06)),
    linear-gradient(60deg, rgba(234, 88, 12, 0.04) 25%, transparent 25.5%, transparent 75%, rgba(234, 88, 12, 0.04) 75%, rgba(234, 88, 12, 0.04));
  background-size: 80px 140px;
  animation: loginHexScroll 25s linear infinite;
  opacity: 0.5;
}
@keyframes loginHexScroll {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 70px); }
}
.login-particle {
  position: absolute; border-radius: 50%; pointer-events: none; opacity: 0;
  animation: loginParticleFloat linear infinite;
}
.login-particle-1 { width: 4px; height: 4px; background: radial-gradient(circle, #ef4444, transparent); left: 10%; bottom: -10px; animation-duration: 12s; }
.login-particle-2 { width: 6px; height: 6px; background: radial-gradient(circle, #f97316, transparent); left: 20%; bottom: -10px; animation-duration: 15s; animation-delay: 2s; }
.login-particle-3 { width: 3px; height: 3px; background: radial-gradient(circle, #ef4444, transparent); left: 35%; bottom: -10px; animation-duration: 10s; animation-delay: 4s; }
.login-particle-4 { width: 5px; height: 5px; background: radial-gradient(circle, #fbbf24, transparent); left: 50%; bottom: -10px; animation-duration: 14s; animation-delay: 1s; }
.login-particle-5 { width: 4px; height: 4px; background: radial-gradient(circle, #ef4444, transparent); left: 65%; bottom: -10px; animation-duration: 11s; animation-delay: 3s; }
.login-particle-6 { width: 7px; height: 7px; background: radial-gradient(circle, #f97316, transparent); left: 75%; bottom: -10px; animation-duration: 16s; animation-delay: 5s; }
@keyframes loginParticleFloat {
  0% { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
  10% { opacity: 1; transform: translateY(-10vh) translateX(10px) scale(1); }
  90% { opacity: 0.6; }
  100% { transform: translateY(-110vh) translateX(-20px) scale(0.3); opacity: 0; }
}
.login-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
.login-orb-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(220, 38, 38, 0.25), transparent 70%);
  top: -10%; left: -5%;
  animation: loginOrbMove1 15s ease-in-out infinite;
}
.login-orb-2 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(234, 88, 12, 0.2), transparent 70%);
  bottom: -10%; right: -5%;
  animation: loginOrbMove2 18s ease-in-out infinite;
}
@keyframes loginOrbMove1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(100px, 80px) scale(1.2); }
  66% { transform: translate(-50px, 120px) scale(0.9); }
}
@keyframes loginOrbMove2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-80px, -60px) scale(1.15); }
  66% { transform: translate(60px, -100px) scale(0.85); }
}
.login-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.6) 100%);
  pointer-events: none; z-index: 1;
}
.login-card {
  background: linear-gradient(135deg, rgba(127, 29, 29, 0.25) 0%, rgba(69, 10, 10, 0.5) 100%);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 40px 36px;
  position: relative;
  overflow: hidden;
  animation: loginCardIn 0.8s ease-out;
}
.login-card::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.08), transparent);
  transition: left 0.8s ease;
}
.login-card:hover::before { left: 100%; }
@keyframes loginCardIn {
  from { opacity: 0; transform: translateY(30px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.login-logo-wrap {
  width: 64px; height: 64px;
  background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
  border-radius: 18px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(220, 38, 38, 0.4);
}
.login-title {
  color: white;
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.2;
}
.login-title .accent {
  background: linear-gradient(135deg, #ef4444, #f97316);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.login-subtitle {
  color: #9ca3af;
  font-size: 0.95rem;
  margin-top: 8px;
}
.login-input-group {
  position: relative;
  margin-top: 20px;
}
.login-input-label {
  display: block;
  color: #d1d5db;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.login-input {
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
.login-input::placeholder { color: rgba(209, 213, 219, 0.4); }
.login-input:focus {
  outline: none;
  border-color: rgba(220, 38, 38, 0.6);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
  background: rgba(69, 10, 10, 0.6);
}
.login-input-icon {
  position: absolute;
  left: 16px;
  top: 42px;
  color: #6b7280;
  pointer-events: none;
}
.login-toggle-pw {
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
.login-toggle-pw:hover { color: #fca5a5; }
.login-remember-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
.login-checkbox-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.login-checkbox-wrap input[type="checkbox"] {
  accent-color: #ef4444;
  width: 18px; height: 18px;
  cursor: pointer;
}
.login-checkbox-wrap span {
  color: #9ca3af;
  font-size: 0.875rem;
}
.login-forgot-link {
  color: #fca5a5;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}
.login-forgot-link:hover { color: white; }
.login-submit-btn {
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
.login-submit-btn::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
  transform: scale(0);
  transition: transform 0.5s ease;
}
.login-submit-btn:hover::after { transform: scale(1); }
.login-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(220, 38, 38, 0.6);
}
.login-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.3), transparent);
  margin: 24px 0;
}
.login-signup-text {
  color: #9ca3af;
  font-size: 0.9rem;
  text-align: center;
}
.login-signup-link {
  color: #fca5a5;
  font-weight: 600;
  text-decoration: none;
  margin-left: 6px;
  transition: color 0.2s;
}
.login-signup-link:hover { color: white; }
.login-secure-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #6b7280;
  font-size: 0.75rem;
  margin-top: 20px;
}
@media (max-width: 768px) {
  .login-card { padding: 28px 20px; margin: 0 16px; }
  .login-orb { display: none; }
}
`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <style>{loginStyles}</style>
      <section className="login-section flex items-center justify-center px-6 py-8">
        {/* Background layers */}
        <div className="login-bg-mesh"></div>
        <div className="login-hex-grid"></div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="login-particle login-particle-1"></div>
          <div className="login-particle login-particle-2"></div>
          <div className="login-particle login-particle-3"></div>
          <div className="login-particle login-particle-4"></div>
          <div className="login-particle login-particle-5"></div>
          <div className="login-particle login-particle-6"></div>
        </div>

        <div className="login-orb login-orb-1"></div>
        <div className="login-orb login-orb-2"></div>
        <div className="login-vignette"></div>

        {/* Card */}
        <div className="relative z-10 w-full sm:max-w-md mt-20">
          <div className="login-card">
            {/* Logo */}
            <div className="login-logo-wrap">
              <LogIn size={28} className="text-white" />
            </div>

            <h1 className="login-title">
              Welcome <span className="accent">Back</span>
            </h1>
            <p className="login-subtitle">
              Sign in to your MeatHub account
            </p>

            <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
              {/* Email */}
              <div className="login-input-group">
                <label htmlFor="email" className="login-input-label">
                  Email Address
                </label>
                <Mail size={18} className="login-input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="login-input"
                  placeholder="name@company.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="login-input-group">
                <label htmlFor="password" className="login-input-label">
                  Password
                </label>
                <Lock size={18} className="login-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="login-input"
                  placeholder="••••••••"
                  required
                  style={{ paddingRight: 48 }}
                />
                <button
                  type="button"
                  className="login-toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Remember + Forgot */}
              <div className="login-remember-row">
                <label className="login-checkbox-wrap">
                  <input type="checkbox" id="remember" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="login-forgot-link">
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button type="submit" className="login-submit-btn">
                <LogIn size={20} />
                Sign In
              </button>
            </form>

            <div className="login-divider"></div>

            <p className="login-signup-text">
              Don't have an account?
              <Link to="/register" className="login-signup-link">
                Sign Up
              </Link>
            </p>

            <div className="login-secure-badge">
              <Shield size={12} />
              Secured with 256-bit encryption
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

import { Link, useNavigate } from "react-router-dom";
import { User, UserPlus, Mail, Lock, Phone, Eye, EyeOff, Shield, Flame, Briefcase, Bike } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const registerStyles = `
.reg-page { min-height: 100vh; width: 100%; display: flex; background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%); }

.reg-visual {
  position: relative; overflow: hidden; flex: 1;
  background: linear-gradient(150deg, #0f0a0a 0%, #1a0e0e 40%, #2a1015 100%);
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 56px 48px;
}
.reg-visual-glow { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
.reg-visual-glow-1 { width: 380px; height: 380px; top: -10%; left: -10%; background: radial-gradient(circle, rgba(212,33,60,0.3), transparent 70%); animation: regGlow1 20s ease-in-out infinite; }
.reg-visual-glow-2 { width: 340px; height: 340px; bottom: -10%; right: -10%; background: radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%); animation: regGlow2 24s ease-in-out infinite; }
@keyframes regGlow1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,20px) scale(1.08); } }
@keyframes regGlow2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,-20px) scale(1.05); } }

.reg-ember {
  position: absolute; border-radius: 50%; pointer-events: none;
  background: radial-gradient(circle at 35% 30%, #ffc98a, #d4213c 55%, transparent 75%);
  opacity: .5; animation: regEmberFloat ease-in-out infinite;
}
@keyframes regEmberFloat {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: .1; }
  50% { opacity: .55; }
  100% { transform: translateY(-70px) translateX(16px) scale(1.15); opacity: 0; }
}

.reg-form-side { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px 24px; min-height: 100vh; }
.reg-form-wrap { width: 100%; max-width: 440px; animation: regFormIn .7s cubic-bezier(.16,.84,.32,1); }
@keyframes regFormIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

.reg-title {
  font-size: clamp(1.75rem, 4vw, 2rem); font-weight: 800; line-height: 1.2;
  background: linear-gradient(135deg, #ffffff 0%, #e0d0d0 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.reg-title .accent {
  background: linear-gradient(135deg, #d4213c, #ff6b35);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.reg-subtitle { color: rgba(255,255,255,0.4); font-size: 0.9rem; margin-top: 8px; }

.reg-role-select {
  width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
  padding: 13px 16px; color: #fff; font-size: 0.95rem; transition: all 0.25s ease; box-sizing: border-box;
  appearance: none; cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
}
.reg-role-select:focus { outline: none; border-color: #d4213c; box-shadow: 0 0 0 3px rgba(212,33,60,0.15); }
.reg-role-select option { background: #1a0a0a; color: #fff; }

.reg-input-group { position: relative; margin-top: 16px; }
.reg-input-label { display: block; color: rgba(255,255,255,0.5); font-size: 0.8rem; font-weight: 600; margin-bottom: 8px; }
.reg-input {
  width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
  padding: 13px 16px; color: #fff; font-size: 0.95rem; transition: all 0.25s ease; box-sizing: border-box;
}
.reg-input-group .reg-input-icon + .reg-input { padding-left: 46px; }
.reg-input::placeholder { color: rgba(255,255,255,0.25); }
.reg-input:focus { outline: none; border-color: #d4213c; box-shadow: 0 0 0 3px rgba(212,33,60,0.15); }
.reg-input-icon { position: absolute; left: 15px; top: 41px; color: rgba(255,255,255,0.3); pointer-events: none; z-index: 1; }
.reg-toggle-pw { position: absolute; right: 14px; top: 39px; color: rgba(255,255,255,0.3); cursor: pointer; background: none; border: none; padding: 4px; transition: color 0.2s; }
.reg-toggle-pw:hover { color: #d4213c; }

.reg-terms-row { display: flex; align-items: flex-start; gap: 10px; margin-top: 18px; }
.reg-terms-row input[type="checkbox"] { accent-color: #d4213c; width: 17px; height: 17px; margin-top: 2px; cursor: pointer; }
.reg-terms-label { color: rgba(255,255,255,0.5); font-size: 0.85rem; line-height: 1.4; }
.reg-terms-link { color: #d4af37; font-weight: 600; text-decoration: none; }
.reg-terms-link:hover { text-decoration: underline; }

.reg-submit-btn {
  width: 100%; background: linear-gradient(135deg, #d4213c 0%, #ff6b35 100%);
  border: none; border-radius: 14px; color: white; font-weight: 700; font-size: 1rem; padding: 15px;
  cursor: pointer; box-shadow: 0 6px 20px rgba(212,33,60,0.35); transition: all 0.3s ease;
  display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 22px;
}
.reg-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(212,33,60,0.5); }
.reg-submit-btn:disabled { opacity: .6; cursor: not-allowed; transform: none; }

.reg-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); margin: 20px 0; }

.reg-signin-text { color: rgba(255,255,255,0.4); font-size: 0.9rem; text-align: center; }
.reg-signin-link { color: #d4af37; font-weight: 700; text-decoration: none; margin-left: 6px; }
.reg-signin-link:hover { text-decoration: underline; }

.reg-secure-badge { display: flex; align-items: center; justify-content: center; gap: 6px; color: rgba(255,255,255,0.3); font-size: 0.75rem; margin-top: 16px; }

.reg-password-strength { margin-top: 6px; }
.reg-strength-bar { height: 3px; border-radius: 2px; background: rgba(255,255,255,0.08); overflow: hidden; }
.reg-strength-fill { height: 100%; border-radius: 2px; transition: all 0.3s ease; }
.reg-strength-text { font-size: 0.7rem; margin-top: 3px; font-weight: 600; }

@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 900px) {
  .reg-visual { display: none; }
  .reg-form-side { padding: 32px 20px; }
}
`;

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, label: "", color: "transparent" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const levels = [
      { label: "Weak", color: "#ef4444" },
      { label: "Fair", color: "#f59e0b" },
      { label: "Good", color: "#3b82f6" },
      { label: "Strong", color: "#10b981" },
    ];
    return { level: score, ...levels[Math.min(score - 1, 3)] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { alert("Passwords do not match"); return; }
    const result = await register({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });
    if (!result.success) { alert(result.message); return; }
    alert("Registration Successful");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <style>{registerStyles}</style>
      <div className="reg-page">
        {/* Visual side */}
        <div className="reg-visual">
          <div className="reg-visual-glow reg-visual-glow-1" />
          <div className="reg-visual-glow reg-visual-glow-2" />
          <span className="reg-ember" style={{ width: 14, height: 14, top: "20%", left: "70%", animationDuration: "11s" }} />
          <span className="reg-ember" style={{ width: 9, height: 9, top: "55%", left: "85%", animationDelay: "1.5s", animationDuration: "13s" }} />
          <span className="reg-ember" style={{ width: 20, height: 20, top: "72%", left: "60%", animationDelay: "2.5s", animationDuration: "12s" }} />

          <div className="relative z-10 flex items-center gap-2 mt-20">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #d4213c, #ff6b35)", boxShadow: "0 4px 15px rgba(212,33,60,0.5)" }}
            >
              <Flame size={22} color="white" />
            </div>
            <span className="text-2xl font-black">
              <span style={{ color: "#fff" }}>Eat</span>
              <span style={{ color: "#d4213c" }}>And</span>
              <span style={{ color: "#d4af37" }}>Meat</span>
            </span>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
              Join the<br />EatAndMeat family.
            </h2>
            <p className="text-white/60 mt-4 max-w-sm">
              Create an account for faster checkout, order tracking, and exclusive offers.
            </p>
          </div>

          <div className="relative z-10 flex gap-8 text-white/70 text-sm">
            <div><span className="text-white font-bold text-xl block">500+</span>Customers</div>
            <div><span className="text-white font-bold text-xl block">50+</span>Products</div>
            <div><span className="text-white font-bold text-xl block">4.9★</span>Rating</div>
          </div>
        </div>

        {/* Form side */}
        <div className="reg-form-side mt-20">
          <div className="reg-form-wrap">
            <h1 className="reg-title">
              Join <span className="accent">EatAndMeat</span>
            </h1>
            <p className="reg-subtitle">Create your account to get started</p>

            <div className="reg-input-group" style={{ marginTop: 20 }}>
              <label className="reg-input-label">Register As</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="reg-role-select"
              >
                <option value="customer">🛒 Customer</option>
                <option value="company">🏢 Company</option>
                <option value="delivery">🚴 Delivery Partner</option>
              </select>
            </div>

            <form className="mt-2" onSubmit={handleRegister}>
              <div className="reg-input-group">
                <label htmlFor="fullName" className="reg-input-label">Full Name</label>
                <User size={18} className="reg-input-icon" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="reg-input"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="reg-input-group">
                <label htmlFor="phone" className="reg-input-label">Mobile Number</label>
                <Phone size={18} className="reg-input-icon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="reg-input"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="reg-input-group">
                <label htmlFor="email" className="reg-input-label">Email Address</label>
                <Mail size={18} className="reg-input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="reg-input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="reg-input-group">
                <label htmlFor="password" className="reg-input-label">Password</label>
                <Lock size={18} className="reg-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="reg-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ paddingRight: 48 }}
                />
                <button type="button" className="reg-toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {/* Password strength */}
                {formData.password && (
                  <div className="reg-password-strength">
                    <div className="reg-strength-bar">
                      <div
                        className="reg-strength-fill"
                        style={{
                          width: `${(passwordStrength.level / 4) * 100}%`,
                          background: passwordStrength.color,
                          boxShadow: passwordStrength.level > 0 ? `0 0 8px ${passwordStrength.color}60` : "none",
                        }}
                      />
                    </div>
                    <p className="reg-strength-text" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </p>
                  </div>
                )}
              </div>

              <div className="reg-input-group">
                <label htmlFor="confirmPassword" className="reg-input-label">Confirm Password</label>
                <Lock size={18} className="reg-input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="reg-input"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{ paddingRight: 48 }}
                />
                <button type="button" className="reg-toggle-pw" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {formData.confirmPassword && (
                  <p
                    className="reg-strength-text"
                    style={{
                      color: formData.password === formData.confirmPassword ? "#10b981" : "#ef4444",
                      marginTop: 4,
                    }}
                  >
                    {formData.password === formData.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                  </p>
                )}
              </div>

              <div className="reg-terms-row">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms" className="reg-terms-label">
                  I accept the <a href="#" className="reg-terms-link">Terms and Conditions</a> & <a href="#" className="reg-terms-link">Privacy Policy</a>
                </label>
              </div>

              <button type="submit" className="reg-submit-btn" disabled={loading}>
                <UserPlus size={20} />
                {loading ? "Creating account…" : "Create Account"}
              </button>
            </form>

            <div className="reg-divider"></div>

            <p className="reg-signin-text">
              Already have an account?
              <Link to="/login" className="reg-signin-link">Sign In</Link>
            </p>

            <div className="reg-secure-badge">
              <Shield size={12} />
              Secured with 256-bit encryption
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

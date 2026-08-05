import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, Shield, Flame, User, Briefcase, Bike } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const loginStyles = `
.login-page { min-height: 100vh; width: 100%; display: flex; background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%); }

.login-visual {
  position: relative; overflow: hidden; flex: 1;
  background: linear-gradient(150deg, #0f0a0a 0%, #1a0e0e 40%, #2a1015 100%);
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 56px 48px;
}
.login-visual-glow { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
.login-visual-glow-1 { width: 380px; height: 380px; top: -10%; left: -10%; background: radial-gradient(circle, rgba(212,33,60,0.3), transparent 70%); animation: loginGlow1 20s ease-in-out infinite; }
.login-visual-glow-2 { width: 340px; height: 340px; bottom: -10%; right: -10%; background: radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%); animation: loginGlow2 24s ease-in-out infinite; }
@keyframes loginGlow1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,20px) scale(1.08); } }
@keyframes loginGlow2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,-20px) scale(1.05); } }

.login-ember {
  position: absolute; border-radius: 50%; pointer-events: none;
  background: radial-gradient(circle at 35% 30%, #ffc98a, #d4213c 55%, transparent 75%);
  opacity: .5; animation: loginEmberFloat ease-in-out infinite;
}
@keyframes loginEmberFloat {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: .1; }
  50% { opacity: .55; }
  100% { transform: translateY(-70px) translateX(16px) scale(1.15); opacity: 0; }
}

.login-form-side {
  flex: 1; display: flex; align-items: center; justify-content: center;
  padding: 40px 24px; min-height: 100vh;
}
.login-form-wrap { width: 100%; max-width: 420px; animation: loginFormIn .7s cubic-bezier(.16,.84,.32,1); }
@keyframes loginFormIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

.login-title {
  font-size: clamp(1.75rem, 4vw, 2rem); font-weight: 800; line-height: 1.2;
  background: linear-gradient(135deg, #ffffff 0%, #e0d0d0 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.login-title .accent {
  background: linear-gradient(135deg, #d4213c, #ff6b35);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.login-subtitle { color: rgba(255,255,255,0.4); font-size: 0.9rem; margin-top: 8px; }

.login-role-btn {
  padding: 10px 14px; border-radius: 10px; font-size: 0.8rem; font-weight: 600;
  transition: all 0.25s ease; cursor: pointer; flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
  background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.08);
}
.login-role-btn:hover { border-color: rgba(212,33,60,0.3); color: #fff; background: rgba(212,33,60,0.08); }
.login-role-btn.active {
  background: linear-gradient(135deg, #d4213c 0%, #96101f 100%);
  border-color: transparent; color: white;
  box-shadow: 0 4px 14px rgba(212,33,60,0.4);
}

.login-input-group { position: relative; margin-top: 18px; }
.login-input-label { display: block; color: rgba(255,255,255,0.5); font-size: 0.8rem; font-weight: 600; margin-bottom: 8px; }
.login-input {
  width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
  padding: 13px 16px 13px 46px; color: #fff; font-size: 0.95rem; transition: all 0.25s ease; box-sizing: border-box;
}
.login-input::placeholder { color: rgba(255,255,255,0.25); }
.login-input:focus { outline: none; border-color: #d4213c; box-shadow: 0 0 0 3px rgba(212,33,60,0.15); }
.login-input-icon { position: absolute; left: 15px; top: 41px; color: rgba(255,255,255,0.3); pointer-events: none; }
.login-toggle-pw { position: absolute; right: 14px; top: 39px; color: rgba(255,255,255,0.3); cursor: pointer; background: none; border: none; padding: 4px; transition: color 0.2s; }
.login-toggle-pw:hover { color: #d4213c; }

.login-remember-row { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; }
.login-checkbox-wrap { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.login-checkbox-wrap input[type="checkbox"] { accent-color: #d4213c; width: 17px; height: 17px; cursor: pointer; }
.login-checkbox-wrap span { color: rgba(255,255,255,0.5); font-size: 0.85rem; }
.login-forgot-link { color: #d4af37; font-size: 0.85rem; font-weight: 600; text-decoration: none; }
.login-forgot-link:hover { text-decoration: underline; }

.login-submit-btn {
  width: 100%; background: linear-gradient(135deg, #d4213c 0%, #ff6b35 100%);
  border: none; border-radius: 14px; color: white; font-weight: 700; font-size: 1rem; padding: 15px;
  cursor: pointer; box-shadow: 0 6px 20px rgba(212,33,60,0.35); transition: all 0.3s ease;
  display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 24px;
}
.login-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(212,33,60,0.5); }

.login-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); margin: 22px 0; }

.login-signup-text { color: rgba(255,255,255,0.4); font-size: 0.9rem; text-align: center; }
.login-signup-link { color: #d4af37; font-weight: 700; text-decoration: none; margin-left: 6px; }
.login-signup-link:hover { text-decoration: underline; }

.login-secure-badge { display: flex; align-items: center; justify-content: center; gap: 6px; color: rgba(255,255,255,0.3); font-size: 0.75rem; margin-top: 18px; }

@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse-dot { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }

@media (max-width: 900px) {
  .login-visual { display: none; }
  .login-form-side { padding: 32px 20px; }
}
`;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("customer");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password, selectedRole);
    if (!result.success) { alert(result.message); return; }
    if (result.user.role !== selectedRole) { alert(`Please login using the ${result.user.role} button.`); return; }
    switch (result.user.role) {
      case "customer": navigate("/"); break;
      case "company": navigate("/company/dashboard"); break;
      case "delivery": navigate("/delivery/dashboard"); break;
      case "admin": navigate("/admin/dashboard"); break;
      default: navigate("/");
    }
  };

  const roles = [
    { value: "customer", label: "Customer", icon: User },
    { value: "company", label: "Company", icon: Briefcase },
    { value: "delivery", label: "Delivery", icon: Bike },
  ];

  return (
    <>
      <style>{loginStyles}</style>
      <div className="login-page mt-20">
        {/* Visual side */}
        <div className="login-visual">
          <div className="login-visual-glow login-visual-glow-1" />
          <div className="login-visual-glow login-visual-glow-2" />
          <span className="login-ember" style={{ width: 14, height: 14, top: "20%", left: "70%", animationDuration: "11s" }} />
          <span className="login-ember" style={{ width: 9, height: 9, top: "55%", left: "85%", animationDelay: "1.5s", animationDuration: "13s" }} />
          <span className="login-ember" style={{ width: 20, height: 20, top: "72%", left: "60%", animationDelay: "2.5s", animationDuration: "12s" }} />

          <div className="relative z-10 flex items-center gap-2">
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
              Fresh cuts,<br />delivered with care.
            </h2>
            <p className="text-white/60 mt-4 max-w-sm">
              Premium quality chicken and authentic masalas, delivered fresh across Coimbatore.
            </p>
          </div>

          <div className="relative z-10 flex gap-8 text-white/70 text-sm">
            <div><span className="text-white font-bold text-xl block">500+</span>Customers</div>
            <div><span className="text-white font-bold text-xl block">50+</span>Products</div>
            <div><span className="text-white font-bold text-xl block">4.9★</span>Rating</div>
          </div>
        </div>

        {/* Form side */}
        <div className="login-form-side mt-10">
          <div className="login-form-wrap">
            <h1 className="login-title">
              Welcome <span className="accent">Back</span>
            </h1>
            <p className="login-subtitle">Sign in to your EatAndMeat account</p>

            <form className="mt-6" onSubmit={handleLogin}>
              {/* Role Selector */}
              <div className="flex gap-2 mb-2">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`login-role-btn ${selectedRole === role.value ? "active" : ""}`}
                  >
                    <role.icon size={15} />
                    {role.label}
                  </button>
                ))}
              </div>

              <div className="login-input-group">
                <label htmlFor="email" className="login-input-label">Email Address</label>
                <Mail size={18} className="login-input-icon" />
                <input
                  type="email"
                  name="email"
                  className="login-input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="login-input-group">
                <label htmlFor="password" className="login-input-label">Password</label>
                <Lock size={18} className="login-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="login-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ paddingRight: 46 }}
                />
                <button type="button" className="login-toggle-pw" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="login-remember-row">
                <label className="login-checkbox-wrap">
                  <input type="checkbox" id="remember" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="login-forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="login-submit-btn">
                <LogIn size={20} />
                Sign In
              </button>
            </form>

            <div className="login-divider"></div>

            <p className="login-signup-text">
              Don't have an account?
              <Link to="/register" className="login-signup-link">Sign Up</Link>
            </p>

            <div className="login-secure-badge">
              <Shield size={12} />
              Secured with 256-bit encryption
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

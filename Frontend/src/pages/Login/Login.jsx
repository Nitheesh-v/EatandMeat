import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, Flame, User, Briefcase, Bike, Crown, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("customer");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData.email, formData.password, selectedRole);
    setLoading(false);
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
    { value: "admin", label: "Admin", icon: Crown },
  ];

  return (
    <div className="eam-page">
      <div className="eam-card-glow" />

      <div className="eam-card">
        {/* Visual side */}
        <div className="eam-visual">
          <div className="eam-steam">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={`eam-wisp eam-wisp-${i}`} />
            ))}
          </div>

          <div className="eam-visual-inner">
            <div className="eam-brand">
              <div className="eam-brand-mark">
                <Flame size={18} color="#0F1613" strokeWidth={2.4} />
              </div>
              <span className="eam-brand-name">
                <span className="eam-brand-white">Eat</span>
                <span className="eam-brand-copper">And</span>
                <span className="eam-brand-teal">Meat</span>
              </span>
            </div>

            <h2 className="eam-headline">
              Fresh cuts,<br />delivered with care.
            </h2>
            <p className="eam-subcopy">
              Premium quality chicken and authentic masalas, delivered fresh across Coimbatore.
            </p>

            <div className="eam-seal">
              <ShieldCheck size={15} color="#8FD4BE" strokeWidth={2.2} />
              <span>Verified fresh, every order</span>
            </div>

            <div className="eam-stats">
              {[{ v: "500+", l: "Customers" }, { v: "50+", l: "Products" }, { v: "4.9★", l: "Rating" }].map((s) => (
                <div key={s.l} className="eam-stat">
                  <span className="eam-stat-v">{s.v}</span>
                  <span className="eam-stat-l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form side */}
        <div className="eam-form-side">
          <div className="eam-form-wrap">
            <h1 className="eam-title">
              Welcome <span className="eam-title-accent">Back</span>
            </h1>
            <p className="eam-tagline">Sign in to your account</p>

            <form onSubmit={handleLogin} className="eam-form">
              <div className="eam-role-tabs eam-wipe" style={{ "--d": "0s" }}>
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`eam-role-tab ${selectedRole === role.value ? "eam-role-tab-active" : ""}`}
                  >
                    <role.icon size={13} />
                    {role.label}
                  </button>
                ))}
              </div>

              <div className="eam-input-group eam-wipe" style={{ "--d": "0.07s" }}>
                <Mail size={16} className="eam-input-icon" />
                <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required className="eam-input" />
              </div>

              <div className="eam-input-group eam-wipe" style={{ "--d": "0.14s" }}>
                <Lock size={16} className="eam-input-icon" />
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="eam-input eam-input-pw" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="eam-eye" aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="eam-forgot eam-wipe" style={{ "--d": "0.2s" }}>
                <Link to="/forgot-password" className="eam-link">Forgot password?</Link>
              </div>

              <button type="submit" disabled={loading} className="eam-submit eam-wipe" style={{ "--d": "0.26s" }}>
                <LogIn size={18} />
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="eam-divider" />

            <p className="eam-footer-text">
              Don't have an account? <Link to="/register" className="eam-link eam-link-strong">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --eam-bg: #0F1613;
          --eam-bg-2: #1C2A24;
          --eam-copper: #C9723A;
          --eam-copper-deep: #A85A2A;
          --eam-teal: #3E9C72;
          --eam-teal-deep: #2C7A57;
          --eam-cream: #F7F1E6;
          --eam-ink: #201A14;
          --eam-muted: #8C7F70;
        }

        * { box-sizing: border-box; }

        .eam-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          background:
            radial-gradient(90% 60% at 15% 10%, rgba(201,114,58,0.12), transparent 60%),
            radial-gradient(80% 60% at 90% 90%, rgba(62,156,114,0.12), transparent 60%),
            var(--eam-bg);
          font-family: 'Manrope', 'Segoe UI', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .eam-card-glow {
          position: absolute;
          width: 900px; height: 480px;
          background: conic-gradient(from 0deg, var(--eam-copper), var(--eam-teal), var(--eam-copper-deep), var(--eam-teal-deep), var(--eam-copper));
          filter: blur(80px);
          opacity: 0.22;
          animation: eam-spin 14s linear infinite;
          pointer-events: none;
        }
        @keyframes eam-spin { to { transform: rotate(360deg); } }

        .eam-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 880px;
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          border-radius: 28px;
          overflow: hidden;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          box-shadow: 0 30px 80px rgba(0,0,0,0.55);
          backdrop-filter: blur(26px);
          animation: eam-card-in 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes eam-card-in {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .eam-visual {
          position: relative;
          padding: 44px 40px;
          background: linear-gradient(160deg, var(--eam-bg-2) 0%, #223A30 55%, #2A2119 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .eam-visual-inner { position: relative; z-index: 2; }

        .eam-steam { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
        .eam-wisp {
          position: absolute;
          bottom: -30px;
          width: 26px; height: 90px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(143,212,190,0.28), transparent 70%);
          filter: blur(6px);
          opacity: 0;
          animation: eam-drift 9s ease-in infinite;
        }
        .eam-wisp-0 { left: 10%; animation-delay: 0s; }
        .eam-wisp-1 { left: 26%; animation-delay: 1.6s; width: 20px; }
        .eam-wisp-2 { left: 44%; animation-delay: 3.2s; }
        .eam-wisp-3 { left: 60%; animation-delay: 0.8s; width: 18px; }
        .eam-wisp-4 { left: 76%; animation-delay: 4.4s; }
        .eam-wisp-5 { left: 90%; animation-delay: 2.4s; width: 22px; }
        @keyframes eam-drift {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          15% { opacity: 0.8; }
          50% { transform: translateY(-160px) translateX(18px) rotate(6deg); }
          100% { transform: translateY(-340px) translateX(-14px) rotate(-4deg); opacity: 0; }
        }

        .eam-brand { display: flex; align-items: center; gap: 9px; margin-bottom: 36px; }
        .eam-brand-mark {
          width: 34px; height: 34px; border-radius: 9px;
          background: linear-gradient(135deg, var(--eam-teal), var(--eam-copper));
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(201,114,58,0.4);
          animation: eam-mark-glow 3s ease-in-out infinite;
        }
        @keyframes eam-mark-glow {
          0%, 100% { box-shadow: 0 4px 14px rgba(201,114,58,0.35); }
          50% { box-shadow: 0 4px 22px rgba(62,156,114,0.5); }
        }
        .eam-brand-name { font-size: 1.2rem; font-weight: 800; letter-spacing: -0.01em; }
        .eam-brand-white { color: #fff; }
        .eam-brand-copper { color: var(--eam-copper); }
        .eam-brand-teal { color: var(--eam-teal); }

        .eam-headline {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 2rem; font-weight: 700; color: var(--eam-cream);
          line-height: 1.18; margin: 0 0 12px; letter-spacing: -0.01em;
        }
        .eam-subcopy { color: rgba(247,241,230,0.55); font-size: 0.9rem; max-width: 320px; line-height: 1.55; margin: 0 0 24px; }

        .eam-seal {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 14px; border-radius: 999px;
          background: rgba(62,156,114,0.12);
          border: 1px solid rgba(143,212,190,0.3);
          color: #B7E8D4; font-size: 0.74rem; font-weight: 600;
          margin-bottom: 28px; width: fit-content;
          animation: eam-breathe 3.2s ease-in-out infinite;
        }
        @keyframes eam-breathe {
          0%, 100% { box-shadow: 0 0 0 0 rgba(62,156,114,0); }
          50% { box-shadow: 0 0 16px 2px rgba(62,156,114,0.25); }
        }

        .eam-stats { display: flex; gap: 26px; }
        .eam-stat { display: flex; flex-direction: column; color: rgba(247,241,230,0.5); font-size: 0.78rem; }
        .eam-stat-v { color: #fff; font-weight: 800; font-size: 1.05rem; }

        .eam-form-side {
          background: var(--eam-cream);
          display: flex; align-items: center; justify-content: center;
          padding: 40px 36px;
        }
        .eam-form-wrap { width: 100%; max-width: 360px; }

        .eam-title { font-size: 1.4rem; font-weight: 800; color: var(--eam-ink); margin: 0 0 4px; letter-spacing: -0.01em; }
        .eam-title-accent { color: var(--eam-copper-deep); }
        .eam-tagline { color: var(--eam-muted); font-size: 0.85rem; margin: 0 0 22px; }

        .eam-wipe {
          animation: eam-wipe-in 0.55s cubic-bezier(0.16,1,0.3,1) both;
          animation-delay: var(--d, 0s);
        }
        @keyframes eam-wipe-in {
          from { opacity: 0; clip-path: inset(0 100% 0 0); transform: translateX(-6px); }
          to { opacity: 1; clip-path: inset(0 0 0 0); transform: translateX(0); }
        }

        .eam-role-tabs { display: flex; gap: 6px; margin-bottom: 18px; }
        .eam-role-tab {
          flex: 1; padding: 9px 4px; border-radius: 10px; font-size: 0.7rem; font-weight: 700;
          cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px;
          background: rgba(255,255,255,0.55); color: #7A6A5D;
          border: 1.5px solid rgba(32,26,20,0.1);
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          backdrop-filter: blur(6px);
        }
        .eam-role-tab:hover { border-color: rgba(62,156,114,0.4); color: var(--eam-teal-deep); transform: translateY(-1px); }
        .eam-role-tab-active {
          background: linear-gradient(135deg, var(--eam-teal), var(--eam-teal-deep));
          color: white; border-color: transparent;
          box-shadow: 0 6px 16px rgba(62,156,114,0.35);
          transform: translateY(-2px) scale(1.03);
        }

        .eam-input-group { position: relative; margin-bottom: 14px; }
        .eam-input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #A99A8E; pointer-events: none; }
        .eam-input {
          width: 100%; padding: 11px 14px 11px 42px; border-radius: 12px;
          border: 1.5px solid rgba(32,26,20,0.1); background: rgba(255,255,255,0.6);
          color: var(--eam-ink); font-size: 0.88rem; outline: none;
          backdrop-filter: blur(6px);
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .eam-input::placeholder { color: #B3A69B; }
        .eam-input:focus { border-color: var(--eam-teal); background: rgba(255,255,255,0.85); box-shadow: 0 0 0 4px rgba(62,156,114,0.15); }
        .eam-input-pw { padding-right: 42px; }

        .eam-eye {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; color: #A99A8E; padding: 4px;
          transition: color 0.2s;
        }
        .eam-eye:hover { color: var(--eam-copper-deep); }

        .eam-forgot { text-align: right; margin-bottom: 18px; }
        .eam-forgot .eam-link { font-size: 0.8rem; }

        .eam-link { color: var(--eam-copper-deep); font-weight: 700; text-decoration: none; }
        .eam-link:hover { text-decoration: underline; }
        .eam-link-strong { color: var(--eam-teal-deep); }

        .eam-submit {
          width: 100%; padding: 13px; border-radius: 12px; border: none;
          background: linear-gradient(100deg, var(--eam-copper) 0%, var(--eam-teal) 100%);
          background-size: 200% 100%;
          background-position: 0% 0%;
          color: white; font-weight: 700; font-size: 0.9rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 10px 24px rgba(201,114,58,0.28);
          transition: transform 0.25s, box-shadow 0.25s, background-position 0.5s ease;
        }
        .eam-submit:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 16px 32px rgba(62,156,114,0.35);
          background-position: 100% 0%;
        }
        .eam-submit:active:not(:disabled) { transform: translateY(0) scale(0.99); }
        .eam-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .eam-divider { height: 1px; background: rgba(32,26,20,0.08); margin: 20px 0; }
        .eam-footer-text { text-align: center; font-size: 0.85rem; color: var(--eam-muted); }

        @media (max-width: 860px) {
          .eam-card { grid-template-columns: 1fr; max-width: 420px; border-radius: 22px; }
          .eam-card-glow { width: 480px; height: 680px; }
          .eam-visual { padding: 30px 28px 26px; }
          .eam-headline { font-size: 1.5rem; }
          .eam-subcopy { display: none; }
          .eam-seal { margin-bottom: 18px; }
          .eam-stats { gap: 20px; }
          .eam-form-side { padding: 30px 26px 34px; }
        }

        @media (max-width: 400px) {
          .eam-stats { gap: 14px; }
          .eam-stat-v { font-size: 0.92rem; }
          .eam-role-tab { font-size: 0.62rem; padding: 8px 2px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .eam-card-glow, .eam-wisp, .eam-brand-mark, .eam-seal, .eam-card, .eam-wipe, .eam-submit, .eam-role-tab-active { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Login;

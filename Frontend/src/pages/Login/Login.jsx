import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, Shield, Flame, User, Briefcase, Bike, Crown } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const primary = "#B4232C";
const gold = "#C9A227";
const deep = "#24140F";
const cream = "#FAF7F2";
const text = "#30231E";

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

  const inputStyle = {
    width: "100%", background: "#FFFFFF", border: "1px solid #E2E8F0",
    borderRadius: 10, padding: "11px 14px 11px 42px", color: text,
    fontSize: "0.9rem", boxSizing: "border-box", outline: "none",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: cream }}>
      {/* Visual side */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 48px", position: "relative", overflow: "hidden",
        background: `linear-gradient(150deg, ${deep} 0%, #3D1A1A 40%, #4A1F1F 100%)`,
      }} className="login-visual">
        <div style={{ position: "absolute", width: 400, height: 400, top: -100, left: -100, borderRadius: "50%", background: `radial-gradient(circle, rgba(180,35,44,0.2), transparent 70%)`, filter: "blur(60px)" }} />
        <div style={{ position: "absolute", width: 300, height: 300, bottom: -80, right: -80, borderRadius: "50%", background: `radial-gradient(circle, rgba(201,162,39,0.15), transparent 70%)`, filter: "blur(50px)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Flame size={20} color="white" />
            </div>
            <span style={{ fontSize: "1.25rem", fontWeight: 800 }}>
              <span style={{ color: "#fff" }}>Eat</span><span style={{ color: primary }}>And</span><span style={{ color: gold }}>Meat</span>
            </span>
          </div>

          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2, margin: "0 0 12px", fontFamily: "'Fraunces', serif" }}>
            Fresh cuts,<br />delivered with care.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", maxWidth: 340, lineHeight: 1.5, margin: "0 0 32px" }}>
            Premium quality chicken and authentic masalas, delivered fresh across Coimbatore.
          </p>

          <div style={{ display: "flex", gap: 28 }}>
            {[{ v: "500+", l: "Customers" }, { v: "50+", l: "Products" }, { v: "4.9★", l: "Rating" }].map((s) => (
              <div key={s.l} style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>
                <span style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "1.1rem", display: "block" }}>{s.v}</span>{s.l}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form side */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: deep, margin: "0 0 4px" }}>
            Welcome <span style={{ color: primary }}>Back</span>
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "0.85rem", margin: "0 0 20px" }}>Sign in to your account</p>

          <form onSubmit={handleLogin}>
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {roles.map((role) => (
                <button key={role.value} type="button" onClick={() => setSelectedRole(role.value)} style={{
                  flex: 1, padding: "8px 6px", borderRadius: 8, fontSize: "0.72rem", fontWeight: 600,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  background: selectedRole === role.value ? primary : "#FFFFFF",
                  color: selectedRole === role.value ? "white" : "#64748B",
                  border: `1px solid ${selectedRole === role.value ? primary : "#E2E8F0"}`,
                  transition: "all 0.2s",
                }}>
                  <role.icon size={13} />
                  {role.label}
                </button>
              ))}
            </div>

            <div style={{ position: "relative", marginBottom: 14 }}>
              <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#CBD5E1" }} />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={inputStyle} />
            </div>

            <div style={{ position: "relative", marginBottom: 14 }}>
              <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#CBD5E1" }} />
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{ ...inputStyle, paddingRight: 42 }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#CBD5E1" }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "12px", borderRadius: 10, border: "none",
              background: primary, color: "white", fontWeight: 700, fontSize: "0.9rem",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              marginTop: 16, boxShadow: "0 4px 12px rgba(180,35,44,0.25)", transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#9A1D25"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = primary; }}
            >
              <LogIn size={18} />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div style={{ height: 1, background: "#F1F5F9", margin: "20px 0" }} />

          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#94A3B8" }}>
            Don't have an account? <Link to="/register" style={{ color: gold, fontWeight: 700, textDecoration: "none" }}>Sign Up</Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .login-visual { display: none !important; } }
      `}</style>
    </div>
  );
};

export default Login;

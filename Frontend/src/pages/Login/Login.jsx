import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, User, Briefcase, Bike, Crown } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("customer");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(formData.email, formData.password, selectedRole);
    setLoading(false);
    if (!result.success) { setError(result.message); return; }
    if (result.user.role !== selectedRole) { setError(`This account is registered as ${result.user.role}`); return; }
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
    <div style={{
      minHeight: "100vh", display: "flex",
      background: "linear-gradient(135deg, #24140F 0%, #1a0a0a 50%, #24140F 100%)",
    }}>
      {/* Left visual */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 48px", position: "relative", overflow: "hidden",
      }} className="login-visual">
        <div style={{ position: "absolute", width: 500, height: 500, top: -150, left: -150, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,35,44,0.15), transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", width: 400, height: 400, bottom: -100, right: -100, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,39,0.1), transparent 70%)", filter: "blur(60px)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #B4232C, #C9A227)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 20px rgba(180,35,44,0.4)",
            }}>
              <span style={{ fontSize: "1.2rem" }}>🔥</span>
            </div>
            <span style={{ fontSize: "1.5rem", fontWeight: 900, letterSpacing: "-0.03em" }}>
              <span style={{ color: "#fff" }}>Eat</span>
              <span style={{ color: "#B4232C" }}>And</span>
              <span style={{ color: "#C9A227" }}>Meat</span>
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff",
            lineHeight: 1.15, margin: "0 0 16px", fontFamily: "'Fraunces', serif",
          }}>
            Premium Fresh Meat,<br />
            <span style={{ color: "#C9A227" }}>Delivered to</span> Your Door.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", maxWidth: 400, lineHeight: 1.6, margin: "0 0 40px" }}>
            Farm-fresh chicken, authentic masalas, and premium combos — hygienically packed and delivered across Coimbatore.
          </p>

          <div style={{ display: "flex", gap: 32 }}>
            {[
              { num: "500+", label: "Happy Customers" },
              { num: "50+", label: "Fresh Products" },
              { num: "30min", label: "Avg Delivery" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#fff" }}>{s.num}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 24px",
      }}>
        <div style={{
          width: "100%", maxWidth: 420,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20, padding: "36px 32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>
            Welcome <span style={{ color: "#B4232C" }}>Back</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", margin: "0 0 24px" }}>
            Sign in to your account
          </p>

          {error && (
            <div style={{
              background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)",
              borderRadius: 10, padding: "10px 14px", marginBottom: 16,
              fontSize: "0.82rem", color: "#FCA5A5",
            }}>{error}</div>
          )}

          <form onSubmit={handleLogin}>
            {/* Role tabs */}
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {roles.map((role) => (
                <button key={role.value} type="button" onClick={() => setSelectedRole(role.value)} style={{
                  flex: 1, padding: "9px 6px", borderRadius: 10, fontSize: "0.72rem", fontWeight: 700,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  background: selectedRole === role.value ? "linear-gradient(135deg, #B4232C, #C9A227)" : "rgba(255,255,255,0.04)",
                  color: selectedRole === role.value ? "#fff" : "rgba(255,255,255,0.5)",
                  border: selectedRole === role.value ? "none" : "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.2s",
                  boxShadow: selectedRole === role.value ? "0 4px 12px rgba(180,35,44,0.3)" : "none",
                }}>
                  <role.icon size={13} />
                  {role.label}
                </button>
              ))}
            </div>

            {/* Email */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={{
                width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "12px 14px 12px 42px", color: "#fff", fontSize: "0.9rem",
                boxSizing: "border-box", outline: "none", transition: "all 0.2s",
              }}
                onFocus={(e) => { e.target.style.borderColor = "#B4232C"; e.target.style.boxShadow = "0 0 0 3px rgba(180,35,44,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {/* Password */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{
                width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "12px 42px 12px 42px", color: "#fff", fontSize: "0.9rem",
                boxSizing: "border-box", outline: "none", transition: "all 0.2s",
              }}
                onFocus={(e) => { e.target.style.borderColor = "#B4232C"; e.target.style.boxShadow = "0 0 0 3px rgba(180,35,44,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)",
              }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "13px", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #B4232C, #C9A227)", color: "#fff",
              fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              marginTop: 8, boxShadow: "0 4px 16px rgba(180,35,44,0.3)",
              transition: "all 0.2s", opacity: loading ? 0.6 : 1,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(180,35,44,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(180,35,44,0.3)"; }}
            >
              <LogIn size={18} />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "24px 0" }} />

          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#C9A227", fontWeight: 700, textDecoration: "none" }}>Sign Up</Link>
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

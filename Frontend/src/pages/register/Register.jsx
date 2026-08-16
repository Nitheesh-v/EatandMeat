import { Link, useNavigate } from "react-router-dom";
import { User, UserPlus, Mail, Lock, Phone, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "", phone: "", email: "", password: "", confirmPassword: "", role: "customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const getPasswordStrength = (pw) => {
    if (!pw) return { level: 0, label: "", color: "transparent" };
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    const l = [{ label: "Weak", color: "#EF4444" }, { label: "Fair", color: "#F59E0B" }, { label: "Good", color: "#3B82F6" }, { label: "Strong", color: "#10B981" }];
    return { level: s, ...l[Math.min(s - 1, 3)] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { setError("Passwords do not match"); return; }
    const result = await register({
      fullName: formData.fullName, phone: formData.phone, email: formData.email,
      password: formData.password, role: formData.role,
    });
    if (!result.success) { setError(result.message); return; }
    alert("Registration Successful! Please login.");
    navigate("/login", { replace: true });
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, padding: "11px 14px 11px 42px", color: "#fff",
    fontSize: "0.9rem", boxSizing: "border-box", outline: "none", transition: "all 0.2s",
  };

  const focusStyle = (e) => { e.target.style.borderColor = "#B4232C"; e.target.style.boxShadow = "0 0 0 3px rgba(180,35,44,0.12)"; };
  const blurStyle = (e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      background: "linear-gradient(135deg, #24140F 0%, #1a0a0a 50%, #24140F 100%)",
    }}>
      {/* Left visual */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 48px", position: "relative", overflow: "hidden",
      }} className="reg-visual">
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
            Join the<br />
            <span style={{ color: "#C9A227" }}>EatAndMeat</span> Family.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", maxWidth: 400, lineHeight: 1.6, margin: "0 0 40px" }}>
            Create your account for faster checkout, order tracking, exclusive offers, and more.
          </p>

          <div style={{ display: "flex", gap: 32 }}>
            {[
              { num: "500+", label: "Happy Customers" },
              { num: "50+", label: "Fresh Products" },
              { num: "4.9★", label: "Rating" },
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
          width: "100%", maxWidth: 440,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20, padding: "36px 32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>
            Join <span style={{ color: "#B4232C" }}>EatAndMeat</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", margin: "0 0 20px" }}>
            Create your account to get started
          </p>

          {error && (
            <div style={{
              background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)",
              borderRadius: 10, padding: "10px 14px", marginBottom: 16,
              fontSize: "0.82rem", color: "#FCA5A5",
            }}>{error}</div>
          )}

          <form onSubmit={handleRegister}>
            {/* Role */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Register As</label>
              <select name="role" value={formData.role} onChange={handleChange} style={{
                ...inputStyle, appearance: "none", paddingLeft: 14, cursor: "pointer",
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
              }}>
                <option value="customer" style={{ background: "#1a0a0a" }}>🛒 Customer</option>
                <option value="company" style={{ background: "#1a0a0a" }}>🏢 Company</option>
                <option value="delivery" style={{ background: "#1a0a0a" }}>🚴 Delivery Partner</option>
              </select>
            </div>

            {/* Full Name */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <User size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", zIndex: 1 }} />
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>

            {/* Phone */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <Phone size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", zIndex: 1 }} />
              <input type="tel" name="phone" placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>

            {/* Email */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", zIndex: 1 }} />
              <input type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>

            {/* Password */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", zIndex: 1 }} />
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{ ...inputStyle, paddingRight: 42 }} onFocus={focusStyle} onBlur={blurStyle} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)" }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {formData.password && (
                <div style={{ marginTop: 6 }}>
                  <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 2, width: `${(passwordStrength.level / 4) * 100}%`, background: passwordStrength.color, transition: "width 0.3s" }} />
                  </div>
                  <p style={{ fontSize: "0.65rem", marginTop: 3, fontWeight: 600, color: passwordStrength.color }}>{passwordStrength.label}</p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", zIndex: 1 }} />
              <input type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required style={{ ...inputStyle, paddingRight: 42 }} onFocus={focusStyle} onBlur={blurStyle} />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)" }}>
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {formData.confirmPassword && (
                <p style={{ fontSize: "0.68rem", marginTop: 4, fontWeight: 600, color: formData.password === formData.confirmPassword ? "#10B981" : "#EF4444" }}>
                  {formData.password === formData.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            {/* Terms */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 16 }}>
              <input type="checkbox" id="terms" required style={{ accentColor: "#B4232C", width: 16, height: 16, marginTop: 2, cursor: "pointer" }} />
              <label htmlFor="terms" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", lineHeight: 1.5 }}>
                I accept the <a href="#" style={{ color: "#C9A227", fontWeight: 600, textDecoration: "none" }}>Terms</a> & <a href="#" style={{ color: "#C9A227", fontWeight: 600, textDecoration: "none" }}>Privacy Policy</a>
              </label>
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "13px", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #B4232C, #C9A227)", color: "#fff",
              fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: "0 4px 16px rgba(180,35,44,0.3)", transition: "all 0.2s",
              opacity: loading ? 0.6 : 1,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <UserPlus size={18} />
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "24px 0" }} />

          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#C9A227", fontWeight: 700, textDecoration: "none" }}>Sign In</Link>
          </p>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .reg-visual { display: none !important; } }`}</style>
    </div>
  );
};

export default Register;

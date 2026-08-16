import { Link, useNavigate } from "react-router-dom";
import { User, UserPlus, Mail, Lock, Phone, Eye, EyeOff, Shield, Flame } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const primary = "#B4232C";
const gold = "#C9A227";
const deep = "#24140F";
const cream = "#FAF7F2";
const text = "#30231E";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "", phone: "", email: "", password: "", confirmPassword: "", role: "customer",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, label: "", color: "transparent" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const levels = [
      { label: "Weak", color: "#EF4444" },
      { label: "Fair", color: "#F59E0B" },
      { label: "Good", color: "#3B82F6" },
      { label: "Strong", color: "#10B981" },
    ];
    return { level: score, ...levels[Math.min(score - 1, 3)] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { alert("Passwords do not match"); return; }
    const result = await register({
      fullName: formData.fullName, phone: formData.phone, email: formData.email,
      password: formData.password, role: formData.role,
    });
    if (!result.success) { alert(result.message); return; }
    alert("Registration Successful");
    navigate("/login", { replace: true });
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.5)", border: "1px solid #E2E8F0",
    borderRadius: 10, padding: "11px 14px 11px 42px", color: text,
    fontSize: "0.9rem", boxSizing: "border-box", outline: "none",
    backdropFilter: "blur(10px)",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      {/* Visual side */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 48px", position: "relative", overflow: "hidden",
        background: `linear-gradient(150deg, ${deep} 0%, #3D1A1A 40%, #4A1F1F 100%)`,
      }} className="reg-visual">
        <div style={{ position: "absolute", width: 400, height: 400, top: -100, left: -100, borderRadius: "50%", background: `radial-gradient(circle, rgba(180,35,44,0.2), transparent 70%)`, filter: "blur(60px)" }} />
        <div style={{ position: "absolute", width: 300, height: 300, bottom: -80, right: -80, borderRadius: "50%", background: `radial-gradient(circle, rgba(201,162,39,0.15), transparent 70%)`, filter: "blur(50px)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg, ${primary}, ${gold})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Flame size={20} color="white" />
            </div>
            <span style={{ fontSize: "1.25rem", fontWeight: 800 }}>
              <span style={{ color: "#fff" }}>Eat</span><span style={{ color: primary }}>And</span><span style={{ color: gold }}>Meat</span>
            </span>
          </div>

          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2, margin: "0 0 12px", fontFamily: "'Fraunces', serif" }}>
            Join the<br />EatAndMeat family.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", maxWidth: 340, lineHeight: 1.5, margin: "0 0 32px" }}>
            Create an account for faster checkout, order tracking, and exclusive offers.
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
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 24px", background: cream,
      }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: deep, margin: "0 0 4px" }}>
            Join <span style={{ color: primary }}>EatAndMeat</span>
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "0.85rem", margin: "0 0 20px" }}>Create your account to get started</p>

          <form onSubmit={handleRegister}>
            {/* Role */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Register As</label>
              <select name="role" value={formData.role} onChange={handleChange} style={{
                ...inputStyle, appearance: "none", cursor: "pointer", paddingLeft: 14,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
              }}>
                <option value="customer">🛒 Customer</option>
                <option value="company">🏢 Company</option>
                <option value="delivery">🚴 Delivery Partner</option>
              </select>
            </div>

            {/* Full Name */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <User size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", zIndex: 1 }} />
              <input type="text" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required style={inputStyle} />
            </div>

            {/* Phone */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <Phone size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", zIndex: 1 }} />
              <input type="tel" name="phone" placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} required style={inputStyle} />
            </div>

            {/* Email */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", zIndex: 1 }} />
              <input type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required style={inputStyle} />
            </div>

            {/* Password */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", zIndex: 1 }} />
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{ ...inputStyle, paddingRight: 42 }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {formData.password && (
                <div style={{ marginTop: 6 }}>
                  <div style={{ height: 3, borderRadius: 2, background: "#E2E8F0", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 2, width: `${(passwordStrength.level / 4) * 100}%`, background: passwordStrength.color, transition: "width 0.3s" }} />
                  </div>
                  <p style={{ fontSize: "0.68rem", marginTop: 3, fontWeight: 600, color: passwordStrength.color }}>{passwordStrength.label}</p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", zIndex: 1 }} />
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required style={{ ...inputStyle, paddingRight: 42 }} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}>
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {formData.confirmPassword && (
                <p style={{ fontSize: "0.68rem", marginTop: 4, fontWeight: 600, color: formData.password === formData.confirmPassword ? "#10B981" : "#EF4444" }}>
                  {formData.password === formData.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            {/* Terms */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
              <input type="checkbox" id="terms" required style={{ accentColor: primary, width: 16, height: 16, marginTop: 2, cursor: "pointer" }} />
              <label htmlFor="terms" style={{ color: "#94A3B8", fontSize: "0.82rem", lineHeight: 1.5 }}>
                I accept the <a href="#" style={{ color: gold, fontWeight: 600, textDecoration: "none" }}>Terms and Conditions</a> & <a href="#" style={{ color: gold, fontWeight: 600, textDecoration: "none" }}>Privacy Policy</a>
              </label>
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "13px", borderRadius: 10, border: "none",
              background: `linear-gradient(135deg, ${primary}, ${gold})`, color: "white",
              fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: "0 4px 16px rgba(180,35,44,0.3)", transition: "all 0.2s",
              opacity: loading ? 0.6 : 1,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <UserPlus size={18} />
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div style={{ height: 1, background: "#E2E8F0", margin: "20px 0" }} />

          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#94A3B8" }}>
            Already have an account? <Link to="/login" style={{ color: gold, fontWeight: 700, textDecoration: "none" }}>Sign In</Link>
          </p>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .reg-visual { display: none !important; } }`}</style>
    </div>
  );
};

export default Register;

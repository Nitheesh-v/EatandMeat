import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, KeyRound, ArrowLeft, Eye, EyeOff, Flame, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { forgotPassword, resetPassword } from "../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = email, 2 = otp + new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otpFromServer, setOtpFromServer] = useState(""); // dev only

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await forgotPassword(email);
      if (res.success) {
        setMessage(res.message);
        if (res.otp) setOtpFromServer(res.otp); // dev only
        setStep(2);
      } else {
        setMessage(res.message || "Something went wrong");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await resetPassword(email, otp, newPassword);
      if (res.success) {
        setMessage(res.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(res.message || "Something went wrong");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eam-page mt-14">
      <div className="eam-card-glow" />

      <div className="eam-card" style={{ maxWidth: 520 }}>
        {/* Visual side */}
        <div className="eam-visual" style={{ minHeight: 480 }}>
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
              Reset your<br />password.
            </h2>
            <p className="eam-subcopy">
              {step === 1
                ? "Enter your registered email address and we'll send you a one-time password."
                : "Enter the OTP you received and set your new password."}
            </p>

            <div className="eam-seal">
              <ShieldCheck size={15} color="#8FD4BE" strokeWidth={2.2} />
              <span>Secure password reset</span>
            </div>

            {/* Step indicator */}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {["Verify Email", "Set Password"].map((label, i) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: step > i ? "rgba(62,156,114,0.15)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${step > i ? "rgba(143,212,190,0.3)" : "rgba(255,255,255,0.08)"}`,
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: step > i ? "#8FD4BE" : "rgba(247,241,230,0.4)",
                  }}
                >
                  {step > i ? <CheckCircle2 size={12} /> : <span style={{ width: 8, height: 8, borderRadius: "50%", border: "1.5px solid currentColor" }} />}
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form side */}
        <div className="eam-form-side">
          <div className="eam-form-wrap" style={{ maxWidth: 340 }}>
            <Link
              to="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "#8C7F70",
                fontSize: "0.8rem",
                fontWeight: 600,
                textDecoration: "none",
                marginBottom: 16,
              }}
            >
              <ArrowLeft size={14} /> Back to Login
            </Link>

            <h1 className="eam-title">
              {step === 1 ? "Forgot" : "Reset"} <span className="eam-title-accent">{step === 1 ? "Password" : "Password"}</span>
            </h1>
            <p className="eam-tagline">
              {step === 1 ? "We'll send you an OTP to reset it" : "Enter OTP and set your new password"}
            </p>

            {message && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  marginBottom: 16,
                  background: message.includes("success") || message.includes("sent") || message.includes("reset")
                    ? "rgba(62,156,114,0.1)"
                    : "rgba(228,87,61,0.1)",
                  color: message.includes("success") || message.includes("sent") || message.includes("reset")
                    ? "#2C7A57"
                    : "#E4573D",
                  border: `1px solid ${message.includes("success") || message.includes("sent") || message.includes("reset")
                    ? "rgba(62,156,114,0.25)"
                    : "rgba(228,87,61,0.25)"}`,
                }}
              >
                {message}
              </div>
            )}

            {/* Dev OTP hint */}
            {otpFromServer && step === 2 && (
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  marginBottom: 14,
                  background: "rgba(245,158,11,0.1)",
                  color: "#b45309",
                  border: "1px solid rgba(245,158,11,0.25)",
                }}
              >
                Dev mode — Your OTP: <strong>{otpFromServer}</strong>
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSendOTP}>
                <div className="eam-input-group">
                  <Mail size={16} className="eam-input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="eam-input"
                  />
                </div>

                <button type="submit" disabled={loading} className="eam-submit">
                  <Mail size={18} />
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword}>
                <div className="eam-input-group">
                  <KeyRound size={16} className="eam-input-icon" />
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    className="eam-input"
                    style={{ letterSpacing: 4, textAlign: "center", fontSize: "1.1rem", fontWeight: 700 }}
                  />
                </div>

                <div className="eam-input-group">
                  <Lock size={16} className="eam-input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New password (min 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    className="eam-input eam-input-pw"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="eam-eye">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <button type="submit" disabled={loading} className="eam-submit">
                  <Lock size={18} />
                  {loading ? "Resetting..." : "Reset Password"}
                </button>

                <div style={{ textAlign: "center", marginTop: 14 }}>
                  <button
                    type="button"
                    onClick={() => { setStep(1); setOtpFromServer(""); setMessage(""); }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#8C7F70",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Use a different email
                  </button>
                </div>
              </form>
            )}

            <div className="eam-divider" />
            <p className="eam-footer-text">
              Remember your password? <Link to="/login" className="eam-link eam-link-strong">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

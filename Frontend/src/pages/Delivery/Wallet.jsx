import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet as WalletIcon,
  TrendingUp,
  ArrowDownLeft,
  Clock,
  IndianRupee,
  ArrowRight,
  Send,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  getWallet,
  requestWithdrawal,
  getMyWithdrawals,
} from "../../services/withdrawalService";

const c = { plum: "#5B3A57", rose: "#D9829B", champagne: "#D6B77A", bg: "#FCF8FA", text: "#352832", textSec: "#8B7585" };

const statusColors = {
  Pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
  Approved: { color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)" },
  Paid: { color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" },
  Rejected: { color: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)" },
};

export const Wallet = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ amount: "", method: "UPI", upiId: "" });

  const loadData = async () => {
    try {
      const [walletRes, withdrawRes] = await Promise.all([getWallet(), getMyWithdrawals()]);
      if (walletRes.success) setWallet(walletRes.wallet);
      if (withdrawRes.success) setWithdrawals(withdrawRes.withdrawals || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) < 1) return alert("Enter a valid amount");
    if (form.method === "UPI" && !form.upiId) return alert("Enter your UPI ID");
    setSubmitting(true);
    try {
      const res = await requestWithdrawal({ amount: Number(form.amount), method: form.method, upiId: form.upiId });
      if (res.success) {
        alert("Withdrawal request submitted!");
        setShowForm(false);
        setForm({ amount: "", method: "UPI", upiId: "" });
        loadData();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting request");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, color: c.textSec }}>
        Loading...
      </div>
    );
  }

  const cards = [
    { title: "Total Earned", value: `₹${wallet?.totalEarned || 0}`, icon: TrendingUp, color: c.plum, bg: "rgba(91,58,87,0.08)" },
    { title: "Available Balance", value: `₹${wallet?.availableBalance || 0}`, icon: WalletIcon, color: "#10b981", bg: "rgba(16,185,129,0.08)" },
    { title: "Withdrawn", value: `₹${wallet?.totalWithdrawn || 0}`, icon: ArrowDownLeft, color: "#3b82f6", bg: "rgba(59,130,246,0.08)" },
    { title: "Pending", value: `₹${wallet?.pendingWithdrawal || 0}`, icon: Clock, color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: c.text, margin: 0 }}>Wallet & Payments</h1>
          <p style={{ fontSize: "0.82rem", color: c.textSec, margin: "2px 0 0" }}>Manage your earnings and withdrawals</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          disabled={!wallet?.availableBalance || wallet.availableBalance < 1}
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 10,
            fontSize: "0.8rem", fontWeight: 700, border: "none", cursor: "pointer",
            background: wallet?.availableBalance > 0
              ? `linear-gradient(135deg, ${c.plum}, ${c.rose})`
              : "rgba(91,58,87,0.08)",
            color: wallet?.availableBalance > 0 ? "white" : c.textSec,
            boxShadow: wallet?.availableBalance > 0 ? "0 4px 15px rgba(91,58,87,0.25)" : "none",
          }}
        >
          <Send size={14} /> Withdraw Money
        </button>
      </div>

      {/* Wallet Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 14, marginBottom: 20 }}>
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} style={{
              background: "white", borderRadius: 12, border: "1px solid rgba(91,58,87,0.08)",
              overflow: "hidden", transition: "all 0.15s",
            }}>
              <div style={{ height: 3, background: card.color }} />
              <div style={{ padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "0.72rem", fontWeight: 600, color: c.textSec, margin: 0 }}>{card.title}</p>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: c.text, margin: "4px 0 0" }}>{card.value}</h2>
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: card.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={17} style={{ color: card.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Withdrawal Form */}
      {showForm && (
        <div style={{
          background: "white", borderRadius: 14, border: "1px solid rgba(91,58,87,0.1)",
          overflow: "hidden", marginBottom: 20,
        }}>
          <div style={{ height: 3, background: `linear-gradient(90deg, ${c.plum}, ${c.rose})` }} />
          <form onSubmit={handleSubmit} style={{ padding: 20 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: c.text, margin: "0 0 16px" }}>Request Withdrawal</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 6 }}>
                  Amount (₹) — Max: ₹{wallet?.availableBalance || 0}
                </label>
                <input
                  type="number" min="1" max={wallet?.availableBalance || 0} required
                  placeholder="Enter amount"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  style={{
                    width: "100%", padding: "11px 14px", borderRadius: 10,
                    border: "1.5px solid rgba(91,58,87,0.12)", fontSize: "0.85rem", color: c.text,
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 6 }}>
                  Withdrawal Method
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  {["UPI", "Bank Transfer"].map((m) => (
                    <button key={m} type="button"
                      onClick={() => setForm({ ...form, method: m })}
                      style={{
                        flex: 1, padding: "10px", borderRadius: 10, fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                        border: form.method === m ? "none" : "1.5px solid rgba(91,58,87,0.12)",
                        background: form.method === m ? `linear-gradient(135deg, ${c.plum}, ${c.rose})` : "white",
                        color: form.method === m ? "white" : c.textSec,
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {form.method === "UPI" && (
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 6 }}>UPI ID</label>
                  <input
                    type="text" required placeholder="yourname@upi"
                    value={form.upiId}
                    onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                    style={{
                      width: "100%", padding: "11px 14px", borderRadius: 10,
                      border: "1.5px solid rgba(91,58,87,0.12)", fontSize: "0.85rem", color: c.text, outline: "none",
                    }}
                  />
                </div>
              )}

              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => setShowForm(false)}
                  style={{
                    flex: 1, padding: "11px", borderRadius: 10, fontSize: "0.85rem", fontWeight: 600,
                    border: "1px solid rgba(91,58,87,0.15)", background: "white", color: c.textSec, cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  style={{
                    flex: 1, padding: "11px", borderRadius: 10, fontSize: "0.85rem", fontWeight: 700,
                    border: "none", background: `linear-gradient(135deg, ${c.plum}, ${c.rose})`,
                    color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  <Send size={14} /> {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Withdrawal History */}
      <div style={{
        background: "white", borderRadius: 14, border: "1px solid rgba(91,58,87,0.1)", overflow: "hidden",
      }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${c.plum}, ${c.rose})` }} />
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(91,58,87,0.06)" }}>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: c.text, margin: 0 }}>Withdrawal History</h2>
        </div>

        {withdrawals.length === 0 ? (
          <p style={{ textAlign: "center", padding: 32, color: c.textSec, fontSize: "0.85rem" }}>No withdrawals yet</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Date", "Amount", "Method", "Status", "Note"].map((h) => (
                    <th key={h} style={{
                      textAlign: "left", padding: "10px 16px", fontSize: "0.68rem", fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: "0.04em", color: c.textSec,
                      background: c.bg, borderBottom: "1px solid rgba(91,58,87,0.06)",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => {
                  const sc = statusColors[w.status] || statusColors.Pending;
                  return (
                    <tr key={w._id} style={{ borderBottom: "1px solid rgba(91,58,87,0.04)" }}>
                      <td style={{ padding: "10px 16px", fontSize: "0.82rem", color: c.textSec }}>
                        {new Date(w.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.85rem", color: c.plum }}>₹{w.amount}</span>
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <span style={{
                          fontSize: "0.7rem", fontWeight: 600, padding: "3px 8px", borderRadius: 6,
                          background: w.method === "UPI" ? "rgba(59,130,246,0.08)" : "rgba(91,58,87,0.06)",
                          color: w.method === "UPI" ? "#3b82f6" : c.plum,
                        }}>
                          {w.method}
                        </span>
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <span style={{
                          fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: 6,
                          background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                          display: "inline-flex", alignItems: "center", gap: 4,
                        }}>
                          {w.status === "Paid" && <CheckCircle2 size={10} />}
                          {w.status === "Rejected" && <XCircle size={10} />}
                          {w.status === "Pending" && <Clock size={10} />}
                          {w.status}
                        </span>
                      </td>
                      <td style={{ padding: "10px 16px", fontSize: "0.78rem", color: c.textSec }}>
                        {w.adminNote || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;

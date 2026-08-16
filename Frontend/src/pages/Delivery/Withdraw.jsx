import { useState, useEffect } from "react";
import {
  getWallet,
  requestWithdrawal,
  getMyWithdrawals,
} from "../../services/withdrawalService";
import {
  Wallet,
  IndianRupee,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  CreditCard,
  Send,
  TrendingUp,
} from "lucide-react";

const Withdraw = () => {
  const [wallet, setWallet] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    method: "UPI",
    upiId: "",
  });

  const loadData = async () => {
    try {
      const [walletRes, withdrawRes] = await Promise.all([
        getWallet(),
        getMyWithdrawals(),
      ]);
      if (walletRes.success) setWallet(walletRes.wallet);
      if (withdrawRes.success) setWithdrawals(withdrawRes.withdrawals || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) < 1) {
      alert("Enter a valid amount");
      return;
    }
    if (form.method === "UPI" && !form.upiId) {
      alert("Enter your UPI ID");
      return;
    }
    setSubmitting(true);
    try {
      const res = await requestWithdrawal({
        amount: Number(form.amount),
        method: form.method,
        upiId: form.upiId,
      });
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

  const statusColors = {
    Pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)" },
    Approved: { color: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.25)" },
    Paid: { color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.25)" },
    Rejected: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.25)" },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 rounded-full border-3 border-purple-200 border-t-purple-600 animate-spin" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Earned",
      value: `₹${wallet?.totalEarned || 0}`,
      icon: TrendingUp,
      accent: "#5B3A57",
      bg: "rgba(91,58,87,0.08)",
    },
    {
      title: "Available Balance",
      value: `₹${wallet?.availableBalance || 0}`,
      icon: Wallet,
      accent: "#10b981",
      bg: "rgba(16,185,129,0.08)",
    },
    {
      title: "Withdrawn",
      value: `₹${wallet?.totalWithdrawn || 0}`,
      icon: ArrowDownLeft,
      accent: "#3b82f6",
      bg: "rgba(59,130,246,0.08)",
    },
    {
      title: "Pending",
      value: `₹${wallet?.pendingWithdrawal || 0}`,
      icon: Clock,
      accent: "#f59e0b",
      bg: "rgba(245,158,11,0.08)",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "#352832" }}>
            Wallet & Withdraw
          </h1>
          <p className="text-sm mt-1" style={{ color: "#8B7585" }}>
            Manage your earnings and withdrawals
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          disabled={!wallet?.availableBalance || wallet.availableBalance < 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
          style={{
            background:
              wallet?.availableBalance > 0
                ? "linear-gradient(135deg, #5B3A57, #D9829B)"
                : "rgba(255,255,255,0.05)",
            color: wallet?.availableBalance > 0 ? "white" : "#8B7585",
            boxShadow:
              wallet?.availableBalance > 0
                ? "0 4px 20px rgba(91,58,87,0.35)"
                : "none",
            border:
              wallet?.availableBalance > 0
                ? "none"
                : "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <Send size={16} />
          Withdraw Money
        </button>
      </div>

      {/* Wallet Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="relative rounded-2xl overflow-hidden transition-all duration-500 group"
            style={{
              background:
                "linear-gradient(135deg, rgba(91,58,87,0.03) 0%, rgba(91,58,87,0.01) 100%)",
              border: "1px solid rgba(91,58,87,0.1)",
              backdropFilter: "blur(20px)",
              animation: `fadeSlideUp 0.5s ease ${i * 0.1}s both`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 12px 40px ${card.glow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div className="h-1" style={{ background: card.gradient }} />
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium mb-2" style={{ color: "#8B7585" }}>
                  {card.title}
                </p>
                <h2 className="text-2xl font-extrabold" style={{ color: "#352832" }}>
                  {card.value}
                </h2>
              </div>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: card.gradient,
                  boxShadow: `0 8px 24px ${card.glow}`,
                }}
              >
                <card.icon size={22} color="white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Withdrawal Form */}
      {showForm && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(91,58,87,0.03) 0%, rgba(91,58,87,0.01) 100%)",
            border: "1px solid rgba(91,58,87,0.15)",
            backdropFilter: "blur(20px)",
            animation: "fadeSlideUp 0.3s ease",
          }}
        >
          <div className="h-1" style={{ background: "linear-gradient(90deg, #5B3A57, #D9829B)" }} />
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <h2 className="font-extrabold text-lg" style={{ color: "#352832" }}>
              Request Withdrawal
            </h2>

            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "#6B5A65" }}>
                Amount (₹) — Max: ₹{wallet?.availableBalance || 0}
              </label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="Enter amount"
                min="1"
                max={wallet?.availableBalance || 0}
                required
                className="w-full rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: "rgba(91,58,87,0.03)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  color: "#352832",
                  padding: "12px 16px",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#5B3A57";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,58,87,0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "#6B5A65" }}>
                Withdrawal Method
              </label>
              <div className="flex gap-3">
                {["UPI", "Bank Transfer"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setForm({ ...form, method: m })}
                    className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
                    style={{
                      background:
                        form.method === m
                          ? "linear-gradient(135deg, #5B3A57, #D9829B)"
                          : "rgba(91,58,87,0.03)",
                      color: form.method === m ? "white" : "#6B5A65",
                      border:
                        form.method === m
                          ? "none"
                          : "1px solid rgba(0,0,0,0.08)",
                      boxShadow:
                        form.method === m ? "0 4px 15px rgba(91,58,87,0.3)" : "none",
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {form.method === "UPI" && (
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#6B5A65" }}>
                  UPI ID
                </label>
                <input
                  type="text"
                  value={form.upiId}
                  onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                  placeholder="yourname@upi"
                  required
                  className="w-full rounded-xl text-sm font-medium transition-all duration-300"
                  style={{
                    background: "rgba(91,58,87,0.03)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    color: "#352832",
                    padding: "12px 16px",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#5B3A57";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,58,87,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 rounded-xl text-sm font-bold cursor-pointer"
                style={{
                  background: "rgba(91,58,87,0.03)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  color: "#6B5A65",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3 rounded-xl text-sm font-bold cursor-pointer flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #5B3A57, #D9829B)",
                  color: "white",
                  boxShadow: "0 4px 15px rgba(91,58,87,0.35)",
                }}
              >
                <Send size={16} />
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Withdrawal History */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(91,58,87,0.03) 0%, rgba(91,58,87,0.01) 100%)",
          border: "1px solid rgba(91,58,87,0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="h-1" style={{ background: "linear-gradient(90deg, #5B3A57, #D9829B)" }} />
        <div className="p-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <h2 className="font-extrabold text-xl" style={{ color: "#352832" }}>
            Withdrawal History
          </h2>
          <p className="text-xs mt-1" style={{ color: "#8B7585" }}>
            Your withdrawal requests and their status
          </p>
        </div>

        {withdrawals.length === 0 ? (
          <p className="text-center py-8" style={{ color: "#8B7585" }}>
            No withdrawals yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  {["Date", "Amount", "Method", "Status", "Note"].map((h) => (
                    <th
                      key={h}
                      className="p-4 text-left text-xs font-bold uppercase tracking-wider"
                      style={{ color: "#8B7585" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => {
                  const sc = statusColors[w.status] || statusColors.Pending;
                  return (
                    <tr
                      key={w._id}
                      className="transition-all duration-300"
                      style={{ borderTop: "1px solid rgba(91,58,87,0.03)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(91,58,87,0.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <td className="p-4 text-sm" style={{ color: "#475569" }}>
                        {new Date(w.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="p-4">
                        <span className="font-extrabold text-sm" style={{ color: "#7B5A77" }}>
                          ₹{w.amount}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{
                            background: w.method === "UPI" ? "rgba(59,130,246,0.12)" : "rgba(91,58,87,0.12)",
                            color: w.method === "UPI" ? "#60a5fa" : "#7B5A77",
                            border: `1px solid ${w.method === "UPI" ? "rgba(59,130,246,0.25)" : "rgba(91,58,87,0.25)"}`,
                          }}
                        >
                          {w.method}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className="text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5"
                          style={{
                            background: sc.bg,
                            color: sc.color,
                            border: `1px solid ${sc.border}`,
                          }}
                        >
                          {w.status === "Paid" && <CheckCircle2 size={10} />}
                          {w.status === "Rejected" && <XCircle size={10} />}
                          {w.status === "Pending" && <Clock size={10} />}
                          {w.status}
                        </span>
                      </td>
                      <td className="p-4 text-xs" style={{ color: "#8B7585" }}>
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

export default Withdraw;

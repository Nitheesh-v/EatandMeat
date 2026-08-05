import {
  IndianRupee,
  Wallet,
  CalendarDays,
  CircleDollarSign,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Flame,
} from "lucide-react";
import { useState } from "react";

const cards = [
  {
    title: "Today's Earnings",
    amount: "₹840",
    icon: IndianRupee,
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
    glow: "rgba(16,185,129,0.4)",
    change: "+12%",
    positive: true,
  },
  {
    title: "This Week",
    amount: "₹5,620",
    icon: Wallet,
    gradient: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    glow: "rgba(59,130,246,0.4)",
    change: "+8%",
    positive: true,
  },
  {
    title: "This Month",
    amount: "₹24,830",
    icon: CalendarDays,
    gradient: "linear-gradient(135deg, #d4af37, #f6e3a1)",
    glow: "rgba(212,175,55,0.4)",
    change: "+23%",
    positive: true,
  },
  {
    title: "Bonus Earned",
    amount: "₹2,000",
    icon: CircleDollarSign,
    gradient: "linear-gradient(135deg, #d4213c, #ff6b35)",
    glow: "rgba(212,33,60,0.4)",
    change: "+5%",
    positive: true,
  },
];

const history = [
  { id: "#SET1001", date: "02 Aug 2026", orders: 12, amount: "₹840", status: "Paid", method: "UPI" },
  { id: "#SET1002", date: "01 Aug 2026", orders: 10, amount: "₹720", status: "Paid", method: "Bank" },
  { id: "#SET1003", date: "31 Jul 2026", orders: 8, amount: "₹560", status: "Pending", method: "UPI" },
  { id: "#SET1004", date: "30 Jul 2026", orders: 15, amount: "₹1,050", status: "Paid", method: "Bank" },
  { id: "#SET1005", date: "29 Jul 2026", orders: 11, amount: "₹770", status: "Paid", method: "UPI" },
];

export const Earnings = () => {
  const [filter, setFilter] = useState("All");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #d4213c 0%, #ff6b35 100%)",
              boxShadow: "0 4px 15px rgba(212,33,60,0.4)",
            }}
          >
            <Flame size={20} color="white" />
          </div>
          <div>
            <h1
              className="text-3xl font-extrabold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #e0d0d0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Earnings
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Track your delivery income and payouts
            </p>
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #d4213c, #96101f)",
            color: "white",
            boxShadow: "0 4px 20px rgba(212,33,60,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,33,60,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,33,60,0.4)";
          }}
        >
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* Earning Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="relative rounded-2xl overflow-hidden transition-all duration-500 group"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              animation: `fadeSlideUp 0.5s ease ${i * 0.1}s both`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${card.gradient.includes("10b981") ? "#10b981" : card.gradient.includes("d4af37") ? "#d4af37" : card.gradient.includes("3b82f6") ? "#3b82f6" : "#d4213c"}60`;
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 12px 40px ${card.glow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
            }}
          >
            <div className="h-1" style={{ background: card.gradient }} />
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {card.title}
                </p>
                <h2 className="text-3xl font-extrabold" style={{ color: "#fff" }}>
                  {card.amount}
                </h2>
                <div className="flex items-center gap-1 mt-2">
                  {card.positive ? <ArrowUpRight size={12} style={{ color: "#10b981" }} /> : <ArrowDownLeft size={12} style={{ color: "#ef4444" }} />}
                  <span className="text-[10px] font-bold" style={{ color: card.positive ? "#10b981" : "#ef4444" }}>
                    {card.change} from last period
                  </span>
                </div>
              </div>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: card.gradient,
                  boxShadow: `0 8px 24px ${card.glow}`,
                }}
              >
                <card.icon size={24} color="white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Settlement History */}
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          animation: "fadeSlideUp 0.6s ease 0.5s both",
        }}
      >
        <div className="h-1" style={{ background: "linear-gradient(90deg, #d4af37, #f6e3a1)" }} />

        {/* Header */}
        <div className="p-5 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <h2 className="font-extrabold text-xl" style={{ color: "#fff" }}>
              Settlement History
            </h2>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              Your payout records
            </p>
          </div>
          <div className="flex gap-2">
            {["All", "Paid", "Pending"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer"
                style={{
                  background: filter === f
                    ? "linear-gradient(135deg, #d4213c, #96101f)"
                    : "rgba(255,255,255,0.05)",
                  color: filter === f ? "white" : "rgba(255,255,255,0.5)",
                  border: filter === f ? "none" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                {["Settlement ID", "Date", "Orders", "Amount", "Method", "Status"].map((h) => (
                  <th
                    key={h}
                    className="p-4 text-left text-xs font-bold uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history
                .filter((item) => filter === "All" || item.status === filter)
                .map((item, i) => (
                  <tr
                    key={item.id}
                    className="transition-all duration-300"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.04)",
                      animation: `fadeSlideUp 0.3s ease ${i * 0.05}s both`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(212,175,55,0.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <td className="p-4">
                      <span
                        className="font-bold text-sm"
                        style={{
                          background: "linear-gradient(135deg, #d4af37, #f6e3a1)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {item.id}
                      </span>
                    </td>
                    <td className="p-4 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {item.date}
                    </td>
                    <td className="p-4">
                      <span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        {item.orders}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-extrabold text-sm" style={{ color: "#fff" }}>
                        {item.amount}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          background: item.method === "UPI" ? "rgba(59,130,246,0.15)" : "rgba(139,92,246,0.15)",
                          color: item.method === "UPI" ? "#60a5fa" : "#a78bfa",
                          border: `1px solid ${item.method === "UPI" ? "rgba(59,130,246,0.3)" : "rgba(139,92,246,0.3)"}`,
                        }}
                      >
                        {item.method}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5`}
                        style={{
                          background:
                            item.status === "Paid"
                              ? "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))"
                              : "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.05))",
                          color: item.status === "Paid" ? "#10b981" : "#fbbf24",
                          border: `1px solid ${item.status === "Paid" ? "rgba(16,185,129,0.3)" : "rgba(251,191,36,0.3)"}`,
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: item.status === "Paid" ? "#10b981" : "#fbbf24",
                            animation: item.status === "Pending" ? "pulse-dot 2s ease-in-out infinite" : "none",
                          }}
                        />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Footer summary */}
        <div
          className="p-5 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={16} style={{ color: "#10b981" }} />
            <span className="text-sm font-bold" style={{ color: "#10b981" }}>
              Total: ₹3,940
            </span>
          </div>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            Showing 5 of 5 settlements
          </span>
        </div>
      </div>
    </div>
  );
};

export default Earnings;

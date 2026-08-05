import {
  TrendingUp,
  IndianRupee,
  Wallet,
  Fuel,
  PiggyBank,
} from "lucide-react";

const cards = [
  { title: "Gross Earnings", amount: "₹24,830", icon: IndianRupee, chip: "mm-icon-gold", accent: "mm-accent-gold" },
  { title: "Fuel & Expenses", amount: "₹3,120", icon: Fuel, chip: "mm-icon-crimson", accent: "mm-accent-crimson" },
  { title: "Net Profit", amount: "₹21,710", icon: PiggyBank, chip: "mm-icon-green", accent: "mm-accent-green" },
  { title: "Bonus & Incentives", amount: "₹2,000", icon: Wallet, chip: "mm-icon-blue", accent: "mm-accent-blue" },
];

const breakdown = [
  { label: "Delivery Earnings", value: 82, color: "linear-gradient(90deg,#d4af37,#f6e3a1)" },
  { label: "Bonus & Incentives", value: 8, color: "linear-gradient(90deg,#3b82f6,#60a5fa)" },
  { label: "Fuel & Expenses", value: -13, color: "linear-gradient(90deg,#e23744,#b81f2b)" },
];

export const Profit = () => {
  return (
    <div className="space-y-8">
      <div className="mm-in mm-in-1">
        <h1 className="mm-display text-3xl text-[#2a1a12]">Profit Summary</h1>
        <p className="text-[#6b5b4f]">See how much you're actually taking home this month.</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className={`mm-glass-card mm-accent-card ${card.accent} mm-in mm-in-${Math.min(i + 2, 6)} p-6 flex justify-between items-center`}
          >
            <div>
              <p className="text-[#6b5b4f] text-sm">{card.title}</p>
              <h2 className="mm-display text-3xl text-[#2a1a12] mt-2">{card.amount}</h2>
            </div>
            <div className={`mm-icon-chip ${card.chip}`}>
              <card.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="mm-glass-card mm-accent-card mm-accent-green mm-in mm-in-4 p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={18} style={{ color: "#16a34a" }} />
          <h2 className="mm-display font-bold text-xl text-[#2a1a12]">This Month's Breakdown</h2>
        </div>

        <div className="space-y-5">
          {breakdown.map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#5c4b3f] font-medium">{row.label}</span>
                <span className="text-[#2a1a12] font-semibold">
                  {row.value > 0 ? "+" : ""}
                  {row.value}%
                </span>
              </div>
              <div className="h-2.5 bg-black/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${Math.abs(row.value)}%`, background: row.color }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-6 pt-6 border-t border-black/10 flex justify-between items-center"
        >
          <span className="text-[#5c4b3f] font-medium">Net take-home this month</span>
          <span className="mm-display text-2xl" style={{ color: "#16a34a" }}>₹21,710</span>
        </div>
      </div>
    </div>
  );
};

export default Profit;
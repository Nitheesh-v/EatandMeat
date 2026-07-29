import { Zap, Clock, Gift } from "lucide-react";

const OFFERS_BG = "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=1600&q=80";

const offers = [
  {
    id: 1,
    Icon: Zap,
    title: "Weekend Special",
    description: "Get fresh chicken at unbeatable prices every weekend.",
    discount: "20% OFF",
    code: "WEEKEND20",
    cardCls: "border-red-500/25 bg-red-500/10 hover:shadow-[0_40px_80px_rgba(239,68,68,0.3)]",
  },
  {
    id: 2,
    Icon: Gift,
    title: "Masala Combo",
    description: "Buy chicken with our premium authentic masalas bundle.",
    discount: "15% OFF",
    code: "COMBO15",
    cardCls: "border-white/8 bg-black/40 hover:border-red-500/30 hover:shadow-[0_40px_80px_rgba(239,68,68,0.18)]",
  },
  {
    id: 3,
    Icon: Clock,
    title: "Family Pack",
    description: "Special mega combo pack designed for large family meals.",
    discount: "25% OFF",
    code: "FAMILY25",
    cardCls: "border-red-800/30 bg-red-900/20 hover:shadow-[0_40px_80px_rgba(239,68,68,0.35)]",
  },
];

const Offers = () => (
  <section className="relative py-24 px-6 lg:px-10 overflow-hidden">
    {/* Parallax background */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${OFFERS_BG})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-black/94 via-red-950/88 to-black/88" />

    <div className="relative z-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 text-red-500 text-xs font-bold tracking-[3px] uppercase mb-3">
          <span className="w-5 h-px bg-red-500 inline-block" />
          Limited Time
          <span className="w-5 h-px bg-red-500 inline-block" />
        </span>
        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
          Today's Hot Deals
        </h2>
        <p className="text-white/45 mt-3">Grab exciting offers before they expire</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map(({ id, Icon, title, description, discount, code, cardCls }) => (
          <div
            key={id}
            className={`group relative overflow-hidden rounded-3xl border p-9
              backdrop-blur-xl transition-all duration-500 hover:-translate-y-2.5 hover:scale-[1.01]
              ${cardCls}`}
          >
            {/* Glow orb (CSS custom) */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48
              bg-red-500/20 rounded-full blur-2xl
              opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 mb-5
              glass-red rounded-2xl text-red-300 relative z-10">
              <Icon size={26} />
            </div>

            {/* Discount badge */}
            <div className="absolute top-6 right-6 text-3xl font-black tracking-tight text-gradient-fire">
              {discount}
            </div>

            <h3 className="text-xl font-black text-white mb-2 relative z-10">{title}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-5 relative z-10">{description}</p>

            {/* Coupon code */}
            <div className="flex items-center gap-3 bg-black/35 border border-dashed border-red-500/40
              rounded-xl px-4 py-3 mb-6 relative z-10">
              <span className="text-white/35 text-[10px] font-bold uppercase tracking-widest">
                USE CODE
              </span>
              <span className="text-red-300 font-black text-sm tracking-wider">{code}</span>
            </div>

            <button
              className="relative z-10 bg-gradient-fire text-white px-7 py-3 rounded-full
                text-sm font-bold tracking-wide
                shadow-[0_6px_20px_rgba(239,68,68,0.4)]
                hover:shadow-[0_12px_35px_rgba(239,68,68,0.65)]
                hover:-translate-y-1
                transition-all duration-300"
            >
              Claim Offer
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Offers;

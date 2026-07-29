const features = [
  {
    id: 1,
    icon: "🥩",
    title: "Fresh Quality Meat",
    description: "Freshly sourced chicken with premium quality standards every single day.",
    accent: "bg-red-500",
    ring: "border-red-500/40",
    glow: "bg-red-500/15",
  },
  {
    id: 2,
    icon: "🧼",
    title: "Hygienic Processing",
    description: "Clean and safe processing with certified standards you can trust completely.",
    accent: "bg-blue-500",
    ring: "border-blue-500/40",
    glow: "bg-blue-500/15",
  },
  {
    id: 3,
    icon: "🚚",
    title: "Fast Delivery",
    description: "Quick doorstep delivery across all Coimbatore zones within hours.",
    accent: "bg-green-500",
    ring: "border-green-500/40",
    glow: "bg-green-500/15",
  },
  {
    id: 4,
    icon: "📦",
    title: "Safe Packaging",
    description: "Vacuum-sealed, hygienic packaging that locks in freshness and quality.",
    accent: "bg-orange-500",
    ring: "border-orange-500/40",
    glow: "bg-orange-500/15",
  },
];

const WhyChooseUs = () => (
  <section className="relative bg-[#080202] py-24 px-6 lg:px-10 overflow-hidden">
    {/* Ambient glow */}
    <div className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px]
      bg-red-600/5 rounded-full blur-3xl" />

    {/* Header */}
    <div className="text-center mb-14">
      <span className="inline-block text-red-500 text-xs font-bold tracking-[3px] uppercase mb-3">
        Our Promise
      </span>
      <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
        Why Choose Eat And Meat?
      </h2>
      <p className="text-white/45 mt-3">Quality, freshness and trust — delivered in every order</p>
    </div>

    {/* Grid */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((f, i) => (
        <div
          key={f.id}
          className="group relative glass rounded-3xl p-8 overflow-hidden fade-up
            hover:-translate-y-2.5 hover:border-white/15
            hover:shadow-[0_30px_70px_rgba(0,0,0,0.4)]
            transition-all duration-500"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {/* Hover background glow */}
          <div className={`pointer-events-none absolute inset-0 ${f.glow} opacity-0
            group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

          {/* Icon with pulse ring */}
          <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
            {/* Pulsing ring (CSS animation) */}
            <span className={`pulse-ring absolute inset-0 rounded-full border-2 ${f.ring}`} />
            <span className="relative text-4xl z-10 transition-transform duration-400
              group-hover:scale-125 group-hover:-rotate-6">
              {f.icon}
            </span>
          </div>

          <h3 className="text-white font-bold text-lg mb-3 tracking-tight relative z-10">
            {f.title}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed relative z-10">
            {f.description}
          </p>

          {/* Bottom accent slide (CSS animation) */}
          <span className={`accent-line ${f.accent}`} />
        </div>
      ))}
    </div>
  </section>
);

export default WhyChooseUs;

import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

const HERO_BG =
  "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=1600&q=80";

const embers = [
  { size: 18, pos: "top-[14%] left-[70%]", delay: "0s", dur: "9s" },
  { size: 10, pos: "top-[58%] left-[86%]", delay: "1.4s", dur: "11s" },
  { size: 26, pos: "top-[76%] left-[63%]", delay: "2.6s", dur: "10s" },
  { size: 13, pos: "top-[24%] left-[91%]", delay: "0.6s", dur: "8s" },
  { size: 8, pos: "top-[44%] left-[77%]", delay: "3.2s", dur: "12s" },
  { size: 22, pos: "top-[6%] left-[57%]", delay: "4.1s", dur: "9.5s" },
];

const stats = [
  { value: "500+", label: "Customers (Offline)" },
  { value: "50+", label: "Products" },
];

const chips = [
  { icon: "🥩", label: "100% Fresh" },
  { icon: "🛡️", label: "Hygienic" },
  { icon: "🚚", label: "Fast Delivery" },
  { icon: "⭐", label: "Top Rated" },
];

const Hero = () => (
  <section className="mm-hero relative min-h-screen flex items-center overflow-hidden px-6 pt-28 pb-20 lg:px-16">
    {/* Parallax / ken-burns background */}
    <div className="mm-bg" style={{ backgroundImage: `url(${HERO_BG})` }} />

    {/* Layered overlay: classic maroon-to-charcoal wash */}
    <div className="absolute inset-0 bg-gradient-to-br from-black/92 via-red-950/75 to-black/70" />
    <div className="mm-vignette absolute inset-0" />
    <div className="mm-glow" />

    {/* Brass filigree corner accents */}
    <svg
      className="mm-corner mm-corner-tl hidden lg:block"
      viewBox="0 0 120 120"
      fill="none"
    >
      <path
        d="M4 4h40M4 4v40M4 4c30 0 50 20 50 50"
        stroke="url(#brassGrad)"
        strokeWidth="1.4"
      />
      <defs>
        <linearGradient id="brassGrad" x1="0" y1="0" x2="120" y2="120">
          <stop offset="0%" stopColor="#F6E3A1" />
          <stop offset="100%" stopColor="#92721E" />
        </linearGradient>
      </defs>
    </svg>

    {/* Floating embers */}
    {embers.map((e, i) => (
      <span
        key={i}
        className={`mm-ember absolute ${e.pos}`}
        style={{
          width: e.size,
          height: e.size,
          animationDelay: e.delay,
          animationDuration: e.dur,
        }}
      />
    ))}

    {/* ── Main content ── */}
    <div className="relative z-10 max-w-3xl">
      {/* Eyebrow badge — glassmorphism */}
      <div className="mm-badge mm-in mm-in-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 text-red-200 text-xs font-bold tracking-[0.15em] uppercase">
        <Star size={13} fill="currentColor" />
        Kovai&apos;s Own &middot; Fresh Meat &amp; Masala House
      </div>

      {/* Headline */}
      <h1 className="mm-display mm-in mm-in-2 text-5xl lg:text-7xl leading-[1.05] tracking-tight text-white mb-6">
        Premium Fresh Meat
        <span className="mm-text-fire block">Delivered</span>
        <span className="text-white/70 text-4xl lg:text-5xl">
          Right To Your Door
        </span>
      </h1>

      {/* Description */}
      <p className="mm-in mm-in-3 text-white/60 text-lg leading-relaxed max-w-xl mb-10">
        Premium quality chicken and authentic masalas — freshly cut,
        hygienically packed and delivered swiftly across Coimbatore.
      </p>

      {/* CTAs */}
      <div className="mm-in mm-in-4 flex flex-wrap gap-4 mb-10">
        <Link to="/products" className="mm-btn-primary group">
          Order Now
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
        <Link to="/products" className="mm-btn-glass">
          Explore Products
        </Link>
      </div>

      {/* Feature chips — glass pills */}
      <div className="mm-in mm-in-5 flex flex-wrap gap-3 mb-10">
        {chips.map((c) => (
          <span key={c.label} className="mm-chip">
            {c.icon} {c.label}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="mm-in mm-in-6 flex gap-8 pt-6 border-t border-white/10">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <span className="mm-text-gold text-2xl font-black">
              {s.value}
            </span>
            <span className="text-xs text-white/40 font-medium tracking-wide">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Brass heritage seal — neumorphic medallion, desktop */}
    <div className="mm-seal-wrap hidden xl:flex absolute right-16 top-1/2 -translate-y-1/2 z-10">
      <div className="mm-seal">
        <svg viewBox="0 0 200 200" className="mm-seal-ring">
          <defs>
            <path
              id="sealCircle"
              d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
            />
          </defs>
          <text className="mm-seal-text">
            <textPath href="#sealCircle" startOffset="0%">
              KOVAI&apos;S OWN &middot; FRESH DAILY &middot; EST. IN
              COIMBATORE &middot;
            </textPath>
          </text>
        </svg>
        <div className="mm-seal-core">
          <span className="text-3xl">🥩</span>
          <span className="mm-seal-core-label">TRUSTED CUT</span>
        </div>
      </div>
    </div>

    {/* Brass heritage seal — compact mobile/tablet version */}
    <div className="mm-seal-wrap-sm flex xl:hidden absolute top-6 right-6 z-10">
      <div className="mm-seal-sm">
        <svg viewBox="0 0 200 200" className="mm-seal-ring">
          <defs>
            <path
              id="sealCircleSm"
              d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
            />
          </defs>
          <text className="mm-seal-text">
            <textPath href="#sealCircleSm" startOffset="0%">
              KOVAI&apos;S OWN &middot; FRESH DAILY &middot;
            </textPath>
          </text>
        </svg>
        <div className="mm-seal-core-sm">
          <span className="text-lg">🥩</span>
        </div>
      </div>
    </div>

    {/* Scroll cue */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30 text-[10px] tracking-[3px] uppercase">
      <span className="mm-scroll-dot w-1.5 h-1.5 bg-amber-400 rounded-full" />
      Scroll
    </div>

    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700;900&family=Inter:wght@400;500;600;700&display=swap');

      .mm-hero, .mm-hero * { font-family: 'Inter', sans-serif; }
      .mm-display { font-family: 'Fraunces', serif; font-weight: 800; }

      /* Background with slow, gentle ken-burns zoom */
      .mm-bg {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        animation: mm-kenburns 34s ease-in-out infinite alternate;
        will-change: transform;
      }
      @keyframes mm-kenburns {
        0%   { transform: scale(1) translate(0, 0); }
        100% { transform: scale(1.08) translate(-1%, -0.6%); }
      }
      .mm-vignette {
        background: radial-gradient(ellipse at 60% 40%, transparent 35%, rgba(0,0,0,0.55) 100%);
        pointer-events: none;
      }
      /* Warm ambient glow behind headline for richness */
      .mm-glow {
        position: absolute; top: 8%; left: -8%; width: 60%; height: 70%;
        background: radial-gradient(circle, rgba(212,175,55,0.16) 0%, rgba(200,30,58,0.08) 45%, transparent 72%);
        filter: blur(40px); pointer-events: none; z-index: 1;
      }

      /* Staggered load-in — smoother, gentler ease */
      .mm-in { opacity: 0; transform: translateY(16px); animation: mm-rise 1.1s cubic-bezier(.16,.84,.32,1) forwards; }
      .mm-in-1 { animation-delay: .08s; }
      .mm-in-2 { animation-delay: .24s; }
      .mm-in-3 { animation-delay: .44s; }
      .mm-in-4 { animation-delay: .62s; }
      .mm-in-5 { animation-delay: .78s; }
      .mm-in-6 { animation-delay: .94s; }
      @keyframes mm-rise { to { opacity: 1; transform: translateY(0); } }

      /* Gradient text — richer crimson + warmer classic gold */
      .mm-text-fire {
        background: linear-gradient(95deg, #FF8552 0%, #D4213C 42%, #6E0F1C 100%);
        -webkit-background-clip: text; background-clip: text; color: transparent;
      }
      .mm-text-gold {
        background: linear-gradient(95deg, #F6E3A1 0%, #D4AF37 55%, #92721E 100%);
        -webkit-background-clip: text; background-clip: text; color: transparent;
      }

      /* Glassmorphism badge & pills */
      .mm-badge {
        background: rgba(180, 28, 52, 0.16);
        border: 1px solid rgba(212, 175, 55, 0.4);
        backdrop-filter: blur(14px) saturate(150%);
        -webkit-backdrop-filter: blur(14px) saturate(150%);
        box-shadow: 0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08);
      }
      .mm-chip {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 6px 16px; border-radius: 999px;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.14);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        color: rgba(255,255,255,0.78); font-size: 12px; font-weight: 600; letter-spacing: .02em;
        transition: all .35s cubic-bezier(.16,.84,.32,1); cursor: default;
      }
      .mm-chip:hover {
        background: rgba(180,28,52,0.2);
        border-color: rgba(212,175,55,0.5);
        color: #fff;
        transform: translateY(-2px);
      }

      /* Primary CTA */
      .mm-btn-primary {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 16px 32px; border-radius: 999px;
        color: #fff; font-weight: 700; font-size: 14px; letter-spacing: .03em;
        background: linear-gradient(120deg, #D4213C 0%, #96101F 60%, #6E0F1C 100%);
        box-shadow: 0 8px 30px rgba(180,28,52,0.45), 0 0 0 1px rgba(212,175,55,0.15);
        transition: all .35s cubic-bezier(.16,.84,.32,1);
      }
      .mm-btn-primary:hover {
        box-shadow: 0 16px 46px rgba(212,33,60,0.55), 0 0 0 1px rgba(212,175,55,0.45);
        transform: translateY(-3px) scale(1.03);
      }

      /* Secondary CTA — glass, with shimmer sweep */
      .mm-btn-glass {
        position: relative; overflow: hidden;
        display: inline-flex; align-items: center; gap: 8px;
        padding: 16px 32px; border-radius: 999px;
        color: rgba(255,255,255,0.9); font-weight: 700; font-size: 14px; letter-spacing: .03em;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(212,175,55,0.35);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        transition: all .35s cubic-bezier(.16,.84,.32,1);
      }
      .mm-btn-glass:hover {
        background: rgba(255,255,255,0.1);
        border-color: rgba(212,175,55,0.65);
        transform: translateY(-3px);
      }
      .mm-btn-glass::after {
        content: ''; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
        background: linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent);
        transform: skewX(-20deg);
        transition: left .6s ease;
      }
      .mm-btn-glass:hover::after { left: 130%; }

      /* Floating embers — softer, slower drift */
      .mm-ember {
        border-radius: 50%;
        background: radial-gradient(circle at 35% 30%, #FFC98A, #C81E3A 55%, transparent 75%);
        opacity: 0.45; filter: blur(0.6px);
        animation: mm-float ease-in-out infinite;
      }
      @keyframes mm-float {
        0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.1; }
        50%  { opacity: 0.5; }
        100% { transform: translateY(-60px) translateX(14px) scale(1.12); opacity: 0; }
      }

      /* Corner filigree */
      .mm-corner { position: absolute; width: 90px; height: 90px; opacity: 0.5; z-index: 5; }
      .mm-corner-tl { top: 24px; left: 24px; }

      /* Neumorphic brass seal */
      .mm-seal { position: relative; width: 200px; height: 200px; }
      .mm-seal-ring { position: absolute; inset: 0; animation: mm-spin 40s linear infinite; }
      .mm-seal-text {
        font-size: 9.2px; letter-spacing: 2.5px; fill: #F2D888; font-weight: 600;
      }
      @keyframes mm-spin { to { transform: rotate(360deg); } }
      .mm-seal-core {
        position: absolute; inset: 26px; border-radius: 50%;
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
        background: linear-gradient(145deg, #2a1a12, #150d09);
        box-shadow:
          8px 8px 18px rgba(0,0,0,0.55),
          -6px -6px 16px rgba(212,175,55,0.07),
          inset 0 0 0 1px rgba(212,175,55,0.3);
      }
      .mm-seal-core-label {
        font-size: 9px; letter-spacing: 1.5px; color: #F2D888; font-weight: 700;
      }

      /* Compact mobile/tablet seal */
      .mm-seal-sm { position: relative; width: 84px; height: 84px; opacity: 0.92; }
      .mm-seal-sm .mm-seal-ring { animation-duration: 40s; }
      .mm-seal-sm .mm-seal-text { font-size: 15px; }
      .mm-seal-core-sm {
        position: absolute; inset: 12px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        background: linear-gradient(145deg, #2a1a12, #150d09);
        box-shadow:
          4px 4px 10px rgba(0,0,0,0.5),
          -3px -3px 8px rgba(212,175,55,0.06),
          inset 0 0 0 1px rgba(212,175,55,0.3);
      }

      .mm-scroll-dot { animation: mm-bounce 2.4s ease-in-out infinite; }
      @keyframes mm-bounce { 0%,100% { transform: translateY(0); opacity: .4; } 50% { transform: translateY(4px); opacity: .9; } }

      @media (prefers-reduced-motion: reduce) {
        .mm-bg, .mm-in, .mm-ember, .mm-seal-ring, .mm-scroll-dot { animation: none !important; opacity: 1 !important; transform: none !important; }
      }
    `}</style>
  </section>
);

export default Hero;
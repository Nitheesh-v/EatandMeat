import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

const HERO_BG = "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=1600&q=80";

const particles = [
  { size: "w-20 h-20",  pos: "top-[15%] left-[72%]",  delay: "0s"    },
  { size: "w-10 h-10",  pos: "top-[60%] left-[85%]",  delay: "1.5s"  },
  { size: "w-28 h-28",  pos: "top-[78%] left-[65%]",  delay: "3s"    },
  { size: "w-14 h-14",  pos: "top-[25%] left-[90%]",  delay: "0.8s"  },
  { size: "w-8 h-8",    pos: "top-[44%] left-[78%]",  delay: "2.2s"  },
  { size: "w-24 h-24",  pos: "top-[5%]  left-[58%]",  delay: "4s"    },
];

const stats = [
  { value: "500+",  label: "Customers(Offline)"  },
  { value: "50+",  label: "Products"   },
 
];

const chips = [
  { icon: "🥩", label: "100% Fresh"    },
  { icon: "🛡️", label: "Hygienic"     },
  { icon: "🚚", label: "Fast Delivery" },
  { icon: "⭐", label: "Top Rated"     },
];

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-28 pb-20 lg:px-16">

    {/* Parallax background */}
    <div
      className="hero-bg"
      style={{ backgroundImage: `url(${HERO_BG})` }}
    />
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-red-950/70 to-black/60" />

    {/* Floating particles (CSS animation) */}
    {particles.map((p, i) => (
      <span
        key={i}
        className={`particle ${p.size} ${p.pos}`}
        style={{ animationDelay: p.delay }}
      />
    ))}

    {/* ── Content ── */}
    <div className="relative z-10 max-w-3xl fade-up">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 glass-red px-4 py-2 rounded-full mb-7
        text-red-300 text-xs font-bold tracking-wide uppercase
        animate-slide-in-left">
        <Star size={13} fill="currentColor" />
        Coimbatore's #1 Fresh Meat Delivery
      </div>

      {/* Headline */}
      <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white mb-6">
        Premium Fresh Meat
        <span className="text-gradient-fire block">Delivered</span>
        <span className="text-white/70 text-4xl lg:text-5xl">Right To Your Door</span>
      </h1>

      {/* Description */}
      <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
        Premium quality chicken and authentic masalas — freshly cut, hygienically packed
        and delivered swiftly to your doorstep.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-4 mb-10">
        <Link
          to="/products"
          className="flex items-center gap-2 bg-gradient-fire text-white px-8 py-4 rounded-full
            font-bold text-sm tracking-wide
            shadow-[0_8px_30px_rgba(239,68,68,0.45)]
            hover:shadow-[0_16px_50px_rgba(239,68,68,0.65)]
            hover:-translate-y-1 hover:scale-105
            transition-all duration-300 group"
        >
          Order Now
          <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <Link
          to="/products"
          className="flex items-center gap-2 glass text-white/85 px-8 py-4 rounded-full
            font-bold text-sm tracking-wide
            hover:bg-white/10 hover:border-red-500/50 hover:text-white hover:-translate-y-1
            transition-all duration-300"
        >
          Explore Products
        </Link>
      </div>

      {/* Feature chips */}
      <div className="flex flex-wrap gap-3 mb-10">
        {chips.map((c) => (
          <span
            key={c.label}
            className="flex items-center gap-2 glass px-4 py-1.5 rounded-full
              text-white/75 text-xs font-semibold tracking-wide
              hover:glass-red hover:text-white hover:-translate-y-0.5
              cursor-default transition-all duration-300"
          >
            {c.icon} {c.label}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex gap-8 pt-6 border-t border-white/10">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <span className="text-2xl font-black text-gradient-red">{s.value}</span>
            <span className="text-xs text-white/40 font-medium tracking-wide">{s.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Scroll cue */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10
      flex flex-col items-center gap-2 text-white/30 text-[10px] tracking-[3px] uppercase">
      <span className="w-1.5 h-1.5 bg-red-500 rounded-full scroll-dot" />
      Scroll
    </div>
  </section>
);

export default Hero;

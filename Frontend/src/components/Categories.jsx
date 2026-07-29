import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Fresh Chicken",
    desc: "Farm-fresh, hygienically processed daily",
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=900&q=80",
  },
  {
    id: 2,
    name: "Chicken Masalas",
    desc: "Authentic blends with rich aroma",
    tag: "New Arrivals",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&q=80",
  },
];

const Categories = () => (
  <section className="bg-[#0a0202] py-24 px-6 lg:px-10 overflow-hidden relative">
    {/* Ambient glow */}
    <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px]
      bg-red-600/5 rounded-full blur-3xl" />

    {/* Header */}
    <div className="text-center mb-14">
      <span className="inline-block text-red-500 text-xs font-bold tracking-[3px] uppercase mb-3">
        Our Collection
      </span>
      <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
        Shop By Category
      </h2>
      <p className="text-white/45 mt-3 text-base">
        Fresh chicken and authentic masalas for your kitchen
      </p>
    </div>

    {/* Grid */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          to="/products"
          className="group relative rounded-3xl overflow-hidden h-80 lg:h-96 cursor-pointer
            shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(239,68,68,0.2)]
            transition-all duration-500 block"
        >
          {/* Background image with CSS zoom */}
          <div
            className="cat-bg"
            style={{ backgroundImage: `url(${cat.image})` }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/85
            group-hover:to-red-950/85 transition-all duration-500" />

          {/* Tag */}
          <span className="absolute top-5 right-5 bg-gradient-fire text-white
            text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider z-10">
            {cat.tag}
          </span>

          {/* Glow orb on hover */}
          <div className="absolute -bottom-16 -left-16 w-48 h-48
            bg-red-600/30 rounded-full blur-2xl
            opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-10
            translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-3xl font-black text-white tracking-tight mb-2">
              {cat.name}
            </h3>
            <p className="text-white/55 text-sm mb-4
              opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0
              transition-all duration-400">
              {cat.desc}
            </p>
            <span className="inline-flex items-center gap-2 text-red-300 text-sm font-bold
              group-hover:gap-4 transition-all duration-300">
              Shop Now <ArrowRight size={15} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default Categories;

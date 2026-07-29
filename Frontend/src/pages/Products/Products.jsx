import { useState } from "react";
import SearchBar from "../../components/Products/SearchBar.jsx";
import ProductFilter from "../../components/Products/ProductFilter";
import ProductGrid from "../../components/Products/ProductGrid";
import productsData from "../../data/Product/products.js";

const productsStyles = `
.products-dark-section {
  background: linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #1a0505 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.products-bg-mesh {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 10% 20%, rgba(185, 28, 28, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 80%, rgba(234, 88, 12, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(127, 29, 29, 0.4) 0%, transparent 70%),
    linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #1a0505 100%);
  animation: meshMove 20s ease-in-out infinite;
}
@keyframes meshMove {
  0%, 100% { background-position: 0% 0%; filter: hue-rotate(0deg); }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; filter: hue-rotate(10deg); }
  75% { background-position: 0% 100%; }
}
.products-hex-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(30deg, rgba(220, 38, 38, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(220, 38, 38, 0.06) 87.5%, rgba(220, 38, 38, 0.06)),
    linear-gradient(150deg, rgba(220, 38, 38, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(220, 38, 38, 0.06) 87.5%, rgba(220, 38, 38, 0.06)),
    linear-gradient(60deg, rgba(234, 88, 12, 0.04) 25%, transparent 25.5%, transparent 75%, rgba(234, 88, 12, 0.04) 75%, rgba(234, 88, 12, 0.04));
  background-size: 80px 140px;
  animation: hexScroll 25s linear infinite;
  opacity: 0.5;
}
@keyframes hexScroll {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 70px); }
}
.products-particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  animation: particleFloat linear infinite;
}
.products-particle-1 { width: 4px; height: 4px; background: radial-gradient(circle, #ef4444, transparent); left: 10%; bottom: -10px; animation-duration: 12s; }
.products-particle-2 { width: 6px; height: 6px; background: radial-gradient(circle, #f97316, transparent); left: 20%; bottom: -10px; animation-duration: 15s; animation-delay: 2s; }
.products-particle-3 { width: 3px; height: 3px; background: radial-gradient(circle, #ef4444, transparent); left: 35%; bottom: -10px; animation-duration: 10s; animation-delay: 4s; }
.products-particle-4 { width: 5px; height: 5px; background: radial-gradient(circle, #fbbf24, transparent); left: 50%; bottom: -10px; animation-duration: 14s; animation-delay: 1s; }
.products-particle-5 { width: 4px; height: 4px; background: radial-gradient(circle, #ef4444, transparent); left: 65%; bottom: -10px; animation-duration: 11s; animation-delay: 3s; }
.products-particle-6 { width: 7px; height: 7px; background: radial-gradient(circle, #f97316, transparent); left: 75%; bottom: -10px; animation-duration: 16s; animation-delay: 5s; }
@keyframes particleFloat {
  0% { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
  10% { opacity: 1; transform: translateY(-10vh) translateX(10px) scale(1); }
  90% { opacity: 0.6; }
  100% { transform: translateY(-110vh) translateX(-20px) scale(0.3); opacity: 0; }
}
.products-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.products-orb-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(220, 38, 38, 0.25), transparent 70%);
  top: -10%; left: -5%;
  animation: orbMove1 15s ease-in-out infinite;
}
.products-orb-2 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(234, 88, 12, 0.2), transparent 70%);
  bottom: -10%; right: -5%;
  animation: orbMove2 18s ease-in-out infinite;
}
@keyframes orbMove1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(100px, 80px) scale(1.2); }
  66% { transform: translate(-50px, 120px) scale(0.9); }
}
@keyframes orbMove2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-80px, -60px) scale(1.15); }
  66% { transform: translate(60px, -100px) scale(0.85); }
}
.products-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.6) 100%);
  pointer-events: none; z-index: 1;
}
.products-page-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 800;
}
.products-page-title .accent {
  background: linear-gradient(135deg, #ef4444, #f97316);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.products-section-label {
  display: inline-block;
  background: rgba(220, 38, 38, 0.15);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #fca5a5;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 16px;
}
.products-count-text {
  color: #9ca3af;
}
.products-count-text .count-num {
  color: white;
  font-weight: 700;
}
.products-fade-in {
  animation: fadeInUp 0.8s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.products-delay-1 { animation-delay: 0.1s; opacity: 0; }
.products-delay-2 { animation-delay: 0.2s; opacity: 0; }
.products-delay-3 { animation-delay: 0.3s; opacity: 0; }
@media (max-width: 768px) {
  .products-page-title { font-size: 1.75rem !important; }
  .products-orb { display: none; }
}
`;

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = productsData.filter((product) => {
    const matchCategory =
      category === "All" || product.category === category;

    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <>
      <style>{productsStyles}</style>
      <section className="products-dark-section relative overflow-hidden">
        {/* Background Layers */}
        <div className="products-bg-mesh"></div>
        <div className="products-hex-grid"></div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="products-particle products-particle-1"></div>
          <div className="products-particle products-particle-2"></div>
          <div className="products-particle products-particle-3"></div>
          <div className="products-particle products-particle-4"></div>
          <div className="products-particle products-particle-5"></div>
          <div className="products-particle products-particle-6"></div>
        </div>

        <div className="products-orb products-orb-1"></div>
        <div className="products-orb products-orb-2"></div>
        <div className="products-vignette"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mt-20 mx-auto px-6 py-10">
          {/* Heading */}
          <div className="mb-8 products-fade-in">
            <span className="products-section-label">🔥 Fresh & Premium</span>
            <h1 className="products-page-title">
              Fresh Chicken & <span className="accent">Masalas</span>
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              Browse our premium quality fresh chicken and authentic masalas.
            </p>
          </div>

          {/* Search */}
          <div className="mb-6 products-fade-in products-delay-1">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          {/* Filter */}
          <div className="mb-8 products-fade-in products-delay-2">
            <ProductFilter category={category} setCategory={setCategory} />
          </div>

          {/* Products Count */}
          <div className="mb-6 products-fade-in products-delay-3">
            <p className="products-count-text">
              <span className="count-num">{filteredProducts.length}</span> Products Found
            </p>
          </div>

          {/* Product Grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </section>
    </>
  );
};

export default Products;

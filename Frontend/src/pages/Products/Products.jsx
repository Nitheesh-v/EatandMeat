import { useState, useEffect } from "react";
import SearchBar from "../../components/Products/SearchBar.jsx";
import ProductFilter from "../../components/Products/ProductFilter";
import ProductGrid from "../../components/Products/ProductGrid";
import { getProducts } from "../../services/productService";
import "../Styles/ProductStyle.css";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const params = {};
        if (category && category !== "All") params.category = category;
        if (search) params.search = search;
        const res = await getProducts(params);
        setProducts(res.products || []);
      } catch (err) {
        console.log("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [search, category]);

  return (
    <section className="products-dark-section relative overflow-hidden min-h-screen">
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
          <h1 className="text-white text-[2.5rem] md:text-[1.75rem] font-extrabold leading-tight">
            Fresh Chicken &{" "}
            <span className="products-accent-text">Masalas</span>
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
          <p className="text-[#9ca3af]">
            <span className="text-white font-bold">{products.length}</span>{" "}
            Products Found
          </p>
        </div>

        {/* Loading or Products */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading products...
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </section>
  );
};

export default Products;

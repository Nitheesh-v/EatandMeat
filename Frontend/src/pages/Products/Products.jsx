import { useState, useEffect } from "react";
import SearchBar from "../../components/Products/SearchBar.jsx";
import ProductFilter from "../../components/Products/ProductFilter";
import ProductGrid from "../../components/Products/ProductGrid";
import { getProducts } from "../../services/productService";

const primary = "#B4232C";
const deep = "#24140F";
const cream = "#FAF7F2";

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
    <section style={{ background: cream, minHeight: "100vh", paddingTop: 88, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: primary, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Fresh & Premium
          </span>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 800, color: deep, margin: "6px 0 6px", lineHeight: 1.2 }}>
            Fresh Chicken & <span style={{ color: primary }}>Masalas</span>
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#64748B", margin: 0 }}>
            Browse our premium quality fresh chicken and authentic masalas.
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ position: "relative", maxWidth: 400 }}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", background: "#FFFFFF", border: "1px solid #E2E8F0",
                borderRadius: 10, padding: "10px 14px 10px 40px", color: "#172033",
                fontSize: "0.85rem", boxSizing: "border-box", outline: "none",
              }}
            />
          </div>
        </div>

        {/* Filter */}
        <div style={{ marginBottom: 20 }}>
          <ProductFilter category={category} setCategory={setCategory} />
        </div>

        {/* Count */}
        <p style={{ fontSize: "0.82rem", color: "#64748B", marginBottom: 16 }}>
          <strong style={{ color: deep }}>{products.length}</strong> Products Found
        </p>

        {/* Products */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#94A3B8" }}>Loading products...</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#94A3B8" }}>No products found</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </section>
  );
};

export default Products;

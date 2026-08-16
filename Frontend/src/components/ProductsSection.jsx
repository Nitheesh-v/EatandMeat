import { useState, useEffect } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { getProducts } from "../services/productService";
import { Link } from "react-router-dom";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getProducts({ featured: "true" });
        let items = res.products || [];
        // If no featured products, fall back to first 4
        if (items.length === 0) {
          const allRes = await getProducts();
          items = (allRes.products || []).slice(0, 4);
        } else {
          items = items.slice(0, 4);
        }
        setProducts(items);
      } catch (err) {
        console.log("Failed to load products:", err);
      }
    };
    load();
  }, []);

  return (
    <section className="relative bg-[#0d0303] py-24 px-6 lg:px-10 overflow-hidden">
      {/* Watermark */}
      <span className="pointer-events-none select-none absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2 text-[12rem] lg:text-[18rem] font-black
        text-white/[0.015] tracking-[-12px] whitespace-nowrap">
        FRESH
      </span>

      {/* Header */}
      <div className="relative text-center mb-14">
        <span className="inline-block text-red-500 text-xs font-bold tracking-[3px] uppercase mb-3">
          Our Menu
        </span>
        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
          Popular Products
        </h2>
        <p className="text-white/45 mt-3">Fresh products loved by our customers</p>
      </div>

      {/* Grid */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const productId = product._id || product.id;
          const price = product.sellingPrice || product.price;
          const category = product.category?.name || product.categoryName || product.category;
          return (
            <Link
              key={productId}
              to={`/products/${productId}`}
              className="group glass rounded-2xl overflow-hidden
                hover:-translate-y-2.5 hover:border-red-500/30
                hover:shadow-[0_30px_70px_rgba(0,0,0,0.4),0_0_40px_rgba(239,68,68,0.1)]
                transition-all duration-500 block"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-zoom w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <span className="absolute top-3.5 left-3.5 bg-gradient-fire text-white
                  text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider z-10">
                  {category}
                </span>

                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    glass text-white w-11 h-11 rounded-full flex items-center justify-center
                    opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100
                    hover:bg-red-500/40 hover:border-red-500
                    transition-all duration-400 z-10"
                >
                  <Eye size={15} />
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <span className="text-red-500 text-[11px] font-bold uppercase tracking-widest">
                  {category}
                </span>
                <h3 className="text-white font-bold text-lg mt-1.5 tracking-tight">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-gradient-red text-xl font-black">
                    ₹{price}
                    <small className="text-xs font-medium opacity-60 ml-0.5">{product.weight}</small>
                  </span>
                  <span
                    className="flex items-center gap-1.5 bg-gradient-fire text-white
                      px-4 py-2 rounded-full text-xs font-bold
                      shadow-[0_4px_15px_rgba(239,68,68,0.35)]"
                  >
                    <ShoppingCart size={13} /> Add
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View All */}
      <div className="relative text-center mt-14">
        <a
          href="/products"
          className="inline-block border border-red-500/40 text-red-300
            px-10 py-3.5 rounded-full text-sm font-bold tracking-wide
            hover:bg-gradient-fire hover:border-transparent hover:text-white
            hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(239,68,68,0.45)]
            transition-all duration-350"
        >
          View All Products
        </a>
      </div>
    </section>
  );
};

export default ProductsSection;

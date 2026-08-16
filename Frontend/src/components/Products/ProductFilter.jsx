import { useState, useEffect } from "react";
import { getCategories } from "../../services/categoryService";

const primary = "#B4232C";
const cream = "#FAF7F2";
const text = "#30231E";

const ProductFilter = ({ category, setCategory }) => {
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCategories();
        const names = (res.categories || []).map((c) => c.name);
        setCategories(["All", ...names]);
      } catch (err) {
        setCategories(["All", "Fresh Chicken", "Masalas", "Combos"]);
      }
    };
    load();
  }, []);

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => setCategory(item)}
          style={{
            padding: "7px 16px", borderRadius: 8, border: "none",
            fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
            transition: "all 0.2s",
            background: category === item ? primary : "#FFFFFF",
            color: category === item ? "white" : text,
            boxShadow: category === item ? "0 2px 8px rgba(180,35,44,0.25)" : "0 1px 3px rgba(0,0,0,0.06)",
          }}
          onMouseEnter={(e) => { if (category !== item) e.currentTarget.style.background = "#FEE2E2"; }}
          onMouseLeave={(e) => { if (category !== item) e.currentTarget.style.background = "#FFFFFF"; }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default ProductFilter;

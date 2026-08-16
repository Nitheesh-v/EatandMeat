import { useState, useEffect } from "react";
import { getCategories } from "../../services/categoryService";

const ProductFilter = ({ category, setCategory }) => {
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCategories();
        const names = (res.categories || []).map((c) => c.name);
        setCategories(["All", ...names]);
      } catch (err) {
        // Fallback to hardcoded categories
        setCategories(["All", "Fresh Chicken", "Masalas", "Combos"]);
      }
    };
    load();
  }, []);

  return (
    <div className="flex gap-3 flex-wrap">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => setCategory(item)}
          className={`px-5 py-2 rounded-full border transition ${
            category === item
              ? "bg-red-600 text-white border-red-600"
              : "bg-transparent text-gray-400 border-gray-600 hover:border-red-400 hover:text-white"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default ProductFilter;

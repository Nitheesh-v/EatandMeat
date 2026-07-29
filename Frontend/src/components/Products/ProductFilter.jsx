const ProductFilter = ({ category, setCategory }) => {

    const categories = [
        "All",
        "Fresh Chicken",
        "Masalas"
    ];

    return (

        <div className="flex gap-3 flex-wrap">

            {categories.map((item) => (

                <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`px-5 py-2 rounded-full border transition ${
                        category === item
                            ? "bg-red-600 text-white"
                            : "bg-green-500"
                    }`}
                >
                    {item}
                </button>

            ))}

        </div>

    );

};

export default ProductFilter;
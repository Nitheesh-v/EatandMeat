const SearchBar = ({ search, setSearch }) => {

    return (

        <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg p-3 outline-none focus:border-red-600"
        />

    );

};

export default SearchBar;
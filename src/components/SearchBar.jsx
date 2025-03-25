import { useEffect, useState } from "react"; 
import { FaSearch } from "react-icons/fa"; // Import search icon

const SearchBar = ({onSearch}) => {
  const [query, setQuery] = useState(""); // State to store user input

  useEffect(() => {
    if(!query) return;

    const delayDebounce = setTimeout(()=>{
      if (onSearch) onSearch(query);
    }, 500);
    return () => clearTimeout(delayDebounce)
  }, [query, onSearch]);

  return (
    
    <div className="flex items-center gap-2 p-4 bg-gray-800 rounded-lg shadow-md w-full max-w-lg">

      {/* Search Input Field */}
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-gray-700 text-white placeholder-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 w-full"
      />

      {/* Search Icon */}
      <FaSearch className="text-white text-xl" />
      
    </div>
    
  );
};

export default SearchBar;

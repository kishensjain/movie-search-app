import { useState } from "react";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;


    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        setSearchResults(data.results); // Store fetched movies in state
      } else {
        setSearchResults([]); // No results found
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setSearchResults([]); // Handle API failure
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Movie Search App 🎬</h1>
      <SearchBar onSearch={handleSearch} />
      {searchResults.length > 0 ? (
        <pre className="mt-4 text-sm bg-gray-800 p-4 rounded-lg">
      {JSON.stringify(searchResults, null, 2)}
        </pre>
      ) : (
        <p className="mt-4 text-gray-400">No results found...</p>
)}
    </div>
  );
}

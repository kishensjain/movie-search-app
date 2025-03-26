import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState(""); // Store query for pagination

  const handleSearch = async (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setHasSearched(true);
    setQuery(trimmedQuery); // Store query
    setPage(1); // Reset page

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?query=${trimmedQuery}&api_key=${API_KEY}&page=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        setSearchResults(data.results); // Replace previous search results
        setTotalPages(data.total_pages || 1);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setSearchResults([]);
    }
  };

  const loadMoreMovies = async () => {
    if (page >= totalPages) return;
  
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const nextPage = page + 1;
  
    if (!query) return; // Ensure query exists before making the request
  
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&page=${nextPage}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.results) {
        setSearchResults((prevResults) => [...prevResults, ...data.results]);
        setPage(nextPage); // Correctly update the page state
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setSearchResults([]);
      alert("Failed to fetch movies. Please try again.");
    }
    
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Movie Search App 🎬</h1>
      <SearchBar onSearch={handleSearch} />
      <MovieList searchResults={searchResults} hasSearched={hasSearched} />
      {page < totalPages && searchResults.length > 0 && (
        <button
          onClick={loadMoreMovies}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded cursor-pointer"
        >
          Load More
        </button>
      )}
    </div>
  );
}

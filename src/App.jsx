import SearchBar from "./components/SearchBar"; // Import the SearchBar component
import { useState } from "react";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) =>{
    console.log(`Searching for ${query}`);
    
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Movie Search App🎬</h1>
      <SearchBar onSearch={handleSearch}/>
    </div>
  );
}

export default App;


// 1aaf93b1480cccac094826255d1424ea

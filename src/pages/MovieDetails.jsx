import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams(); // Get movie ID from URL

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold">Movie Details Page</h1>
      <p className="text-gray-400">Movie ID: {id}</p>
    </div>
  );
};

export default MovieDetails;

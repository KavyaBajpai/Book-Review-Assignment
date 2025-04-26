import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from 'lucide-react';
const Browse = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (title) queryParams.append("search", title);
      if (genre) queryParams.append("genre", genre);

      const res = await fetch(`http://localhost:4000/api/books/getbooks?${queryParams.toString()}`);
      const data = await res.json();

      if (data.success) {
        setBooks(data.data);
      } else {
        console.error("Failed to fetch books");
      }
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    
    <div className="p-6 flex flex-col items-center w-full">
      <h1 className="text-2xl font-bold mb-8 text-white">Browse Books</h1>

      <div className="flex justify-center gap-4 mb-6 w-2/3">
        <input
          type="text"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border outline-none border-gray-500 p-2 text-white bg-gray-500 rounded-lg w-1/2"
        />
        <input
          type="text"
          placeholder="Search by genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border outline-none border-gray-500 p-2 text-white bg-gray-500 rounded-lg w-1/2"
        />
        <button
          onClick={fetchBooks}
          className="bg-gray-800 hover:bg-gray-500 text-white px-4 py-2 rounded-full"
        >
          <Search />
        </button>
      </div>
      
        <div className="w-full flex justify-center"> 
        <div className="w-2/3 sm:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="border-gray-700 transition duration-500 ease-in-out  hover:bg-gray-800 hover:scale-105 opacity-80 p-4 bg-gray-700 rounded shadow hover:shadow-lg cursor-pointer"
              onClick={() => handleBookClick(book.id)}
            >
              <h2 className="text-white text-xl font-bold">{book.title}</h2>
              <p className="text-white font-semibold mb-2">{book.author}</p>
              <p className="text-sm text-white ">{book.genre}</p>
            </div>
          ))}
        </div>
        </div> 
      
      
    </div>
  );
};

export default Browse;

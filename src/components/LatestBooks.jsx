import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://bookcourier-server-bice.vercel.app/latestbooks")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="py-10 px-5 md:px-10 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-sky-600 mb-8">
        Latest Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-sky-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
            onClick={() => navigate(`/book/${book._id}`)}
          >
          
            <div className="w-full h-48 flex items-center justify-center bg-white">
              <img
                src={book.image}
                alt={book.title}
                className="h-full object-contain rounded-t-lg"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {book.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                By {book.author}
              </p>
              <p className="text-gray-700 dark:text-gray-200 font-semibold">
                ${Number(book.price).toFixed(2)}
                

              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;

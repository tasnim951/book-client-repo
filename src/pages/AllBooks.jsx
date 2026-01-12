import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://bookcourier-server-bice.vercel.app/allbooks")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-12 px-4 md:px-8 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-8">
        All <span className="text-sky-500">Books</span>
      </h2>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search books..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 
          bg-white dark:bg-gray-800 text-black dark:text-white
          focus:ring-2 focus:ring-sky-500 outline-none shadow-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 dark:bg-gray-700 h-[420px] rounded-xl"
              />
            ))
          : filteredBooks.map((book) => (
              <div
                key={book._id}
                onClick={() => navigate(`/book/${book._id}`)}
                className="
                  cursor-pointer 
                  bg-white dark:bg-gray-800 
                  border border-gray-200 dark:border-gray-700 
                  rounded-xl overflow-hidden 
                  shadow-md hover:shadow-xl 
                  transition-all duration-300
                  hover:-translate-y-2
                  flex flex-col
                  h-[420px]
                "
              >
                {/* Image */}
                <div className="h-56 overflow-hidden flex-shrink-0">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition duration-300 hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-black dark:text-white line-clamp-2">
                    {book.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                    {book.author}
                  </p>

                  <p className="text-sm text-sky-600 dark:text-sky-400 mt-1 line-clamp-1">
                    {book.category}
                  </p>

                  {/* Push bottom */}
                  <div className="mt-auto flex justify-between items-center pt-4">
                    <span className="text-xl font-semibold text-black dark:text-white">
                      ${book.price}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/book/${book._id}`);
                      }}
                      className="
                        bg-sky-500 px-4 py-1.5 
                        text-white text-sm rounded-lg 
                        transition-all duration-300
                        hover:bg-sky-600 hover:scale-105 hover:shadow-md
                      "
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default AllBooks;

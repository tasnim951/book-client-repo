import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          "https://bookcourier-server-bice.vercel.app/mybooks",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) fetchBooks();
  }, [user]);

  const handleUpdateBook = async (e) => {
    e.preventDefault();

    try {
      const token = await user.getIdToken();
      await axios.patch(
        `https://bookcourier-server-bice.vercel.app/books/${selectedBook._id}`,
        {
          title: selectedBook.title,
          author: selectedBook.author,
          price: selectedBook.price,
          status: selectedBook.status,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success", "Book updated successfully", "success");

      setBooks((prev) =>
        prev.map((b) => (b._id === selectedBook._id ? selectedBook : b))
      );
      setShowModal(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update book", "error");
    }
  };

  // ✅ Button animations
  const btnPrimary =
    "px-4 py-2 bg-sky-500 text-white rounded transition-all duration-200 ease-in-out hover:bg-sky-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-95";
  const btnCancel =
    "px-4 py-2 border rounded transition-all duration-200 ease-in-out hover:bg-gray-100 active:scale-95";

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg sm:text-2xl font-bold mb-4 text-sky-700">
        My Books
      </h2>

      {/* ✅ MOBILE VIEW (Cards) */}
      <div className="space-y-4 sm:hidden">
        {books.map((book) => (
          <div
            key={book._id}
            className="border rounded-lg p-4 shadow-sm flex flex-col gap-3"
          >
            <img
              src={book.image || "https://via.placeholder.com/60"}
              alt={book.title}
              className="w-full h-48 object-cover rounded"
            />
            <div>
              <p className="font-semibold text-sm break-words">{book.title}</p>
              <p className="text-xs text-gray-600 mt-1">Author: {book.author}</p>
              <p className="text-xs capitalize mt-1">Status: {book.status}</p>
            </div>
            <button
              onClick={() => {
                setSelectedBook(book);
                setShowModal(true);
              }}
              className={btnPrimary}
            >
              Edit
            </button>
          </div>
        ))}
        {books.length === 0 && (
          <p className="text-center text-gray-500">No books added yet.</p>
        )}
      </div>

      {/* ✅ TABLE VIEW (Tablet & Desktop) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="bg-sky-100 text-sky-800">
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr
                key={book._id}
                className="text-center border-b hover:bg-sky-50 transition-colors"
              >
                <td className="py-2 px-4">
                  <img
                    src={book.image || "https://via.placeholder.com/60"}
                    alt={book.title}
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                </td>
                <td className="py-2 px-4">{book.title}</td>
                <td className="py-2 px-4 capitalize">{book.status}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => {
                      setSelectedBook(book);
                      setShowModal(true);
                    }}
                    className={btnPrimary}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No books added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ EDIT MODAL */}
      {showModal && selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Book</h3>

            <form onSubmit={handleUpdateBook} className="space-y-3">
              <input
                type="text"
                value={selectedBook.title}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, title: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Book Title"
                required
              />
              <input
                type="text"
                value={selectedBook.author}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, author: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Author"
              />
              <input
                type="number"
                value={selectedBook.price}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, price: Number(e.target.value) })
                }
                className="w-full p-2 border rounded"
                placeholder="Price"
              />
              <select
                value={selectedBook.status}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, status: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={btnCancel}
                >
                  Cancel
                </button>
                <button type="submit" className={btnPrimary}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooks;

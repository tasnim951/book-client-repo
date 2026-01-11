import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const token = await user.getIdToken();
      const res = await axios.get(
        "https://bookcourier-server-bice.vercel.app/admin/books",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks(res.data);
    };
    fetchBooks();
  }, [user]);

  const toggleStatus = async (book) => {
    const token = await user.getIdToken();
    const newStatus =
      book.status === "published" ? "unpublished" : "published";

    await axios.patch(
      `https://bookcourier-server-bice.vercel.app/admin/books/${book._id}/status`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    Swal.fire("Updated", "Book status changed", "success");

    setBooks((prev) =>
      prev.map((b) => (b._id === book._id ? { ...b, status: newStatus } : b))
    );
  };

  const deleteBook = async (bookId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the book AND all its orders!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    const token = await user.getIdToken();
    await axios.delete(
      `https://bookcourier-server-bice.vercel.app/admin/books/${bookId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    Swal.fire("Deleted!", "Book removed successfully", "success");

    setBooks((prev) => prev.filter((b) => b._id !== bookId));
  };

  // ✅ Button classes with hover animations
  const btnPrimary =
    "w-full sm:w-auto px-4 py-2 bg-sky-500 text-white rounded transition-all duration-200 ease-in-out hover:bg-sky-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-95";
  const btnDanger =
    "w-full sm:w-auto px-4 py-2 bg-sky-600 text-white rounded transition-all duration-200 ease-in-out hover:bg-sky-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95";

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg sm:text-2xl font-bold mb-4 text-sky-700">
        Manage Books
      </h2>

      {/* MOBILE VIEW (CARDS) */}
      <div className="space-y-4 sm:hidden">
        {books.map((book) => (
          <div key={book._id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex gap-4">
              <img
                src={book.image}
                alt={book.title}
                className="w-20 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-sm break-words">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Author: {book.author}
                </p>
                <p className="text-xs capitalize mt-1">Status: {book.status}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => toggleStatus(book)}
                className={btnPrimary}
              >
                {book.status === "published" ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => deleteBook(book._id)} className={btnDanger}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {books.length === 0 && (
          <p className="text-center text-gray-500">No books found</p>
        )}
      </div>

      {/* TABLE VIEW (TABLET & DESKTOP) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-sky-100 text-sky-800">
            <tr>
              <th className="p-3 text-center">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="border-t hover:bg-sky-50">
                <td className="p-3 text-center">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-14 h-16 object-cover mx-auto rounded"
                  />
                </td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3 capitalize text-center">{book.status}</td>
                <td className="p-3">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => toggleStatus(book)}
                      className={btnPrimary}
                    >
                      {book.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => deleteBook(book._id)}
                      className={btnDanger}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;

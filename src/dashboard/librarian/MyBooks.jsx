import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(`http://localhost:5000/mybooks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, [user]);

  const handleToggleStatus = async (book) => {
    try {
      const token = await user.getIdToken();
      await axios.patch(
        `http://localhost:5000/books/${book._id}/status`,
        { status: book.status === "published" ? "unpublished" : "published" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Success", "Book status updated!", "success");
      setBooks((prev) =>
        prev.map((b) =>
          b._id === book._id ? { ...b, status: book.status === "published" ? "unpublished" : "published" } : b
        )
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Books</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr className="bg-sky-100 text-sky-800 font-semibold">
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="text-center border-b">
                <td className="py-2 px-4">
                  <img src={book.image || "https://via.placeholder.com/60"} alt={book.name} className="w-16 h-16 object-cover mx-auto" />
                </td>
                <td className="py-2 px-4">{book.name}</td>
                <td className="py-2 px-4 capitalize">{book.status}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleToggleStatus(book)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    {book.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => console.log("Go to Edit Page")}
                    className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4">
                  No books added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooks;

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
      const res = await axios.get("http://localhost:5000/admin/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    };
    fetchBooks();
  }, [user]);

  const toggleStatus = async (book) => {
    const token = await user.getIdToken();
    const newStatus = book.status === "published" ? "unpublished" : "published";

    await axios.patch(
      `http://localhost:5000/admin/books/${book._id}/status`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    Swal.fire("Updated", "Book status changed", "success");

    setBooks(prev =>
      prev.map(b =>
        b._id === book._id ? { ...b, status: newStatus } : b
      )
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
    await axios.delete(`http://localhost:5000/admin/books/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Swal.fire("Deleted!", "Book removed successfully", "success");

    setBooks(prev => prev.filter(b => b._id !== bookId));
  };

  return (
    <div className="p-4 md:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-sky-700">Manage Books</h2>

      <div className="overflow-x-auto">
        <table className="min-w-[300px] w-full border border-gray-200 rounded-lg">
          <thead className="bg-sky-100 text-sky-800">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              
              
              <th className="p-2 hidden sm:table-cell">Author</th>
              <th className="p-2 hidden sm:table-cell">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map(book => (
              <tr key={book._id} className="border-t hover:bg-sky-50 text-center">
                <td className="p-2">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-14 h-16 object-cover mx-auto rounded"
                  />
                </td>
                <td className="p-2">{book.title}</td>
                <td className="p-2 hidden sm:table-cell">{book.author}</td>
                <td className="p-2 hidden sm:table-cell capitalize">{book.status}</td>
                <td className="p-2">
                  <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 justify-center">
                    <button
                      onClick={() => toggleStatus(book)}
                      className="w-full sm:w-auto px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
                    >
                      {book.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => deleteBook(book._id)}
                      className="w-full sm:w-auto px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition"
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

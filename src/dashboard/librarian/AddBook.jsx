import { useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const AddBook = () => {
  const { user } = useAuth();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    image: "",
    price: "",
    status: "published",
  });

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      const res = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Book Added!",
          text: data.message,
          confirmButtonColor: "#0ea5e9", // matches theme
        });
        setBookData({
          title: "",
          author: "",
          image: "",
          price: "",
          status: "published",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: data.message || "Failed to add book",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Add a Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={bookData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={bookData.author}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={bookData.image}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={bookData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="status"
          value={bookData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>
        <button
          type="submit"
          className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;

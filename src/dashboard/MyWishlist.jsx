import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      const token = await user.getIdToken();
      const res = await fetch(
        `https://bookcourier-server-bice.vercel.app/wishlist?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setWishlist(data);
      setLoading(false);
    };

    loadWishlist();
  }, [user]);

  const handleRemove = async (id) => {
    const token = await user.getIdToken();

    await fetch(`https://bookcourier-server-bice.vercel.app/wishlist/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setWishlist(prev => prev.filter(item => item._id !== id));

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Removed from wishlist",
      showConfirmButton: false,
      timer: 2000,
      background: "#e0f2fe",
      color: "#0369a1",
    });
  };

  if (loading) {
    return <div className="text-center py-20 text-black dark:text-white">Loading wishlist...</div>;
  }

  return (
    <section className="max-w-6xl mx-auto px-5 py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-sky-700 dark:text-sky-400 mb-8">
        My Wishlist
      </h2>

      {wishlist.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">Your wishlist is empty.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-lg transition p-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg font-semibold text-black dark:text-white">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {item.author}
            </p>

            <p className="text-sky-600 dark:text-sky-400 font-semibold mb-3">
              ${item.price}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-xs bg-sky-100 dark:bg-sky-700 text-sky-700 dark:text-sky-200 px-2 py-1 rounded">
                {item.category}
              </span>

              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Remove"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyWishlist;
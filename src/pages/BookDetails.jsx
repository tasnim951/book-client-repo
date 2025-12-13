import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const BookDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

 
  useEffect(() => {
    fetch(`http://localhost:5000/book/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      });
  }, [id]);

  if (authLoading) {
    return <div className="text-center py-20">Checking authentication...</div>;
  }

  
  if (!user) {
    return (
      <div className="text-center py-20 text-red-500">
        You must be logged in to place an order.
      </div>
    );
  }

 
  const handleOrder = async (e) => {
    e.preventDefault();

    const form = e.target;
    const phone = form.phone.value;
    const address = form.address.value;

    // Get Firebase ID token
    const idToken = await user.getIdToken();

    const orderData = {
      bookId: book._id,
      bookTitle: book.title,
      userName: user.displayName || "No Name",
      userEmail: user.email,
      phone,
      address,
      date: new Date().toISOString(),
      status: "pending",
      paymentStatus: "unpaid",
    };

    try {
      const res = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`, // send token
        },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (result.insertedId) {
        alert("Order placed successfully!");
        setShowModal(false);
      } else {
        alert(result.message || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading book details...</div>;
  }

  if (!book) {
    return <div className="text-center py-20 text-red-500">Book not found.</div>;
  }

  return (
    <section className="max-w-5xl mx-auto px-5 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      
        <div className="flex justify-center">
          <img
            src={book.image}
            alt={book.title}
            className="w-72 h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

       
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">{book.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <span className="font-semibold">Category:</span> {book.category}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <span className="font-semibold">Price:</span> ${book.price}
          </p>
          {book.status && (
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold">Status:</span> {book.status}
            </p>
          )}
          {book.addedAt && (
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold">Added At:</span>{" "}
              {new Date(book.addedAt).toLocaleDateString()}
            </p>
          )}
          <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">{book.description}</p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Order Now
          </button>
        </div>
      </div>

     
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div
            className="w-full max-w-lg p-8 rounded-2xl shadow-xl 
            bg-gradient-to-br from-sky-100 via-white to-sky-50 dark:from-sky-900 dark:via-gray-800 dark:to-sky-800
            animate-fadeIn"
          >
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
              Order: {book.title}
            </h2>

            <form onSubmit={handleOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={user.displayName || "No Name"}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address
                </label>
                <textarea
                  name="address"
                  rows="3"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                ></textarea>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg border border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookDetails;

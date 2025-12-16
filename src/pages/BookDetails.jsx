import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { FaStar, FaHeart } from "react-icons/fa";

const BookDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

 
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  
  useEffect(() => {
    fetch(`http://localhost:5000/book/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      });
  }, [id]);

  
  useEffect(() => {
    fetch(`http://localhost:5000/reviews?bookId=${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  if (authLoading) {
    return <div className="text-center py-20">Checking authentication...</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-20 text-red-500">
        You must be logged in to view this page.
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-20">Loading book details...</div>;
  }

  
  const handleOrder = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const token = await user.getIdToken();

      const orderData = {
        bookId: book._id,
        bookTitle: book.title,
        userName: user.displayName || "No Name",
        userEmail: user.email,
        price: book.price,
        phone: form.phone.value,
        address: form.address.value,
        createdAt: new Date().toISOString(),
        status: "pending",
        paymentStatus: "unpaid",
      };

      const res = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (result.success) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Order placed successfully",
          showConfirmButton: false,
          timer: 2000,
          background: "#e0f2fe",
          color: "#0369a1",
        });
        setShowModal(false);
      }
    } catch {
      Swal.fire("Error", "Failed to place order", "error");
    }
  };

  
  const handleWishlist = async () => {
    try {
      const token = await user.getIdToken();
      const res = await fetch("http://localhost:5000/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: book._id,
          bookTitle: book.title,
          image: book.image,
          price: book.price,
          author: book.author,
          category: book.category,
          userEmail: user.email,
        }),
      });

      const result = await res.json();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: result.message || "Added to wishlist",
        showConfirmButton: false,
        timer: 2000,
        background: "#e0f2fe",
        color: "#0369a1",
      });
    } catch {
      Swal.fire("Error", "Failed to add wishlist", "error");
    }
  };

  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();

      const res = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: book._id,
          userName: user.displayName,
          userEmail: user.email,
          rating,
          comment,
          createdAt: new Date().toISOString(),
        }),
      });

      const result = await res.json();

      if (result.success) {
        setReviews((prev) => [...prev, { ...result.review, userName: user.displayName, rating, comment }]);
        setComment("");

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Review submitted",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch {
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
     
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={book.image}
          alt={book.title}
          className="w-80 h-[450px] object-cover rounded-xl shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold mb-3">{book.title}</h1>
          <p className="text-gray-700 mb-1"><b>Author:</b> {book.author}</p>
          <p className="text-gray-700 mb-1"><b>Category:</b> {book.category}</p>
          <p className="text-gray-700 mb-4"><b>Price:</b> ${book.price}</p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg"
            >
              Order Now
            </button>

            <button
              onClick={handleWishlist}
              className="border border-sky-500 text-sky-600 px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <FaHeart /> Wishlist
            </button>
          </div>
        </div>
      </div>

      
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-sky-700 mb-6">
          Customer Reviews
        </h2>

        
        <form
          onSubmit={handleReviewSubmit}
          className="bg-sky-50 p-6 rounded-xl shadow mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={26}
                onClick={() => setRating(star)}
                className={`cursor-pointer ${
                  star <= rating ? "text-sky-500" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600">{rating}/5</span>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your honest review..."
            className="w-full border rounded-lg p-3"
            rows={4}
            required
          />

          <button className="mt-4 bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg">
            Submit Review
          </button>
        </form>

      
        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-5 mb-4 shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <p className="font-semibold text-sky-700">{r.userName}</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={16}
                    className={star <= r.rating ? "text-sky-500" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{r.comment}</p>
          </div>
        ))}
      </div>

   
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleOrder}
            className="bg-white p-6 rounded-xl w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4 text-sky-600">
              Order: {book.title}
            </h2>

            <input
              name="name"
              value={user.displayName || "No Name"}
              readOnly
              className="w-full border p-3 mb-3 rounded bg-gray-100"
            />
            <input
              name="email"
              value={user.email}
              readOnly
              className="w-full border p-3 mb-3 rounded bg-gray-100"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              className="w-full border p-3 mb-3 rounded"
              required
            />

            <textarea
              name="address"
              placeholder="Delivery Address"
              className="w-full border p-3 mb-3 rounded"
              required
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2"
              >
                Cancel
              </button>
              <button className="bg-sky-500 text-white px-5 py-2 rounded">
                Place Order
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default BookDetails;

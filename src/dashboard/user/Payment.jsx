import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../provider/AuthProvider";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:5000/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const currentOrder = data.find(o => o._id === id);
      setOrder(currentOrder);
      setLoading(false);
    };
    fetchOrder();
  }, [id, user]);

  const handlePayment = async () => {
    try {
      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:5000/orders/${id}/pay`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          toast: true,
          position: "top-end",
          timer: 2000,
          showConfirmButton: false,
          background: "#e0f2fe",
          color: "#0369a1",
        });
        navigate("/dashboard/invoices");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Payment failed",
        text: "Please try again later.",
      });
    }
  };

  if (loading) return <div className="text-center py-20">Loading order details...</div>;
  if (!order) return <div className="text-center py-20 text-red-500">Order not found.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-sky-800 mb-6 text-center">
          Complete Your Payment
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Order ID:</span>
            <span className="text-gray-900">{order._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Book Title:</span>
            <span className="text-gray-900">{order.bookTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Price:</span>
            <span className="text-gray-900">${order.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Payment Method:</span>
            <span className="text-gray-900">Demo Payment</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-gradient-to-r from-sky-600 to-sky-400 text-white font-semibold py-3 rounded-lg shadow hover:shadow-lg transition"
        >
          Confirm Payment
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By clicking confirm, you agree to our Terms and Conditions.
        </p>
      </div>
    </div>
  );
};

export default Payment;

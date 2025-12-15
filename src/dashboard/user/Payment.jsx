import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../provider/AuthProvider";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePayment = () => {
    fetch(`http://localhost:5000/orders/${id}/pay`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Payment Successful!");
          navigate("/dashboard/invoices");
        }
      });
  };

  return (
    <div className="bg-white p-6 shadow rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-sky-800">
        Payment Page
      </h2>

      <p className="mb-2">Order ID: {id}</p>
      <p className="mb-4">Payment Method: Demo Payment</p>

      <button
        onClick={handlePayment}
        className="bg-sky-600 text-white px-4 py-2 rounded"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default Payment;

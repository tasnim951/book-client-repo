import { useState, useEffect } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigate } from "react-router";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    fetch("http://localhost:5000/myorders", {
      headers: {
        Authorization: `Bearer ${user ? user.accessToken : ""}`
      }
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, [user]);

  const handleCancel = async (id) => {
    
    await fetch(`http://localhost:5000/order/${id}/cancel`, {
      method: "PATCH",
    });
    setOrders(prev => prev.map(o => o._id === id ? {...o, status: "cancelled"} : o));
  };

  const handlePayNow = (id) => {
    navigate(`/dashboard/pay/${id}`);
  };

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-bold mb-4 text-sky-800">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-sky-100">
            <tr>
              <th className="px-6 py-3 text-left">Book Title</th>
              <th className="px-6 py-3 text-left">Order Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order._id}>
                <td className="px-6 py-4">{order.bookTitle}</td>
                <td className="px-6 py-4">{new Date(order.orderedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 capitalize">{order.status}</td>
                <td className="px-6 py-4 space-x-2">
                  {order.status === "pending" && (
                    <>
                      <button 
                        onClick={() => handleCancel(order._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handlePayNow(order._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Pay Now
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;

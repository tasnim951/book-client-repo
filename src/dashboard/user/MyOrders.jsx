import { useState, useEffect } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigate } from "react-router";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://bookcourier-server-bice.vercel.app/myorders", {
      headers: {
        Authorization: `Bearer ${user ? user.accessToken : ""}`,
      },
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, [user]);

  const handleCancel = async (id) => {
    await fetch(`https://bookcourier-server-bice.vercel.app/orders/${id}/cancel`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    setOrders(prev =>
      prev.map(o =>
        o._id === id ? { ...o, status: "cancelled" } : o
      )
    );
  };

  const handlePayNow = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow rounded p-6 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 text-sky-800 dark:text-sky-400">
        My Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-sky-100 dark:bg-sky-900">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Book Title</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Order Date</th>
              <th className="px-6 py-3 text-left hidden md:table-cell text-gray-700 dark:text-gray-300">Status</th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map(order => (
              <tr key={order._id}>
                <td className="px-6 py-4 text-black dark:text-white">{order.bookTitle}</td>
                <td className="px-6 py-4 text-black dark:text-white">
                  {new Date(order.orderedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 capitalize hidden md:table-cell text-black dark:text-white">
                  {order.status}
                </td>

                <td className="px-6 py-4 flex flex-wrap gap-2">
                  {order.status === "pending" &&
                    order.paymentStatus === "unpaid" && (
                      <>
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="px-3 py-1 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => handlePayNow(order._id)}
                          className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700 transition-colors"
                        >
                          Pay Now
                        </button>
                      </>
                    )}

                  {order.paymentStatus === "paid" && (
                    <span className="text-blue-600 dark:text-blue-400 text-xl font-semibold">
                      Paid
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500 dark:text-gray-400">
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
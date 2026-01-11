import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `https://bookcourier-server-bice.vercel.app/librarian/orders`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [user]);

  const handleStatusChange = async (order, newStatus) => {
    try {
      const token = await user.getIdToken();
      await axios.patch(
        `https://bookcourier-server-bice.vercel.app/orders/${order._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Success", "Order status updated", "success");
      setOrders((prev) =>
        prev.map((o) => (o._id === order._id ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const handleCancel = async (order) => {
    try {
      const token = await user.getIdToken();
      await axios.patch(
        `https://bookcourier-server-bice.vercel.app/orders/${order._id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Cancelled", "Order cancelled successfully", "success");
      setOrders((prev) =>
        prev.map((o) => (o._id === order._id ? { ...o, status: "cancelled" } : o))
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to cancel order", "error");
    }
  };

  // ✅ Button animations
  const btnPrimary =
    "px-3 py-1 bg-sky-500 text-white rounded transition-all duration-200 ease-in-out hover:bg-sky-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-95";
  const selectBtn =
    "px-2 py-1 border border-sky-400 rounded bg-sky-500 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all duration-200 ease-in-out hover:bg-sky-600 cursor-pointer";

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-sky-800">Orders</h2>

      {/* ✅ MOBILE VIEW (Cards) */}
      <div className="space-y-4 sm:hidden">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow-sm flex flex-col gap-2"
          >
            <p className="font-semibold">{order.bookTitle}</p>
            <p className="text-sm text-gray-600">User: {order.userName}</p>
            <p className="text-sm capitalize">Status: {order.status}</p>

            {order.status !== "cancelled" ? (
              <div className="flex flex-wrap gap-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order, e.target.value)}
                  className={selectBtn}
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>

                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancel(order)}
                    className={btnPrimary}
                  >
                    Cancel
                  </button>
                )}
              </div>
            ) : (
              <span className="text-sky-500 font-semibold">Cancelled</span>
            )}
          </div>
        ))}
        {orders.length === 0 && (
          <p className="text-center text-gray-500">No orders yet.</p>
        )}
      </div>

      {/* ✅ TABLE VIEW (Tablet & Desktop) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr className="bg-sky-100 text-sky-800 font-semibold">
              <th className="py-2 px-4 border-b">Book</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="text-center border-b hover:bg-sky-50 transition-colors"
              >
                <td className="py-2 px-4">{order.bookTitle}</td>
                <td className="py-2 px-4">{order.userName}</td>
                <td className="py-2 px-4 capitalize">{order.status}</td>
                <td className="py-2 px-4 flex justify-center flex-wrap gap-2">
                  {order.status !== "cancelled" ? (
                    <>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order, e.target.value)}
                        className={selectBtn}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>

                      {order.status === "pending" && (
                        <button
                          onClick={() => handleCancel(order)}
                          className={btnPrimary}
                        >
                          Cancel
                        </button>
                      )}
                    </>
                  ) : (
                    <span className="text-sky-500 font-semibold">Cancelled</span>
                  )}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

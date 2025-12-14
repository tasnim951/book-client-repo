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
        const res = await axios.get(`http://localhost:5000/librarian/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
        `http://localhost:5000/orders/${order._id}/status`,
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
        `http://localhost:5000/orders/${order._id}/cancel`,
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

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="overflow-x-auto">
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
              <tr key={order._id} className="text-center border-b">
                <td className="py-2 px-4">{order.bookName}</td>
                <td className="py-2 px-4">{order.userEmail}</td>
                <td className="py-2 px-4 capitalize">{order.status}</td>
                <td className="py-2 px-4 space-x-2">
                  {order.status !== "cancelled" && (
                    <>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order, e.target.value)}
                        className="px-2 py-1 border rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                      {order.status === "pending" && (
                        <button
                          onClick={() => handleCancel(order)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      )}
                    </>
                  )}
                  {order.status === "cancelled" && <span className="text-gray-500">Cancelled</span>}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4">
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

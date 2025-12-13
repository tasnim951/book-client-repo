import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";

const Invoices = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/myinvoices", {
      headers: {
        Authorization: `Bearer ${user ? user.accessToken : ""}`
      }
    })
      .then(res => res.json())
      .then(data => setInvoices(data))
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-bold mb-4 text-sky-800">My Invoices</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-sky-100">
            <tr>
              <th className="px-6 py-3 text-left">Payment ID</th>
              <th className="px-6 py-3 text-left">Book Name</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map(inv => (
              <tr key={inv._id}>
                <td className="px-6 py-4">{inv.paymentId}</td>
                <td className="px-6 py-4">{inv.bookTitle || "-"}</td>
                <td className="px-6 py-4">${inv.amount}</td>
                <td className="px-6 py-4">{new Date(inv.date).toLocaleDateString()}</td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;

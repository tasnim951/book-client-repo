import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";

const Invoices = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("https://bookcourier-server-bice.vercel.app/myinvoices", {
      headers: {
        Authorization: `Bearer ${user ? user.accessToken : ""}`,
      },
    })
      .then(res => res.json())
      .then(data => setInvoices(data))
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div className="bg-white dark:bg-gray-900 shadow rounded p-4 sm:p-6 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 text-sky-800 dark:text-sky-400">
        My Invoices
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-sky-100 dark:bg-sky-900">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Payment ID</th>
              <th className="px-4 py-2 text-left hidden lg:table-cell text-gray-700 dark:text-gray-300">Book Name</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Amount</th>
              <th className="px-4 py-2 text-left hidden md:table-cell text-gray-700 dark:text-gray-300">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {invoices.map(inv => (
              <tr key={inv._id}>
                <td className="px-4 py-2 font-medium text-black dark:text-white">{inv.paymentId}</td>
                <td className="px-4 py-2 hidden lg:table-cell text-black dark:text-white">{inv.bookTitle || "-"}</td>
                <td className="px-4 py-2 font-semibold text-sky-700 dark:text-sky-400">
                  ${Number(inv.amount || 0).toFixed(2)}
                </td>
                <td className="px-4 py-2 hidden md:table-cell text-black dark:text-white">
                  {new Date(inv.date).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {invoices.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500 dark:text-gray-400">
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
import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await user.getIdToken();
      const res = await axios.get(
        "https://bookcourier-server-bice.vercel.app/admin/users",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data);
    };
    fetchUsers();
  }, [user]);

  const updateRole = async (id, role) => {
    const token = await user.getIdToken();
    await axios.patch(
      `https://bookcourier-server-bice.vercel.app/admin/users/${id}/role`,
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    Swal.fire("Success", `User is now ${role}`, "success");
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role } : u))
    );
  };

  // ✅ Button animation classes
  const btnLibrarian =
    "w-full sm:w-auto px-4 py-2 bg-sky-500 text-white rounded transition-all duration-200 ease-in-out hover:bg-sky-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-95";
  const btnAdmin =
    "w-full sm:w-auto px-4 py-2 bg-sky-700 text-white rounded transition-all duration-200 ease-in-out hover:bg-sky-800 hover:shadow-lg hover:-translate-y-0.5 active:scale-95";

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg sm:text-2xl font-bold mb-4 text-sky-700">
        All Users
      </h2>

      {/* MOBILE VIEW (Cards) */}
      <div className="space-y-4 sm:hidden">
        {users.map((u) => (
          <div key={u._id} className="border rounded-lg p-4 shadow-sm">
            <p className="text-sm break-all">
              <span className="font-semibold">Email:</span> {u.email}
            </p>
            <p className="mt-1 capitalize text-sm">
              <span className="font-semibold">Role:</span> {u.role}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <button
                onClick={() => updateRole(u._id, "librarian")}
                className={btnLibrarian}
              >
                Make Librarian
              </button>
              <button
                onClick={() => updateRole(u._id, "admin")}
                className={btnAdmin}
              >
                Make Admin
              </button>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>

      {/* TABLE VIEW (Tablet & Desktop) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-sky-100 text-sky-800">
            <tr>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-sky-50">
                <td className="py-3 px-4 break-all">{u.email}</td>
                <td className="py-3 px-4 capitalize">{u.role}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateRole(u._id, "librarian")}
                      className={btnLibrarian}
                    >
                      Make Librarian
                    </button>
                    <button
                      onClick={() => updateRole(u._id, "admin")}
                      className={btnAdmin}
                    >
                      Make Admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="py-6 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

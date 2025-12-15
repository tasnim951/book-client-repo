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
      const res = await axios.get("http://localhost:5000/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, [user]);

  const updateRole = async (id, role) => {
    const token = await user.getIdToken();
    await axios.patch(
      `http://localhost:5000/admin/users/${id}/role`,
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    Swal.fire("Success", `User is now ${role}`, "success");
    setUsers(prev =>
      prev.map(u => (u._id === id ? { ...u, role } : u))
    );
  };

  return (
    <div className="p-4 md:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-sky-700">All Users</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg min-w-[280px]">
          <thead className="bg-sky-100 text-sky-800">
            <tr>
              <th className="py-3 px-4 border-b text-left">Email</th>
              {/* Hide Role on small screens */}
              <th className="py-3 px-4 border-b text-left hidden sm:table-cell">Role</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b hover:bg-sky-50">
                <td className="py-3 px-4 break-words">{u.email}</td>
                <td className="py-3 px-4 capitalize hidden sm:table-cell">{u.role}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                    <button
                      onClick={() => updateRole(u._id, "librarian")}
                      className="w-full sm:w-auto px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
                    >
                      Make Librarian
                    </button>
                    <button
                      onClick={() => updateRole(u._id, "admin")}
                      className="w-full sm:w-auto px-4 py-2 bg-sky-700 text-white rounded hover:bg-sky-800 transition"
                    >
                      Make Admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 text-center text-gray-500">
                  No users found.
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

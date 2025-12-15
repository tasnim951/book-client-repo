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
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <table className="w-full border">
        <thead className="bg-sky-100">
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u._id} className="text-center border-t">
              <td>{u.email}</td>
              <td className="capitalize">{u.role}</td>
              <td className="space-x-2">
                <button
                  onClick={() => updateRole(u._id, "librarian")}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Make Librarian
                </button>
                <button
                  onClick={() => updateRole(u._id, "admin")}
                  className="px-2 py-1 bg-green-600 text-white rounded"
                >
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;

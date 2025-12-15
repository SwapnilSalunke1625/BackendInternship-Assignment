import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios.js";

const MakeAdmin = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch users assigned by THIS admin
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/v1/admin/getUsers");
      setUsers(res.data.users || []);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Promote user
  const handleMakeAdmin = async (email) => {
    try {
      await api.patch("/v1/admin/makeadmin", { email });
      toast.success("User promoted to Admin");

      setUsers((prev) =>
        prev.map((u) =>
          u.email === email ? { ...u, role: "ADMIN" } : u
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  // 🔍 Search filter
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">
        Users Assigned By Me
      </h3>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded"
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Role</th>
              <th className="border p-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2 font-semibold">
                  {user.role}
                </td>
                <td className="border p-2 text-center">
                  {user.role === "ADMIN" ? (
                    <span className="text-green-600 font-semibold">
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user.email)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Promote
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MakeAdmin;

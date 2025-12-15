import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllUsers, assignTask } from "../../api/admin.api.js";

const AssignTask = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showList, setShowList] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    userId: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();

        const normalUsers = res.data.users.filter((u) => u.role !== "ADMIN");

        setUsers(normalUsers);
        setFilteredUsers(normalUsers);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFilteredUsers(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      )
    );
  }, [search, users]);

  const handleAssign = async () => {
    if (!form.title || !form.userId) {
      return toast.error("Title and User are required");
    }

    try {
      setLoading(true);
      await assignTask(form);

      toast.success("Task assigned successfully");

      setForm({ title: "", description: "", userId: "" });
      setSelectedUser(null);
      setSearch("");
      setShowList(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl relative">
      <h3 className="text-xl font-semibold mb-4">Assign Task</h3>

      {/* Title */}
      <input
        className="border p-2 w-full mb-3"
        placeholder="Task title *"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* Description */}
      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Description (optional)"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* User Select */}
      <input
        className="border p-2 w-full mb-2"
        placeholder="Select user"
        value={
          selectedUser ? `${selectedUser.name} (${selectedUser.email})` : search
        }
        onFocus={() => setShowList(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelectedUser(null);
          setShowList(true);
        }}
        readOnly={!!selectedUser}
      />

      {/* Dropdown */}
      {showList && (
        <div className="border rounded max-h-40 overflow-y-auto mb-4 bg-white">
          {filteredUsers.length === 0 ? (
            <p className="p-2 text-sm text-gray-500">No users found</p>
          ) : (
            filteredUsers.map((u) => (
              <div
                key={u._id}
                onClick={() => {
                  setSelectedUser(u);
                  setForm({ ...form, userId: u._id });
                  setSearch("");
                  setShowList(false);
                }}
                className="p-2 cursor-pointer hover:bg-blue-50"
              >
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-gray-600">{u.email}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Assign Button */}
      <button
        onClick={handleAssign}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {loading ? "Assigning..." : "Assign Task"}
      </button>
    </div>
  );
};

export default AssignTask;

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAdminDashboard,
  deleteTask,
  updateTask,
} from "../../api/admin.api.js";

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });

  const loadTasks = async () => {
    try {
      const res = await getAdminDashboard();
      setTasks(res.data.tasks || []);
    } catch (err) {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      loadTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateTask(id, form);
      toast.success("Task updated");
      setEditTaskId(null);
      loadTasks();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="bg-white p-4 rounded shadow">
          {editTaskId === task._id ? (
            <>
              <input
                className="border p-2 w-full mb-2"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <textarea
                className="border p-2 w-full mb-2"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(task._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditTaskId(null)}
                  className="text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h4 className="font-semibold">{task.title}</h4>
              <p className="text-sm">{task.description}</p>
              <p className="text-xs text-gray-500">
                Assigned to: {task.assignedTo?.name || "N/A"}
              </p>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => {
                    setEditTaskId(task._id);
                    setForm({
                      title: task.title,
                      description: task.description,
                    });
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageTasks;

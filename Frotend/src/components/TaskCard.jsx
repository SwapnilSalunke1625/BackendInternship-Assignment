import React, { useState } from "react";
import { completeTask } from "../api/user.api.js";
import toast from "react-hot-toast";

function TaskCard({ task, onCompleted }) {
  const [loading, setLoading] = useState(false);

  // 🔹 Format helpers
  const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const assignedAt = formatDateTime(task.createdAt);
  const completedAt =
    task.completedAt && formatDateTime(task.completedAt);

  const handleComplete = async () => {
    try {
      setLoading(true);
      const res = await completeTask(task._id);
      toast.success("Task marked as completed");
      onCompleted(res.data.task); // pass updated task
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>
          Assigned by:{" "}
          <strong>{task.assignedBy?.name || "Admin"}</strong>
        </span>
        {task.status === "PENDING" ? (
          <span>Assigned: {assignedAt}</span>
        ) : (
          <span className="text-green-600">
            Completed: {completedAt}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-1">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 mb-3">
          {task.description}
        </p>
      )}

      {/* Action */}
      {task.status === "PENDING" && (
        <button
          onClick={handleComplete}
          disabled={loading}
          className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Completing..." : "Complete"}
        </button>
      )}
    </div>
  );
}

export default TaskCard;

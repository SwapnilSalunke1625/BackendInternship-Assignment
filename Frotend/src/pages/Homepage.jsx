import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMyTasks } from "../api/user.api.js";
import TaskCard from "../components/TaskCard.jsx";

function Homepage() {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getMyTasks();
        setPendingTasks(res.data.pending || []);
        setCompletedTasks(res.data.completed || []);
      } catch (err) {
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);


const handleTaskCompleted = (updatedTask) => {
  setPendingTasks((prev) =>
    prev.filter((t) => t._id !== updatedTask._id)
  );

  setCompletedTasks((prev) => [
    updatedTask,
    ...prev,
  ]);
};


  if (loading) {
    return <p className="text-center mt-10">Loading tasks...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

      {/* Pending */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-orange-600">
          Pending Tasks
        </h2>

        {pendingTasks.length === 0 ? (
          <p className="text-gray-500">No pending tasks 🎉</p>
        ) : (
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onCompleted={handleTaskCompleted}
              />
            ))}
          </div>
        )}
      </div>

      {/* Completed */}
      <div>
        <h2 className="text-xl font-semibold mb-3 text-green-600">
          Completed Tasks
        </h2>

        {completedTasks.length === 0 ? (
          <p className="text-gray-500">No completed tasks yet</p>
        ) : (
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <div key={task._id} className="opacity-80">
                <TaskCard task={task} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;

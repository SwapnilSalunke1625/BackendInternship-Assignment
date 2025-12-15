import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/admin.api.js";

const DashboardStat = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getAdminDashboard();
        setTasks(res.data.tasks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {tasks.map((task) => (
        <div key={task._id} className="border p-4 rounded mb-3 bg-white">
          <h3 className="font-semibold">{task.title}</h3>
          <p>{task.description}</p>

          <p className="text-sm text-gray-600">
            Assigned To: {task.assignedTo?.name} ({task.assignedTo?.email})
          </p>

          <p className="text-sm text-gray-600">
            Assigned By: {task.assignedBy?.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStat;

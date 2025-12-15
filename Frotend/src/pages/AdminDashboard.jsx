import { useState } from "react";
import Sidebar from "../../Components/Sidebar.jsx";

import DashboardStat from "../../Components/Admin/DashboardStat.jsx";
import MakeAdmin from "../../Components/Admin/MakeAdmin.jsx";
import AssignTask from "../../Components/Admin/AssignTask.jsx";
import ManageTasks from "../../Components/Admin/ManageTasks.jsx";

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderRightPanel = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardStat />;

      case "makeAdmin":
        return <MakeAdmin />;

      case "assignTask":
        return <AssignTask />;

      case "manageTask":
        return <ManageTasks />;

      default:
        return <DashboardStat />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0`}
      >
        <Sidebar
          setActiveView={setActiveView}
          closeSidebar={() => setSidebarOpen(false)}
        />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <button
          className="md:hidden mb-4 p-2 bg-gray-800 text-white rounded"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </button>

        {renderRightPanel()}
      </div>
    </div>
  );
}

import { useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import MakeAdmin from "../Admin/MakeAdmin.jsx";
import ManageTasks from "../Admin/ManageTasks.jsx";
import AssignTask from "../Admin/AssignTask.jsx";

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderRightPanel = () => {
    switch (activeView) {
      case "makeAdmin":
        return <MakeAdmin />;

      case "assignTask":
        return <AssignTask />;

      case "manageTask":
        return <ManageTasks />;

      case "dashboard":
      default:
        return (
          <div className="bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-semibold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Select an option from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <Sidebar
          setActiveView={setActiveView}
          closeSidebar={() => setSidebarOpen(false)}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6">
        {/* Mobile menu button */}
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

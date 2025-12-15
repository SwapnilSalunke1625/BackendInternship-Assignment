export default function Sidebar({ setActiveView, closeSidebar }) {
  const baseBtn =
    "w-full text-left px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200";

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-5 flex flex-col">
      
      {/* Close button for mobile */}
      <button
        className="md:hidden self-end mb-4 text-gray-600"
        onClick={closeSidebar}
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold ml-4 mt-2 mb-8 text-gray-800">
        Admin Panel
      </h2>

      <div className="flex flex-col space-y-3">

        <button
          onClick={() => { setActiveView("dashboard"); closeSidebar(); }}
          className={`${baseBtn} hover:bg-blue-100 hover:text-blue-700`}
        >
          Dashboard
        </button>

        <button
          onClick={() => { setActiveView("makeAdmin"); closeSidebar(); }}
          className={`${baseBtn} hover:bg-blue-100 hover:text-blue-700`}
        >
          Make Admin
        </button>

        <button
          onClick={() => { setActiveView("assignTask"); closeSidebar(); }}
          className={`${baseBtn} hover:bg-blue-100 hover:text-blue-700`}
        >
          Assign Task
        </button>

        <button
          onClick={() => { setActiveView("manageTask"); closeSidebar(); }}
          className={`${baseBtn} hover:bg-blue-100 hover:text-blue-700`}
        >
          Manage Tasks
        </button>

      </div>
    </div>
  );
}

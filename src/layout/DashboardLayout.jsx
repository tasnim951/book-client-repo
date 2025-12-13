import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../provider/AuthProvider";

const DashboardLayout = () => {
  const { user, role } = useAuth(); // use role from backend
  const [isOpen, setIsOpen] = useState(true); // sidebar open state

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar user={user} role={role} isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <main className="flex-1 p-6 relative">
        {/* Floating toggle button for small screens */}
        <button
          onClick={toggleSidebar}
          className="mb-4 px-3 py-2 bg-sky-600 text-white rounded shadow-md fixed top-4 left-4 z-50 md:hidden"
        >
          {isOpen ? "Close" : "Open"} Sidebar
        </button>

        {/* Outlet for nested pages */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

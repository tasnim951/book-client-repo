import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../provider/AuthProvider";

const DashboardLayout = () => {
  const { user } = useAuth();

  // TEMPORARY role for testing (replace later with backend role)
  const role = user?.email === "admin@example.com"
    ? "admin"
    : user?.email === "librarian@example.com"
    ? "librarian"
    : "user";

  const [isOpen, setIsOpen] = useState(true); // sidebar open state

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar user={user} role={role} isOpen={isOpen} />

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Floating toggle button */}
        <button
          onClick={toggleSidebar}
          className="mb-4 px-3 py-2 bg-sky-600 text-white rounded shadow-md fixed top-4 left-4 z-50 md:static md:mb-4"
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

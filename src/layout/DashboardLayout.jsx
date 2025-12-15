import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../provider/AuthProvider";

const DashboardLayout = () => {
  const { user, role } = useAuth();

  // Sidebar open state: open by default on desktop, closed on mobile
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Update sidebar state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        user={user}
        role={role}
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Navbar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow">
          <button
            onClick={toggleSidebar}
            className="text-2xl font-bold text-sky-600"
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold text-sky-600">Dashboard</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

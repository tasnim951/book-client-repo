import { Link, useLocation } from "react-router";
import { FiHome, FiX } from "react-icons/fi";

const Sidebar = ({ user, role, isOpen, toggleSidebar }) => {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path ? "bg-sky-100 font-semibold" : "";

  return (
    <>
     
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-screen md:h-auto w-64 bg-sky-200 shadow-lg
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        
        <div className="flex items-center justify-between p-4 border-b border-sky-300">
          <Link
            to="/"
            className="flex items-center gap-2 text-sky-800 font-bold text-lg"
          >
            <FiHome /> Home
          </Link>

          
          <button onClick={toggleSidebar} className="md:hidden text-2xl">
            <FiX />
          </button>
        </div>

        
        <div className="p-4 flex items-center gap-3 border-b border-sky-300">
          <img
            src={user?.photoURL || "https://via.placeholder.com/40"}
            className="w-12 h-12 rounded-full border"
            alt="profile"
          />
          <div>
            <p className="font-semibold">{user?.displayName || "User"}</p>
            <p className="text-sm capitalize text-gray-600">{role}</p>
          </div>
        </div>

       
        <nav className="px-4 py-4 space-y-1 text-sky-800">
          {/* USER */}
          {role === "user" && (
            <>
              <Link className={`block px-3 py-2 rounded ${isActive("/dashboard/my-orders")}`} to="/dashboard/my-orders">My Orders</Link>
              <Link className={`block px-3 py-2 rounded ${isActive("/dashboard/invoices")}`} to="/dashboard/invoices">Invoices</Link>
              <Link className={`block px-3 py-2 rounded ${isActive("/dashboard/profile")}`} to="/dashboard/profile">My Profile</Link>
              <Link className={`block px-3 py-2 rounded ${isActive("/dashboard/wishlist")}`}to="/dashboard/wishlist">My Wishlist</Link>

            </>
          )}

          {/* LIBRARIAN */}
          {role === "librarian" && (
            <>
              <Link className={`block px-3 py-2 rounded ${isActive("/dashboard/add-book")}`} to="/dashboard/add-book">Add Book</Link>
              <Link className={`block px-3 py-2 rounded ${isActive("/dashboard/my-books")}`} to="/dashboard/my-books">My Books</Link>
              <Link className={`block px-3 py-2 rounded ${isActive("/dashboard/orders")}`} to="/dashboard/orders">Orders</Link>
              <Link className={`block px-3 py-2 rounded ${isActive("/dashboard/profile")}`} to="/dashboard/profile">My Profile</Link>
            </>
          )}

          {/* ADMIN */}
          {role === "admin" && (
            <>
              <Link className={`block px-3 py-2 rounded ${isActive("/dashboard/all-users")}`} to="/dashboard/all-users">All Users</Link>
              <Link className={`block px-3 py-2 rounded ${isActive("/dashboard/manage-books")}`} to="/dashboard/manage-books">Manage Books</Link>
              <Link className={`block px-3 py-2 rounded ${isActive("/dashboard/profile")}`} to="/dashboard/profile">My Profile</Link>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

import { Link, useLocation } from "react-router";
import { useState } from "react";

const Sidebar = ({ user, role, isOpen, toggleSidebar }) => {
  const location = useLocation();

  // Helper to highlight active link
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Sidebar Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`bg-sky-200 min-h-screen p-4 transition-all duration-300
        ${isOpen ? "w-64" : "w-0 overflow-hidden"} 
        md:w-64 fixed md:relative top-0 left-0 z-40 shadow-lg`}
      >
        {isOpen && (
          <>
            {/* User Info */}
            <div className="mb-6 flex items-center gap-3">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                className="w-12 h-12 rounded-full border-2 border-sky-800"
                alt="profile"
              />
              <div>
                <p className="font-bold text-sky-800">{user?.displayName || "User"}</p>
                <p className="text-sm text-sky-700 capitalize">{role}</p>
              </div>
            </div>

            {/* Links */}
            <ul className="space-y-2 font-medium text-sky-800">
              {/* USER */}
              {role === "user" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/my-orders"
                      className={isActive("/dashboard/my-orders") ? "font-bold underline" : ""}
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/profile"
                      className={isActive("/dashboard/profile") ? "font-bold underline" : ""}
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/invoices"
                      className={isActive("/dashboard/invoices") ? "font-bold underline" : ""}
                    >
                      Invoices
                    </Link>
                  </li>
                </>
              )}

              {/* LIBRARIAN */}
              {role === "librarian" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/add-book"
                      className={isActive("/dashboard/add-book") ? "font-bold underline" : ""}
                    >
                      Add Book
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/my-books"
                      className={isActive("/dashboard/my-books") ? "font-bold underline" : ""}
                    >
                      My Books
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/orders"
                      className={isActive("/dashboard/orders") ? "font-bold underline" : ""}
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/profile"
                      className={isActive("/dashboard/profile") ? "font-bold underline" : ""}
                    >
                      My Profile
                    </Link>
                  </li>
                </>
              )}

              {/* ADMIN */}
              {role === "admin" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/all-users"
                      className={isActive("/dashboard/all-users") ? "font-bold underline" : ""}
                    >
                      All Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manage-books"
                      className={isActive("/dashboard/manage-books") ? "font-bold underline" : ""}
                    >
                      Manage Books
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/profile"
                      className={isActive("/dashboard/profile") ? "font-bold underline" : ""}
                    >
                      My Profile
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;

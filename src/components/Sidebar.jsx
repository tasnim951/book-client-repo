import { Link } from "react-router";

const Sidebar = ({ user, role, isOpen }) => {
  return (
    <div
      className={`bg-sky-200 min-h-screen p-4 transition-all duration-300
        ${isOpen ? "w-64" : "w-0 overflow-hidden"} 
        md:w-64 md:relative fixed md:translate-x-0 top-0 left-0 z-40`}
    >
      {isOpen && (
        <>
          {/* User Info */}
          <div className="mb-6 flex items-center gap-3">
            <img
              src={user?.photoURL || "https://via.placeholder.com/40"}
              alt="Profile"
              className="rounded-full w-12 h-12"
            />
            <p className="font-bold text-sky-800">{user?.displayName || "Guest"}</p>
          </div>

          {/* Links */}
          <ul className="space-y-2 text-sky-800 font-medium">
            {role === "user" && (
              <>
                <li>
                  <Link to="/dashboard/my-orders" className="hover:text-sky-600">My Orders</Link>
                </li>
                <li>
                  <Link to="/dashboard/profile" className="hover:text-sky-600">My Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard/invoices" className="hover:text-sky-600">Invoices</Link>
                </li>
              </>
            )}

            {role === "librarian" && (
              <>
                <li>
                  <Link to="/dashboard/add-book" className="hover:text-sky-600">Add Book</Link>
                </li>
                <li>
                  <Link to="/dashboard/my-books" className="hover:text-sky-600">My Books</Link>
                </li>
                <li>
                  <Link to="/dashboard/orders" className="hover:text-sky-600">Orders</Link>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <li>
                  <Link to="/dashboard/all-users" className="hover:text-sky-600">All Users</Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-books" className="hover:text-sky-600">Manage Books</Link>
                </li>
              </>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;

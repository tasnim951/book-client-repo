import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { MdOutlineMenu, MdClose, MdDarkMode, MdLightMode } from "react-icons/md";
import { FaBook } from "react-icons/fa"; 
import profileImg from "../assets/profile.png"; // your profile image
import { AuthContext } from "../provider/AuthProvider"; // your auth provider

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setDark(html.classList.contains("dark"));
    localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/allbooks" },
  ];

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logoutUser()
      .then(() => navigate("/"))
      .catch(err => console.error(err));
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaBook className="text-sky-400 text-3xl" />
          <span className="text-3xl font-extrabold text-black dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            BookCourier
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-[16px] font-medium transition ${
                  isActive
                    ? "bg-sky-400 text-white"
                    : "hover:bg-sky-200 dark:hover:bg-sky-700 dark:text-white text-black"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <button
            onClick={handleDashboard}
            className="px-4 py-2 rounded-lg font-medium hover:bg-sky-200 dark:hover:bg-sky-700"
          >
            Dashboard
          </button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-700 font-semibold"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-sky-400 text-white hover:bg-sky-500"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
              <img
                src={profileImg}
                alt="Profile"
                onClick={() => navigate("/profile")}
                className="w-8 h-8 rounded-full cursor-pointer border-2 border-sky-400"
              />
            </>
          )}

          <button
            onClick={toggleTheme}
            className="text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {dark ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <MdClose /> : <MdOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="flex flex-col gap-3 px-5 py-4">
            {navLinks.map(item => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-700"
              >
                {item.name}
              </NavLink>
            ))}

            <button
              onClick={() => {
                handleDashboard();
                setMenuOpen(false);
              }}
              className="px-4 py-2 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-700"
            >
              Dashboard
            </button>

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-700"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-lg bg-sky-400 text-white hover:bg-sky-500"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
                <img
                  src={profileImg}
                  alt="Profile"
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                  className="w-8 h-8 rounded-full cursor-pointer border-2 border-sky-400"
                />
              </>
            )}

            <button
              onClick={toggleTheme}
              className="text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 w-fit"
            >
              {dark ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

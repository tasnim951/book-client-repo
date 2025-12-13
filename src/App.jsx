import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// USER PAGES
import MyOrders from "./dashboard/user/MyOrders";
import MyProfile from "./dashboard/user/MyProfile";
import Invoices from "./dashboard/user/Invoices";

// LIBRARIAN PAGES
import AddBook from "./dashboard/librarian/AddBook";
import MyBooks from "./dashboard/librarian/MyBooks";
import Orders from "./dashboard/librarian/Orders";

// ADMIN PAGES
import AllUsers from "./dashboard/admin/AllUsers";
import ManageBooks from "./dashboard/admin/ManageBooks";

// Auth
import { useAuth } from "./provider/AuthProvider";

// ProtectedRoute Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // optional loading screen

  if (!user) return <Navigate to="/login" />; // not logged in
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/dashboard" />; // wrong role

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MAIN LAYOUT */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/allbooks" element={<AllBooks />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* DASHBOARD LAYOUT */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* USER DASHBOARD */}
          <Route
            path="my-orders"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="invoices"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Invoices />
              </ProtectedRoute>
            }
          />

          {/* LIBRARIAN DASHBOARD */}
          <Route
            path="add-book"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-books"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <MyBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <Orders />
              </ProtectedRoute>
            }
          />

          {/* ADMIN DASHBOARD */}
          <Route
            path="all-users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-books"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageBooks />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

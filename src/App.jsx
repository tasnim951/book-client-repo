import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import UserDashboard from "./dashboard/UserDashboard";
import LibrarianDashboard from "./dashboard/LibrarianDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";

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

        {/* DASHBOARDS */}
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/librarian" element={<LibrarianDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

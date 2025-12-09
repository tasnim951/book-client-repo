import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-1 mt-16 px-4 md:px-8">
        <Outlet />  {/* This renders the page inside the layout */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

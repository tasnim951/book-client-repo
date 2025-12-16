import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col 
    items-center justify-center bg-sky-50 px-4">
      <h1 className="text-8xl font-extrabold text-sky-600 
      mb-6">404</h1>
      <h2 className="text-3xl md:text-4xl 
        font-bold text-sky-700 mb-4">Page Not Found</h2>
      <p className="text-sky-500 text-center mb-6">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

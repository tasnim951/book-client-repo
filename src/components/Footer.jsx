import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { FaBook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-black dark:text-white pt-10 pb-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

        {/* Logo & Description */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FaBook className="text-sky-400 text-3xl" />
            <span className="text-3xl font-extrabold text-black dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              BookCourier
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-xs">
            Delivering books from library to your doorstep. Fast, reliable, and easy to use.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <a href="/" className="hover:text-sky-400 transition">Home</a>
          <a href="/allbooks" className="hover:text-sky-400 transition">All Books</a>
          <a href="/login" className="hover:text-sky-400 transition">Login</a>
          <a href="/register" className="hover:text-sky-400 transition">Register</a>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <div className="flex gap-4 text-xl mt-1">
            <a href="https://facebook.com" target="_blank" className="hover:text-sky-400 transition">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:text-sky-400 transition">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-sky-400 transition">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-8"></div>

      {/* Copyright */}
      <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
        © 2025 BookCourier. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

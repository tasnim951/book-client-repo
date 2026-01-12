import React from "react";
import { FaFacebookF, FaInstagram, FaBook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FaBook className="text-sky-500 text-3xl" />
            <span
              className="text-3xl font-extrabold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              BookCourier
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Delivering books from library to your doorstep.  
            Fast, reliable, and built for book lovers.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-sky-500 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/allbooks" className="hover:text-sky-500 transition">
                All Books
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-sky-500 transition">
                Login
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-sky-500 transition">
                Register
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-600 dark:text-gray-400">
              Email: support@bookcourier.com
            </li>
            <li className="text-gray-600 dark:text-gray-400">
              Phone: +880 1234-567890
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex gap-4">
            {[
              { icon: <FaFacebookF />, link: "https://facebook.com" },
              { icon: <FaInstagram />, link: "https://instagram.com" },
              { icon: <FaXTwitter />, link: "https://twitter.com" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="
                  w-10 h-10 flex items-center justify-center
                  rounded-full border border-gray-300 dark:border-gray-700
                  hover:bg-sky-500 hover:text-white
                  hover:border-sky-500
                  transition-all duration-300
                  hover:scale-110
                "
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 dark:border-gray-700 py-4">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} BookCourier. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { FaTruckFast } from "react-icons/fa6";
import { FaBookReader, FaUserShield, FaThumbsUp } from "react-icons/fa";

const WhyChoose = () => {
  const benefits = [
    {
      icon: <FaTruckFast className="text-sky-500 text-4xl" />,
      title: "Fast Delivery",
      desc: "Your requested books arrive at your home quickly and safely.",
    },
    {
      icon: <FaBookReader className="text-sky-500 text-4xl" />,
      title: "Huge Library Access",
      desc: "Borrow books from multiple libraries using one simple platform.",
    },
    {
      icon: <FaUserShield className="text-sky-500 text-4xl" />,
      title: "Secure & Reliable",
      desc: "Protected user data, safe authentication, and verified librarians.",
    },
    {
      icon: <FaThumbsUp className="text-sky-500 text-4xl" />,
      title: "Easy & User-Friendly",
      desc: "Order, track, and manage your books with a clean, simple UI.",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
        Why Choose <span className="text-sky-500">Book</span>Courier?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
              {item.title}
            </h3>
            <p className="text-center mt-2 text-gray-600 dark:text-gray-300">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;

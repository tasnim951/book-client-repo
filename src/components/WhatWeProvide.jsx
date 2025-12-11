import React from "react";
import { FaBook, FaChild, FaUniversity, FaCrown } from "react-icons/fa";

const WhatWeProvide = () => {
  const cards = [
    {
      icon: <FaBook className="text-sky-400 text-3xl" />,
      title: "Wide Book Selection",
      desc: "Fiction, novels, stories, academics — everything in one place.",
    },
    {
      icon: <FaChild className="text-sky-400 text-3xl" />,
      title: "Kids Category",
      desc: "Colorful, fun & educational books for growing minds.",
    },
    {
      icon: <FaUniversity className="text-sky-400 text-3xl" />,
      title: "Academic Support",
      desc: "College, school, and exam materials delivered fast.",
    },
    {
      icon: <FaCrown className="text-sky-400 text-3xl" />,
      title: "Premium Editions",
      desc: "Exclusive, limited & collector edition books.",
    },
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h2 className="text-3xl sm:text-3xl font-bold text-black dark:text-white">
          What We <span className="text-sky-400">Provide</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
          Discover everything we offer to make your reading journey smooth.
        </p>
      </div>

      {/* Main Flex Container */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

        {/* LEFT SIDE — Animated Blurry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 col-span-2">
          {cards.map((item, index) => (
            <div
              key={index}
              className="
                rounded-2xl p-3 sm:p-4
                bg-gradient-to-br from-sky-100/50 via-white/30 to-sky-50/30
                dark:from-gray-800/50 dark:via-gray-700/40 dark:to-gray-800/50
                backdrop-blur-lg
                shadow-lg
                transition-all duration-500 
                hover:scale-[1.05] hover:shadow-2xl
                animate-float
                cursor-pointer
              "
            >
              <div className="flex flex-col items-center text-center">
                {item.icon}
                <h3 className="text-base sm:text-lg font-semibold mt-2 text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE — Clean Modern Section */}
        <div
          className="
            rounded-2xl p-4 sm:p-6 shadow-lg 
            bg-gradient-to-br from-sky-100/50 via-white/30 to-sky-50/30
            dark:from-gray-800/50 dark:via-gray-700/40 dark:to-gray-800/50
            backdrop-blur-xl
            flex flex-col justify-center
            animate-smoothFade
          "
        >
          <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4">
            Our <span className="text-sky-400">Provision</span>
          </h3>

          <ul className="space-y-1 sm:space-y-2 text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
            <li> — We deliver books directly to your doorstep.</li>
            <li> — Access thousands of curated titles instantly.</li>
            <li> — Fast & reliable delivery for all categories.</li>
            <li> — Designed to make reading convenient & enjoyable.</li>
          </ul>

          <p className="mt-2 sm:mt-4 text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
            BookCourier exists to make reading accessible to everyone ~ anytime, anywhere.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhatWeProvide;

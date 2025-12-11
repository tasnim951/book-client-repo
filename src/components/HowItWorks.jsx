import React from "react";
import work1 from "../assets/work1.jpg";
import work2 from "../assets/work2.jpg";
import work3 from "../assets/work3.jpg";

const HowItWorks = () => {
  const steps = [
    {
      img: work1,
      title: "Choose Your Book",
      desc: "Browse thousands of books from our digital library and pick your favorite.",
    },
    {
      img: work2,
      title: "Place Your Order",
      desc: "Confirm your request and our system prepares the book for delivery.",
    },
    {
      img: work3,
      title: "Get It Delivered",
      desc: "Sit back while we deliver your book quickly and safely to your doorstep.",
    },
  ];

  return (
    <section className="py-16 px-5 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold text-black dark:text-white">
          How It <span className="text-sky-400">Works</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Simple steps to get your books delivered instantly.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-sky-300 rounded-xl shadow-md 
            p-6 flex flex-col items-center text-center 
            transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl"
          >
            <img
              src={step.img}
              alt={step.title}
              className="w-70 h-45 object-cover rounded-lg mb-4 
              transition-transform duration-300 hover:scale-110"
            />
            <h3 className="text-xl font-semibold text-black dark:text-white">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

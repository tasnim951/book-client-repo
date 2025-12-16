import React, { useRef, useEffect } from "react";

const reviews = [
  { text: "BookCourier has completely changed the way I borrow books. Fast, reliable and very easy!", name: "Alice" },
  { text: "Amazing service! I can get any book delivered to me quickly.", name: "John" },
  { text: "I love the variety of books available. Kids and adults alike are happy!", name: "Sophia" },
  { text: "The premium editions are simply amazing. Worth every penny!", name: "Michael" },
  { text: "Customer service is top-notch and delivery is super fast.", name: "Emma" },
];

const Testimonials = () => {
  const containerRef = useRef(null);

 
  useEffect(() => {
    const container = containerRef.current;
    let scrollAmount = 0;

    const scroll = () => {
      scrollAmount += 1;
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0; 
      }
      container.scrollLeft = scrollAmount;
      requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);
  }, []);

  return (
    <section className="bg-sky-50 dark:bg-gray-800 rounded-xl p-8 sm:p-10 my-16 overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-8">
        What Our Users 
        <span className="text-sky-500"> Say</span>
      </h2>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto cursor-grab"
        style={{
          scrollbarWidth: "none", 
          msOverflowStyle: "none", 
        }}
      >
       
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

       
        {[...reviews, ...reviews].map((review, index) => (
          <div
            key={index}
            className={`
              flex-shrink-0
              w-[300px] sm:w-[320px] md:w-[360px]
              rounded-2xl p-6
              bg-gradient-to-br from-white/30 via-sky-100/40 to-white/30
              dark:from-gray-800/40 dark:via-gray-700/30 dark:to-gray-800/40
              backdrop-blur-lg
              shadow-xl
              hover:shadow-2xl
              transition-all duration-500
              flex flex-col justify-between
            `}
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base">
              {`“${review.text}”`}
            </p>
            <h4 className="font-semibold text-black dark:text-white text-sm sm:text-base">
              – {review.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

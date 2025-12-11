import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="bg-gradient-to-r from-sky-100 via-white to-sky-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl p-10 sm:p-16 my-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
          Subscribe to <span className="text-sky-400">BookCourier</span>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg sm:text-xl">
          Get the latest books and exclusive offers delivered straight to your home.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full sm:w-auto flex-1
              px-6 py-4
              rounded-lg
              bg-white dark:bg-gray-900
              text-black dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-sky-400
              transition-all duration-300
              border border-gray-300 dark:border-gray-700
            "
          />
          <button
            type="submit"
            className="
              px-6 py-4
              rounded-lg
              bg-sky-400 hover:bg-sky-500
              text-white font-semibold
              transition-colors duration-300
            "
          >
            Subscribe
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-green-500 font-medium">
            Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;

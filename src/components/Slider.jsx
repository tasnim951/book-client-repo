// src/components/Slider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router";

// Import images from src/assets
import bookImg from "../assets/book.jpg";
import readImg from "../assets/read.jpg";
import kidsImg from "../assets/kids.jpg";
import deliveryImg from "../assets/delivery.jpg";

const slides = [
  {
    image: bookImg,
    title: "Discover Amazing Books",
    desc: "Explore a vast collection of books for all readers.",
  },
  {
    image: readImg,
    title: "Read Anywhere, Anytime",
    desc: "Borrow books from your library without leaving home.",
  },
  {
    image: kidsImg,
    title: "Kids' Books for Learning",
    desc: "Fun and educational books for children of all ages.",
  },
  {
    image: deliveryImg,
    title: "Fast & Reliable Delivery",
    desc: "Get your books delivered quickly to your doorstep.",
  },
];

const Slider = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[70vh] md:h-[65vh] flex items-center justify-center text-center mt-16">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover brightness-50"
              />
              <div className="relative z-10 text-white px-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  {slide.title}
                </h2>
                <p className="mt-2 md:mt-4 text-sm md:text-md">{slide.desc}</p>
                <Link
                  to="/allbooks"
                  className="mt-4 inline-block px-5 py-2 bg-sky-400 hover:bg-sky-500 text-black font-semibold rounded transition-colors duration-300"
                >
                  All Books
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;

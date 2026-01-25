"use client";
import { useState } from "react";

const images = [
  "/club1.jpg",
  "/club2.jpg",
  "/club3.jpg",
  "/club4.jpg",
  "/club5.jpg",
];

export default function HomeSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((c) => (c + 1) % images.length);
  const prevSlide = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-2xl group">
      <img
        src={images[current]}
        alt={`Club photo ${current + 1}`}
        className="w-full h-96 md:h-[500px] object-cover transition-all duration-700 scale-105 group-hover:scale-110"
      />
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-full p-3 shadow-lg hover:bg-yellow-400 hover:scale-110 transition"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-full p-3 shadow-lg hover:bg-yellow-400 hover:scale-110 transition"
      >
        &#8594;
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`block w-4 h-4 rounded-full transition-all duration-300 ${idx === current ? "bg-yellow-400 scale-125" : "bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}

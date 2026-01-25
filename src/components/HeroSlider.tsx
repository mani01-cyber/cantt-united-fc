"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const images = [
  "/club1.jpg",
  "/club2.jpg",
  "/club3.jpg",
  "/club4.jpg",
  "/club5.jpg",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((c) => (c + 1) % images.length);
  const prevSlide = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-screen overflow-hidden group">
      {/* Slider Images */}
      <img
        src={images[current]}
        alt={`Club photo ${current + 1}`}
        className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-110"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 transition-all duration-500"></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-yellow-400 animate-fade-in drop-shadow-lg">
          Cantt United FC
        </h1>
        <p className="text-2xl md:text-3xl text-yellow-300 mb-8 animate-slide-in drop-shadow-md">
          Passion, Excellence, Victory
        </p>
        <p className="text-lg md:text-xl text-white mb-12 max-w-2xl drop-shadow-md animate-fade-in">
          The Pride of Lahore. Join our community of football enthusiasts as we pursue greatness.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="/squad"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-3 rounded-lg font-bold flex items-center gap-2 transition-transform duration-300 hover:scale-110 drop-shadow-lg"
          >
            View Squad <ChevronRight size={24} />
          </Link>
          <Link
            href="/join"
            className="bg-black hover:bg-gray-900 border-2 border-yellow-400 text-yellow-400 px-10 py-3 rounded-lg font-bold flex items-center gap-2 transition-transform duration-300 hover:scale-110 drop-shadow-lg"
          >
            Try Out <ChevronRight size={24} />
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-yellow-400 text-black rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-125 z-10"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-yellow-400 text-black rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-125 z-10"
      >
        &#8594;
      </button>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`block w-4 h-4 rounded-full transition-all duration-300 ${
              idx === current
                ? "bg-yellow-400 scale-125"
                : "bg-white/70 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

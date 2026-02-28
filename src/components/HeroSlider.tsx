'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
    'https://res.cloudinary.com/deak2c1my/image/upload/v1769940053/IMG-20260130-WA0020_bhwlwq.jpg',
    'https://res.cloudinary.com/deak2c1my/image/upload/v1769699045/IMG-20251018-WA0040_hbaowq.jpg',
    'https://res.cloudinary.com/deak2c1my/image/upload/v1769698865/IMG-20250328-WA0093_ssjfg3.jpg',
    'https://res.cloudinary.com/deak2c1my/image/upload/v1769698909/IMG-20250517-WA0004_bluivw.jpg'
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-0 bg-slate-900">
            {slides.map((src, index) => (
                <Image
                    key={src}
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'
                        }`}
                    priority={index === 0}
                    sizes="100vw"
                />
            ))}
            {/* Simple dark overlay to make white text readable, completely removing the washed-out white transparency */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        </div>
    );
}

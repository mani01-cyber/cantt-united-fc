'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Play, Camera, Filter } from 'lucide-react';

export default function GalleryPage() {
    const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');

    const mediaItems = [
        { type: 'photo', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769698834/IMG-20250312-WA0023_utsfyv.jpg', title: 'Team Lineup' },
        { type: 'video', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769698865/IMG-20250328-WA0093_ssjfg3.jpg', title: 'Match Highlights' },
        { type: 'photo', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769699045/IMG-20251018-WA0040_hbaowq.jpg', title: 'Training Session' },
        { type: 'photo', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769679646/club4_ov2upg.jpg', title: 'Victory Celebration' },
        { type: 'video', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769698834/IMG-20250312-WA0023_utsfyv.jpg', title: 'Practice Drills' },
        { type: 'photo', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769698865/IMG-20250328-WA0093_ssjfg3.jpg', title: 'Fans Support' },
        { type: 'photo', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769699045/IMG-20251018-WA0040_hbaowq.jpg', title: 'Award Ceremony' },
        { type: 'photo', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769679646/club4_ov2upg.jpg', title: 'Youth Academy' },
        { type: 'video', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769698834/IMG-20250312-WA0023_utsfyv.jpg', title: 'Coach Talk' },
    ];

    const filteredItems = filter === 'all' ? mediaItems : mediaItems.filter(item => item.type === filter);

    return (
        <main className="min-h-screen bg-slate-950 text-white pb-20">
            {/* Header */}
            <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/deak2c1my/image/upload/v1769698834/IMG-20250312-WA0023_utsfyv.jpg"
                        alt="Header Background"
                        fill
                        className="object-cover opacity-30 blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950 to-slate-950" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-6 hover:text-white transition-colors">
                        <ChevronLeft size={20} /> BACK TO HOME
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">
                        CLUB <span className="text-primary text-glow">GALLERY</span>
                    </h1>
                    <p className="text-slate-400 mt-4 max-w-xl mx-auto">Explore the moments that define Cantt United.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="container mx-auto px-4 mb-12">
                <div className="flex flex-wrap items-center justify-center gap-4 py-6 border-y border-white/5">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-8 py-2 rounded-full font-bold transition-all ${filter === 'all' ? 'bg-primary text-black' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                    >
                        ALL MEDIA
                    </button>
                    <button
                        onClick={() => setFilter('photo')}
                        className={`px-8 py-2 rounded-full font-bold transition-all ${filter === 'photo' ? 'bg-primary text-black' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                    >
                        PHOTOS
                    </button>
                    <button
                        onClick={() => setFilter('video')}
                        className={`px-8 py-2 rounded-full font-bold transition-all ${filter === 'video' ? 'bg-primary text-black' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                    >
                        VIDEOS
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredItems.map((item, idx) => (
                        <div key={idx} className="group relative aspect-square rounded-3xl overflow-hidden glass-panel border-white/5 group bg-slate-900/50">
                            <Image
                                src={item.url}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                {item.type === 'video' ? (
                                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-black scale-90 group-hover:scale-100 transition-transform">
                                        <Play fill="currentColor" size={32} />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                                        <Camera size={32} />
                                    </div>
                                )}
                            </div>
                            <div className="absolute inset-0 pointer-events-none border-2 border-primary/0 group-hover:border-primary/50 transition-colors rounded-3xl" />

                            <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 text-center">
                                <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase mb-1 block">{item.type}</span>
                                <h3 className="text-white font-bold text-lg uppercase italic">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="container mx-auto px-4 mt-20 text-center">
                <div className="max-w-2xl mx-auto p-12 rounded-3xl glass-panel border-primary/20 bg-primary/5">
                    <h2 className="text-3xl font-black italic mb-4">WANT TO BE IN THE FRAME?</h2>
                    <p className="text-slate-400 mb-8">Join the squad today and start your journey with Lahore's elite football club.</p>
                    <Link href="/join" className="inline-block px-10 py-4 bg-primary text-black font-bold rounded-xl hover:scale-105 transition-transform">
                        JOIN THE SQUAD
                    </Link>
                </div>
            </div>
        </main>
    );
}

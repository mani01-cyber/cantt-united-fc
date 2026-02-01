'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Play, Camera, X } from 'lucide-react';
import LazyShow from '@/components/LazyShow';

// Helper to get thumbnail from Cloudinary URL (supports both image and video embed URLs)
const getMediaPreview = (item: { type: string; url: string }) => {
    if (item.type === 'photo') {
        // Optimize standard photo URLs
        if (item.url.includes('cloudinary.com')) {
            return item.url.replace('/upload/', '/upload/f_auto,q_auto,w_800/');
        }
        return item.url;
    }

    // For video embed URLs like: https://player.cloudinary.com/embed/?cloud_name=deak2c1my&public_id=VID-20260127-WA0010_moj2qy
    if (item.url.includes('player.cloudinary.com')) {
        const urlParams = new URLSearchParams(item.url.split('?')[1]);
        const cloudName = urlParams.get('cloud_name');
        const publicId = urlParams.get('public_id');
        if (cloudName && publicId) {
            return `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto,w_800/v1/${publicId}.jpg`;
        }
    }

    // Fallback for standard video upload URLs
    if (item.url.includes('video/upload')) {
        return item.url.replace('/video/upload/', '/video/upload/f_auto,q_auto,w_800/').replace(/\.[^/.]+$/, ".jpg");
    }

    return item.url;
};

function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
            onClick={onClose}
        >
            <button
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
                onClick={onClose}
            >
                <X size={40} />
            </button>
            <div
                className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <iframe
                    src={`${url}&autoplay=true`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}

export default function GalleryPage() {
    const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    const mediaItems = [
        { type: 'photo', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769699045/IMG-20251018-WA0045_fvleqw.jpg', title: 'Team Lineup' },
        { type: 'video', url: 'https://player.cloudinary.com/embed/?cloud_name=deak2c1my&public_id=VID-20260127-WA0010_moj2qy', title: 'Match Highlights' },
        { type: 'photo', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769698888/IMG-20250501-WA0043_tb4qag.jpg', title: 'Training Session' },
        { type: 'photo', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769679646/club4_ov2upg.jpg', title: 'Victory Celebration' },
        { type: 'video', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769698834/IMG-20250312-WA0023_utsfyv.jpg', title: 'Practice Drills' },
        { type: 'photo', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769699034/IMG-20250810-WA0060_ayzaz6.jpg', title: 'Fans Support' },
        { type: 'photo', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769698777/IMG-20241215-WA0002_ltty8s.jpg', title: 'Award Ceremony' },
        { type: 'photo', url: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769698069/IMG-20260102-WA0022_bihig5.jpg', title: 'Youth Academy' },
        { type: 'video', url: 'https://player.cloudinary.com/embed/?cloud_name=deak2c1my&public_id=VID-20260127-WA0011_tf1g0w', title: 'OUR pitch' },
        { type: 'video', url: 'https://res.cloudinary.com/deak2c1my/video/upload/v1769940033/VID-20250501-WA0034_rnwimh.mp4', title: 'MS GARRSION TOUR' },
    ];

    const filteredItems = filter === 'all' ? mediaItems : mediaItems.filter(item => item.type === filter);

    return (
        <main className="min-h-screen bg-slate-950 text-white pb-20">
            {activeVideo && <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />}

            {/* Header */}
            <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/deak2c1my/image/upload/v1769698834/IMG-20250312-WA0023_utsfyv.jpg"
                        alt="Header Background"
                        fill
                        className="object-cover opacity-30 blur-sm"
                        unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950 to-slate-950" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-6 hover:text-white transition-colors">
                        <ChevronLeft size={20} /> BACK TO HOME
                    </Link>
                    <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase">
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

            {/* Grid - Masonry style layout to show entire images */}
            <div className="container mx-auto px-4">
                <LazyShow>
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
                        {filteredItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="break-inside-avoid group relative rounded-3xl overflow-hidden glass-panel border-white/5 bg-slate-900/50 cursor-pointer"
                                onClick={() => item.type === 'video' ? setActiveVideo(item.url) : null}
                            >
                                <img
                                    src={getMediaPreview(item)}
                                    alt={item.title}
                                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
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
                </LazyShow>
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

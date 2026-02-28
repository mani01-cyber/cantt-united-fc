'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
    url: string;
    onClose: () => void;
}

export default function VideoModal({ url, onClose }: VideoModalProps) {
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-sm p-4 md:p-10"
            onClick={onClose}
        >
            <button
                className="absolute top-6 right-6 text-slate-900/50 hover:text-slate-900 transition-colors z-[110]"
                onClick={onClose}
            >
                <X size={40} />
            </button>
            <div
                className="relative w-full max-w-5xl aspect-video bg-white rounded-2xl overflow-hidden shadow-2xl"
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

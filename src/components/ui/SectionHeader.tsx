import React from 'react';

interface SectionHeaderProps {
    title: React.ReactNode;
    subtitle?: string;
    highlight?: string;
    highlightColor?: string;
    align?: 'center' | 'left' | 'right';
    className?: string;
}

export default function SectionHeader({
    title,
    subtitle,
    highlight,
    highlightColor = 'text-primary',
    align = 'center',
    className = ''
}: SectionHeaderProps) {
    return (
        <div className={`text-${align} mb-16 max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${className}`}>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 italic tracking-tighter mb-4">
                {title} {highlight && <span className={`${highlightColor} text-glow`}>{highlight}</span>}
            </h2>
            {subtitle && <p className="text-slate-600">{subtitle}</p>}
        </div>
    );
}

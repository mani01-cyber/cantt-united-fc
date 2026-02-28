import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export default function GlassCard({
    children,
    className = '',
    hoverEffect = true
}: GlassCardProps) {
    return (
        <div className={`glass-panel p-8 rounded-2xl ${hoverEffect ? 'group hover:border-primary/50 transition-colors cursor-default' : ''} ${className}`}>
            {children}
        </div>
    );
}

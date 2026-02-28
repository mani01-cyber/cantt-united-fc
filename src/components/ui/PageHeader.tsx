import React from 'react';

interface PageHeaderProps {
    title: React.ReactNode;
    highlight?: string;
    subtitle: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export default function PageHeader({
    title,
    highlight,
    subtitle,
    icon,
    children,
    className = ''
}: PageHeaderProps) {
    return (
        <section className={`relative py-20 lg:py-24 border-b border-slate-200 overflow-hidden ${className}`}>
            <div className="absolute inset-0 z-0 bg-slate-50 border-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
                    {icon && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 border border-slate-200 mb-8 border-primary/30 text-primary">
                            {icon}
                        </div>
                    )}
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
                        {title} {highlight && <span className="text-primary">{highlight}</span>}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light mb-8">
                        {subtitle}
                    </p>
                    {children}
                </div>
            </div>
        </section>
    );
}

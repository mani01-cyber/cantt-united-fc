'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollTime = 0;
    const throttleDelay = 50; // ms

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime >= throttleDelay) {
        setScrolled(window.scrollY > 20);
        lastScrollTime = now;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none px-4 sm:px-6 ${scrolled ? 'pt-2 sm:pt-4' : 'pt-4 sm:pt-6'}`}>
      <nav
        className={`pointer-events-auto mx-auto max-w-7xl rounded-2xl md:rounded-full transition-all duration-500 border ${scrolled
            ? 'bg-white/95 backdrop-blur-xl border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-2'
            : 'bg-white/80 backdrop-blur-lg border-white/50 shadow-sm py-4'
          }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Image
                  src="/logo.svg"
                  alt="Cantt United Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_10px_rgba(132,204,22,0.3)]"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <span className="block text-xl md:text-2xl font-black italic tracking-tighter text-slate-900 leading-none group-hover:text-primary transition-colors">CANTT</span>
                <span className="block text-xs md:text-sm font-bold tracking-widest text-primary leading-none uppercase mt-0.5">United</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              <NavLink href="/" currentPath={pathname}>Home</NavLink>
              <NavLink href="/about" currentPath={pathname}>About</NavLink>
              <NavLink href="/squad" currentPath={pathname}>Squad</NavLink>
              <NavLink href="/gallery" currentPath={pathname}>Gallery</NavLink>
              <NavLink href="/sponsors" currentPath={pathname}>Sponsors</NavLink>
              <NavLink href="/donate" currentPath={pathname}>Donate</NavLink>
              <NavLink href="/contact" currentPath={pathname}>Contact</NavLink>
            </div>

            {/* Right Side Actions & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-slate-900 bg-primary hover:bg-slate-900 hover:text-white rounded-full transition-colors tracking-wide uppercase shadow-[0_0_15px_rgba(132,204,22,0.3)]"
              >
                Admin
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-primary/20 text-slate-900 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} className="text-primary" /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`pointer-events-auto absolute top-full left-4 right-4 sm:left-6 sm:right-6 mt-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 lg:hidden origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0 border-none'
          }`}
      >
        <div className="p-4 flex flex-col gap-1">
          <MobileNavLink href="/" currentPath={pathname}>Home</MobileNavLink>
          <MobileNavLink href="/about" currentPath={pathname}>About</MobileNavLink>
          <MobileNavLink href="/squad" currentPath={pathname}>Squad</MobileNavLink>
          <MobileNavLink href="/gallery" currentPath={pathname}>Gallery</MobileNavLink>
          <MobileNavLink href="/sponsors" currentPath={pathname}>Sponsors</MobileNavLink>
          <MobileNavLink href="/donate" currentPath={pathname}>Donate</MobileNavLink>
          <MobileNavLink href="/contact" currentPath={pathname}>Contact</MobileNavLink>
          <div className="pt-4 mt-2 border-t border-slate-100">
            <Link
              href="/login"
              className="flex w-full items-center justify-center px-6 py-3 text-base font-bold text-slate-900 bg-primary rounded-xl"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({ href, currentPath, children }: { href: string; currentPath: string; children: React.ReactNode }) {
  const isActive = currentPath === href || (href !== '/' && currentPath.startsWith(href));

  return (
    <Link
      href={href}
      className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${isActive
          ? 'bg-slate-900 text-primary shadow-md'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, currentPath, children }: { href: string; currentPath: string; children: React.ReactNode }) {
  const isActive = currentPath === href || (href !== '/' && currentPath.startsWith(href));

  return (
    <Link
      href={href}
      className={`block px-5 py-3.5 text-base font-bold uppercase tracking-wide rounded-xl transition-all duration-300 ${isActive
          ? 'bg-slate-900 text-primary'
          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
        }`}
    >
      {children}
    </Link>
  );
}

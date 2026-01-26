'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-16 h-16 transition-transform group-hover:scale-105">
                <Image
                  src="/logo.svg"
                  alt="Cantt United Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(132,204,22,0.5)]"
                />
              </div>
              <div className="hidden sm:block">
                <span className="block text-2xl font-black italic tracking-tighter text-white leading-none">CANTT</span>
                <span className="block text-lg font-bold tracking-widest text-primary leading-none">UNITED</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/squad">Squad</NavLink>
            <NavLink href="/contact">Contact</NavLink>

            {session?.user ? (
              <div className="flex items-center space-x-4 ml-4">
                {(session.user as any).role === 'ADMIN' && (
                  <Link href="/admin/dashboard" className="text-sm font-bold text-primary hover:text-white transition">
                    ADMIN DASHBOARD
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="px-5 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all text-sm font-bold"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="ml-4 flex items-center space-x-4">
                <Link href="/auth/login" className="text-sm font-bold hover:text-primary transition opacity-50 hover:opacity-100">
                  ADMIN
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10 absolute w-full left-0">
          <div className="px-4 py-6 space-y-4">
            <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
            <MobileNavLink href="/squad" onClick={() => setIsOpen(false)}>Squad</MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>

            <div className="h-px bg-white/10 my-4" />

            {session?.user ? (
              <>
                {(session.user as any).role === 'ADMIN' && (
                  <MobileNavLink href="/admin/dashboard" onClick={() => setIsOpen(false)}>Admin Dashboard</MobileNavLink>
                )}
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-3 text-red-500 font-bold hover:bg-white/5 rounded-lg"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-2">
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center w-full py-3 border border-white/20 rounded-lg font-bold hover:bg-white/5 opacity-50"
                >
                  ADMIN LOGIN
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}

'use client';

import Link from 'next/link';
import { Instagram, Linkedin, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-slate-950 border-t border-white/10 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

            <div className="relative z-10 container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-4 gap-12 mb-12">

                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-black text-black">
                                CU
                            </div>
                            <div>
                                <h3 className="text-xl font-black italic text-white">CANTT</h3>
                                <p className="text-sm font-bold text-primary">UNITED</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Building champions on and off the field since 2007. Lahore's premier football club.
                        </p>

                        {/* Social Media Links */}
                        <div className="flex gap-3">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                            >
                                <Instagram size={18} className="text-slate-400 group-hover:text-black transition-colors" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                            >
                                <Linkedin size={18} className="text-slate-400 group-hover:text-black transition-colors" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                            >
                                <Facebook size={18} className="text-slate-400 group-hover:text-black transition-colors" />
                            </a>
                            <a
                                href="mailto:info@canttunited.com"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                            >
                                <Mail size={18} className="text-slate-400 group-hover:text-black transition-colors" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-slate-400 hover:text-primary transition-colors text-sm">Home</Link></li>
                            <li><Link href="/about" className="text-slate-400 hover:text-primary transition-colors text-sm">About Us</Link></li>
                            <li><Link href="/squad" className="text-slate-400 hover:text-primary transition-colors text-sm">Squad</Link></li>
                            <li><Link href="/contact" className="text-slate-400 hover:text-primary transition-colors text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Join Us */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Get Involved</h4>
                        <ul className="space-y-3">
                            <li><Link href="/join" className="text-slate-400 hover:text-primary transition-colors text-sm">Join the Squad</Link></li>
                            <li><Link href="/contact" className="text-slate-400 hover:text-primary transition-colors text-sm">Become a Sponsor</Link></li>
                            <li><Link href="/contact" className="text-slate-400 hover:text-primary transition-colors text-sm">Fan Membership</Link></li>
                            <li><Link href="/admin/dashboard" className="text-slate-400 hover:text-primary transition-colors text-sm">Admin Portal</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">Cantt Area, Lahore, Pakistan</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={16} className="text-primary mt-1 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">+92 XXX XXXXXXX</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={16} className="text-primary mt-1 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">info@canttunited.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm">
                            © {new Date().getFullYear()} Cantt United. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link href="/contact" className="text-slate-500 hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link href="/contact" className="text-slate-500 hover:text-primary transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

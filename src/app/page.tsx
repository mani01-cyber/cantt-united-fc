'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { ChevronRight, Trophy, Users, Zap, Clock, MapPin, Calendar, Play, Camera, Shield, Target } from 'lucide-react';
import LazyShow from '@/components/LazyShow';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  // Hero Background Image - Optimized
  const heroImage = 'https://res.cloudinary.com/deak2c1my/image/upload/f_auto,q_auto,w_1920/v1769698834/IMG-20250312-WA0023_utsfyv.jpg';

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <main className="min-h-screen relative bg-slate-950">

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden">
        {/* Optimized Hero Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Club Background"
            fill
            className="object-cover opacity-60"
            priority
            sizes="100vw"
            unoptimized={true}
          />
          {/* Gradients for readability and depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/30" />
          <div className="absolute inset-0 bg-slate-950/20 mixed-blend-multiply" />
        </div>

        {/* Decorative Background Blobs - Slightly simplified for performance */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] opacity-30" />

        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Hero Content */}
          <div className="space-y-8 text-center lg:text-left animate-fade-in-up">
            <div className="inline-block px-4 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent font-medium text-sm tracking-wide mb-2 backdrop-blur-sm">
              EST. 2007 • LAHORE
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] drop-shadow-lg">
              WE ARE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">UNITED</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              The future of football in Pakistan. Professional training, world-class facilities, and a legacy in the making.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/join"
                className="group relative px-8 py-4 bg-primary text-black font-bold text-lg rounded-xl overflow-hidden transition-transform hover:scale-105 shadow-lg shadow-primary/25"
              >
                <span className="relative z-10 group-hover:text-white transition-colors">JOIN THE SQUAD</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="relative z-10 py-24 px-4 bg-slate-950 border-t border-white/5">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for <span className="text-primary text-glow">Greatness</span></h2>
            <p className="text-slate-400 text-lg">
              We don&apos;t just play football; we cultivate talent, build character, and foster a championship mindset.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-8 rounded-2xl group hover:border-primary/50 transition-colors cursor-default">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Elite Excellence</h3>
              <p className="text-slate-400 leading-relaxed">
                Dedicated training programs designed by professional coaches to bring out the best in every player.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl group hover:border-accent/50 transition-colors cursor-default">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Strong Community</h3>
              <p className="text-slate-400 leading-relaxed">
                More than a club. A family of passionate fans, supportive teammates, and dedicated staff.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl group hover:border-pink-500/50 transition-colors cursor-default">
              <div className="w-14 h-14 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Rapid Growth</h3>
              <p className="text-slate-400 leading-relaxed">
                Clear pathways from academy to first team, with regular opportunities to showcase your talent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Media Gallery Section - Photos & Videos */}
      <section className="relative z-10 py-24 px-4 bg-slate-950 border-t border-white/5">
        <LazyShow>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4">
                  THE <span className="text-primary text-glow">GALLERY</span>
                </h2>
                <p className="text-slate-400">Capturing the intensity, passion, and spirit of Cantt United on and off the pitch.</p>
              </div>
              <Link
                href="/gallery"
                className="hidden md:flex items-center gap-2 px-8 py-4 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold hover:bg-primary hover:text-black transition-all group"
              >
                VIEW FULL GALLERY <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative group overflow-hidden rounded-3xl aspect-[16/9] md:aspect-[21/9] glass-panel border-white/10">
              <Image
                src="https://res.cloudinary.com/deak2c1my/image/upload/f_auto,q_auto,w_1920/v1769698834/IMG-20250312-WA0023_utsfyv.jpg"
                alt="Gallery Teaser"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="100vw"
                priority
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-center justify-center">
                <Link
                  href="/gallery"
                  className="md:hidden flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-black font-bold shadow-xl shadow-primary/25"
                >
                  EXPLORE GALLERY <ChevronRight size={20} />
                </Link>
              </div>
            </div>

            <div className="mt-8 text-center md:hidden">
              {/* Optional: Add a smaller link or text here if needed */}
            </div>
          </div>
        </LazyShow>
      </section>

      {/* Club History Section */}
      <section className="relative z-10 py-24 px-4 bg-slate-950 border-t border-white/5">
        <LazyShow>
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4">
                OUR <span className="text-primary text-glow">JOURNEY</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                From humble beginnings to becoming one of Lahore&apos;s most respected football clubs, our story is one of passion, dedication, and excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* History Image Cards */}
              {[
                { img: 'https://res.cloudinary.com/deak2c1my/image/upload/f_auto,q_auto,w_600/v1769679646/club4_ov2upg.jpg', year: '2007', title: 'The Beginning', desc: 'Founded with a vision to develop football talent in Lahore' },
                { img: 'https://res.cloudinary.com/deak2c1my/image/upload/f_auto,q_auto,w_600/v1769679646/club4_ov2upg.jpg', year: '2015', title: 'Rising Stars', desc: 'Our academy program produces top-tier players' },
                { img: 'https://res.cloudinary.com/deak2c1my/image/upload/f_auto,q_auto,w_600/v1769679646/club4_ov2upg.jpg', year: '2024', title: 'Champions Era', desc: 'Competing at the highest level with pride' }
              ].map((item, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl aspect-[4/3] glass-panel border-0">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-primary font-black text-2xl mb-2">{item.year}</div>
                    <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-slate-300 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30" />
              <div className="space-y-12">
                {[
                  { year: '2007', event: 'Club Founded', desc: 'Cantt United established in Lahore' },
                  { year: '2010', event: 'First Championship', desc: 'Won our first local tournament' },
                  { year: '2015', event: 'Academy Launch', desc: 'Youth development program initiated' },
                  { year: '2020', event: 'Professional Status', desc: 'Achieved professional club status' },
                  { year: '2024', event: 'Regional Champions', desc: 'Dominating the regional league' }
                ].map((milestone, idx) => (
                  <div key={idx} className={`flex items-center gap-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="inline-block glass-panel px-6 py-4 rounded-xl">
                        <div className="text-primary font-black text-lg mb-1">{milestone.year}</div>
                        <h4 className="text-white font-bold mb-1">{milestone.event}</h4>
                        <p className="text-slate-400 text-sm">{milestone.desc}</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-slate-950 relative z-10 flex-shrink-0" />
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </LazyShow>
      </section>

      {/* By The Numbers Section */}
      <section className="relative z-10 py-24 px-4 bg-slate-900/50 border-t border-white/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4">
              BY THE <span className="text-accent text-glow">NUMBERS</span>
            </h2>
            <p className="text-slate-400">Our achievements speak for themselves</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '500+', label: 'Matches Played', icon: '⚽' },
              { number: '1,200+', label: 'Goals Scored', icon: '🎯' },
              { number: '15', label: 'Trophies Won', icon: '🏆' },
              { number: '50+', label: 'Squad Members', icon: '👥' }
            ].map((stat, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-2xl text-center group hover:border-primary/50 transition-all">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-primary transition-colors">
                  {stat.number}
                </div>
                <div className="text-slate-400 font-medium uppercase text-sm tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Highlights/Achievements */}
      <section className="relative z-10 py-24 px-4 bg-slate-950 border-t border-white/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4">
              CLUB <span className="text-primary text-glow">HIGHLIGHTS</span>
            </h2>
            <p className="text-slate-400">Major milestones and achievements</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Regional Champions 2024', desc: 'Dominated the season with outstanding performance', color: 'primary' },
              { title: 'Best Youth Academy', desc: 'U16 and U19 recognized for excellence in player development', color: 'accent' },
              { title: '2nd in Khelta Punjab', desc: 'Making a difference beyond the pitch', color: 'pink-500' },
              { title: '12 Unbeaten Home Record', desc: '12 consecutive home victories', color: 'primary' },
              { title: 'Best Inter Club League', desc: 'we are the best in inter club league', color: 'accent' },
              { title: 'Fair Play Trophy', desc: 'Exemplary sportsmanship and discipline', color: 'pink-500' }
            ].map((achievement, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-xl group hover:border-primary/50 transition-all cursor-default">
                <div className={`w-12 h-12 rounded-lg bg-${achievement.color}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Trophy className={`w-6 h-6 text-${achievement.color}`} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{achievement.title}</h3>
                <p className="text-slate-400 text-sm">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trophy Cabinet */}
      <section className="relative z-10 py-24 px-4 bg-slate-900/50 border-t border-white/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4">
              TROPHY <span className="text-accent text-glow">CABINET</span>
            </h2>
            <p className="text-slate-400">Celebrating our victories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { name: 'RA bazar All Punjab', count: 1 },
              { name: 'RA bazar 9Aside', count: 2 },
              { name: 'Rafiq Memorial', count: 1 },
              { name: 'Khelta Punjab', count: 1 },
              { name: 'Community', count: 1 }
            ].map((trophy, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform border border-primary/30">
                    <Trophy className="w-12 h-12 text-primary" />
                  </div>
                  {trophy.count > 1 && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-black font-black text-sm flex items-center justify-center">
                      {trophy.count}
                    </div>
                  )}
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{trophy.name}</h4>
                <p className="text-slate-500 text-xs">
                  {trophy.count} {trophy.count === 1 ? 'Trophy' : 'Trophies'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The United Way - Philosophy Section */}
      <section className="relative z-10 py-32 px-4 bg-slate-950 overflow-hidden border-t border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <LazyShow>
          <div className="container mx-auto relative border-y border-white/5 py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
                  <Shield size={14} /> Our Philosophy
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white italic leading-[0.9] tracking-tighter text-center lg:text-left">
                  THE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">UNITED WAY</span>
                </h2>
                <p className="text-xl text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                  We believe in power, precision, and the relentless pursuit of excellence. Our club isn&apos;t just about winning games; it&apos;s about building a legacy that inspires the next generation of Pakistani champions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="flex flex-col items-center lg:items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Target className="text-primary w-6 h-6" />
                    </div>
                    <div className="text-center lg:text-left">
                      <h4 className="text-white font-bold mb-1">Elite Training</h4>
                      <p className="text-slate-400 text-sm">Pro-level technical drills and tactical mastery.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center lg:items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Users className="text-accent w-6 h-6" />
                    </div>
                    <div className="text-center lg:text-left">
                      <h4 className="text-white font-bold mb-1">Global Vision</h4>
                      <p className="text-slate-400 text-sm">Connecting local talent to international standards.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="relative aspect-square rounded-3xl overflow-hidden glass-panel border-white/10 border-2 group">
                  <Image
                    src="https://res.cloudinary.com/deak2c1my/image/upload/f_auto,q_auto,w_800/v1769679646/club4_ov2upg.jpg"
                    alt="Philosophy"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                  {/* Floating Elements for "Professional" feel */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute top-10 right-10 p-4 rounded-2xl glass-panel border-white/10 bg-slate-900/40 backdrop-blur-xl hidden md:block">
                    <div className="text-primary font-black text-2xl">100%</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">Commitment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LazyShow>
      </section>

      {/* Sponsors/Ticker Section - NEW */}
      <section className="py-10 bg-black border-y border-white/5 relative overflow-hidden z-10">
        <div className="flex gap-12 whitespace-nowrap animate-shimmer opacity-50">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-2xl font-black text-white/20 uppercase tracking-widest">
              <span>Suleman.co</span> • <span>Cantt United</span> • <span>esraahpk</span> •
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-4 overflow-hidden bg-slate-950">
        {/* Simplified Background for CTA to avoid clutter with slides */}
        <div className="absolute inset-0 bg-primary/5" />

        <div className="container mx-auto relative text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter text-white">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Dominate?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto">
            The pitch is calling. Join Cantt United today and start your journey to becoming a legend.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-200 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.7)]"
          >
            Start Your Journey <ChevronRight size={20} />
          </Link>
        </div>
      </section>

    </main>
  );
}

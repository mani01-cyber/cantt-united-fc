'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUpcomingFixture } from './actions';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { ChevronRight, Trophy, Users, Zap, Clock, MapPin, Calendar, Play, Camera, Shield, Target } from 'lucide-react';
import LazyShow from '@/components/LazyShow';

import HeroSlider from '@/components/HeroSlider';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [fixture, setFixture] = useState<any>(null);

  useEffect(() => {
    setLoading(false);
    getUpcomingFixture().then(res => {
      if (res.success && res.data) {
        setFixture(res.data);
      }
    });
  }, []);

  return (
    <main className="min-h-screen relative bg-white">

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center px-4 lg:px-16 pt-32 pb-20 overflow-hidden">
        <HeroSlider />

        <div className="container mx-auto relative z-10 pl-4 md:pl-8">
          <div className="max-w-4xl space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] font-black text-white uppercase tracking-tighter drop-shadow-2xl">
              WELCOME TO <br />
              CANTT UNITED FC!
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-lg md:text-2xl text-white uppercase tracking-widest font-bold drop-shadow-md">
              <span>JOIN OUR COMMUNITY</span>
              <span className="text-primary font-black hidden sm:inline">|</span>
              <span>UNLEASH YOUR POTENTIAL</span>
            </div>
            <div className="flex flex-wrap gap-4 pt-6">
              <Link
                href="/join"
                className="px-8 py-4 bg-primary text-slate-950 font-black uppercase text-lg rounded-full hover:bg-white transition-colors shadow-lg"
              >
                REGISTER NOW
              </Link>
              <Link
                href="/squad"
                className="px-8 py-4 border-2 border-white text-white font-black uppercase text-lg rounded-full hover:bg-white hover:text-slate-950 transition-colors shadow-lg"
              >
                EXPLORE OUR TEAMS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Info Section */}
      <section className="relative z-20 py-20 px-4 bg-white text-slate-900 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Column 1: Latest Matches */}
            <div>
              <h2 className="text-3xl font-black uppercase mb-8 text-slate-900 border-l-4 border-primary pl-4 tracking-tighter">LATEST MATCHES</h2>
              <div className="bg-slate-50 rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <div className="flex items-center gap-4">
                      <Image src="/apple-icon.png" alt="CU" width={32} height={32} className="w-8 h-8 rounded-full" />
                      United vs Comtel
                    </div>
                    <span>1 - 0</span>
                  </div>
                  <div className="border-t border-slate-200"></div>
                  <div className="flex justify-between items-center font-bold text-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs text-slate-900">GL</div>
                      FAME FC vs United
                    </div>
                    <span>3 - 0</span>
                  </div>
                </div>

                <div className="bg-slate-100 text-slate-900 rounded-xl p-6 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="text-primary font-black uppercase mb-2 text-sm tracking-wider flex items-center gap-2">
                      <Image src="/apple-icon.png" alt="CU" width={20} height={20} className="w-5 h-5 rounded-full" /> NEXT MATCH:
                    </div>
                    {fixture ? (
                      <>
                        <div className="text-xl md:text-2xl font-black mb-3 text-slate-900">UNITED VS {fixture.opponent.toUpperCase()}</div>
                        <div className="text-sm font-semibold text-slate-700">
                          {fixture.date} | {fixture.venue.toUpperCase()} | {fixture.time}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-xl md:text-2xl font-black mb-3 text-slate-900">FALCONS VS GLADIATORS</div>
                        <div className="text-sm font-semibold text-slate-700">
                          LOADING...
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Meet The Team */}
            <div>
              <h2 className="text-3xl font-black uppercase mb-8 text-slate-900 border-l-4 border-primary pl-4 tracking-tighter">MEET THE TEAM</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Link href="/squad">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 group">
                      <Image src="https://res.cloudinary.com/deak2c1my/image/upload/v1769699045/IMG-20251018-WA0045_fvleqw.jpg" alt="Senior Squad" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="text-center font-bold uppercase text-sm mt-2 text-slate-800 tracking-wider">SENIOR SQUAD</div>
                  </Link>
                </div>
                <div className="space-y-3">
                  <Link href="/squad">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 group">
                      <Image src="https://res.cloudinary.com/deak2c1my/image/upload/v1769698069/IMG-20260102-WA0022_bihig5.jpg" alt="Academy Boys" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="text-center font-bold uppercase text-sm mt-2 text-slate-800 tracking-wider">ACADEMY BOYS</div>
                  </Link>
                </div>
                <div className="space-y-3">
                  <Link href="/gallery">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 group">
                      <Image src="https://res.cloudinary.com/deak2c1my/image/upload/v1769698888/IMG-20250501-WA0043_tb4qag.jpg" alt="Training" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </Link>
                </div>
                <div className="space-y-3">
                  <Link href="/gallery">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 group">
                      <Image src="https://res.cloudinary.com/deak2c1my/image/upload/v1769698777/IMG-20241215-WA0002_ltty8s.jpg" alt="Events" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 3: Testimonials */}
            <div>
              <h2 className="text-3xl font-black uppercase mb-8 text-slate-900 border-l-4 border-primary pl-4 tracking-tighter">TESTIMONIALS</h2>
              <div className="bg-slate-50 rounded-2xl p-10 relative shadow-sm border border-slate-200 mt-6">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-100 p-1">
                  <Image src="/apple-icon.png" alt="CU" width={40} height={40} className="w-full h-full rounded-full object-cover" />
                </div>
                <p className="text-center text-xl font-medium italic mt-6 text-slate-700 leading-relaxed">
                  "A great place to develop skills and make friends. Best decision!"
                </p>
                <div className="flex justify-center gap-2 mt-8 text-yellow-500 text-2xl">
                  ★ ★ ★ ★ ★
                </div>
                {/* Speech bubble pointer */}
                <div className="absolute -bottom-4 left-12 w-8 h-8 bg-slate-50 transform rotate-45 border-r border-b border-slate-200"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="relative z-10 py-24 px-4 bg-white border-t border-slate-200">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for <span className="text-primary text-glow">Greatness</span></h2>
            <p className="text-slate-600 text-lg">
              We don&apos;t just play football; we cultivate talent, build character, and foster a championship mindset.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-8 rounded-2xl group hover:border-primary/50 transition-colors cursor-default">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Elite Excellence</h3>
              <p className="text-slate-600 leading-relaxed">
                Dedicated training programs designed by professional coaches to bring out the best in every player.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl group hover:border-accent/50 transition-colors cursor-default">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Strong Community</h3>
              <p className="text-slate-600 leading-relaxed">
                More than a club. A family of passionate fans, supportive teammates, and dedicated staff.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl group hover:border-pink-500/50 transition-colors cursor-default">
              <div className="w-14 h-14 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Rapid Growth</h3>
              <p className="text-slate-600 leading-relaxed">
                Clear pathways from academy to first team, with regular opportunities to showcase your talent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Media Gallery Section - Photos & Videos */}
      <section className="relative z-10 py-24 px-4 bg-white border-t border-slate-200">
        <LazyShow>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 italic tracking-tighter mb-4">
                  THE <span className="text-primary text-glow">GALLERY</span>
                </h2>
                <p className="text-slate-600">Capturing the intensity, passion, and spirit of Cantt United on and off the pitch.</p>
              </div>
              <Link
                href="/gallery"
                className="hidden md:flex items-center gap-2 px-8 py-4 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold hover:bg-primary hover:text-black transition-all group"
              >
                VIEW FULL GALLERY <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative group overflow-hidden rounded-3xl aspect-[16/9] md:aspect-[21/9] glass-panel border-slate-200">
              <Image
                src="https://res.cloudinary.com/deak2c1my/image/upload/f_auto,q_auto,w_1920/v1769698834/IMG-20250312-WA0023_utsfyv.jpg"
                alt="Gallery Teaser"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
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
      <section className="relative z-10 py-24 px-4 bg-white border-t border-slate-200">
        <LazyShow>
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 italic tracking-tighter mb-4">
                OUR <span className="text-primary text-glow">JOURNEY</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                From humble beginnings to becoming one of Lahore&apos;s most respected football clubs, our story is one of passion, dedication, and excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* History Image Cards */}
              {[
                { img: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769940039/IMG-20260130-WA0032_ta51lj.jpg', year: '2007', title: 'The Beginning', desc: 'Founded with a vision to develop football talent in Lahore' },
                { img: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769940039/IMG-20260130-WA0033_omxa53.jpg', year: '2015', title: 'Rising Stars', desc: 'Our academy program produces top-tier players' },
                { img: 'https://res.cloudinary.com/deak2c1my/image/upload/v1769699026/IMG-20250622-WA0013_f2p8nc.jpg', year: '2024', title: 'Champions Era', desc: 'Competing at the highest level with pride' }
              ].map((item, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl aspect-[4/3] glass-panel border-0">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
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
                        <h4 className="text-slate-900 font-bold mb-1">{milestone.event}</h4>
                        <p className="text-slate-600 text-sm">{milestone.desc}</p>
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
      <section className="relative z-10 py-24 px-4 bg-slate-50/50 border-t border-slate-200">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 italic tracking-tighter mb-4">
              BY THE <span className="text-accent text-glow">NUMBERS</span>
            </h2>
            <p className="text-slate-600">Our achievements speak for themselves</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '200+', label: 'Matches Played', icon: '⚽' },
              { number: '500+', label: 'Goals Scored', icon: '🎯' },
              { number: '5', label: 'Trophies Won', icon: '🏆' },
              { number: '30+', label: 'Squad Members', icon: '👥' }
            ].map((stat, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-2xl text-center group hover:border-primary/50 transition-all">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium uppercase text-sm tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Highlights/Achievements */}
      <section className="relative z-10 py-24 px-4 bg-white border-t border-slate-200">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 italic tracking-tighter mb-4">
              CLUB <span className="text-primary text-glow">HIGHLIGHTS</span>
            </h2>
            <p className="text-slate-600">Major milestones and achievements</p>
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
                <h3 className="text-slate-900 font-bold text-lg mb-2">{achievement.title}</h3>
                <p className="text-slate-600 text-sm">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trophy Cabinet */}
      <section className="relative z-10 py-24 px-4 bg-slate-50/50 border-t border-slate-200">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 italic tracking-tighter mb-4">
              TROPHY <span className="text-accent text-glow">CABINET</span>
            </h2>
            <p className="text-slate-600">Celebrating our victories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { name: 'RA bazar All Punjab', count: 1 },
              { name: 'RA bazar 9Aside', count: 2 },
              { name: 'Rafiq Memorial', count: 1 },
              { name: 'Khelta Punjab', count: 1 },

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
                <h4 className="text-slate-900 font-bold text-sm mb-1">{trophy.name}</h4>
                <p className="text-slate-500 text-xs">
                  {trophy.count} {trophy.count === 1 ? 'Trophy' : 'Trophies'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The United Way - Philosophy Section */}
      <section className="relative z-10 py-32 px-4 bg-white overflow-hidden border-t border-slate-200">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <LazyShow>
          <div className="container mx-auto relative border-y border-slate-200 py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
                  <Shield size={14} /> Our Philosophy
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 italic leading-[0.9] tracking-tighter text-center lg:text-left">
                  THE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">UNITED WAY</span>
                </h2>
                <p className="text-xl text-slate-700 leading-relaxed max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                  We believe in power, precision, and the relentless pursuit of excellence. Our club isn&apos;t just about winning games; it&apos;s about building a legacy that inspires the next generation of Pakistani champions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="flex flex-col items-center lg:items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100/80 border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <Target className="text-primary w-6 h-6" />
                    </div>
                    <div className="text-center lg:text-left">
                      <h4 className="text-slate-900 font-bold mb-1">Elite Training</h4>
                      <p className="text-slate-600 text-sm">Pro-level technical drills and tactical mastery.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center lg:items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100/80 border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <Users className="text-accent w-6 h-6" />
                    </div>
                    <div className="text-center lg:text-left">
                      <h4 className="text-slate-900 font-bold mb-1">Global Vision</h4>
                      <p className="text-slate-600 text-sm">Connecting local talent to international standards.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="relative aspect-square rounded-3xl overflow-hidden glass-panel border-slate-200 border-2 group">
                  <Image
                    src="https://res.cloudinary.com/deak2c1my/image/upload/v1769940049/IMG-20260130-WA0021_cfnbpx.jpg"
                    alt="Philosophy"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 1080px) 120vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Floating Elements for "Professional" feel */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute top-10 right-10 p-4 rounded-2xl glass-panel border-slate-200 bg-slate-50/40 backdrop-blur-xl hidden md:block">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </LazyShow>
      </section>

      {/* Sponsors/Ticker Section - NEW */}
      <section className="py-10 bg-white border-y border-slate-200 relative overflow-hidden z-10">
        <div className="flex gap-12 whitespace-nowrap animate-shimmer opacity-50">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-2xl font-black font-bold text-slate-900/20 uppercase tracking-widest">
              <span>Suleman.co</span> • <span>Cantt United</span> • <span>esraahpk</span> •
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-4 overflow-hidden bg-white">
        {/* Simplified Background for CTA to avoid clutter with slides */}
        <div className="absolute inset-0 bg-primary/5" />

        <div className="container mx-auto relative text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter text-slate-900">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Dominate?</span>
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto">
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

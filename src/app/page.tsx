'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Trophy, Users, Zap, Clock, MapPin, Calendar } from 'lucide-react';

export default function HomePage() {
  const [nextMatch, setNextMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Slide Config
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['/club1.jpg', '/club2.jpg', '/club3.jpg', '/club4.jpg', '/club5.jpg'];

  useEffect(() => {
    // Slideshow interval
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, [slides.length]);


  useEffect(() => {
    // Simulated data for immediate visual gratification while API connects
    const simulatedMatch = {
      opponent: "Lahore Lions",
      venue: "United Arena, Lahore",
      time: "20:00 PST",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days from now
    };

    setNextMatch(simulatedMatch);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!nextMatch) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const matchTime = new Date(nextMatch.date).getTime();
      const distance = matchTime - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / 1000 / 60) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextMatch]);

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-950">

      {/* Background Slideshow */}
      <div className="fixed inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-70' : 'opacity-0'}`}
          >
            <Image
              src={slide}
              alt="Club Background"
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Dark Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-slate-950/60 mixed-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20" />
          </div>
        ))}

        {/* Decorative Background Blobs Overlay */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] opacity-50" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/* Hero Content */}
          <div className="space-y-8 text-center lg:text-left animate-fade-in-up">
            <div className="inline-block px-4 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent font-medium text-sm tracking-wide mb-2 backdrop-blur-sm">
              EST. 2007 • LAHORE
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] drop-shadow-lg">
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
              <Link
                href="/fixtures"
                className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-colors backdrop-blur-md"
              >
                VIEW FIXTURES
              </Link>
            </div>
          </div>

          {/* Match Card (Floating Glass) */}
          <div className="relative animate-float delay-100">
            {!loading && nextMatch && (
              <div className="glass-panel rounded-3xl p-8 relative overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 backdrop-blur-xl bg-slate-900/60">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />

                <div className="flex justify-between items-center mb-8">
                  <span className="uppercase tracking-widest text-xs text-slate-400 font-bold">Next Match</span>
                  <div className="flex items-center space-x-2 text-accent">
                    <Clock size={16} />
                    <span className="text-sm font-bold">{nextMatch.time}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-10">
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-2 mx-auto font-black text-2xl text-black">
                      UFC
                    </div>
                    <span className="font-bold text-xl text-white">United</span>
                  </div>
                  <div className="text-4xl font-black text-slate-500">VS</div>
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-800 rounded-full flex items-center justify-center mb-2 mx-auto font-bold text-2xl border border-slate-700">
                      VS
                    </div>
                    <span className="font-bold text-xl text-white">{nextMatch.opponent.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-8">
                  {Object.entries(countdown).map(([unit, value]) => (
                    <div key={unit} className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
                      <div className="text-2xl font-bold text-white font-mono">{value}</div>
                      <div className="text-[10px] uppercase text-slate-500 font-bold">{unit}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center space-x-2 text-slate-400 text-sm border-t border-white/10 pt-4">
                  <MapPin size={16} />
                  <span>{nextMatch.venue}</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="relative z-10 py-24 px-4 bg-slate-950/90 backdrop-blur-xl border-t border-white/5">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for <span className="text-primary text-glow">Greatness</span></h2>
            <p className="text-slate-400 text-lg">
              We don't just play football; we cultivate talent, build character, and foster a championship mindset.
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

      {/* Featured Players Section - NEW */}
      <section className="relative z-10 py-24 px-4 bg-slate-950 border-t border-white/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4">PLAYERS TO <span className="text-primary text-glow">WATCH</span></h2>
            <p className="text-slate-400">Rising stars making their mark on the field.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: '/player1.jpg', name: 'SHAHID AZIZ', pos: 'Striker', num: 10, stats: { pace: 88, shot: 92, pas: 85 } },
              { img: '/player6.jpg', name: 'SULEMAN', pos: 'Midfielder', num: 8, stats: { pace: 82, shot: 78, pas: 90 } },
              { img: '/player3.jpg', name: 'MUSIYAB', pos: 'Defender', num: 4, stats: { pace: 75, shot: 60, pas: 82 } }
            ].map((player, idx) => (
              <div key={idx} className="group relative h-[500px] rounded-3xl overflow-hidden glass-panel border-0 bg-slate-900/50">
                {/* Image with blending mask */}
                <div className="absolute inset-0">
                  <Image
                    src={player.img}
                    alt={player.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay to simulate background removal/blending */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/90" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-8xl font-black text-white/5 absolute -top-24 -right-4 select-none group-hover:text-primary/10 transition-colors">
                      {player.num}
                    </div>
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 rounded bg-primary text-black font-bold text-xs uppercase tracking-wider mb-2">{player.pos}</span>
                      <h3 className="text-3xl font-black text-white uppercase italic leading-none mb-1">{player.name}</h3>
                    </div>

                    {/* Stats - Reveal on Hover */}
                    <div className="grid grid-cols-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-xl font-black text-accent">{player.stats.pace}</div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">PAC</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-black text-accent">{player.stats.shot}</div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">SHO</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-black text-accent">{player.stats.pas}</div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">PAS</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors rounded-3xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section - NEW */}
      <section className="relative z-10 py-24 px-4 bg-slate-900/50 border-t border-white/5">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Club <span className="text-accent">Updates</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer">
                <div className="absolute inset-0 bg-slate-800 transition-transform duration-500 group-hover:scale-110">
                  {/* Placeholder for News Image - In real app use <Image> */}
                  <div className={`w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 ${item === 1 ? 'opacity-80' : 'opacity-60'}`} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                  <span className="text-accent text-xs font-bold uppercase tracking-wider mb-2">Team News</span>
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                    {item === 1 ? "Victory in the Derby: Match Highlights" :
                      item === 2 ? "New Academy Trials Announced for March" : "Season Ticket Priority Access Now Open"}
                  </h3>
                  <div className="h-0 group-hover:h-6 overflow-hidden transition-all duration-300">
                    <span className="text-sm text-slate-300 inline-flex items-center gap-1">Read More <ChevronRight size={14} /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
            The pitch is calling. Join cantt United FC today and start your journey to becoming a legend.
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

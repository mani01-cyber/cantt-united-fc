'use client';

import Link from 'next/link';
import { Target, Heart, Users, Award, Shield, Timer } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-6xl font-black text-white italic tracking-tighter mb-4">OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">LEGACY</span></h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            More than just a football club. We are a movement, a community, and a training ground for the future stars of the game.
          </p>
        </div>

        {/* History Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-2">Since 2007</div>
            <h2 className="text-4xl font-bold text-white">The Pride of Lahore</h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                cantt United  was founded with a singular vision: to revolutionize football culture in Pakistan. What started as a small training camp has evolved into a premier institution dedicated to sporting excellence.
              </p>
              <p>
                We believe that talent exists everywhere, but opportunity does not. Our mission is to bridge that gap, providing world-class facilities and professional coaching to the youth of our nation.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-20 blur-xl rounded-2xl transform rotate-3" />
            <div className="glass-panel p-8 rounded-2xl relative">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-4">
                  <div className="text-4xl font-black text-white mb-2">500+</div>
                  <div className="text-sm text-slate-500 uppercase font-bold">Players Trained</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-black text-accent mb-2">12</div>
                  <div className="text-sm text-slate-500 uppercase font-bold">Trophies Won</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-black text-pink-500 mb-2">3</div>
                  <div className="text-sm text-slate-500 uppercase font-bold">Academies</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-black text-blue-400 mb-2">100%</div>
                  <div className="text-sm text-slate-500 uppercase font-bold">Passion</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="glass-panel p-8 rounded-2xl group hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="text-primary w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-slate-400 leading-relaxed">
              To nurture talent through holistic development, ensuring every player reaches their maximum potential both on and off the pitch.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-2xl group hover:border-accent/50 transition-colors">
            <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="text-accent w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-slate-400 leading-relaxed">
              To become the gold standard of football in South Asia, recognized for our state-of-the-art academy and competitive first team.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-2xl group hover:border-pink-500/50 transition-colors">
            <div className="w-14 h-14 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Heart className="text-pink-500 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
            <p className="text-slate-400 leading-relaxed">
              Integrity, Discipline, and Unity. We build character before we build players. We play hard, but we play fair.
            </p>
          </div>
        </div>

        {/* Leadership */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-12">Club Leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { role: "President", icon: Award, color: "text-amber-400" },
              { role: "Head Coach", icon: Timer, color: "text-emerald-400" },
              { role: "Medical Director", icon: Users, color: "text-blue-400" }
            ].map((item, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col items-center">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-white/10">
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white">{item.role}</h3>
                <p className="text-sm text-slate-500 mt-1">Tahir Iqbal</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-panel rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 w-full h-1 left-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <h2 className="text-4xl font-black text-white mb-6 uppercase italic">Join the <span className="text-primary">Revolution</span></h2>
          <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
            Whether you are a player, a fan, or a partner, there is a place for you at Cantt United.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/join" className="px-8 py-3 bg-primary hover:bg-violet-500 text-white font-bold rounded-full transition-colors shadow-lg shadow-primary/20">
              Join the Squad
            </Link>
            <Link href="/squad" className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full transition-colors border border-white/10">
              Meet the Team
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

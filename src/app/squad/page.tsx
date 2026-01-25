'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import Image from 'next/image';

type Player = {
  id: string;
  name: string;
  jerseyNumber: number;
  position: string;
  photo: string;
  nationality: string;
  stats: {
    age: number;
    height: string;
    matches: number;
    goals: number;
  };
};

// Using the uploaded player images
const SQUAD_DATA: Player[] = [
  {
    id: '1',
    name: 'Zain Ahmed',
    jerseyNumber: 10,
    position: 'Forward',
    photo: '/player1.jpg',
    nationality: 'Pakistan',
    stats: { age: 24, height: '1.82m', matches: 12, goals: 8 }
  },
  {
    id: '2',
    name: 'Bilal Khan',
    jerseyNumber: 8,
    position: 'Midfielder',
    photo: '/player2.jpg',
    nationality: 'Pakistan',
    stats: { age: 22, height: '1.78m', matches: 14, goals: 4 }
  },
  {
    id: '3',
    name: 'Omar Ali',
    jerseyNumber: 4,
    position: 'Defender',
    photo: '/player3.jpg',
    nationality: 'UK',
    stats: { age: 26, height: '1.85m', matches: 10, goals: 1 }
  },
  {
    id: '4',
    name: 'Sahil',
    jerseyNumber: 1,
    position: 'Keeper',
    photo: '/player1.jpg',
    nationality: 'Pakistan',
    stats: { age: 19, height: '1.85m', matches: 2, goals: 0 }
  },
  {
    id: '5',
    name: 'Raza',
    jerseyNumber: 4,
    position: 'Defender',
    photo: '/player3.jpg',
    nationality: 'Pakistan',
    stats: { age: 26, height: '1.85m', matches: 10, goals: 1 }
  },
];

export default function SquadPage() {
  const [activeIndex, setActiveIndex] = useState(1); // Start with middle player active

  const nextPlayer = () => {
    setActiveIndex((prev) => (prev + 1) % SQUAD_DATA.length);
  };

  const prevPlayer = () => {
    setActiveIndex((prev) => (prev - 1 + SQUAD_DATA.length) % SQUAD_DATA.length);
  };

  const activePlayer = SQUAD_DATA[activeIndex];

  // Calculate indices for visible neighbors
  const prevIndex = (activeIndex - 1 + SQUAD_DATA.length) % SQUAD_DATA.length;
  const nextIndex = (activeIndex + 1) % SQUAD_DATA.length;

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col pt-24">
      {/* Dynamic Background Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Angled Divider */}
        <div className="absolute top-0 right-[-20%] w-[70%] h-full bg-slate-900 transform -skew-x-12 border-l border-white/5" />
        <div className="absolute top-0 right-[20%] w-[30%] h-full bg-gradient-to-b from-primary/10 to-transparent transform -skew-x-12 opacity-50" />
      </div>

      <div className="container mx-auto px-4 flex-grow flex flex-col z-10">

        {/* Header */}
        <div className="flex justify-between items-end mb-12 pb-4 border-b border-white/10">
          <div>
            <div className="text-primary font-bold tracking-widest text-sm mb-2">TALENT MANAGEMENT</div>
            <h1 className="text-5xl font-black text-white italic tracking-tighter">THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">SQUAD</span></h1>
          </div>
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-primary to-primary-dark text-black font-bold px-8 py-3 rounded-tr-xl rounded-bl-xl transform transition-transform hover:scale-105 shadow-lg shadow-primary/25">
              GET IN TOUCH
            </button>
          </div>
        </div>

        {/* Carousel Area */}
        <div className="flex-grow relative flex items-center justify-center min-h-[500px]">

          {/* Prev Player (Left) */}
          <div
            className="hidden md:block absolute left-10 lg:left-32 opacity-40 scale-75 blur-[2px] transition-all duration-500 cursor-pointer hover:opacity-60"
            onClick={prevPlayer}
          >
            <div className="relative h-[400px] w-[250px] grayscale">
              <Image
                src={SQUAD_DATA[prevIndex].photo}
                alt="Previous"
                fill
                className="object-cover object-top mask-image-gradient"
              />
            </div>
          </div>

          {/* Active Player (Center) */}
          <div className="relative z-20 transform transition-all duration-500 scale-100 md:scale-110">
            {/* Glow Behind */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px]" />

            <div className="relative h-[400px] w-[300px] md:h-[550px] md:w-[400px]">
              <Image
                src={activePlayer.photo}
                alt={activePlayer.name}
                fill
                className="object-cover object-top drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                priority
              />
            </div>
          </div>

          {/* Next Player (Right) */}
          <div
            className="hidden md:block absolute right-10 lg:right-32 opacity-40 scale-75 blur-[2px] transition-all duration-500 cursor-pointer hover:opacity-60"
            onClick={nextPlayer}
          >
            <div className="relative h-[400px] w-[250px] grayscale">
              <Image
                src={SQUAD_DATA[nextIndex].photo}
                alt="Next"
                fill
                className="object-cover object-top mask-image-gradient"
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevPlayer}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary transition-all group z-30 bg-black/20 backdrop-blur-sm"
          >
            <ChevronLeft className="group-hover:text-primary transition-colors" />
          </button>
          <button
            onClick={nextPlayer}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary transition-all group z-30 bg-black/20 backdrop-blur-sm"
          >
            <ChevronRight className="group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Player Stats Footer */}
        <div className="mt-8 grid md:grid-cols-4 gap-8 border-t border-white/10 pt-8 pb-12 items-end">
          <div className="col-span-1">
            <div className="flex items-center gap-2 text-primary text-sm font-bold tracking-widest uppercase mb-1">
              Football Player
            </div>
            <h2 className="text-4xl font-black text-white uppercase italic leading-none">{activePlayer.name}</h2>
          </div>

          <div className="text-center md:text-left">
            <div className="text-4xl font-black text-white">{activePlayer.stats.age}</div>
            <div className="text-sm text-slate-500 font-bold uppercase tracking-wide">Years Old</div>
          </div>

          <div className="text-center md:text-left">
            <div className="text-4xl font-black text-white">{activePlayer.stats.height}</div>
            <div className="text-sm text-slate-500 font-bold uppercase tracking-wide">Height</div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-xl font-bold text-primary">{activePlayer.position}</span>
              <span className="text-4xl font-black text-white/10">#{activePlayer.jerseyNumber}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-primary/50 pl-4 py-1">
              A key player for {activePlayer.nationality}, known for their tactical awareness and technical skill on the ball.
            </p>
          </div>
        </div>

        {/* Progress Helper */}
        <div className="flex justify-center gap-2 pb-8">
          <span className="text-sm font-bold text-white">{(activeIndex + 1).toString().padStart(2, '0')}</span>
          <div className="w-24 h-5 flex items-center">
            <div className="w-full h-[2px] bg-slate-800 relative">
              <div
                className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / SQUAD_DATA.length) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-bold text-slate-600">{SQUAD_DATA.length.toString().padStart(2, '0')}</span>
        </div>

      </div>
    </main>
  );
}

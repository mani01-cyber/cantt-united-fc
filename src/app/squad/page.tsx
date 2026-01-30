'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LazyShow from '@/components/LazyShow';

type Player = {
  id: string;
  name: string;
  jerseyNumber: number;
  position: string;
  photo: string;
  bio: string; // Short 1-2 line player description
};

const optimizeCloudinary = (url: string, width: number = 800) => {
  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
};

// Senior Squad Data
const SENIOR_SQUAD: Player[] = [
  {
    id: '1',
    name: 'Abdullah',
    jerseyNumber: 17,
    position: 'Midfielder',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698758/IMG-20241222-WA0049_lhntlh.jpg'),
    bio: 'Dynamic midfielder with exceptional vision and passing ability. Known for controlling the tempo of the game.'
  },
  {
    id: '2',
    name: 'Qaisar',
    jerseyNumber: 10,
    position: 'Striker',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698758/IMG-20241222-WA0015_a8wbck.jpg'),
    bio: 'Versatile Striker with pace and defensive awareness. Contributes effectively in both attack and defense.'
  },
  {
    id: '3',
    name: 'Sadam',
    jerseyNumber: 7,
    position: 'Left Wing Back',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698020/IMG-20260129-WA0050_nbcp7d.jpg'),
    bio: 'Skillful left wing back  with excellent crossing ability and tactical intelligence on the pitch.'
  },
  {
    id: '4',
    name: 'Zohaib',
    jerseyNumber: 5,
    position: 'Defender',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698849/IMG-20250317-WA0071_ctyrcq.jpg'),
    bio: 'Solid defender with strong positioning and aerial dominance. A reliable presence in the backline.'
  },
  {
    id: '5',
    name: 'Mudassir',
    jerseyNumber: 7,
    position: 'Striker',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698759/IMG-20241222-WA0033_rwjbbb.jpg'),
    bio: 'Clinical striker with natural goal-scoring instinct. Leads the attack with pace, power, and precision.'
  },
  {
    id: '6',
    name: 'Tayyab',
    jerseyNumber: 7,
    position: 'Defender',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698097/IMG-20251123-WA0170_md2oy1.jpg'),
    bio: 'Solid defender with strong positioning and aerial dominance. A reliable presence in the backline.'
  },
  {
    id: '7',
    name: 'Suleman',
    jerseyNumber: 8,
    position: 'Right Wing Back',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769679689/player6_myfwq7.jpg'),
    bio: 'Skillful Right wing back  with excellent crossing ability and tactical intelligence on the pitch.'
  },
  {
    id: '8',
    name: 'Umer',
    jerseyNumber: 1,
    position: 'Goalkeeper',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698759/IMG-20241222-WA0033_rwjbbb.jpg'),
    bio: 'Best Goalkeeper in lahore'
  },
  {
    id: '9',
    name: 'Shahid',
    jerseyNumber: 17,
    position: 'Midfielder',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769679681/player1_ebfejw.jpg'),
    bio: 'Dynamic midfielder with exceptional vision and passing ability. Known for controlling the tempo of the game.'
  },
  {
    id: '10',
    name: 'Hanzla',
    jerseyNumber: 4,
    position: 'Defender',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698759/IMG-20241222-WA0033_rwjbbb.jpg'),
    bio: 'Solid defender with strong positioning and aerial dominance. A reliable presence in the backline.'
  },
  {
    id: '11',
    name: 'Arslan',
    jerseyNumber: 14,
    position: 'Defender',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769679683/player5_om8l1g.jpg'),
    bio: 'Solid defender with strong positioning and aerial dominance. A reliable presence in the backline.'
  },
  {
    id: '12',
    name: 'Musayab',
    jerseyNumber: 7,
    position: 'Left Wing Back',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769679683/player3_sjezop.jpg'),
    bio: 'Skillful left wing back  with excellent crossing ability and tactical intelligence on the pitch.'
  },
  {
    id: '13',
    name: ' zeeshan',
    jerseyNumber: 7,
    position: 'Striker',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769679683/player4_vn1ktn.jpg'),
    bio: 'Clinical striker with natural goal-scoring instinct. Leads the attack with pace, power, and precision.'
  },
  {
    id: '14',
    name: 'Musa',
    jerseyNumber: 7,
    position: 'Striker',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769699043/IMG-20251018-WA0091_xnrwet.jpg'),
    bio: 'Clinical striker with natural goal-scoring instinct. Leads the attack with pace, power, and precision.'
  },
  {
    id: '15',
    name: 'Raheel',
    jerseyNumber: 10,
    position: 'Striker',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698025/IMG-20251206-WA0000_k4oges.jpg'),
    bio: 'Clinical striker with natural goal-scoring instinct. Leads the attack with pace, power, and precision.'
  },
  {
    id: '16',
    name: 'Mudassir jr',
    jerseyNumber: 6,
    position: 'Midfielder',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698020/IMG-20260129-WA0090_p4usev.jpg'),
    bio: 'Dynamic midfielder with exceptional vision and passing ability. Known for controlling the tempo of the game.'
  },
];

// Youth Academy Data
const YOUTH_SQUAD: Player[] = [
  {
    id: 'y1',
    name: 'Rizwan',
    jerseyNumber: 23,
    position: 'Forward',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769699055/IMG-20250812-WA0006_jsgxsx.jpg'),
    bio: 'Promising young forward with great potential. Quick on the ball and eager to learn from senior players.'
  },
  {
    id: 'y2',
    name: 'Ikram',
    jerseyNumber: 1,
    position: ' Goalkeeper',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698851/IMG-20250413-WA0028_kxitlp.jpg'),
    bio: 'Talented academy Goalkeeper with excellent ball control. Shows maturity beyond his years in decision-making.'
  },
  {
    id: 'y3',
    name: 'Haseeb',
    jerseyNumber: 15,
    position: 'Midfielder',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698039/IMG-20260129-WA0025_nrzetq.jpg'),
    bio: 'Agile young midfielder with sharp reflexes. Demonstrates strong command of the penalty area and distribution.'
  },
  {
    id: 'y4',
    name: 'Ayyan',
    jerseyNumber: 8,
    position: 'Midfielder',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698072/IMG-20260129-WA0013_ycrkqo.jpg'),
    bio: 'Agile young midfielder with sharp reflexes. Demonstrates strong command of the penalty area and distribution.'
  },
  {
    id: 'y5',
    name: 'Zain',
    jerseyNumber: 10,
    position: 'Forward',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698066/IMG-20260129-WA0017_p8mhqt.jpg'),
    bio: 'Promising young forward with great potential. Quick on the ball and eager to learn from senior players.'
  },
  {
    id: 'y6',
    name: 'Haider',
    jerseyNumber: 1,
    position: ' Goalkeeper',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698062/IMG-20260129-WA0018_nwzxmr.jpg'),
    bio: 'Talented academy Goalkeeper with excellent ball control. Shows maturity beyond his years in decision-making.'
  },
  {
    id: 'y7',
    name: 'Khizer',
    jerseyNumber: 10,
    position: 'Forward',
    photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698045/IMG-20260129-WA0023_ufosdm.jpg'),
    bio: 'Promising young forward with great potential. Quick on the ball and eager to learn from senior players.'
  },
];

// Squad Slider Component
function SquadSlider({ title, players, accentColor }: { title: string; players: Player[]; accentColor: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextPlayer = () => {
    setActiveIndex((prev) => (prev + 1) % players.length);
  };

  const prevPlayer = () => {
    setActiveIndex((prev) => (prev - 1 + players.length) % players.length);
  };

  const activePlayer = players[activeIndex];
  const prevIndex = (activeIndex - 1 + players.length) % players.length;
  const nextIndex = (activeIndex + 1) % players.length;

  return (
    <div className="relative">
      {/* Section Title */}
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">
          {title}
        </h2>
        <div className={`h-1 w-32 ${accentColor} mt-2 rounded-full`} />
      </div>

      {/* Slider Container */}
      <div className="relative flex items-center justify-center min-h-[450px] md:min-h-[500px]">

        {/* Previous Player (Left) - Hidden on mobile */}
        {players.length > 1 && (
          <div
            className="hidden md:block absolute left-0 lg:left-20 opacity-30 scale-75 blur-[1px] transition-all duration-500 cursor-pointer hover:opacity-50 z-10"
            onClick={prevPlayer}
          >
            <div className="relative h-[350px] w-[220px] grayscale">
              <Image
                src={players[prevIndex].photo}
                alt="Previous"
                fill
                className="object-cover object-top rounded-lg"
                sizes="220px"
              />
            </div>
          </div>
        )}

        {/* Active Player (Center) */}
        <div className="relative z-20 transform transition-all duration-500">
          {/* Glow Effect */}
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] ${accentColor.replace('bg-', 'bg-')}/20 rounded-full blur-[100px]`} />

          {/* Player Image */}
          <div className="relative h-[400px] w-[280px] md:h-[500px] md:w-[350px]">
            <Image
              src={activePlayer.photo}
              alt={activePlayer.name}
              fill
              className="object-cover object-top rounded-lg shadow-2xl"
              priority
              sizes="(max-width: 768px) 280px, 350px"
            />

            {/* Jersey Number Overlay */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <span className="text-5xl font-black text-white/90">#{activePlayer.jerseyNumber}</span>
            </div>
          </div>
        </div>

        {/* Next Player (Right) - Hidden on mobile */}
        {players.length > 1 && (
          <div
            className="hidden md:block absolute right-0 lg:right-20 opacity-30 scale-75 blur-[1px] transition-all duration-500 cursor-pointer hover:opacity-50 z-10"
            onClick={nextPlayer}
          >
            <div className="relative h-[350px] w-[220px] grayscale">
              <Image
                src={players[nextIndex].photo}
                alt="Next"
                fill
                className="object-cover object-top rounded-lg"
                sizes="220px"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {players.length > 1 && (
          <>
            <button
              onClick={prevPlayer}
              className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:${accentColor} hover:border-transparent transition-all group z-30 bg-black/40 backdrop-blur-sm`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextPlayer}
              className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:${accentColor} hover:border-transparent transition-all group z-30 bg-black/40 backdrop-blur-sm`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Player Info Card */}
      <div className="mt-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
        <div className="grid md:grid-cols-3 gap-6 items-center">

          {/* Name & Position */}
          <div className="md:col-span-2">
            <div className={`text-sm font-bold tracking-widest uppercase mb-2 ${accentColor.replace('bg-', 'text-')}`}>
              {activePlayer.position}
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-tight">
              {activePlayer.name}
            </h3>


            {/* Player Bio */}
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              {activePlayer.bio}
            </p>
          </div>

          {/* Jersey Number Display */}
          <div className="flex justify-center md:justify-end">
            <div className={`${accentColor} rounded-2xl px-8 py-4 shadow-lg`}>
              <div className="text-center">
                <div className="text-sm font-bold text-black/70 uppercase tracking-wider mb-1">Number</div>
                <div className="text-6xl font-black text-black">#{activePlayer.jerseyNumber}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {players.length > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6 pt-6 border-t border-white/10">
            <span className="text-sm font-bold text-white">{(activeIndex + 1).toString().padStart(2, '0')}</span>
            <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${accentColor} transition-all duration-300 rounded-full`}
                style={{ width: `${((activeIndex + 1) / players.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-bold text-slate-500">{players.length.toString().padStart(2, '0')}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SquadPage() {
  return (
    <main className="min-h-screen bg-slate-950 relative pt-24 pb-16">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-[-20%] w-[70%] h-full bg-slate-900 transform -skew-x-12 border-l border-white/5" />
        <div className="absolute top-0 left-[-20%] w-[50%] h-full bg-gradient-to-b from-primary/5 to-transparent transform skew-x-12 opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Page Header */}
        <div className="flex justify-between items-end mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="text-primary font-bold tracking-widest text-sm mb-2">CANTT UNITED FC</div>
            <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">
              OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">SQUAD</span>
            </h1>
          </div>
        </div>

        {/* Senior Squad Section */}
        <div className="mb-20">
          <LazyShow>
            <SquadSlider
              title="Senior Squad"
              players={SENIOR_SQUAD}
              accentColor="bg-primary"
            />
          </LazyShow>
        </div>

        {/* Youth Academy Section */}
        <div className="mb-12">
          <LazyShow>
            <SquadSlider
              title="Youth Academy"
              players={YOUTH_SQUAD}
              accentColor="bg-emerald-500"
            />
          </LazyShow>
        </div>

      </div>
    </main>
  );
}

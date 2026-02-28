'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';

type Player = {
  id: string;
  name: string;
  jerseyNumber: number;
  position: string;
  photo: string;
  bio: string;
};

const optimizeCloudinary = (url: string, width: number = 600) => {
  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
};

// Senior Squad Data
const SENIOR_SQUAD: Player[] = [
  { id: '8', name: 'Umer', jerseyNumber: 1, position: 'Goalkeeper', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698759/IMG-20241222-WA0033_rwjbbb.jpg'), bio: 'Best Goalkeeper in Lahore' },
  { id: '4', name: 'Zohaib', jerseyNumber: 5, position: 'Defender', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698849/IMG-20250317-WA0071_ctyrcq.jpg'), bio: 'Solid defender with strong positioning and aerial dominance.' },
  { id: '6', name: 'Tayyab', jerseyNumber: 7, position: 'Defender', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698097/IMG-20251123-WA0170_md2oy1.jpg'), bio: 'Solid defender with strong positioning and aerial dominance.' },
  { id: '10', name: 'Hanzla', jerseyNumber: 4, position: 'Defender', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698759/IMG-20241222-WA0033_rwjbbb.jpg'), bio: 'Solid defender with strong positioning and aerial dominance.' },
  { id: '11', name: 'Arslan', jerseyNumber: 14, position: 'Defender', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769679683/player5_om8l1g.jpg'), bio: 'Solid defender with strong positioning and aerial dominance.' },
  { id: '3', name: 'Sadam', jerseyNumber: 7, position: 'Left Wing Back', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698020/IMG-20260129-WA0050_nbcp7d.jpg'), bio: 'Skillful left wing back with excellent crossing ability.' },
  { id: '12', name: 'Musayab', jerseyNumber: 7, position: 'Left Wing Back', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769679683/player3_sjezop.jpg'), bio: 'Skillful left wing back with excellent crossing ability.' },
  { id: '7', name: 'Suleman', jerseyNumber: 8, position: 'Right Wing Back', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769679689/player6_myfwq7.jpg'), bio: 'Skillful Right wing back with tactical intelligence.' },
  { id: '1', name: 'Abdullah', jerseyNumber: 17, position: 'Midfielder', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698758/IMG-20241222-WA0049_lhntlh.jpg'), bio: 'Dynamic midfielder with exceptional vision.' },
  { id: '9', name: 'Shahid', jerseyNumber: 17, position: 'Midfielder', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769679681/player1_ebfejw.jpg'), bio: 'Dynamic midfielder with exceptional passing ability.' },
  { id: '16', name: 'Mudassir jr', jerseyNumber: 6, position: 'Midfielder', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698020/IMG-20260129-WA0090_p4usev.jpg'), bio: 'Dynamic midfielder known for controlling the tempo.' },
  { id: '2', name: 'Qaisar', jerseyNumber: 10, position: 'Striker', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698758/IMG-20241222-WA0015_a8wbck.jpg'), bio: 'Versatile Striker with pace and defensive awareness.' },
  { id: '5', name: 'Mudassir', jerseyNumber: 7, position: 'Striker', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698759/IMG-20241222-WA0033_rwjbbb.jpg'), bio: 'Clinical striker with natural goal-scoring instinct.' },
  { id: '13', name: 'Zeeshan', jerseyNumber: 7, position: 'Striker', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769679683/player4_vn1ktn.jpg'), bio: 'Leads the attack with pace, power, and precision.' },
  { id: '14', name: 'Musa', jerseyNumber: 7, position: 'Striker', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769699043/IMG-20251018-WA0091_xnrwet.jpg'), bio: 'Clinical striker with natural goal-scoring instinct.' },
  { id: '15', name: 'Raheel', jerseyNumber: 10, position: 'Striker', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698025/IMG-20251206-WA0000_k4oges.jpg'), bio: 'Clinical striker with natural goal-scoring instinct.' },
];

// Youth Academy Data
const YOUTH_SQUAD: Player[] = [
  { id: 'y2', name: 'Ikram', jerseyNumber: 1, position: 'Goalkeeper', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698851/IMG-20250413-WA0028_kxitlp.jpg'), bio: 'Talented academy Goalkeeper with excellent ball control.' },
  { id: 'y6', name: 'Haider', jerseyNumber: 1, position: 'Goalkeeper', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698062/IMG-20260129-WA0018_nwzxmr.jpg'), bio: 'Talented academy Goalkeeper.' },
  { id: 'y3', name: 'Haseeb', jerseyNumber: 15, position: 'Midfielder', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698039/IMG-20260129-WA0025_nrzetq.jpg'), bio: 'Agile young midfielder with sharp reflexes.' },
  { id: 'y4', name: 'Ayyan', jerseyNumber: 8, position: 'Midfielder', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698072/IMG-20260129-WA0013_ycrkqo.jpg'), bio: 'Agile young midfielder with sharp reflexes.' },
  { id: 'y1', name: 'Rizwan', jerseyNumber: 23, position: 'Forward', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769699055/IMG-20250812-WA0006_jsgxsx.jpg'), bio: 'Promising young forward with great potential.' },
  { id: 'y5', name: 'Zain', jerseyNumber: 10, position: 'Forward', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698066/IMG-20260129-WA0017_p8mhqt.jpg'), bio: 'Promising young forward with great potential.' },
  { id: 'y7', name: 'Khizer', jerseyNumber: 10, position: 'Forward', photo: optimizeCloudinary('https://res.cloudinary.com/deak2c1my/image/upload/v1769698045/IMG-20260129-WA0023_ufosdm.jpg'), bio: 'Quick on the ball and eager to learn.' },
];

function groupPlayers(players: Player[]) {
  return {
    'Goalkeepers': players.filter(p => p.position.toLowerCase().includes('goalkeeper')),
    'Defenders': players.filter(p => p.position.toLowerCase().includes('defender') || p.position.toLowerCase().includes('back')),
    'Midfielders': players.filter(p => p.position.toLowerCase().includes('midfielder')),
    'Forwards': players.filter(p => p.position.toLowerCase().includes('striker') || p.position.toLowerCase().includes('forward')),
  };
}

function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-primary/50 transition-all duration-500 flex flex-col h-full">
      {/* Number Watermark */}
      <div className="absolute top-2 right-4 text-7xl font-black italic text-slate-100/50 z-0 pointer-events-none group-hover:text-primary/10 transition-colors duration-500">
        {player.jerseyNumber}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden shrink-0">
        <Image
          src={player.photo}
          alt={player.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info Container */}
      <div className="p-6 relative z-10 bg-white flex-grow flex flex-col justify-between transform transition-transform duration-500 group-hover:-translate-y-2">
        <div>
          <span className="text-primary font-bold text-xs uppercase tracking-widest mb-1 block">
            {player.position}
          </span>
          <h3 className="text-2xl font-black text-slate-900 italic uppercase mb-2">
            {player.name}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
            {player.bio}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Squad No.</span>
          <span className="text-xl font-black text-slate-900">#{player.jerseyNumber}</span>
        </div>
      </div>
    </div>
  );
}

export default function SquadPage() {
  const [activeTab, setActiveTab] = useState<'senior' | 'youth'>('senior');

  const squadData = activeTab === 'senior' ? SENIOR_SQUAD : YOUTH_SQUAD;
  const groups = groupPlayers(squadData);

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <PageHeader
        title="OUR "
        highlight="SQUAD"
        subtitle="Meet the talented players representing Cantt United FC."
        icon={<div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black mb-4">CU</div>}
      />

      <div className="container mx-auto px-4 mt-8">
        {/* Toggle Senior / Youth */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-white border border-slate-200 rounded-full p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('senior')}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'senior'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              First Team
            </button>
            <button
              onClick={() => setActiveTab('youth')}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'youth'
                  ? 'bg-primary text-slate-900 shadow-md'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              Youth Academy
            </button>
          </div>
        </div>

        {/* Squad Grid Grouped by Position */}
        <div className="max-w-7xl mx-auto space-y-24">
          {Object.entries(groups).map(([position, players]) => (
            players.length > 0 && (
              <div key={position} className="space-y-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-black text-slate-900 italic uppercase">{position}</h2>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {players.map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </main>
  );
}

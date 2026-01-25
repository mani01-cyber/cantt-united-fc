'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

type Fixture = {
  id: string;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  homeScore?: number;
  awayScore?: number;
  matchReport?: string;
};

export default function FixturesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [results, setResults] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');

  useEffect(() => {
    // Simulating data for preview purposes if API is not ready
    const simulateData = () => {
      setFixtures([
        { id: '1', opponent: 'Town Ship United', date: '2026-02-01', time: '15:00', venue: 'RA BAZZAR LHR' },
        { id: '2', opponent: 'Mughalpura', date: '2026-02-02', time: '15:00', venue: 'RA BAZZAR LHR' },
      ]);
      setResults([
        { id: '3', opponent: 'Comtel', date: '2026-01-20', time: '20:00', venue: 'MODEL TOWN GROUND', homeScore: 2, awayScore: 1 },
      ]);
      setLoading(false);
    };

    simulateData();

    /* Original fetch logic preserved but commented
    const fetchData = async () => {
      try {
        const [fixturesRes, resultsRes] = await Promise.all([
          fetch('/api/fixtures/upcoming'),
          fetch('/api/fixtures/results'),
        ]);
        if (fixturesRes.ok) setFixtures((await fixturesRes.json()).data);
        if (resultsRes.ok) setResults((await resultsRes.json()).data);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(); 
    */
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white italic tracking-tighter mb-4">MATCH <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">CENTER</span></h1>
          <p className="text-slate-400">Follow every moment of our journey.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 p-1 rounded-full backdrop-blur-md border border-white/10 inline-flex">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'upcoming'
                ? 'bg-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              UPCOMING
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'results'
                ? 'bg-accent text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              RESULTS
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-4">
          {loading ? (
            <div className="text-center text-slate-500 animate-pulse">Loading match data...</div>
          ) : activeTab === 'upcoming' ? (
            <div className="space-y-4">
              {fixtures.length === 0 ? (
                <div className="glass-panel text-center py-12 rounded-2xl">
                  <p className="text-slate-400">No upcoming fixtures scheduled.</p>
                </div>
              ) : (
                fixtures.map((fixture) => (
                  <div key={fixture.id} className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary hover:bg-white/5 transition-colors group">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                      <div className="flex items-center gap-4 w-full md:w-1/3 justify-start md:justify-end">
                        <span className="font-bold text-xl text-white">United FC</span>
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-black text-xs">UFC</div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="px-3 py-1 bg-white/10 rounded text-xs font-mono text-primary mb-2">VS</div>
                        <div className="text-slate-500 text-sm flex items-center gap-1"><Clock size={12} /> {fixture.time}</div>
                      </div>

                      <div className="flex items-center gap-4 w-full md:w-1/3 justify-end md:justify-start">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-400">VS</div>
                        <span className="font-bold text-xl text-white">{fixture.opponent}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-primary" />
                        {formatDate(fixture.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-accent" />
                        {fixture.venue}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {results.length === 0 ? (
                <div className="glass-panel text-center py-12 rounded-2xl">
                  <p className="text-slate-400">No results available yet.</p>
                </div>
              ) : (
                results.map((result) => (
                  <div key={result.id} className="glass-panel p-6 rounded-2xl border-l-4 border-l-accent hover:bg-white/5 transition-colors">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4 w-full md:w-1/3 justify-end">
                        <span className={`font-bold text-xl ${result.homeScore! > result.awayScore! ? 'text-accent' : 'text-white'}`}>United FC</span>
                        <span className="text-3xl font-black text-white">{result.homeScore}</span>
                      </div>

                      <div className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-slate-500">FT</div>

                      <div className="flex items-center gap-4 w-full md:w-1/3 justify-start">
                        <span className="text-3xl font-black text-white">{result.awayScore}</span>
                        <span className="font-bold text-xl text-slate-300">{result.opponent}</span>
                      </div>
                    </div>
                    <div className="text-center mt-4 text-xs text-slate-500 uppercase tracking-widest">{formatDate(result.date)} • {result.venue}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

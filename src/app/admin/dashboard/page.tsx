'use client';

import { useState, useEffect } from 'react';
import { Users, Calendar, Trophy, Plus, Trash2, Edit, X, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('squad');

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-black text-white italic mb-2">MANAGEMENT <span className="text-primary">DASHBOARD</span></h1>
        <p className="text-slate-400 mb-8">Control Center for Cantt United</p>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'squad', label: 'Squad Management', icon: Users },
            { id: 'fixtures', label: 'Match Schedule', icon: Calendar },
            { id: 'results', label: 'Match Results', icon: Trophy },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-black shadow-lg shadow-primary/25' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="glass-panel text-white p-8 rounded-3xl min-h-[500px]">
          {activeTab === 'squad' && <SquadManager />}
          {activeTab === 'fixtures' && <FixtureManager />}
          {activeTab === 'results' && <ResultsManager />}
        </div>
      </div>
    </main>
  );
}

// Sub-components

function SquadManager() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    email: '',
    position: 'STRIKER',
    jerseyNumber: '',
    age: '',
    nationality: 'Pakistan',
    photo: ''
  });

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/players');
      const data = await res.json();
      if (data.success) setPlayers(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlayer)
      });
      const data = await res.json();

      if (res.ok) {
        setShowAddModal(false);
        setNewPlayer({ name: '', email: '', position: 'STRIKER', jerseyNumber: '', age: '', nationality: 'Pakistan', photo: '' });
        fetchPlayers(); // Refresh list
        alert('Player added successfully!');
      } else {
        alert(`Failed to add player: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Error adding player');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this player?')) return;
    try {
      const res = await fetch(`/api/players/${id}`, { method: 'DELETE' });
      if (res.ok) fetchPlayers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Active Squad
          <button onClick={fetchPlayers} className="p-1 hover:bg-white/10 rounded-full text-slate-400"><RefreshCw size={14} /></button>
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} /> Add Player
        </button>
      </div>

      <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-white/5">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-slate-400 uppercase text-xs font-bold">
            <tr>
              <th className="p-4">Player</th>
              <th className="p-4">Position</th>
              <th className="p-4">Jersey</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading squad...</td></tr>
            ) : players.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">No players found. Add one to get started.</td></tr>
            ) : players.map((player) => (
              <tr key={player.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold flex items-center gap-3">
                  <img src={player.photo || '/player1.jpg'} className="w-8 h-8 rounded-full object-cover bg-slate-800" alt="" />
                  {player.name}
                </td>
                <td className="p-4 text-slate-300">{player.position}</td>
                <td className="p-4 font-mono text-primary">#{player.jerseyNumber}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleDelete(player.id)} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Player Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-md animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Player</h3>
              <button onClick={() => setShowAddModal(false)}><X className="text-slate-400 hover:text-white" /></button>
            </div>
            <form onSubmit={handleAddPlayer} className="space-y-4">
              <input
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
                placeholder="Full Name"
                value={newPlayer.name} onChange={e => setNewPlayer({ ...newPlayer, name: e.target.value })} required
              />
              <input
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
                placeholder="Email Address" type="email"
                value={newPlayer.email} onChange={e => setNewPlayer({ ...newPlayer, email: e.target.value })} required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="Jersey #" type="number"
                  value={newPlayer.jerseyNumber} onChange={e => setNewPlayer({ ...newPlayer, jerseyNumber: e.target.value })} required
                />
                <input
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder="Age" type="number"
                  value={newPlayer.age} onChange={e => setNewPlayer({ ...newPlayer, age: e.target.value })} required
                />
              </div>
              <select
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
                value={newPlayer.position} onChange={e => setNewPlayer({ ...newPlayer, position: e.target.value })}
              >
                <option value="STRIKER">Striker</option>
                <option value="MIDFIELDER">Midfielder</option>
                <option value="DEFENDER">Defender</option>
                <option value="GOALKEEPER">Goalkeeper</option>
              </select>
              <input
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
                placeholder="Photo URL (e.g. /player1.jpg)"
                value={newPlayer.photo} onChange={e => setNewPlayer({ ...newPlayer, photo: e.target.value })}
              />
              <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-primary-dark">
                Create Player Account
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function FixtureManager() {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newFixture, setNewFixture] = useState({ opponent: '', date: '', time: '', venue: '' });

  const fetchFixtures = async () => {
    const res = await fetch('/api/fixtures');
    const data = await res.json();
    if (data.success) setFixtures(data.data);
  };

  useEffect(() => { fetchFixtures() }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/fixtures', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFixture)
    });
    if (res.ok) {
      setShowModal(false);
      setNewFixture({ opponent: '', date: '', time: '', venue: '' });
      fetchFixtures();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this fixture?')) return;
    await fetch(`/api/fixtures/${id}`, { method: 'DELETE' });
    fetchFixtures();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Upcoming Fixtures</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} /> Schedule Match
        </button>
      </div>
      <div className="space-y-4">
        {fixtures.map((fixture) => (
          <div key={fixture.id} className="bg-slate-900/50 p-6 rounded-xl border border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-xl font-bold text-white">{new Date(fixture.date).getDate()}</div>
                <div className="text-xs text-slate-500 uppercase font-bold">{new Date(fixture.date).toLocaleString('default', { month: 'short' })}</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white mb-1"><span className="text-slate-500">vs</span> {fixture.opponent}</div>
                <div className="text-sm text-slate-400 flex items-center gap-2">
                  <Calendar size={14} /> {fixture.time}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleDelete(fixture.id)} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Schedule Match</h3>
              <button onClick={() => setShowModal(false)}><X className="text-slate-400 hover:text-white" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <input
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
                placeholder="Opponent Name"
                value={newFixture.opponent} onChange={e => setNewFixture({ ...newFixture, opponent: e.target.value })} required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
                  type="date"
                  value={newFixture.date} onChange={e => setNewFixture({ ...newFixture, date: e.target.value })} required
                />
                <input
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
                  type="time"
                  value={newFixture.time} onChange={e => setNewFixture({ ...newFixture, time: e.target.value })} required
                />
              </div>
              <input
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
                placeholder="Venue"
                value={newFixture.venue} onChange={e => setNewFixture({ ...newFixture, venue: e.target.value })}
              />
              <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-primary-dark">
                Schedule Match
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function ResultsManager() {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [scores, setScores] = useState<Record<string, { home: string, away: string }>>({});

  const fetchFixtures = async () => {
    const res = await fetch('/api/fixtures');
    const data = await res.json();
    if (data.success) {
      setFixtures(data.data);
      // Init scores
      const initialScores: any = {};
      data.data.forEach((f: any) => {
        if (f.homeScore !== null) initialScores[f.id] = { home: f.homeScore, away: f.awayScore };
        else initialScores[f.id] = { home: '', away: '' };
      });
      setScores(initialScores);
    }
  };

  useEffect(() => { fetchFixtures() }, []);

  const handleUpdate = async (id: string) => {
    const score = scores[id];
    if (!score) return;
    await fetch(`/api/fixtures/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ homeScore: score.home, awayScore: score.away })
    });
    alert('Score updated!');
    fetchFixtures();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Update Match Results</h2>
      <div className="grid gap-4">
        {fixtures.map(fixture => (
          <div key={fixture.id} className="bg-slate-900/50 p-6 rounded-xl border border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="text-right w-32">
                <div className="font-bold text-white text-lg">{fixture.homeTeam}</div>
              </div>
              <div className="flex gap-4 items-center bg-black/40 px-4 py-2 rounded-lg border border-white/5">
                <input
                  type="number"
                  className="w-12 bg-transparent text-center text-2xl font-black text-white focus:outline-none"
                  value={scores[fixture.id]?.home || ''}
                  onChange={(e) => setScores({ ...scores, [fixture.id]: { ...scores[fixture.id], home: e.target.value } })}
                  placeholder="-"
                />
                <span className="text-slate-500">-</span>
                <input
                  type="number"
                  className="w-12 bg-transparent text-center text-2xl font-black text-white focus:outline-none"
                  value={scores[fixture.id]?.away || ''}
                  onChange={(e) => setScores({ ...scores, [fixture.id]: { ...scores[fixture.id], away: e.target.value } })}
                  placeholder="-"
                />
              </div>
              <div className="w-32">
                <div className="font-bold text-white text-lg">{fixture.opponent}</div>
              </div>
            </div>
            <button
              onClick={() => handleUpdate(fixture.id)}
              className="bg-primary text-black font-bold px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

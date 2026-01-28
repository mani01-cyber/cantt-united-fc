'use client';

import { useState } from 'react';
import { CheckCircle, Zap } from 'lucide-react';

export default function JoinUsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    position: 'MIDFIELDER',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/trials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ fullName: '', age: '', position: 'MIDFIELDER', phone: '', email: '' });
      } else {
        const data = await response.json();
        setError(data.error || data.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side Content */}
        <div className="text-white space-y-8 animate-fade-in-up">
          <h1 className="text-6xl font-black leading-tight">
            PROVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-green-300">YOURSELF</span>
          </h1>
          <p className="text-xl text-slate-400">
            The journey to greatness starts with a single step. Register for our upcoming trials and show us you have what it takes.
          </p>

          <div className="grid gap-4 mt-8">
            <div className="glass-panel p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-lg"><Zap size={24} className="text-primary" /></div>
              <div>
                <h3 className="font-bold text-lg mb-1">Elite Training</h3>
                <p className="text-slate-400 text-sm">Access to professional coaching staff and state-of-the-art facilities.</p>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-accent/20 p-3 rounded-lg"><CheckCircle size={24} className="text-accent" /></div>
              <div>
                <h3 className="font-bold text-lg mb-1">Fair Assessment</h3>
                <p className="text-slate-400 text-sm">Comprehensive evaluation of your technical skills, fitness, and game intelligence.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {success ? (
            <div className="glass-panel p-10 rounded-3xl text-center border-green-500/30">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Registration Complete!</h2>
              <p className="text-slate-400 mb-8">
                We have received your application. Our scouts will review your details and contact you via email with trial dates.
              </p>
              <button onClick={() => setSuccess(false)} className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-bold transition-all">
                Register Another Player
              </button>
            </div>
          ) : (
            <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />

              <h2 className="text-2xl font-bold text-white mb-6">Trial Application</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-400 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-slate-600"
                    placeholder="Lionel Messi"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-400 ml-1">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="15" max="50"
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-slate-600"
                      placeholder="18"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-400 ml-1">Position</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    >
                      <option value="GOALKEEPER">Goalkeeper</option>
                      <option value="DEFENDER">Defender</option>
                      <option value="MIDFIELDER">Midfielder</option>
                      <option value="STRIKER">Striker</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-400 ml-1">Contact Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-slate-600"
                    placeholder="+92 300 0000000"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-400 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-slate-600"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-emerald-400 text-black font-black text-lg py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {loading ? 'PROCESSING...' : 'SUBMIT APPLICATION'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

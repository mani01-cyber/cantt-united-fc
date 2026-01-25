'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Trophy, Bell, BarChart3, LogOut, Menu, X } from 'lucide-react';

export default function PlayerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [nextMatch, setNextMatch] = useState<any>(null);
  const [nextTraining, setNextTraining] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Player Dashboard</h1>
          <div className="hidden md:flex items-center gap-4">
            <span className="text-gray-700">
              Welcome, <strong>{session?.user?.name}</strong>
            </span>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-gray-50 p-4">
            <p className="mb-4">Welcome, {session?.user?.name}</p>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </nav>

      {/* Sidebar Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block">
            <nav className="space-y-2">
              <Link
                href="/player/dashboard"
                className="block px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                📊 Dashboard
              </Link>
              <Link
                href="/player/schedule"
                className="block px-4 py-2 hover:bg-gray-200 rounded-lg"
              >
                📅 Training Schedule
              </Link>
              <Link
                href="/player/callups"
                className="block px-4 py-2 hover:bg-gray-200 rounded-lg"
              >
                🎯 Match Call-ups
              </Link>
              <Link
                href="/player/stats"
                className="block px-4 py-2 hover:bg-gray-200 rounded-lg"
              >
                📈 My Stats
              </Link>
              <Link
                href="/player/announcements"
                className="block px-4 py-2 hover:bg-gray-200 rounded-lg"
              >
                📣 Announcements
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Welcome Card */}
            <div className="bg-linear-to-r from-black to-slate-800 text-white rounded-lg p-8 mb-8 border-l-4 border-yellow-400">
              <h2 className="text-3xl font-bold mb-2 text-yellow-400">Welcome back!</h2>
              <p className="text-yellow-100">
                You are all set for the upcoming match. Stay focused and keep training hard.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Next Match */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-blue-600" /> Next Match
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Opponent</p>
                    <p className="text-xl font-bold">TBD</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="text-xl font-bold">TBD</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Venue</p>
                    <p className="text-xl font-bold">TBD</p>
                  </div>
                </div>
              </div>

              {/* Next Training */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" /> Next Training
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="text-xl font-bold">TBD</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="text-xl font-bold">TBD</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="text-xl font-bold">TBD</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-600" /> Recent Announcements
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4 py-2">
                  <p className="font-semibold text-gray-900">Practice Times Updated</p>
                  <p className="text-sm text-gray-600">
                    New training schedule for next week is now available
                  </p>
                </div>
                <div className="border-l-4 border-green-600 pl-4 py-2">
                  <p className="font-semibold text-gray-900">Squad Selection Ready</p>
                  <p className="text-sm text-gray-600">
                    Check if you have been selected for the upcoming match
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <Link
                href="/player/stats"
                className="bg-linear-to-br from-blue-600 to-blue-700 text-white p-6 rounded-lg hover:shadow-lg transition"
              >
                <BarChart3 className="w-8 h-8 mb-2" />
                <h3 className="font-bold mb-1">View My Stats</h3>
                <p className="text-sm text-blue-100">See your season statistics</p>
              </Link>
              <Link
                href="/player/schedule"
                className="bg-linear-to-br from-green-600 to-green-700 text-white p-6 rounded-lg hover:shadow-lg transition"
              >
                <Calendar className="w-8 h-8 mb-2" />
                <h3 className="font-bold mb-1">Training Schedule</h3>
                <p className="text-sm text-green-100">View all training sessions</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

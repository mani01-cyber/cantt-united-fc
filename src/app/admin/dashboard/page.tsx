"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Users, Calendar, Trophy, Settings, LayoutDashboard,
    Plus, Edit2, Trash2, ArrowRight, Save, Upload, Shield, CheckCircle
} from "lucide-react";
import { getUpcomingFixture, updateUpcomingFixture } from "../../actions";

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"overview" | "matches" | "content">("overview");

    // State
    const [upcomingMatch, setUpcomingMatch] = useState({
        opponent: "", date: "", time: "", venue: "", type: "League Match"
    });
    const [heroTitle, setHeroTitle] = useState("Unleash Your Potential with Cantt United FC");
    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Basic auth check
        const role = localStorage.getItem("userRole");
        if (role !== "ADMIN") {
            router.push("/login"); // Need to be logged in as admin
            return;
        }

        getUpcomingFixture().then(res => {
            if (res.success && res.data) {
                setUpcomingMatch({
                    opponent: res.data.opponent,
                    date: res.data.date,
                    time: res.data.time,
                    venue: res.data.venue,
                    type: res.data.type,
                });
            }
            setLoading(false);
        });
    }, [router]);

    const handleSaveMatch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const res = await updateUpcomingFixture(upcomingMatch);
        setIsSaving(false);
        if (res.success) alert("Match details updated successfully! It will now appear on the Homepage.");
        else alert("Failed to update match.");
    };

    const handleSaveContent = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert("Website content updated successfully! (Mock)");
        }, 800);
    };

    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold">Loading Admin Panel...</div>;

    return (
        <div className="min-h-screen bg-slate-50 flex text-slate-900">

            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex shadow-sm z-10">
                <div className="p-6 flex items-center gap-3 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-bold text-slate-900 shadow-md shadow-accent/20">
                        <Shield className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="font-black text-slate-900 leading-tight">Admin Panel</h2>
                        <p className="text-xs font-bold text-slate-500">Cantt United FC</p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem
                        icon={<LayoutDashboard className="w-5 h-5" />}
                        label="Overview"
                        isActive={activeTab === "overview"}
                        onClick={() => setActiveTab("overview")}
                    />
                    <NavItem
                        icon={<Calendar className="w-5 h-5" />}
                        label="Match Center"
                        isActive={activeTab === "matches"}
                        onClick={() => setActiveTab("matches")}
                    />
                    <NavItem
                        icon={<Edit2 className="w-5 h-5" />}
                        label="Website Content"
                        isActive={activeTab === "content"}
                        onClick={() => setActiveTab("content")}
                    />
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button onClick={() => { localStorage.clear(); router.push("/login"); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
                        <ArrowRight className="w-5 h-5" />
                        Logout Securely
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* Top Header */}
                <header className="h-16 lg:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 shrink-0 relative z-0">
                    <h1 className="text-xl font-black text-slate-900 tracking-wide uppercase">
                        {activeTab === "overview" && "Dashboard Overview"}
                        {activeTab === "matches" && "Manage Upcoming Matches"}
                        {activeTab === "content" && "Manage Homepage Content"}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                            <span className="text-sm font-black text-slate-700">AD</span>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-auto p-6 lg:p-10 relative">
                    {/* Background decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="max-w-5xl mx-auto relative z-10">

                        {/* OVERVIEW TAB */}
                        {activeTab === "overview" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <StatCard icon={<Users className="w-6 h-6 text-blue-500" />} label="Registered Players" value="48" trend="+4 this month" />
                                    <StatCard icon={<Calendar className="w-6 h-6 text-primary-dark" />} label="Upcoming Trials" value="12" trend="Next on Oct 20" />
                                    <StatCard icon={<Trophy className="w-6 h-6 text-accent" />} label="Matches Won" value="8" trend="Last 10 games" />
                                </div>

                                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                                    <h3 className="text-lg font-black text-slate-900 mb-4 uppercase">Quick Actions</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <button onClick={() => setActiveTab("matches")} className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 hover:border-primary/50 group">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <Plus className="w-6 h-6 text-primary-dark" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">Update Next Match</span>
                                        </button>
                                        <button onClick={() => setActiveTab("content")} className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 hover:border-accent/50 group">
                                            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                                <Edit2 className="w-6 h-6 text-accent" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">Edit Home Page</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* MATCHES MANGEMENT TAB */}
                        {activeTab === "matches" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* 1. Next Fixture */}
                                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                                        <div>
                                            <h2 className="text-2xl font-black text-slate-900 uppercase">Update Next Match</h2>
                                            <p className="text-slate-600 text-sm mt-1 font-medium">This instantly updates the Next Match section on the Homepage.</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSaveMatch} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Opponent Team</label>
                                                <input type="text" value={upcomingMatch.opponent} onChange={e => setUpcomingMatch({ ...upcomingMatch, opponent: e.target.value })} className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Match Type</label>
                                                <select value={upcomingMatch.type} onChange={e => setUpcomingMatch({ ...upcomingMatch, type: e.target.value })} className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium">
                                                    <option>League Match</option>
                                                    <option>Friendly</option>
                                                    <option>Cup Tie</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Date</label>
                                                <input type="date" value={upcomingMatch.date} onChange={e => setUpcomingMatch({ ...upcomingMatch, date: e.target.value })} className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Time</label>
                                                <input type="time" value={upcomingMatch.time} onChange={e => setUpcomingMatch({ ...upcomingMatch, time: e.target.value })} className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium" required />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-bold text-slate-700">Venue</label>
                                                <input type="text" value={upcomingMatch.venue} onChange={e => setUpcomingMatch({ ...upcomingMatch, venue: e.target.value })} className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium" required />
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-6">
                                            <button type="submit" disabled={isSaving} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold uppercase transition-all shadow-lg shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed text-sm">
                                                {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                                                {isSaving ? "Saving..." : "Save Match Details"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* WEBSITE CONTENT TAB */}
                        {activeTab === "content" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                                        <div>
                                            <h2 className="text-2xl font-black text-slate-900 uppercase">Homepage Editor</h2>
                                            <p className="text-slate-600 text-sm mt-1 font-medium">Manage texts and images representing the club online.</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSaveContent} className="space-y-8">
                                        {/* Hero Section Edit */}
                                        <div className="space-y-6 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                                            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 uppercase">
                                                <LayoutDashboard className="w-5 h-5 text-accent" /> Hero Section
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700">Main Headline</label>
                                                    <input type="text" value={heroTitle} onChange={e => setHeroTitle(e.target.value)} className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all font-medium" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700">Background Video/Image URL</label>
                                                    <input type="text" defaultValue="/videos/promo.mp4" className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl px-4 py-3 outline-none transition-all font-medium" disabled />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <button type="submit" disabled={isSaving} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold uppercase transition-all shadow-lg shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed text-sm">
                                                {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                                                {isSaving ? "Publishing..." : "Publish Website Changes"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}

// Helper Components
function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold uppercase tracking-wider ${isActive
                    ? "bg-accent/10 text-slate-950 border border-accent/20 shadow-inner"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
        >
            {icon}
            {label}
        </button>
    );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    {icon}
                </div>
            </div>
            <div>
                <h4 className="text-slate-500 text-sm font-bold uppercase tracking-wider">{label}</h4>
                <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-slate-900">{value}</span>
                    <span className="text-xs font-black text-primary-dark">{trend}</span>
                </div>
            </div>
        </div>
    );
}

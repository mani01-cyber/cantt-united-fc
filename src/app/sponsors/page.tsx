import Image from 'next/image';
import Link from 'next/link';
import { Mail, CheckCircle2, TrendingUp, Users, Target } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';

export default function SponsorsPage() {
    return (
        <main className="min-h-screen pt-24 pb-16">
            <PageHeader
                title="PARTNER WITH "
                highlight="EXCELLENCE"
                subtitle="Join Cantt United FC in shaping the future of football. Align your brand with passion, dedication, and community impact."
            >
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                    <Link
                        href="https://wa.me/923704724630"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black font-bold uppercase tracking-wide hover:bg-white transition-colors gap-2"
                    >
                        <Mail size={20} />
                        Become a Sponsor
                    </Link>
                </div>
            </PageHeader>

            {/* Why Sponsor Us */}
            <section className="py-20 bg-slate-50 border-y border-slate-200">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        title="WHY SPONSOR"
                        highlight="CANTT UNITED?"
                        subtitle="We are more than just a football club. We are a community hub dedicated to nurturing raw talent and promoting physical and mental well-being among the youth of Lahore."
                    />

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <GlassCard className="bg-white">
                            <Users className="w-12 h-12 text-primary mb-6" />
                            <h3 className="text-xl font-bold mb-3">Community Reach</h3>
                            <p className="text-slate-600">Engage directly with a passionate local community of players, families, and football enthusiasts across Lahore.</p>
                        </GlassCard>
                        <GlassCard className="bg-white">
                            <TrendingUp className="w-12 h-12 text-primary mb-6" />
                            <h3 className="text-xl font-bold mb-3">Brand Visibility</h3>
                            <p className="text-slate-600">Maximize your brand exposure through our match kits, social media channels, and local tournament appearances.</p>
                        </GlassCard>
                        <GlassCard className="bg-white">
                            <Target className="w-12 h-12 text-primary mb-6" />
                            <h3 className="text-xl font-bold mb-3">Youth Development</h3>
                            <p className="text-slate-600">Demonstrate your corporate social responsibility by directly supporting the athletic and personal growth of local youth.</p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Sponsorship Tiers */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        title="SPONSORSHIP"
                        highlight="TIERS"
                        subtitle="Choose a package that aligns with your brand's goals and budget. We also offer custom sponsorship tailored to your needs."
                    />

                    <div className="flex justify-center max-w-6xl mx-auto">
                        {/* Platinum (Featured) */}
                        <div className="bg-gradient-to-b from-primary/10 to-slate-50 border border-primary/50 rounded-2xl p-8 flex flex-col relative max-w-md w-full">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black px-4 py-1 text-xs font-black uppercase tracking-wider rounded-full">
                                Exclusive
                            </div>
                            <div className="mb-8 mt-2 text-center">
                                <h3 className="text-2xl font-black italic text-primary mb-2">PLATINUM PARTNER</h3>
                                <p className="text-slate-600 text-sm">Become our primary backer and gain maximum visibility</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-grow tracking-wide text-sm text-slate-700">
                                <li className="flex gap-3"><CheckCircle2 className="text-primary shrink-0 w-5 h-5" /> Front-of-shirt main sponsor logo</li>
                                <li className="flex gap-3"><CheckCircle2 className="text-primary shrink-0 w-5 h-5" /> Premium stadium banner placement</li>
                                <li className="flex gap-3"><CheckCircle2 className="text-primary shrink-0 w-5 h-5" /> Dedicated PR and social media campaigns</li>
                                <li className="flex gap-3"><CheckCircle2 className="text-primary shrink-0 w-5 h-5" /> Logo on all official club media/website</li>
                                <li className="flex gap-3"><CheckCircle2 className="text-primary shrink-0 w-5 h-5" /> VIP access to all club events & games</li>
                            </ul>
                            <Link
                                href="https://wa.me/923704724630"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full block text-center py-4 bg-primary text-black hover:bg-black hover:text-white transition-colors font-bold uppercase rounded-xl"
                            >
                                Inquire Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </main >
    );
}

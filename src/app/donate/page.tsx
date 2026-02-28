import Link from 'next/link';
import { HeartHandshake, PackageOpen, CreditCard, ArrowRight, Info } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

export default function DonatePage() {
    return (
        <main className="min-h-screen pt-24 pb-16">
            <PageHeader
                title="FUEL THE "
                highlight="PASSION"
                subtitle="Your contributions directly empower young athletes in Lahore. Whether it's monetary support or donating equipment, every bit helps us build a stronger team and a better community."
                icon={<><HeartHandshake size={18} /> <span className="text-sm font-bold uppercase tracking-wider">Support The Club</span></>}
            />

            {/* Donation Options */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                        {/* Monetary Donations */}
                        <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl relative overflow-hidden group hover:border-primary/50 transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                            <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-8">
                                <CreditCard className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-2xl font-black italic mb-4">FINANCIAL SUPPORT</h2>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Financial contributions are used to cover tournament fees, pitch maintenance, travel expenses, and overall club operations. You can transfer funds directly to our club account.
                            </p>

                            <div className="bg-white p-6 rounded-xl border border-slate-200 mb-8">
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <span className="block text-slate-500 mb-1">Bank Name</span>
                                        <strong className="text-slate-900 text-base">JAZZCASH</strong>
                                    </div>
                                    <div>
                                        <span className="block text-slate-500 mb-1">Account Title</span>
                                        <strong className="text-slate-900 text-base">MUHAMMAD SULEMAN MALIK</strong>
                                    </div>
                                    <div>
                                        <span className="block text-slate-500 mb-1">Account / IBAN Number</span>
                                        <strong className="text-slate-900 text-base font-mono bg-slate-100/80 py-1 px-2 rounded tracking-wider">PK51 JCMA 0103 9237 0429 7087</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 text-sm text-slate-600 bg-primary/5 p-4 rounded-lg border border-primary/20">
                                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <p>Please send us a message on WhatsApp at <a href="https://wa.me/923704724630" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">0370 4724630</a> after making a transfer so we can acknowledge your contribution!</p>
                            </div>
                        </div>

                        {/* Equipment Donations */}
                        <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl relative overflow-hidden group hover:border-primary/50 transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/80 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                            <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-8">
                                <PackageOpen className="w-8 h-8 text-slate-900 group-hover:text-primary transition-colors" />
                            </div>
                            <h2 className="text-2xl font-black italic mb-4">EQUIPMENT DONATION</h2>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Have gently used or new football gear? We distribute donated equipment to players in need so everyone has a chance to play safely and comfortably.
                            </p>

                            <div className="space-y-6 mb-8">
                                <div>
                                    <h3 className="text-slate-900 font-bold mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full" /> Items We Accept:
                                    </h3>
                                    <ul className="grid grid-cols-2 gap-2 text-slate-600 text-sm">
                                        <li>• Football Boots (Cleats)</li>
                                        <li>• Shin Guards</li>
                                        <li>• Training Kits</li>
                                        <li>• Goalkeeper Gloves</li>
                                        <li>• Size 5 Footballs</li>
                                        <li>• Training Bibs/Cones</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <h3 className="text-slate-900 font-bold mb-3 text-sm">How to drop off:</h3>
                                <p className="text-sm text-slate-600 mb-6">
                                    You can drop off equipment during our Saturday & Sunday training sessions at Garrison Sports Complex, Lahore.
                                </p>
                                <Link
                                    href="https://wa.me/923704724630"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-primary font-bold hover:text-slate-900 transition-colors gap-2"
                                >
                                    Contact us for drop-off details <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
}

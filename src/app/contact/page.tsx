'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send message. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16 relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-primary/20 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-4">GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">TOUCH</span></h1>
          <p className="text-slate-400 text-xl max-w-xl mx-auto">
            Have questions about trials, matches, or partnerships? We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">

          {/* Info Cards */}
          <div className="space-y-6">
            <div className="glass-panel p-8 rounded-2xl flex items-start gap-6 group hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MapPin className="text-primary w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Club Headquarters</h3>
                <p className="text-slate-400 leading-relaxed">Garrison Sports Complex<br />Lahore Cantt, Pakistan</p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl flex items-start gap-6 group hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="text-accent w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                <p className="text-slate-400 leading-relaxed">
                  General: info@unitedfc.pk<br />
                  Trials: trials@unitedfc.pk
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl flex items-start gap-6 group hover:border-blue-400/50 transition-colors">
              <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="text-blue-400 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                <p className="text-slate-400 leading-relaxed">
                  Main Office: +92 322 3233434<br />
                  Support: +92 316 0458715
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl flex items-start gap-6 group hover:border-pink-500/50 transition-colors">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Clock className="text-pink-500 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Office Hours</h3>
                <p className="text-slate-400 leading-relaxed">
                  Mon - Sat: 9:00 AM - 8:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-10 blur-2xl rounded-3xl" />
            <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 relative">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="text-primary" /> Send Message
              </h2>

              {submitted ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center animate-fade-in-up">
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-green-400">Thank you for contacting Cantt United. We will reply shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600"
                      placeholder="Trial Inquiry"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600 resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-black text-lg py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 hover:bg-primary"
                  >
                    {loading ? 'SENDING...' : 'SEND MESSAGE'}
                    {!loading && <Send size={18} />}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Map */}
        <div className="mt-20 glass-panel p-4 rounded-3xl h-[450px] relative overflow-hidden group">
          <iframe
            src="https://maps.google.com/maps?q=Garrison%20Sports%20Complex%2C%20Lahore%20Cantt%2C%20Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
          ></iframe>
        </div>

      </div>
    </main>
  );
}

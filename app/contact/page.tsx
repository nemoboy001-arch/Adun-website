'use client';

import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 800);
  };

  return (
    <div className="bg-brand-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
            Here to Help
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-brand-terracotta">
            Contact & Support
          </h1>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-start">
          {/* Quick Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-sand/30 p-8 rounded-2xl border border-brand-sand space-y-6">
              <h2 className="text-2xl font-bold font-serif text-brand-terracotta">
                Get In Touch Instantly
              </h2>
              <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light">
                Have questions about your order, dietary requirements, catering services, or private events? Feel free to contact us on any channel below.
              </p>

              <div className="space-y-4 pt-2">
                {/* Phone */}
                <a
                  href="tel:+2348030000000"
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-brand-sand hover:border-brand-gold hover:shadow-xs transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-brand-charcoal">Call Us</h3>
                    <p className="text-xs text-brand-charcoal/60 mt-0.5">+234 803 000 0000</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/2348030000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-brand-sand hover:border-brand-gold hover:shadow-xs transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-brand-charcoal">WhatsApp Chat</h3>
                    <p className="text-xs text-emerald-600 font-semibold mt-0.5">Online Support & Ordering</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:hello@adun.ng"
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-brand-sand hover:border-brand-gold hover:shadow-xs transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-brand-charcoal">Email</h3>
                    <p className="text-xs text-brand-charcoal/60 mt-0.5">hello@adun.ng</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-brand-charcoal text-brand-cream p-8 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold font-serif text-brand-gold">Catering & Events</h3>
              <p className="text-xs text-brand-cream/70 leading-relaxed font-light">
                Hosting a wedding, party, or corporate event? Àdùn offers full-service catering, complete with standard swallow stations, smokey jollof pots, and charcoal grilled suyas. Get in touch to customize a menu.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-brand-sand/20 p-8 sm:p-10 rounded-2xl border border-brand-sand">
            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-scale-up">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-brand-charcoal">Message Sent!</h3>
                <p className="text-sm text-brand-charcoal/70 max-w-sm mx-auto">
                  Thank you for writing to Àdùn. We have received your message and our team will respond within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 bg-brand-terracotta hover:bg-brand-orange text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold font-serif text-brand-terracotta border-b border-brand-sand/50 pb-4">
                  Send Us A Message
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/75">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white border border-brand-sand/80 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                      placeholder="e.g. Chinwe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/75">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white border border-brand-sand/80 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                      placeholder="e.g. chinwe@mail.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/75">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={e => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-white border border-brand-sand/80 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                      placeholder="e.g. +234 803 123 4567"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/75">
                      Topic
                    </label>
                    <select
                      value={formState.subject}
                      onChange={e => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-white border border-brand-sand/80 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                    >
                      <option>General Inquiry</option>
                      <option>Order Support</option>
                      <option>Catering & Private Events</option>
                      <option>Feedback & Suggestions</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-brand-charcoal/75">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white border border-brand-sand/80 focus:border-brand-orange rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
                    placeholder="Tell us what you need..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-terracotta hover:bg-brand-orange text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

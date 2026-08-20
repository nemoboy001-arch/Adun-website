'use client';

import React from 'react';
import Link from 'next/link';

export default function StoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Editorial Header */}
      <section className="relative py-24 bg-brand-sand text-brand-charcoal text-center overflow-hidden border-b border-brand-sand">
        <div className="absolute inset-0 texture-overlay opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
            Our Heritage
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-brand-terracotta">
            Where It All Began
          </h1>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-2" />
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-20 bg-brand-cream text-brand-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Story Text */}
            <div className="md:col-span-8 space-y-8 text-brand-charcoal/90">
              {/* Opening Paragraph */}
              <p className="text-xl sm:text-2xl font-serif text-brand-terracotta leading-relaxed italic border-l-4 border-brand-gold pl-6">
                Àdùn didn't start in a boardroom — it started in a kitchen, with a pot of jollof rice and a promise: food should taste like it was made with love, not made in a hurry.
              </p>

              {/* Main Body */}
              <div className="space-y-6 text-base sm:text-lg leading-relaxed font-light font-sans">
                <p>
                  Growing up, the kitchen was always the heart of the house. That's where stories were told, where arguments were settled over a shared plate, and where every celebration — big or small — found its center. We wanted to bring that feeling to more tables, without losing what makes it special: real ingredients, real technique, and recipes that have earned their place over generations.
                </p>
                <p>
                  Every dish on our menu has a history. Our jollof carries the smoky char that only comes from patience. Our efo riro is built layer by layer, the way it's meant to be. Nothing here is shortcut food — it's slow food, made fast enough to reach you hot.
                </p>
              </div>

              {/* Closing line */}
              <p className="text-lg sm:text-xl font-serif text-brand-terracotta font-semibold pt-4">
                Àdùn means &quot;delicious&quot; — but really, it means home. We hope you taste it in every bite.
              </p>

              {/* CTA Button */}
              <div className="pt-6">
                <Link
                  href="/menu"
                  className="inline-flex items-center bg-brand-terracotta hover:bg-brand-orange text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 transform shadow-md"
                >
                  Explore the Menu →
                </Link>
              </div>
            </div>

            {/* Accent Imagery */}
            <div className="md:col-span-4 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-brand-sand border border-brand-sand">
                <img
                  src="https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80"
                  alt="African Jollof Rice preparation"
                  className="w-full h-56 object-cover"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-brand-sand border border-brand-sand">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
                  alt="Traditional seasoning"
                  className="w-full h-56 object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

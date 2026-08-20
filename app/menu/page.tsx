import React from 'react';
import { db } from '../../lib/db';
import { MenuClient } from './MenuClient';

export const dynamic = 'force-dynamic';

export default async function MenuPage() {
  const menu = await db.getMenu();

  return (
    <div className="bg-brand-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Editorial Title */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
            Artisanal Nigerian Dishes
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-brand-terracotta">
            Our Menu
          </h1>
          <p className="text-xs sm:text-sm text-brand-charcoal/60 max-w-md mx-auto">
            Traditional slow cooking prepared fast. Spice-level key: 🌶️ Mild · 🌶️🌶️ Medium · 🌶️🌶️🌶️ Hot · 🔥 Fiery
          </p>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto" />
        </div>

        {/* Client Interactive Area */}
        <MenuClient initialMenu={menu} />
      </div>
    </div>
  );
}

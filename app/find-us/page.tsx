'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, ShoppingBag } from 'lucide-react';

export default function FindUsPage() {
  return (
    <div className="bg-brand-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
            Visit Àdùn
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-brand-terracotta">
            Find Us
          </h1>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6">
          {/* Location Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-brand-sand/30 p-8 rounded-2xl border border-brand-sand space-y-6">
              <h2 className="text-2xl font-bold font-serif text-brand-terracotta">
                Àdùn Lekki
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-brand-charcoal/80">
                  <MapPin className="w-6 h-6 text-brand-orange shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base">
                    15 Admiralty Way, Lekki Phase 1, <br />
                    Lagos, Nigeria
                  </p>
                </div>
                
                <div className="flex items-center space-x-3 text-brand-charcoal/80">
                  <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                  <a href="tel:+2348030000000" className="hover:text-brand-orange text-sm sm:text-base font-semibold">
                    +234 803 000 0000
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-brand-charcoal/80">
                  <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                  <a href="mailto:hello@adun.ng" className="hover:text-brand-orange text-sm sm:text-base">
                    hello@adun.ng
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-brand-sand/30 p-8 rounded-2xl border border-brand-sand space-y-4">
              <h3 className="text-lg font-bold font-serif text-brand-terracotta flex items-center">
                <Clock className="w-5 h-5 mr-2 text-brand-orange" /> Kitchen Hours
              </h3>
              <ul className="space-y-2 text-sm sm:text-base text-brand-charcoal/80">
                <li className="flex justify-between border-b border-brand-sand/50 pb-1.5">
                  <span className="font-semibold">Monday - Friday</span>
                  <span>11:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-brand-sand/50 pb-1.5">
                  <span className="font-semibold">Saturday</span>
                  <span>10:00 AM - 11:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Sunday</span>
                  <span>12:00 PM - 9:00 PM</span>
                </li>
              </ul>
            </div>

            <div className="bg-brand-sand/30 p-8 rounded-2xl border border-brand-sand space-y-4">
              <h3 className="text-lg font-bold font-serif text-brand-terracotta flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-brand-orange" /> Pickup Instructions
              </h3>
              <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light">
                Ordering for pickup? Head to the counter inside, show your order confirmation ID (e.g. ADUN-XXXXXX), and we will hand it to you hot and ready. Insulated packaging keeps your food fresh.
              </p>
            </div>
          </div>

          {/* SVG Map Illustration */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-charcoal/65 mb-2 pl-1">
              Visual Map Direction
            </h3>
            <div className="bg-brand-sand rounded-2xl overflow-hidden shadow-md border border-brand-sand h-[450px] relative flex flex-col justify-between p-6">
              {/* Styled SVG Map Overlay */}
              <div className="absolute inset-0 bg-brand-cream/80 flex items-center justify-center p-4">
                <svg viewBox="0 0 800 500" className="w-full h-full text-brand-charcoal stroke-brand-sand" fill="none" strokeWidth="2">
                  {/* Grid Lines/Background Roads */}
                  <path d="M 0 100 L 800 100" strokeWidth="6" stroke="#E6E0D4" />
                  <path d="M 150 0 L 150 500" strokeWidth="8" stroke="#E6E0D4" />
                  
                  {/* Lekki Admiralty Way Curve */}
                  <path d="M 150 250 Q 400 150 800 300" strokeWidth="20" stroke="#D3C9B8" />
                  <path d="M 150 250 Q 400 150 800 300" strokeWidth="2" stroke="#FFFFFF" strokeDasharray="10,15" />
                  
                  {/* Text for Main Road */}
                  <text x="450" y="170" fill="#8C3823" fontSize="14" fontFamily="serif" fontWeight="bold" transform="rotate(7, 450, 170)" stroke="none">
                    Admiralty Way
                  </text>
                  
                  {/* Side Roads */}
                  <path d="M 350 0 L 350 215" strokeWidth="8" stroke="#E6E0D4" />
                  <path d="M 550 185 L 550 500" strokeWidth="8" stroke="#E6E0D4" />

                  {/* Water Boundary (Lagos Lagoon style) */}
                  <path d="M 0 450 C 300 480, 500 420, 800 460" strokeWidth="4" fill="#D4E6F1" stroke="#AED6F1" />
                  <text x="350" y="475" fill="#5DADE2" fontSize="12" stroke="none" fontWeight="semibold">
                    Lekki Lagoon
                  </text>
                  
                  {/* Pinpoint Àdùn Restaurant */}
                  <g className="animate-bounce">
                    <circle cx="500" cy="210" r="14" fill="#8C3823" stroke="#F1C40F" strokeWidth="2" />
                    <circle cx="500" cy="210" r="5" fill="#FFFFFF" stroke="none" />
                  </g>
                  
                  {/* Map Labels */}
                  <rect x="420" y="240" width="160" height="35" rx="6" fill="#1A1A1A" stroke="none" />
                  <text x="500" y="262" fill="#FDFBF7" fontSize="12" fontFamily="serif" fontWeight="bold" textAnchor="middle" stroke="none">
                    Àdùn Restaurant
                  </text>
                  
                  <text x="165" y="40" fill="#8C3823" fontSize="11" fontWeight="bold" stroke="none">
                    To Lekki Toll Gate
                  </text>
                  
                  {/* Landmark */}
                  <circle cx="280" cy="80" r="8" fill="#D9A05B" stroke="none" />
                  <text x="295" y="84" fill="#1A1A1A" fontSize="11" stroke="none">
                    Lekki Phase 1 Gate
                  </text>
                </svg>
              </div>

              {/* Styled Address box in map container */}
              <div className="relative z-10 self-end bg-brand-charcoal text-brand-cream p-4 rounded-xl shadow-lg border border-brand-gold/30 max-w-xs">
                <h4 className="font-bold text-sm text-brand-gold mb-1 font-serif">Directions</h4>
                <p className="text-xs text-brand-cream/80 leading-relaxed">
                  Located directly along Admiralty Way in the heart of Lekki Phase 1, just a few minutes drive from the Lekki Toll Gate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

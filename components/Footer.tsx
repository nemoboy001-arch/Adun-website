'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const [isAdminEnabled, setIsAdminEnabled] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setIsAdminEnabled(data.settings.adminEnabled);
        }
      })
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  return (
    <footer className="bg-brand-charcoal text-brand-cream/80 border-t border-brand-charcoal/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex flex-col">
              <span className="text-3xl font-bold font-serif text-brand-gold tracking-wide">
                Àdùn
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brand-cream/65 -mt-1 font-semibold">
                Taste of Home
              </span>
            </Link>
            <p className="text-sm text-brand-cream/60 max-w-xs">
              Àdùn — where every dish tells a story. Taste the sweetness of home.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/menu" className="hover:text-white transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/find-us" className="hover:text-white transition-colors">
                  Find Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold">
              Kitchen Hours
            </h3>
            <ul className="space-y-2 text-sm text-brand-cream/60">
              <li>
                <span className="font-semibold text-brand-cream/80">Mon - Fri:</span> 11:00 AM - 10:00 PM
              </li>
              <li>
                <span className="font-semibold text-brand-cream/80">Saturday:</span> 10:00 AM - 11:00 PM
              </li>
              <li>
                <span className="font-semibold text-brand-cream/80">Sunday:</span> 12:00 PM - 9:00 PM
              </li>
            </ul>
          </div>

          {/* Location / Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold">
              Location
            </h3>
            <p className="text-sm text-brand-cream/60">
              15 Admiralty Way, Lekki Phase 1,<br />
              Lagos, Nigeria
            </p>
            <p className="text-sm">
              <span className="text-brand-cream/60">Call:</span>{' '}
              <a href="tel:+2348030000000" className="text-brand-gold hover:text-white transition-colors">
                +234 803 000 0000
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-brand-cream/10 mt-12 pt-8 text-center text-xs text-brand-cream/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Àdùn Restaurant. All rights reserved.</p>
          <div className="flex space-x-4">
            {isAdminEnabled && (
              <>
                <Link href="/admin" className="text-brand-cream/40 hover:text-brand-gold transition-colors">
                  Staff Portal
                </Link>
                <span>•</span>
              </>
            )}
            <a href="https://wa.me/2348030000000" target="_blank" rel="noopener noreferrer" className="text-brand-cream/40 hover:text-brand-gold transition-colors">
              WhatsApp Ordering
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

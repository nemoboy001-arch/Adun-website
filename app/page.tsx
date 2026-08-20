'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Clock, Truck, ShieldCheck, Heart } from 'lucide-react';

export default function Home() {
  const featuredDishes = [
    {
      id: 'jollof-rice',
      name: 'Jollof Rice',
      price: '₦3,000',
      description: 'Smoky, spiced, and simmered to perfection over an open flame — the dish that started it all.',
      spice: '🌶️🌶️ Medium',
      image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'pounded-yam-egusi',
      name: 'Pounded Yam & Egusi',
      price: '₦5,000',
      description: 'Hand-pounded the way it\'s always been done. Smooth, stretchy, and paired perfectly with egusi.',
      spice: '🌶️🌶️ Medium',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'suya-platter',
      name: 'Suya Platter',
      price: '₦5,500',
      description: 'Charcoal-grilled, spice-crusted, and fiery. Smoky beef coated in our signature suya spice.',
      spice: '🔥 Fiery',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 hover:scale-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        {/* Dark Terracotta Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/80 to-brand-charcoal/40" />
        
        {/* Texture overlay */}
        <div className="absolute inset-0 texture-overlay opacity-30" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-white animate-fade-in-up">
          <h1 className="text-6xl sm:text-8xl font-bold font-serif tracking-tight text-brand-gold">
            Àdùn
          </h1>
          <p className="text-xl sm:text-3xl font-serif italic text-brand-cream/90 max-w-2xl mx-auto">
            Taste the sweetness of home.
          </p>
          <div className="w-20 h-0.5 bg-brand-gold mx-auto my-4" />
          <p className="text-base sm:text-lg text-brand-cream/80 max-w-xl mx-auto font-light leading-relaxed">
            Real Nigerian flavor, made fresh daily — delivered hot or ready when you are.
          </p>
          <div className="pt-4">
            <Link
              href="/menu"
              className="inline-flex items-center bg-brand-orange hover:bg-brand-terracotta text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:translate-x-1 shadow-lg hover:shadow-brand-orange/20"
            >
              Order Now <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Intro / Story Teaser */}
      <section className="py-20 bg-brand-cream text-brand-charcoal relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Visual element (clay pot style image) */}
            <div className="md:col-span-5 relative group">
              <div className="absolute inset-0 bg-brand-gold rounded-2xl transform rotate-3 scale-102 group-hover:rotate-1 transition-all duration-500" />
              <img
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80"
                alt="Artisanal African Cooking"
                className="relative rounded-2xl shadow-xl object-cover w-full h-[400px] z-10 filter sepia-[0.1]"
              />
            </div>

            <div className="md:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
                Our Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-brand-terracotta">
                More Than a Meal
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-brand-charcoal/80 font-light">
                Every pot at Àdùn carries a story — recipes passed down, spices ground by hand, and the kind of care that only comes from cooking for family. We're bringing that same warmth to your table, one plate at a time.
              </p>
              <div className="pt-2">
                <Link
                  href="/story"
                  className="inline-flex items-center text-brand-terracotta font-semibold hover:text-brand-orange transition-colors border-b border-brand-terracotta pb-1"
                >
                  Read Our Story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Dishes Slider/Grid */}
      <section className="py-20 bg-brand-sand/40 border-t border-b border-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
              Customer Favorites
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-brand-terracotta">
              Signature Creations
            </h2>
            <div className="w-16 h-0.5 bg-brand-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <div 
                key={dish.id} 
                className="bg-brand-cream rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-brand-sand/50 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-cream/90 backdrop-blur-xs text-brand-orange text-xs font-bold px-3 py-1 rounded-full border border-brand-sand">
                    {dish.spice}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold font-serif text-brand-charcoal">
                      {dish.name}
                    </h3>
                    <span className="text-lg font-bold text-brand-terracotta">
                      {dish.price}
                    </span>
                  </div>
                  <p className="text-sm text-brand-charcoal/70 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                  <Link
                    href="/menu"
                    className="w-full text-center bg-brand-sand hover:bg-brand-gold hover:text-white text-brand-charcoal font-semibold py-2.5 rounded-lg block transition-colors duration-300 text-sm"
                  >
                    View in Menu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Àdùn (Trust/Value Section) */}
      <section className="py-20 bg-brand-cream text-brand-charcoal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-brand-terracotta">
              Cooked Fresh. Served With Soul.
            </h2>
            <div className="w-16 h-0.5 bg-brand-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-brand-sand/20 p-6 rounded-2xl border border-brand-sand/50 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto text-brand-orange">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-brand-charcoal text-lg">Authentic Recipes</h3>
              <p className="text-sm text-brand-charcoal/75">
                No shortcuts, no compromises. Ground spices, slow cooking, original flavors.
              </p>
            </div>

            <div className="bg-brand-sand/20 p-6 rounded-2xl border border-brand-sand/50 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto text-brand-gold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-brand-charcoal text-lg">Made to Order</h3>
              <p className="text-sm text-brand-charcoal/75">
                Nothing sits, nothing's rushed. Every dish is cooked fresh specifically for you.
              </p>
            </div>

            <div className="bg-brand-sand/20 p-6 rounded-2xl border border-brand-sand/50 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-terracotta/10 flex items-center justify-center mx-auto text-brand-terracotta">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-brand-charcoal text-lg">Delivery or Pickup</h3>
              <p className="text-sm text-brand-charcoal/75">
                Fast delivery or easy pickup. Packaged carefully to reach you hot and delicious.
              </p>
            </div>

            <div className="bg-brand-sand/20 p-6 rounded-2xl border border-brand-sand/50 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-brand-charcoal text-lg">Secure Payment</h3>
              <p className="text-sm text-brand-charcoal/75">
                Secure online payment via Paystack. Order in seconds using your card or bank transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonial Placeholder */}
      <section className="py-20 bg-brand-charcoal text-brand-cream relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-4xl text-brand-gold font-serif">“</span>
          <blockquote className="text-2xl sm:text-3xl font-serif italic text-brand-cream/90 leading-relaxed">
            Àdùn tastes exactly like home. I order every week.
          </blockquote>
          <div className="w-10 h-0.5 bg-brand-gold mx-auto my-4" />
          <cite className="block text-brand-gold font-semibold uppercase tracking-wider text-sm not-italic">
            — Tunde Adeniran
          </cite>
        </div>
      </section>

      {/* 6. Bottom CTA Banner */}
      <section className="py-20 bg-brand-orange text-white text-center relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold font-serif text-brand-cream">
            Hungry Yet?
          </h2>
          <p className="text-lg text-brand-cream/80 max-w-md mx-auto">
            Your next favorite meal is one click away.
          </p>
          <div className="pt-4">
            <Link
              href="/menu"
              className="inline-block bg-brand-charcoal hover:bg-brand-dark text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg"
            >
              Order Now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

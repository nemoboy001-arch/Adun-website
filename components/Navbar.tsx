'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X, Plus, Minus, Trash2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { cart, cartCount, cartSubtotal, updateQuantity, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminEnabled, setIsAdminEnabled] = useState(false);
  const pathname = usePathname();

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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Our Story', path: '/story' },
    { name: 'Find Us', path: '/find-us' },
    { name: 'Contact', path: '/contact' },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-brand-cream border-b border-brand-sand shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-3xl font-bold font-serif text-brand-terracotta tracking-wide">
              Àdùn
            </span>
            <span className="text-[10px] uppercase tracking-widest text-brand-gold -mt-1 font-semibold">
              Taste of Home
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-brand-orange ${
                    isActive
                      ? 'text-brand-terracotta border-b-2 border-brand-terracotta pb-1'
                      : 'text-brand-charcoal/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Cart Icon & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Admin Link (Subtle) */}
            {isAdminEnabled && (
              <Link
                href="/admin"
                className="hidden sm:inline-block text-xs font-semibold text-brand-gold hover:text-brand-orange transition-colors border border-brand-gold/30 rounded px-2.5 py-1"
              >
                Admin
              </Link>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-brand-charcoal hover:text-brand-orange transition-colors duration-200 rounded-full hover:bg-brand-sand"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-orange text-white text-[10px] font-bold w-5.5 h-5.5 flex items-center justify-center rounded-full border-2 border-brand-cream animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-brand-charcoal hover:text-brand-orange transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-30 bg-brand-cream md:hidden animate-fade-in flex flex-col px-6 py-8 space-y-6 border-t border-brand-sand">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-xl font-medium tracking-wide ${
                  isActive ? 'text-brand-terracotta font-semibold' : 'text-brand-charcoal/80'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          {isAdminEnabled && (
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-medium tracking-wide text-brand-gold border-t border-brand-sand pt-4"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      )}

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-xs transition-opacity" onClick={() => setIsCartOpen(false)} />
          
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-brand-cream shadow-2xl flex flex-col h-full border-l border-brand-sand animate-scale-up">
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-brand-sand flex items-center justify-between bg-brand-sand/30">
                <h2 className="text-xl font-bold font-serif text-brand-terracotta flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" /> Your Order
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-brand-charcoal hover:bg-brand-sand transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Body (Cart Items) */}
              <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingBag className="w-16 h-16 text-brand-gold/45 stroke-[1.5]" />
                    <div>
                      <h3 className="text-lg font-semibold text-brand-charcoal">Your cart is empty</h3>
                      <p className="text-sm text-brand-charcoal/60 mt-1 max-w-xs">
                        Let's add some delicious warmth to your plate.
                      </p>
                    </div>
                    <Link
                      href="/menu"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-2 bg-brand-terracotta hover:bg-brand-orange text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300"
                    >
                      Browse Menu
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.menuItemId}-${item.spiceLevel}`}
                      className="flex items-center space-x-4 border-b border-brand-sand/50 pb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-brand-sand"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-brand-charcoal text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-brand-orange font-bold uppercase tracking-wider mt-0.5">
                          🌶️ {item.spiceLevel}
                        </p>
                        <p className="text-sm font-bold text-brand-terracotta mt-1">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      
                      {/* Quantity control */}
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center border border-brand-gold/30 rounded-md bg-white">
                          <button
                            onClick={() => updateQuantity(item.menuItemId, item.spiceLevel, item.quantity - 1)}
                            className="p-1 text-brand-charcoal hover:bg-brand-sand transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-brand-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.menuItemId, item.spiceLevel, item.quantity + 1)}
                            className="p-1 text-brand-charcoal hover:bg-brand-sand transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.menuItemId, item.spiceLevel)}
                          className="text-brand-charcoal/40 hover:text-brand-orange transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="border-t border-brand-sand bg-brand-sand/30 p-6 space-y-4">
                  <div className="flex justify-between items-center text-brand-charcoal">
                    <span className="font-medium">Subtotal</span>
                    <span className="text-xl font-bold text-brand-terracotta">
                      {formatPrice(cartSubtotal)}
                    </span>
                  </div>
                  <p className="text-xs text-brand-charcoal/60">
                    Delivery fee, taxes, and payment methods calculated at checkout.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-brand-terracotta hover:bg-brand-orange text-white text-center font-bold py-3 rounded-lg block shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-98"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

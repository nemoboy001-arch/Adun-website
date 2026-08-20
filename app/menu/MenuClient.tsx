'use client';

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { MenuItem } from '../../lib/db';
import { ShoppingBag, Flame, Sparkles } from 'lucide-react';

interface MenuClientProps {
  initialMenu: MenuItem[];
}

export const MenuClient: React.FC<MenuClientProps> = ({ initialMenu }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSpiceLevel, setActiveSpiceLevel] = useState<{ [itemId: string]: string }>({});
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'Full Menu' },
    { id: 'swallow-soups', name: 'Swallow & Soups' },
    { id: 'rice', name: 'Rice Dishes' },
    { id: 'grills-proteins', name: 'Grills & Proteins' },
    { id: 'sides', name: 'Sides' },
    { id: 'drinks', name: 'Drinks' },
  ];

  const getSpiceLabel = (level: MenuItem['spiceLevel']) => {
    switch (level) {
      case 'mild': return '🌶️ Mild';
      case 'medium': return '🌶️🌶️ Medium';
      case 'hot': return '🌶️🌶️🌶️ Hot';
      case 'fiery': return '🔥 Fiery';
      default: return 'Non-Spicy';
    }
  };

  const getSpiceColor = (level: string) => {
    if (level.includes('Mild') || level === 'mild') return 'text-amber-600 bg-amber-50 border-amber-200';
    if (level.includes('Medium') || level === 'medium') return 'text-orange-600 bg-orange-50 border-orange-200';
    if (level.includes('Hot') || level === 'hot') return 'text-red-600 bg-red-50 border-red-200';
    if (level.includes('Fiery') || level === 'fiery') return 'text-red-700 bg-red-100 border-red-300 font-bold';
    return 'text-slate-500 bg-slate-50 border-slate-200';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAdd = (item: MenuItem) => {
    // Get customized spice level or default to the item's standard spice
    const selectedSpice = activeSpiceLevel[item.id] || getSpiceLabel(item.spiceLevel);
    
    addToCart({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      spiceLevel: selectedSpice,
      image: item.image,
    });

    // Visual feedback
    setAddedItemName(`${item.name} (${selectedSpice})`);
    setTimeout(() => {
      setAddedItemName(null);
    }, 3000);
  };

  const filteredMenu = selectedCategory === 'all'
    ? initialMenu
    : initialMenu.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Visual Feedback Toast */}
      {addedItemName && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-charcoal text-brand-cream py-3.5 px-6 rounded-xl shadow-2xl border border-brand-gold flex items-center space-x-2.5 animate-bounce">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          <p className="text-sm font-semibold">
            Added <span className="text-brand-gold font-bold">{addedItemName}</span> to cart!
          </p>
        </div>
      )}

      {/* Categories Tabs */}
      <div className="flex overflow-x-auto pb-4 pt-1 gap-2.5 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300 ${
              selectedCategory === cat.id
                ? 'bg-brand-terracotta border-brand-terracotta text-white shadow-md'
                : 'bg-brand-cream border-brand-sand hover:bg-brand-sand text-brand-charcoal/80'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filteredMenu.map((item) => {
          const itemDefaultSpice = getSpiceLabel(item.spiceLevel);
          const currentSpiceSelection = activeSpiceLevel[item.id] || itemDefaultSpice;
          const showSpiceCustomizer = item.spiceLevel !== 'none';

          return (
            <div
              key={item.id}
              className="bg-brand-cream rounded-2xl overflow-hidden border border-brand-sand shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row h-full group"
            >
              {/* Photo */}
              <div className="sm:w-44 h-48 sm:h-full relative shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Details & Interactive Actions */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xl font-bold font-serif text-brand-charcoal truncate">
                      {item.name}
                    </h3>
                    <span className="text-lg font-bold text-brand-terracotta shrink-0">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Customizations Area */}
                <div className="space-y-3 pt-2 border-t border-brand-sand/50">
                  {showSpiceCustomizer && (
                    <div className="flex flex-col space-y-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/65">
                        Customize Spice
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['🌶️ Mild', '🌶️🌶️ Medium', '🌶️🌶️🌶️ Hot', '🔥 Fiery'].map((level) => {
                          const isSelected = currentSpiceSelection === level;
                          return (
                            <button
                              key={level}
                              onClick={() =>
                                setActiveSpiceLevel({ ...activeSpiceLevel, [item.id]: level })
                              }
                              className={`text-[10px] font-semibold px-2 py-1 rounded border transition-colors ${
                                isSelected
                                  ? 'bg-brand-charcoal text-white border-brand-charcoal font-bold'
                                  : 'bg-white hover:bg-brand-sand text-brand-charcoal/75 border-brand-gold/25'
                              }`}
                            >
                              {level}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Add Button */}
                  <div className="flex items-center justify-between pt-1">
                    <span className={`text-[11px] font-semibold border px-2.5 py-0.5 rounded-full ${getSpiceColor(currentSpiceSelection)}`}>
                      {currentSpiceSelection}
                    </span>

                    <button
                      onClick={() => handleAdd(item)}
                      className="bg-brand-terracotta hover:bg-brand-orange text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-300 flex items-center space-x-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Order</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

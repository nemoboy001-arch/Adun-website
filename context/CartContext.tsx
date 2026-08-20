'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  spiceLevel: string;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (menuItemId: string, spiceLevel: string) => void;
  updateQuantity: (menuItemId: string, spiceLevel: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  orderType: 'delivery' | 'pickup';
  setOrderType: (type: 'delivery' | 'pickup') => void;
  deliveryFee: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('adun_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage', e);
      }
    }
    const savedOrderType = localStorage.getItem('adun_order_type') as 'delivery' | 'pickup';
    if (savedOrderType) {
      setOrderType(savedOrderType);
    }
    setIsLoaded(true);
  }, []);

  // Save cart and orderType to localStorage when they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('adun_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('adun_order_type', orderType);
    }
  }, [orderType, isLoaded]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantityToAdd = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (i) => i.menuItemId === item.menuItemId && i.spiceLevel === item.spiceLevel
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantityToAdd
        };
        return newCart;
      }

      return [...prevCart, { ...item, quantity: quantityToAdd }];
    });
  };

  const removeFromCart = (menuItemId: string, spiceLevel: string) => {
    setCart((prevCart) =>
      prevCart.filter((i) => !(i.menuItemId === menuItemId && i.spiceLevel === spiceLevel))
    );
  };

  const updateQuantity = (menuItemId: string, spiceLevel: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId, spiceLevel);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((i) =>
        i.menuItemId === menuItemId && i.spiceLevel === spiceLevel
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Standard flat delivery fee: 1500 NGN, or 0 if pickup
  const deliveryFee = orderType === 'delivery' ? 1500 : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        orderType,
        setOrderType,
        deliveryFee
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

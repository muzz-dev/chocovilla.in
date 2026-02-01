'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  ourPrice: number;
  quantity: number;
}

export interface AppliedPromoCode {
  code: string;
  discountPercent: number;
  discount: number;
  description: string;
}

interface CartContextType {
  items: CartItem[];
  appliedPromo: AppliedPromoCode | null;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => Promise<{ success: boolean; error?: string }>;
  removePromoCode: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromoCode | null>(null);

  // Load cart and promo from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('chocovilla-cart');
    const savedPromo = localStorage.getItem('chocovilla-promo');

    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }

    if (savedPromo) {
      try {
        setAppliedPromo(JSON.parse(savedPromo));
      } catch (error) {
        console.error('Failed to parse promo from localStorage:', error);
      }
    }
  }, []);

  // Save cart and promo to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chocovilla-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem('chocovilla-promo', JSON.stringify(appliedPromo));
    } else {
      localStorage.removeItem('chocovilla-promo');
    }
  }, [appliedPromo]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      if (existingItem) {
        // Increase quantity if item already exists
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = async (code: string): Promise<{ success: boolean; error?: string }> => {
    if (!code.trim()) {
      return { success: false, error: 'Please enter a promo code' };
    }

    const subtotal = getSubtotal();

    try {
      const response = await fetch('/api/validate-promo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.trim(),
          cartSubtotal: subtotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Failed to validate promo code' };
      }

      if (data.success && data.promoCode && data.discount !== undefined) {
        const appliedPromoCode: AppliedPromoCode = {
          code: data.promoCode.code,
          discountPercent: data.promoCode.discountPercent,
          discount: data.discount,
          description: data.promoCode.description,
        };
        setAppliedPromo(appliedPromoCode);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Invalid promo code' };
      }
    } catch (error) {
      console.error('Failed to apply promo code:', error);
      return { success: false, error: 'Unable to validate promo code. Please try again.' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.ourPrice * item.quantity), 0);
  };

  const getDiscount = () => {
    return appliedPromo?.discount || 0;
  };

  const getTotalPrice = () => {
    const subtotal = getSubtotal();
    const discount = getDiscount();
    return Math.max(0, subtotal - discount);
  };

  return (
    <CartContext.Provider value={{
      items,
      appliedPromo,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyPromoCode,
      removePromoCode,
      getTotalItems,
      getSubtotal,
      getDiscount,
      getTotalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
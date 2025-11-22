"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CartItem,
  Cart,
  getCart,
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateQuantity as updateQuantityUtil,
  clearCart as clearCartUtil,
  calculateCart,
  getCartCount,
} from "@/lib/cart";

interface CartContextType {
  cart: Cart;
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = () => {
    const items = getCart();
    const calculatedCart = calculateCart(items);
    setCart(calculatedCart);
    setCartCount(getCartCount());
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = (item: CartItem) => {
    addToCartUtil(item);
    refreshCart();
  };

  const removeFromCart = (productId: string) => {
    removeFromCartUtil(productId);
    refreshCart();
  };

  const updateQuantity = (productId: string, quantity: number) => {
    updateQuantityUtil(productId, quantity);
    refreshCart();
  };

  const clearCart = () => {
    clearCartUtil();
    refreshCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

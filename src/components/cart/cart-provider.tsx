'use client';

import React, { createContext, useReducer, ReactNode } from 'react';
import type { CartItem, Product, Size, Gender } from '@/lib/types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | {
      type: 'ADD_ITEM';
      payload: { product: Product; quantity: number; size: Size; gender?: Gender };
    }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, size, gender } = action.payload;
      const itemId = `${product.id}-${size}${gender ? `-${gender}` : ''}`;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { id: itemId, product, quantity, size, gender },
        ],
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.itemId
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.itemId),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

export interface CartContextType extends CartState {
  addItem: (
    product: Product,
    quantity: number,
    size: Size,
    gender?: Gender
  ) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  totalItems: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (
    product: Product,
    quantity: number,
    size: Size,
    gender?: Gender
  ) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, size, gender } });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

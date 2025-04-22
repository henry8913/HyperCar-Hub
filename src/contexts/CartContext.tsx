
import { createContext, useContext, useState, ReactNode } from 'react';
import { Car } from '../types/Car';

interface CartContextType {
  cartItems: Car[];
  addToCart: (car: Car) => void;
  removeFromCart: (carId: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Car[]>([]);

  const addToCart = (car: Car) => {
    if (!cartItems.find(item => item.id === car.id)) {
      setCartItems([...cartItems, car]);
    }
  };

  const removeFromCart = (carId: string) => {
    setCartItems(cartItems.filter(item => item.id !== carId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, total }}>
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

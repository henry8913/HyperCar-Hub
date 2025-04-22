import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Car } from '../types/Car';

interface User {
  id: string;
  email: string;
  name: string;
  favorites: Car[];
  purchases: Car[];
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: string) => void;
  addToPurchases: (car: Car) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'hypercar_user_data';

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Simulate login - in real app would call API
    const newUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      favorites: [],
      purchases: []
    };
    setUser(newUser);
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulate registration - in real app would call API
    const newUser = {
      id: '1',
      email,
      name,
      favorites: [],
      purchases: []
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const addToFavorites = (car: Car) => {
    if (!user) return;
    const newFavorites = [...user.favorites, car];
    const updatedUser = { ...user, favorites: newFavorites };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  };

  const removeFromFavorites = (carId: string) => {
    if (!user) return;
    const newFavorites = user.favorites.filter(car => car.id !== carId);
    const updatedUser = { ...user, favorites: newFavorites };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  };

  const addToPurchases = (car: Car) => {
    if (!user) return;
    const newPurchases = [...user.purchases, car];
    const updatedUser = { ...user, purchases: newPurchases };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout,
      addToFavorites,
      removeFromFavorites,
      addToPurchases
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
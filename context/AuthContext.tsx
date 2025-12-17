
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Plan, BillingTransaction } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  upgradePlan: (plan: Plan, paymentId: string, amount: number) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('score_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    // Mock login logic
    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: 'User',
      email: email,
      plan: 'free',
      subscriptionActive: false,
      billingHistory: []
    };
    setUser(mockUser);
    localStorage.setItem('score_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('score_user');
  };

  const upgradePlan = (plan: Plan, paymentId: string, amount: number) => {
    if (!user) return;

    const newTransaction: BillingTransaction = {
      id: paymentId,
      date: new Date().toISOString(),
      amount: amount,
      plan: plan,
      status: 'paid',
      invoiceUrl: '#'
    };

    const updatedUser: User = {
      ...user,
      plan: plan,
      subscriptionActive: true,
      subscriptionEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      billingHistory: [newTransaction, ...(user.billingHistory || [])]
    };

    setUser(updatedUser);
    localStorage.setItem('score_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradePlan, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

type ToastType = 'success' | 'error';

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl animate-fade-in ${
            toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
           {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
           <span className="font-bold">{toast.message}</span>
           <button onClick={() => setToast(null)} className="opacity-80 hover:opacity-100"><X size={18}/></button>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

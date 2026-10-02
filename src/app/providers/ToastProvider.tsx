import React from 'react';
import { ToastContainer } from '@/components/ui/Toast';

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer position="top-right" />
    </>
  );
}

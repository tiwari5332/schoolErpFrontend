import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { ToastProvider } from './providers/ToastProvider';
import { AppRouter } from './router/AppRouter';
import { LocalStorageSync } from '@/shared/utils/LocalStorageSync';

LocalStorageSync.init();

export function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ToastProvider>
          <RouterProvider router={AppRouter} />
        </ToastProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;

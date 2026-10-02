import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = 'An error occurred',
  message = 'Failed to load data. Please check your network connection and try again.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-rose-50/50 border border-rose-200 text-rose-800 rounded-2xl my-4 text-center">
      <AlertCircle className="h-8 w-8 text-rose-500 mb-2" />
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="text-xs text-rose-600 mt-1 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 text-xs font-semibold px-4 py-1.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

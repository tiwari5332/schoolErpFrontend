import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WidgetStateProps {
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  isEmpty?: boolean;
  emptyMessage?: string;
  skeletonHeight?: string;
  children: React.ReactNode;
}

export function WidgetState({
  isLoading,
  isError,
  error,
  onRetry,
  isEmpty,
  emptyMessage = 'No data available',
  skeletonHeight = 'h-48',
  children,
}: WidgetStateProps) {
  if (isLoading) {
    return (
      <div className={`w-full ${skeletonHeight} bg-slate-100/80 rounded-2xl animate-pulse flex items-center justify-center`}>
        <div className="w-8 h-8 rounded-full border-2 border-indigo-200 border-t-indigo-600 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`w-full ${skeletonHeight} bg-rose-50/50 border border-rose-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3`}>
        <AlertCircle className="h-7 w-7 text-rose-500" />
        <div>
          <p className="text-xs font-semibold text-slate-800">Failed to load data</p>
          <p className="text-[11px] text-slate-500 max-w-xs mt-0.5">
            {error?.message || 'Something went wrong while fetching this widget.'}
          </p>
        </div>
        {onRetry && (
          <Button
            size="sm"
            variant="outline"
            onClick={onRetry}
            className="h-7 px-3 text-xs border-slate-200 hover:bg-white text-slate-700"
          >
            <RefreshCw className="h-3 w-3 mr-1.5" />
            Retry
          </Button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={`w-full ${skeletonHeight} bg-slate-50/70 border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center`}>
        <p className="text-xs text-slate-400 font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
}

export default WidgetState;


import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from './button';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  title?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught component error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 rounded-2xl bg-rose-50/70 border border-rose-200 text-rose-900 space-y-4 my-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-xl shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-semibold text-rose-800">
                {this.props.title || 'Something went wrong loading this section'}
              </h4>
              <p className="text-xs text-rose-600 font-mono bg-rose-100/50 p-2 rounded-lg break-all">
                {this.state.error?.message || 'An unexpected error occurred.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={this.handleReset}
              className="border-rose-200 text-rose-700 hover:bg-rose-100 bg-white gap-2"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

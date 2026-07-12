import React, { useEffect, useState } from "react";
import { 
  X, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
}

export function Toast({
  message,
  type,
  duration = 4000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to trigger the slide-in CSS transition
    const enterTimeout = setTimeout(() => setIsVisible(true), 10);

    // Auto-dismiss timeout
    const closeTimeout = setTimeout(() => {
      setIsVisible(false);
      // Wait for exit transition before calling onClose
      const exitTimeout = setTimeout(onClose, 300);
      return () => clearTimeout(exitTimeout);
    }, duration);

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(closeTimeout);
    };
  }, [duration, onClose]);

  const handleManualClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const isSuccess = type === "success";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3.5 px-4.5 py-3.5 rounded-2xl border backdrop-blur-md shadow-2xl transition-all duration-300 transform ${
        isVisible 
          ? "translate-y-0 opacity-100 scale-100" 
          : "translate-y-4 opacity-0 scale-95 pointer-events-none"
      } ${
        isSuccess
          ? "bg-white/95 dark:bg-slate-900/95 border-emerald-500/20 text-slate-800 dark:text-slate-100"
          : "bg-white/95 dark:bg-slate-900/95 border-rose-500/20 text-slate-800 dark:text-slate-100"
      }`}
      style={{ minWidth: "320px", maxWidth: "420px" }}
    >
      {/* Dynamic Status Icon */}
      <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border ${
        isSuccess 
          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-450 border-emerald-100 dark:border-emerald-900/40" 
          : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-450 border-rose-100 dark:border-rose-900/40"
      }`}>
        {isSuccess ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <AlertCircle className="h-5 w-5" />
        )}
      </div>

      {/* Message Text */}
      <div className="flex-1">
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {isSuccess ? "System Success" : "Validation Alert"}
        </h4>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-0.5 leading-snug">
          {message}
        </p>
      </div>

      {/* Manual Dismiss Button */}
      <button
        onClick={handleManualClose}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors h-8 w-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center shrink-0"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Auto-Dismiss Progress Bar indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800/40 rounded-b-2xl overflow-hidden pointer-events-none">
        <div 
          className={`h-full transition-all linear ${
            isSuccess ? "bg-emerald-500" : "bg-rose-500"
          }`}
          style={{
            animation: `shimmer ${duration}ms linear forwards`,
            width: isVisible ? "100%" : "0%"
          }}
        />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { 
  AlertTriangle, 
  Info, 
  XCircle, 
  Check, 
  X 
} from "lucide-react";

export type ToastType = "warning" | "info" | "error" | "success";

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface ToastProps {
  id?: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose?: () => void;
}

export function ToastCard({
  type,
  message,
  duration = 4000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const enterTimeout = setTimeout(() => setIsVisible(true), 10);
    
    let interval: any;
    if (duration > 0) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);
        if (elapsed >= duration) {
          clearInterval(interval);
          handleClose();
        }
      }, 50);
    }

    return () => {
      clearTimeout(enterTimeout);
      if (interval) clearInterval(interval);
    };
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  const getVariant = () => {
    switch (type) {
      case "warning":
        return {
          bg: "bg-[#854519]",
          icon: AlertTriangle,
        };
      case "info":
        return {
          bg: "bg-[#285cc4]",
          icon: Info,
        };
      case "error":
        return {
          bg: "bg-[#b83445]",
          icon: XCircle,
        };
      case "success":
        return {
          bg: "bg-[#256743]",
          icon: Check,
        };
    }
  };

  const variant = getVariant();
  const IconComponent = variant.icon;

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${variant.bg} text-white shadow-lg transition-all duration-300 ease-out transform ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "-translate-y-2 opacity-0 scale-95 pointer-events-none"
      }`}
      style={{ minWidth: "340px", maxWidth: "460px" }}
    >
      {/* Toast Content Container */}
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        {/* Left Icon */}
        <div className="shrink-0 flex items-center justify-center">
          <IconComponent className="h-6 w-6 text-white stroke-[2.2]" />
        </div>

        {/* Text Message */}
        <p className="flex-1 text-[16px] font-normal text-white leading-tight tracking-wide">
          {message}
        </p>

        {/* Right Close Icon */}
        <button
          onClick={handleClose}
          type="button"
          className="shrink-0 p-1 text-white/80 hover:text-white transition-colors rounded-md focus:outline-none"
          aria-label="Close notification"
        >
          <X className="h-5 w-5 stroke-[2.2]" />
        </button>
      </div>

      {/* Auto-Dismiss Progress Bar (Single uniform card color with subtle timer bar) */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/10 overflow-hidden">
          <div
            className="h-full bg-white/40 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

// Global Toast Manager & Event Listener System
import { createPortal } from "react-dom";

type ToastListener = (toasts: ToastItem[]) => void;
let activeToasts: ToastItem[] = [];
const listeners: Set<ToastListener> = new Set();

const notifyListeners = () => {
  listeners.forEach((listener) => listener([...activeToasts]));
};

export const toast = {
  warning: (message: string = "Please be careful!", duration: number = 4000) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    activeToasts = [...activeToasts, { id, type: "warning", message, duration }];
    notifyListeners();
    return id;
  },
  info: (message: string = "Here is some information.", duration: number = 4000) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    activeToasts = [...activeToasts, { id, type: "info", message, duration }];
    notifyListeners();
    return id;
  },
  error: (message: string = "Something went wrong!", duration: number = 4000) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    activeToasts = [...activeToasts, { id, type: "error", message, duration }];
    notifyListeners();
    return id;
  },
  success: (message: string = "Operation completed!", duration: number = 4000) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    activeToasts = [...activeToasts, { id, type: "success", message, duration }];
    notifyListeners();
    return id;
  },
  dismiss: (id: string) => {
    activeToasts = activeToasts.filter((t) => t.id !== id);
    notifyListeners();
  },
  clearAll: () => {
    activeToasts = [];
    notifyListeners();
  },
};

export function ToastContainer({ position = "top-right" }: { position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" }) {
  const [toasts, setToasts] = useState<ToastItem[]>(activeToasts);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleChange = (newToasts: ToastItem[]) => {
      setToasts(newToasts);
    };
    listeners.add(handleChange);
    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  if (!mounted || toasts.length === 0) return null;

  const positionClasses = {
    "top-right": "top-5 right-5",
    "top-left": "top-5 left-5",
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
  };

  const containerContent = (
    <div className={`fixed z-[999999] flex flex-col gap-3 pointer-events-none ${positionClasses[position]}`}>
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastCard
            type={t.type}
            message={t.message}
            duration={t.duration}
            onClose={() => toast.dismiss(t.id)}
          />
        </div>
      ))}
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(containerContent, document.body);
}

export default ToastCard;

import React from "react";
import { ToastCard, ToastType } from "../../../components/ui/Toast";

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type, duration = 4000, onClose }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ToastCard type={type} message={message} duration={duration} onClose={onClose} />
    </div>
  );
}

export default Toast;

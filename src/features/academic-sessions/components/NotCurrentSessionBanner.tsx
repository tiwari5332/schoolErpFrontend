import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { useSelectedSession } from '../hooks/useSessions';

export function NotCurrentSessionBanner() {
  const { selectedSession, currentSession, isCurrentSelected, switchSession, isSwitching } = useSelectedSession();

  if (isCurrentSelected || !selectedSession || !currentSession) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-[11px] sm:text-xs text-amber-800 animate-in fade-in transition-all"
    >
      <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
      <span className="font-medium truncate">
        Viewing <span className="font-bold">{selectedSession.name}</span> (not current)
      </span>
      <button
        type="button"
        disabled={isSwitching}
        onClick={() => switchSession(currentSession.id)}
        className="ml-1 text-indigo-700 hover:text-indigo-900 font-semibold underline underline-offset-2 flex items-center gap-0.5 cursor-pointer disabled:opacity-50"
      >
        <span>Switch to current</span>
        <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  );
}

export default NotCurrentSessionBanner;


import React, { useState } from 'react';
import { AlertCircle, ArrowRight, X } from 'lucide-react';
import { useSelectedSession } from '../../academic-sessions/hooks/useSessions';

export function SessionBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const { selectedSession, currentSession, switchSession } = useSelectedSession();

  const isCurrent = selectedSession?.isCurrent ?? true;

  if (isCurrent || isDismissed || !selectedSession) {
    return null;
  }

  const sessionName = selectedSession.name || 'Selected Session';

  return (
    <div className="mb-6 p-3 sm:px-4 sm:py-3 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
      <div className="flex items-center gap-2.5">
        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
        <span className="text-xs font-medium">
          Viewing <strong>{sessionName}</strong> (not the active academic session). Real-time daily actions and attendance correspond to this archive.
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
        {currentSession && (
          <button
            type="button"
            onClick={() => switchSession(currentSession.id)}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-white/80 hover:bg-white px-2.5 py-1 rounded-lg border border-amber-300 shadow-xs flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Switch to current ({currentSession.name})</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        )}
        <button
          type="button"
          aria-label="Dismiss banner"
          onClick={() => setIsDismissed(true)}
          className="p-1 rounded-md text-amber-800 hover:bg-amber-100 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default SessionBanner;


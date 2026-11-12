import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Plus, Check, RefreshCw, AlertCircle, Sparkles, X } from 'lucide-react';
import { useSelectedSession, useIsSuperAdmin } from '../hooks/useSessions';
import { SessionBadge } from './SessionBadge';
import { AddSessionModal } from './AddSessionModal';
import { SetCurrentConfirmDialog } from './SetCurrentConfirmDialog';
import { AcademicSession } from '../../../types/session';
import { useMediaQuery } from '../../../shared/hooks/useMediaQuery';

export function SessionDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sessionToSetCurrent, setSessionToSetCurrent] = useState<AcademicSession | null>(null);

  const isMobile = useMediaQuery('(max-width: 639px)');
  const isSuperAdmin = useIsSuperAdmin();
  const {
    selectedSession,
    sortedSessions,
    isLoading,
    isError,
    refetch,
    switchSession,
  } = useSelectedSession();

  const displayName = selectedSession?.name || '2024-25';

  return (
    <>
      {isMobile ? (
        /* ═══ MOBILE TRIGGER (< 640px) ═══ */
        <Button
          type="button"
          variant="ghost"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="gap-1.5 text-xs text-slate-600 font-medium hover:bg-slate-100 h-8 px-3 rounded-lg focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
        >
          <span className="text-slate-400">Session</span>
          <span className="font-semibold text-indigo-700">{displayName}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 opacity-60 ml-0.5 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
      ) : (
        /* ═══ DESKTOP RADIX PORTALED DROPDOWN (>= 640px) ═══ */
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="gap-1.5 text-xs text-slate-600 font-medium hover:bg-slate-100 h-8 px-3 rounded-lg focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors cursor-pointer"
            >
              <span className="text-slate-400">Session</span>
              <span className="font-semibold text-indigo-700">{displayName}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 opacity-60 ml-0.5 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            style={{ zIndex: 9999 }}
            className="w-72 p-0 rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden z-[9999]"
          >
            {/* Header */}
            <div className="px-3.5 py-2.5 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Academic Sessions
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {sortedSessions.length} total
              </span>
            </div>

            {/* Sessions List */}
            <div className="max-h-72 overflow-y-auto py-1 divide-y divide-slate-50">
              {isLoading && sortedSessions.length === 0 ? (
                <div className="p-3 space-y-2">
                  <div className="h-9 bg-slate-100 rounded-lg animate-pulse" />
                  <div className="h-9 bg-slate-100 rounded-lg animate-pulse" />
                  <div className="h-9 bg-slate-100 rounded-lg animate-pulse" />
                </div>
              ) : isError && sortedSessions.length === 0 ? (
                <div className="p-4 text-center space-y-2">
                  <AlertCircle className="h-5 w-5 text-rose-500 mx-auto" />
                  <p className="text-xs text-slate-600">Failed to load sessions</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => refetch()}
                    className="h-7 text-xs border-slate-200"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" /> Retry
                  </Button>
                </div>
              ) : sortedSessions.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  No sessions yet
                </div>
              ) : (
                sortedSessions.map((session) => {
                  const isSelected = session.id === selectedSession?.id;
                  const isUpcoming = session.status === 'upcoming';

                  return (
                    <DropdownMenuItem
                      key={session.id}
                      onSelect={() => switchSession(session.id)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 text-xs cursor-pointer rounded-none outline-none transition-colors ${
                        isSelected
                          ? 'bg-indigo-50/90 text-indigo-900 font-semibold focus:bg-indigo-50/90 focus:text-indigo-900'
                          : 'text-slate-700 hover:bg-slate-50 focus:bg-slate-50 focus:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-4 flex items-center justify-center shrink-0">
                          {isSelected && <Check className="h-3.5 w-3.5 text-indigo-600 font-bold" />}
                        </div>
                        <span className="truncate">Session {session.name}</span>
                        <SessionBadge status={session.status} isCurrent={session.isCurrent} />
                      </div>

                      {/* Super Admin "Set as current" action for upcoming sessions */}
                      {isSuperAdmin && isUpcoming && (
                        <button
                          type="button"
                          title="Set as current session"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setSessionToSetCurrent(session);
                            setIsOpen(false);
                          }}
                          className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 hover:opacity-100 transition-opacity px-1.5 py-0.5 text-[10px] font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100/60 rounded flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="h-3 w-3 text-indigo-500" />
                          <span>Set current</span>
                        </button>
                      )}
                    </DropdownMenuItem>
                  );
                })
              )}
            </div>

            {/* Super Admin Footer */}
            {isSuperAdmin && (
              <div className="p-2 border-t border-slate-100 bg-slate-50/60">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAddModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ Add new session</span>
                </button>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* ═══ MOBILE BOTTOM SHEET PORTAL (< 640px) ═══ */}
      {isMobile &&
        isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex flex-col justify-end">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
              onClick={() => setIsOpen(false)}
            />

            {/* Bottom Sheet Drawer */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Academic Sessions"
              className="relative w-full max-h-[80vh] bg-white rounded-t-3xl shadow-2xl z-10 overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-200"
            >
              {/* Drag Handle & Header */}
              <div className="pt-3 pb-2.5 px-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1 bg-slate-300 rounded-full mx-auto absolute top-2 left-1/2 -translate-x-1/2" />
                  <span className="text-sm font-bold text-slate-800 pt-1">Academic Sessions</span>
                  <span className="text-xs text-slate-400 pt-1">({sortedSessions.length})</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Sessions List */}
              <div className="overflow-y-auto divide-y divide-slate-100 p-2">
                {sortedSessions.map((session) => {
                  const isSelected = session.id === selectedSession?.id;
                  const isUpcoming = session.status === 'upcoming';

                  return (
                    <div
                      key={session.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        switchSession(session.id);
                        setIsOpen(false);
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl text-sm transition-colors ${
                        isSelected
                          ? 'bg-indigo-50 text-indigo-900 font-semibold'
                          : 'text-slate-700 active:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 flex items-center justify-center">
                          {isSelected && <Check className="h-4 w-4 text-indigo-600 font-bold" />}
                        </div>
                        <span>Session {session.name}</span>
                        <SessionBadge status={session.status} isCurrent={session.isCurrent} />
                      </div>

                      {isSuperAdmin && isUpcoming && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSessionToSetCurrent(session);
                            setIsOpen(false);
                          }}
                          className="px-2 py-1 text-xs text-indigo-600 bg-indigo-50 rounded-lg font-medium"
                        >
                          Set current
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Super Admin Bottom Footer */}
              {isSuperAdmin && (
                <div className="p-3 border-t border-slate-100 bg-slate-50">
                  <Button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(true);
                      setIsOpen(false);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-10 text-xs font-semibold gap-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    <span>+ Add new session</span>
                  </Button>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}

      {/* Super Admin: Add Session Modal */}
      {isSuperAdmin && (
        <AddSessionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          existingSessions={sortedSessions}
        />
      )}

      {/* Super Admin: Confirm Set as Current Dialog */}
      {isSuperAdmin && (
        <SetCurrentConfirmDialog
          session={sessionToSetCurrent}
          isOpen={!!sessionToSetCurrent}
          onClose={() => setSessionToSetCurrent(null)}
        />
      )}
    </>
  );
}

export default SessionDropdown;

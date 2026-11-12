import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarCheck,
  CreditCard,
  UserPlus,
  Send,
  CalendarPlus,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { QuickActionItem } from '../../../types/dashboard';
import { filterAllowedQuickActions } from '../utils/dashboardFormatters';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { WidgetState } from './WidgetState';
import useAppStore from '@/store';

interface QuickActionsProps {
  actions: QuickActionItem[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  onOpenAddEventModal: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  CalendarCheck,
  CreditCard,
  UserPlus,
  Send,
  CalendarPlus,
};

const COLOR_MAP: Record<string, { bg: string; iconBg: string; text: string; hover: string }> = {
  mark_attendance: {
    bg: 'hover:bg-emerald-50/70 hover:border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-700',
    text: 'text-emerald-950',
    hover: 'group-hover:text-emerald-600',
  },
  collect_fee: {
    bg: 'hover:bg-amber-50/70 hover:border-amber-200',
    iconBg: 'bg-amber-100 text-amber-700',
    text: 'text-amber-950',
    hover: 'group-hover:text-amber-600',
  },
  add_student: {
    bg: 'hover:bg-indigo-50/70 hover:border-indigo-200',
    iconBg: 'bg-indigo-100 text-indigo-700',
    text: 'text-indigo-950',
    hover: 'group-hover:text-indigo-600',
  },
  send_notice: {
    bg: 'hover:bg-cyan-50/70 hover:border-cyan-200',
    iconBg: 'bg-cyan-100 text-cyan-700',
    text: 'text-cyan-950',
    hover: 'group-hover:text-cyan-600',
  },
  add_event: {
    bg: 'hover:bg-purple-50/70 hover:border-purple-200',
    iconBg: 'bg-purple-100 text-purple-700',
    text: 'text-purple-950',
    hover: 'group-hover:text-purple-600',
  },
};

export function QuickActions({
  actions,
  isLoading,
  isError,
  error,
  onRetry,
  onOpenAddEventModal,
}: QuickActionsProps) {
  const navigate = useNavigate();
  const currentUserRole = useAppStore((state: any) => state.auth?.user?.role || 'Super Admin');

  const allowedActions = filterAllowedQuickActions(actions, currentUserRole);

  const handleClick = (action: QuickActionItem) => {
    if (action.modalAction === 'add_event') {
      onOpenAddEventModal();
    } else if (action.route) {
      navigate(action.route);
    }
  };

  return (
    <Card className="border border-slate-100 shadow-sm bg-white rounded-2xl overflow-hidden flex flex-col justify-between">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
            <span>Quick Actions</span>
            <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              Role: {currentUserRole}
            </span>
          </CardTitle>
          <span className="text-xs text-slate-400">Frequently used shortcuts</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 pt-2">
        <WidgetState
          isLoading={isLoading}
          isError={isError}
          error={error}
          onRetry={onRetry}
          isEmpty={allowedActions.length === 0}
          emptyMessage="No quick actions available for your role."
          skeletonHeight="h-28"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {allowedActions.map((action) => {
              const Icon = ICON_MAP[action.icon] || Sparkles;
              const theme = COLOR_MAP[action.id] || {
                bg: 'hover:bg-slate-50 hover:border-slate-200',
                iconBg: 'bg-slate-100 text-slate-700',
                text: 'text-slate-900',
                hover: 'group-hover:text-indigo-600',
              };

              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleClick(action)}
                  className={`group relative p-3 sm:p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center text-center gap-2.5 transition-all duration-200 cursor-pointer ${theme.bg}`}
                >
                  <div
                    className={`h-10 w-10 sm:h-12 sm:w-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-200 ${theme.iconBg}`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="space-y-0.5 min-w-0 w-full">
                    <span className={`text-xs font-semibold block truncate ${theme.text} ${theme.hover}`}>
                      {action.label}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate flex items-center justify-center gap-1">
                      Open <ArrowRight className="h-2.5 w-2.5 inline" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </WidgetState>
      </CardContent>
    </Card>
  );
}

export default QuickActions;

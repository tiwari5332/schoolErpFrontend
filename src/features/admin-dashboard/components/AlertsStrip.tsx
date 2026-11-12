import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Info, Bell, X, ArrowRight } from 'lucide-react';
import { CommunicationBalanceResponse, StudentAttendanceSummary, PendingActionsResponse } from '../../../types/dashboard';

interface AlertsStripProps {
  commBalance?: CommunicationBalanceResponse;
  attendance?: StudentAttendanceSummary;
  pendingActions?: PendingActionsResponse;
}

export function AlertsStrip({
  commBalance,
  attendance,
  pendingActions,
}: AlertsStripProps) {
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const alerts: Array<{
    id: string;
    type: 'warning' | 'alert' | 'info';
    message: string;
    actionText?: string;
    actionLink?: string;
  }> = [];

  // 1. Low Communication Balance alert
  if (commBalance) {
    if (commBalance.sms?.lowBalance) {
      alerts.push({
        id: 'low-sms',
        type: 'alert',
        message: `Low SMS Balance: only ${commBalance.sms.available} SMS remaining (below threshold of ${commBalance.sms.threshold}). Recharge to ensure parent alerts are delivered.`,
        actionText: 'Top Up SMS',
        actionLink: '/admin/communication',
      });
    } else if (commBalance.whatsapp?.lowBalance) {
      alerts.push({
        id: 'low-whatsapp',
        type: 'alert',
        message: `Low WhatsApp credits: only ${commBalance.whatsapp.available} messages remaining.`,
        actionText: 'Top Up WhatsApp',
        actionLink: '/admin/communication',
      });
    }
  }

  // 2. Attendance not marked alert
  if (attendance && attendance.status === 'not_marked') {
    alerts.push({
      id: 'attendance-not-marked',
      type: 'warning',
      message: "Today's student attendance has not been marked yet.",
      actionText: 'Mark Attendance Now',
      actionLink: '/admin/attendance',
    });
  }

  // 3. Pending approvals alert
  if (pendingActions && pendingActions.count > 0) {
    alerts.push({
      id: 'pending-approvals',
      type: 'info',
      message: `You have ${pendingActions.count} pending approval request${pendingActions.count > 1 ? 's' : ''} awaiting review.`,
      actionText: 'Review Approvals',
      actionLink: '#pending-approvals-section',
    });
  }

  const activeAlerts = alerts.filter((a) => !dismissedIds.includes(a.id));

  if (activeAlerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-6">
      {activeAlerts.map((alert) => {
        const isAlert = alert.type === 'alert';
        const isWarning = alert.type === 'warning';

        const bgClass = isAlert
          ? 'bg-rose-50/90 border-rose-200 text-rose-900'
          : isWarning
            ? 'bg-amber-50/90 border-amber-200 text-amber-900'
            : 'bg-indigo-50/90 border-indigo-200 text-indigo-900';

        const Icon = isAlert ? AlertTriangle : isWarning ? AlertTriangle : Bell;
        const iconColor = isAlert ? 'text-rose-600' : isWarning ? 'text-amber-600' : 'text-indigo-600';

        return (
          <div
            key={alert.id}
            role="alert"
            className={`p-3 sm:px-4 sm:py-2.5 rounded-xl border flex items-center justify-between gap-3 shadow-xs text-xs ${bgClass} transition-all`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon className={`h-4 w-4 shrink-0 ${iconColor}`} />
              <span className="font-medium truncate">{alert.message}</span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {alert.actionText && alert.actionLink && (
                <Link
                  to={alert.actionLink}
                  className="font-bold underline flex items-center gap-1 hover:opacity-80 transition-opacity"
                >
                  <span>{alert.actionText}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              )}
              <button
                type="button"
                aria-label="Dismiss alert"
                onClick={() => setDismissedIds((prev) => [...prev, alert.id])}
                className="p-1 rounded-md hover:bg-black/5 opacity-60 hover:opacity-100 transition-opacity"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AlertsStrip;


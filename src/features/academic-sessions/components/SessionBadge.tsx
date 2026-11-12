import React from 'react';
import { SessionStatus } from '../../../types/session';

interface SessionBadgeProps {
  status: SessionStatus;
  isCurrent?: boolean;
  className?: string;
}

export function SessionBadge({ status, isCurrent, className = '' }: SessionBadgeProps) {
  // If explicitly flagged as current, treat as current badge
  const effectiveStatus: SessionStatus = isCurrent ? 'current' : status;

  const styles = {
    current: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    upcoming: 'bg-blue-50 text-blue-700 border-blue-200',
    closed: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  const labels = {
    current: 'Current',
    upcoming: 'Upcoming',
    closed: 'Closed',
  };

  const badgeStyle = styles[effectiveStatus] || styles.closed;
  const label = labels[effectiveStatus] || labels.closed;

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold border ${badgeStyle} ${className}`}
    >
      {label}
    </span>
  );
}

export default SessionBadge;


import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowUpRight, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KpiCardProps {
  title: string;
  value: React.ReactNode;
  subtitle?: React.ReactNode;
  trend?: string;
  icon: LucideIcon;
  to: string;
  gradientBg: string; // e.g. "bg-gradient-to-br from-indigo-50/80 to-purple-50/60"
  iconBg: string; // e.g. "bg-indigo-50 text-indigo-600"
  borderColor?: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  isInactiveSession?: boolean;
  inactiveBadgeText?: string;
}

export function KpiCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  to,
  gradientBg,
  iconBg,
  borderColor = 'border-slate-100',
  isLoading = false,
  isError = false,
  error,
  onRetry,
  isInactiveSession = false,
  inactiveBadgeText = 'Historical',
}: KpiCardProps) {
  if (isLoading) {
    return (
      <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm animate-pulse space-y-3">
        <div className="flex justify-between items-start">
          <div className="h-4 w-24 bg-slate-100 rounded" />
          <div className="h-10 w-10 bg-slate-100 rounded-xl" />
        </div>
        <div className="h-8 w-28 bg-slate-100 rounded" />
        <div className="h-3 w-36 bg-slate-100 rounded" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`p-5 rounded-2xl border border-rose-100 bg-rose-50/50 shadow-sm flex flex-col justify-between space-y-3`}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-rose-800 uppercase tracking-wider">
              {title}
            </span>
            <p className="text-xs text-rose-600 font-medium">Failed to load data</p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
            <AlertCircle className="h-4 w-4" />
          </div>
        </div>

        <div className="pt-2 border-t border-rose-100/80 flex items-center justify-between">
          <span className="text-[11px] text-rose-500">API connection error</span>
          {onRetry && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRetry();
              }}
              className="h-7 px-2.5 text-xs border-rose-200 text-rose-700 bg-white hover:bg-rose-50 gap-1 rounded-lg"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Retry</span>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={`group relative overflow-hidden rounded-2xl p-5 border ${borderColor} ${gradientBg} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between block ${
        isInactiveSession ? 'opacity-85 saturate-75' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {title}
            </span>
            {isInactiveSession && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-600">
                {inactiveBadgeText}
              </span>
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-1">
            {value}
          </div>
        </div>

        <div className={`h-11 w-11 rounded-2xl ${iconBg} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100/60 flex items-center justify-between text-xs">
        <div className="text-slate-500 truncate">
          {subtitle}
        </div>
        {trend && (
          <span className="text-emerald-600 font-semibold text-[11px] shrink-0 ml-2">
            {trend}
          </span>
        )}
      </div>

      {/* Subtle hover arrow indicator */}
      <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
      </div>
    </Link>
  );
}

export default KpiCard;

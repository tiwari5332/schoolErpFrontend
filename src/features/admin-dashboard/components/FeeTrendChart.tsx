import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { useFeeTrend } from '../hooks/useDashboardQueries';
import { formatPaiseToRupees } from '../utils/dashboardFormatters';
import { WidgetState } from './WidgetState';

export function FeeTrendChart() {
  const [days, setDays] = useState<7 | 30>(7);
  const { data, isLoading, isError, error, refetch } = useFeeTrend(days);

  const points = data?.data || [];
  const totalCollectedFormatted = formatPaiseToRupees(data?.totalCollected);

  return (
    <Card className="border border-slate-100 shadow-sm bg-white rounded-2xl overflow-hidden flex flex-col justify-between">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-600" />
              <span>Fee Collection Trend</span>
            </CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">
              Total collected in last {days} days: <strong className="text-slate-800 font-bold">{totalCollectedFormatted}</strong>
            </p>
          </div>

          {/* 7 vs 30 Days Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setDays(7)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                days === 7
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              7 Days
            </button>
            <button
              type="button"
              onClick={() => setDays(30)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                days === 30
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 pt-3">
        <WidgetState
          isLoading={isLoading}
          isError={isError}
          error={error as Error}
          onRetry={refetch}
          isEmpty={points.length === 0}
          emptyMessage="No fee collection data recorded for this period."
          skeletonHeight="h-56"
        >
          <div className="h-56 w-full min-h-[224px]">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={points} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="feeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  tickFormatter={(val) => `₹${Math.round(val / 100000)}k`}
                />
                <Tooltip
                  formatter={(val: any) => [formatPaiseToRupees(Number(val)), 'Collected']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#feeGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </WidgetState>
      </CardContent>
    </Card>
  );
}

export default FeeTrendChart;


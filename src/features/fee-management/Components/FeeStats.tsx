import React from 'react';
import { IndianRupee, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { FeeRecord } from '../Constants';

interface FeeStatsProps {
  records: FeeRecord[];
}

export function FeeStats({ records }: FeeStatsProps) {
  const totalBilling = records.reduce((sum, record) => sum + record.totalAmount, 0);
  const totalCollected = records.reduce((sum, record) => sum + record.amountPaid, 0);
  const pendingDues = records.reduce((sum, record) => sum + record.balance, 0);
  const overdueCount = records.filter(record => record.status === 'Overdue').length;
  const paidCount = records.filter(record => record.status === 'Paid').length;
  const totalCount = records.length || 1;

  const collectedPct = totalBilling > 0 ? Math.round((totalCollected / totalBilling) * 100) : 0;
  const pendingPct = totalBilling > 0 ? Math.round((pendingDues / totalBilling) * 100) : 0;
  const overduePct = Math.round((overdueCount / totalCount) * 100);
  const paidPct = Math.round((paidCount / totalCount) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Total Collected */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 p-5 text-white shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-100">Total Collected</span>
          <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="mt-4 text-3xl font-bold">₹{totalCollected.toLocaleString()}</div>
        <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-300 rounded-full" style={{ width: `${collectedPct}%` }} />
        </div>
        <div className="mt-2 text-[11px] text-emerald-100 flex justify-between">
          <span>{collectedPct}% Realized</span>
          <span>Revenue Collected</span>
        </div>
      </div>

      {/* Pending Dues */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-700 p-5 text-white shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-amber-100">Pending Dues</span>
          <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="mt-4 text-3xl font-bold">₹{pendingDues.toLocaleString()}</div>
        <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-amber-200 rounded-full" style={{ width: `${pendingPct}%` }} />
        </div>
        <div className="mt-2 text-[11px] text-amber-100 flex justify-between">
          <span>{pendingPct}% Outstanding</span>
          <span>Awaiting Settlement</span>
        </div>
      </div>

      {/* Overdue Accounts */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-600 to-red-800 p-5 text-white shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-rose-100">Overdue Accounts</span>
          <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
            <AlertCircle className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="mt-4 text-3xl font-bold">{overdueCount}</div>
        <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-rose-300 rounded-full" style={{ width: `${overduePct}%` }} />
        </div>
        <div className="mt-2 text-[11px] text-rose-100 flex justify-between">
          <span>{overduePct}% Overdue</span>
          <span>Action Required</span>
        </div>
      </div>

      {/* Fully Paid */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-800 p-5 text-white shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-indigo-100">Fully Paid Accounts</span>
          <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
            <IndianRupee className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="mt-4 text-3xl font-bold">{paidCount}</div>
        <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-300 rounded-full" style={{ width: `${paidPct}%` }} />
        </div>
        <div className="mt-2 text-[11px] text-indigo-100 flex justify-between">
          <span>{paidPct}% Settled</span>
          <span>Clear Accounts</span>
        </div>
      </div>
    </div>
  );
}

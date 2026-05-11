import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { IndianRupee, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { FeeRecord } from '../Constants';

interface FeeStatsProps {
  records: FeeRecord[];
}

export function FeeStats({ records }: FeeStatsProps) {
  const totalCollected = records.reduce((sum, record) => sum + record.amountPaid, 0);
  const pendingDues = records.reduce((sum, record) => sum + record.balance, 0);
  const overdueCount = records.filter(record => record.status === 'Overdue').length;
  const paidCount = records.filter(record => record.status === 'Paid').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="relative overflow-hidden border-0 shadow-colored-emerald hover-lift">
        <div className="absolute inset-0 gradient-emerald opacity-5"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">Total Collected</p>
              <p className="text-3xl font-bold text-emerald-900">₹{totalCollected.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-colored-emerald">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden border-0 shadow-colored-amber hover-lift">
        <div className="absolute inset-0 gradient-amber opacity-5"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-700">Pending Dues</p>
              <p className="text-3xl font-bold text-amber-900">₹{pendingDues.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl gradient-amber flex items-center justify-center shadow-colored-amber">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden border-0 shadow-colored-rose hover-lift">
        <div className="absolute inset-0 gradient-rose opacity-5"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-rose-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-rose-700">Overdue Accounts</p>
              <p className="text-3xl font-bold text-rose-900">{overdueCount}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl gradient-rose flex items-center justify-center shadow-colored-rose">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden border-0 shadow-colored-indigo hover-lift">
        <div className="absolute inset-0 gradient-indigo opacity-5"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-700">Fully Paid</p>
              <p className="text-3xl font-bold text-indigo-900">{paidCount}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl gradient-indigo flex items-center justify-center shadow-colored-indigo">
              <IndianRupee className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

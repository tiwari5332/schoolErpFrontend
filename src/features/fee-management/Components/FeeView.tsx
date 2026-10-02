import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Download,
  Plus,
  TrendingUp,
  Calendar as CalendarIcon,
  ArrowRight,
  IndianRupee,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  CreditCard,
  PieChart as PieChartIcon,
  ShieldCheck,
  Sparkles,
  Receipt,
  Mail,
  UserCheck,
  Layers,
  User
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import { FeeRecord } from '../Constants';
import { useFeeManagement } from '../hooks/useFeeManagement';
import { FeeStats } from './FeeStats';
import { FeeFilters } from './FeeFilters';
import { FeeTable } from './FeeTable';
import { FeePaymentForm } from './FeePaymentForm';
import { FeeReceiptModal } from './FeeReceiptModal';
import { CLASSES, FEE_STATUSES } from '../Constants';

export type UserRole = 'ADMIN' | 'ACCOUNTANT' | 'PRINCIPAL' | 'PARENT';

export function FeeView() {
  const {
    records,
    filteredRecords,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedClass,
    setSelectedClass,
    selectedMonth,
    setSelectedMonth,
    isPaymentFormOpen,
    setIsPaymentFormOpen,
    isReceiptModalOpen,
    setIsReceiptModalOpen,
    selectedRecord,
    selectedIds,
    handleToggleSelect,
    handleToggleSelectAll,
    handleBulkRemind,
    handleRecordPayment,
    handleViewReceipt,
    handleSendReminder,
    handleSavePayment
  } = useFeeManagement();

  // Active role switcher state for testing role permissions
  const [currentRole, setCurrentRole] = useState<UserRole>('ADMIN');

  // Active tab state defaulted to 'dashboard' matching Staff Management UX
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Dashboard filter states
  const [dashboardDate, setDashboardDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dashboardClass, setDashboardClass] = useState<string>('all');
  const [dashboardStatus, setDashboardStatus] = useState<string>('all');

  // Fee Analytics Stats
  const dashboardStats = useMemo(() => {
    const totalBilling = records.reduce((sum, r) => sum + r.totalAmount, 0);
    const totalCollected = records.reduce((sum, r) => sum + r.amountPaid, 0);
    const totalDues = records.reduce((sum, r) => sum + r.balance, 0);
    const paidCount = records.filter(r => r.status === 'Paid').length;
    const pendingCount = records.filter(r => r.status === 'Pending').length;
    const overdueCount = records.filter(r => r.status === 'Overdue').length;
    const totalRecords = records.length || 1;

    const collectionRate = totalBilling > 0 ? ((totalCollected / totalBilling) * 100).toFixed(1) : '94.8';
    const paidPct = Math.round((paidCount / totalRecords) * 100);
    const pendingPct = Math.round((pendingCount / totalRecords) * 100);
    const overduePct = Math.round((overdueCount / totalRecords) * 100);

    return {
      totalBilling,
      totalCollected,
      totalDues,
      paidCount,
      pendingCount,
      overdueCount,
      totalRecords,
      collectionRate,
      paidPct,
      pendingPct,
      overduePct
    };
  }, [records]);

  // Donut chart data for Fee Distribution
  const pieData = [
    { name: 'Paid Accounts', value: dashboardStats.paidCount, color: '#10b981' },
    { name: 'Pending Dues', value: dashboardStats.pendingCount, color: '#f59e0b' },
    { name: 'Overdue Notices', value: dashboardStats.overdueCount, color: '#f43f5e' },
    { name: 'Concession / Discounted', value: records.filter(r => r.breakdown.discount > 0).length || 1, color: '#8b5cf6' },
  ];

  // Flattened all transactions for Payment History Tab
  const allTransactions = useMemo(() => {
    const trxs: Array<{
      trxId: string;
      date: string;
      studentName: string;
      studentId: string;
      className: string;
      amount: number;
      method: string;
      remarks: string;
    }> = [];

    records.forEach(r => {
      (r.transactions || []).forEach(t => {
        trxs.push({
          trxId: t.id,
          date: t.date,
          studentName: r.studentName,
          studentId: r.studentId,
          className: r.className,
          amount: t.amount,
          method: t.method,
          remarks: t.remarks
        });
      });
    });

    return trxs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [records]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Actions (Matching Staff Management Header) */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center print:hidden">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Fee Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage student fee collection, dues tracking, discount rules, and receipt records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-xs rounded-xl h-10 px-4 transition-all">
            <Download className="h-4 w-4 text-emerald-500" />
            Export Report
          </Button>
          {(currentRole === 'ADMIN' || currentRole === 'ACCOUNTANT') && (
            <Button
              onClick={() => {
                if (records.length > 0) handleRecordPayment(records[0]);
              }}
              className="gap-2 gradient-emerald text-white shadow-colored-emerald hover:scale-[1.02] transition-all duration-200 h-10 px-4 rounded-xl text-xs font-semibold"
            >
              <Plus className="h-4 w-4" />
              New Payment / Invoice
            </Button>
          )}
        </div>
      </div>

      {/* Tabs Navigation Bar (Matching Staff Management UX) */}
      <div className="flex border-b border-slate-200 gap-6 overflow-x-auto scrollbar-hide print:hidden">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`pb-3 text-xs font-bold transition-all relative whitespace-nowrap ${activeTab === 'dashboard'
            ? 'text-emerald-600 border-b-2 border-emerald-600'
            : 'text-slate-500 hover:text-slate-800'
            }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('fee-records')}
          className={`pb-3 text-xs font-bold transition-all relative whitespace-nowrap ${activeTab === 'fee-records'
            ? 'text-emerald-600 border-b-2 border-emerald-600'
            : 'text-slate-500 hover:text-slate-800'
            }`}
        >
          Fee Records
        </button>
        <button
          onClick={() => setActiveTab('payment-history')}
          className={`pb-3 text-xs font-bold transition-all relative whitespace-nowrap ${activeTab === 'payment-history'
            ? 'text-emerald-600 border-b-2 border-emerald-600'
            : 'text-slate-500 hover:text-slate-800'
            }`}
        >
          Payment History
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`pb-3 text-xs font-bold transition-all relative whitespace-nowrap ${activeTab === 'reports'
            ? 'text-emerald-600 border-b-2 border-emerald-600'
            : 'text-slate-500 hover:text-slate-800'
            }`}
        >
          Reports & Analytics
        </button>
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-white/90">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-semibold text-lg">
                    Fee Collection & Financial Analytics Dashboard
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80 mt-2">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>20 Sep 2026, Sunday</span>
                </div>
              </div>
              <Button
                onClick={() => setActiveTab('fee-records')}
                className="bg-white font-medium text-sm text-emerald-700 hover:bg-slate-100 shadow-md transition-all self-start sm:self-auto gap-2 rounded-xl px-5 py-2"
              >
                View Fee Records <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl">
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5 text-slate-400" /> Filter by Date
                </label>
                <Input
                  type="date"
                  value={dashboardDate}
                  onChange={(e) => setDashboardDate(e.target.value)}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Class Filter</label>
                <Select value={dashboardClass} onValueChange={setDashboardClass}>
                  <SelectTrigger className="rounded-xl border-slate-200 h-10 text-sm">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {CLASSES.map(c => (
                      <SelectItem key={c} value={c}>Class {c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Status Filter</label>
                <Select value={dashboardStatus} onValueChange={setDashboardStatus}>
                  <SelectTrigger className="rounded-xl border-slate-200 h-10 text-sm">
                    <SelectValue placeholder="All Fee Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {FEE_STATUSES.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <FeeStats records={records} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border border-slate-200/80 shadow-sm rounded-2xl bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-lg font-semibold text-slate-800">
                  Fee Settlement & Payment Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="h-64 w-full flex justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs font-medium text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
                    <span>Paid Accounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
                    <span>Pending Dues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500 inline-block" />
                    <span>Overdue Notices</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-purple-500 inline-block" />
                    <span>Concession / Discounted</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Paid Accounts</div>
                  <div className="text-2xl font-bold text-slate-800">{dashboardStats.paidCount}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-amber-50 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Pending Invoices</div>
                  <div className="text-2xl font-bold text-slate-800">{dashboardStats.pendingCount}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-rose-50 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-rose-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Overdue Notices</div>
                  <div className="text-2xl font-bold text-slate-800">{dashboardStats.overdueCount}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-purple-50 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-purple-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Active Accounts</div>
                  <div className="text-2xl font-bold text-slate-800">{dashboardStats.totalRecords}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-teal-50 flex items-center justify-center">
                  <IndianRupee className="h-5 w-5 text-teal-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Total Billing</div>
                  <div className="text-xl font-bold text-slate-800">₹{dashboardStats.totalBilling.toLocaleString()}</div>
                </div>
              </Card>

              <Card className="border border-emerald-100 shadow-sm rounded-2xl p-4 bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-emerald-100">Collection Efficiency</div>
                  <div className="text-2xl font-bold text-white">{dashboardStats.collectionRate}%</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FEE RECORDS */}
      {activeTab === 'fee-records' && (
        <div className="space-y-6">
          <FeeFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedClass={selectedClass}
            onClassChange={setSelectedClass}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <FeeTable
              records={filteredRecords}
              onRecordPayment={handleRecordPayment}
              onViewReceipt={handleViewReceipt}
              onSendReminder={handleSendReminder}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              onBulkRemind={handleBulkRemind}
            />
          )}
        </div>
      )}

      {/* TAB 3: PAYMENT HISTORY */}
      {activeTab === 'payment-history' && (
        <div className="space-y-6">
          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader className="p-5 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900">Recorded Payment Audit Log</CardTitle>
              <CardDescription className="text-xs text-slate-500">History of all transactions processed across fee accounts</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/80">
                    <TableRow className="border-b border-slate-200/80">
                      <TableHead className="font-semibold text-xs text-slate-700 pl-6">Transaction ID</TableHead>
                      <TableHead className="font-semibold text-xs text-slate-700">Date</TableHead>
                      <TableHead className="font-semibold text-xs text-slate-700">Student</TableHead>
                      <TableHead className="font-semibold text-xs text-slate-700">Class</TableHead>
                      <TableHead className="font-semibold text-xs text-slate-700">Method</TableHead>
                      <TableHead className="font-semibold text-xs text-slate-700">Remarks</TableHead>
                      <TableHead className="font-semibold text-xs text-slate-700 text-right pr-6">Amount Paid</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-48 text-center text-xs text-slate-500">
                          No payment transactions recorded yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      allTransactions.map((trx) => (
                        <TableRow key={trx.trxId} className="border-b border-slate-100 hover:bg-slate-50/70">
                          <TableCell className="pl-6 text-xs font-mono font-bold text-slate-800">
                            {trx.trxId}
                          </TableCell>
                          <TableCell className="text-xs text-slate-600">
                            {new Date(trx.date).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-xs font-medium text-slate-900">
                            {trx.studentName} <span className="text-[11px] text-slate-400 block">{trx.studentId}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[11px]">
                              {trx.className}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs font-medium text-slate-700">
                            {trx.method}
                          </TableCell>
                          <TableCell className="text-xs text-slate-500 italic">
                            {trx.remarks}
                          </TableCell>
                          <TableCell className="text-right pr-6 text-xs font-bold text-emerald-700">
                            +₹{trx.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 4: REPORTS & ANALYTICS */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl p-6 text-center space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Fee Collection & Dues Audit Report</h3>
              <p className="text-xs text-slate-500 mt-1">Export full PDF or Excel statement of all class accounts and settled receipts</p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <Button className="gradient-emerald text-white shadow-colored-emerald rounded-xl text-xs font-semibold px-5 h-10 gap-2">
                <Download className="h-4 w-4" /> Download PDF Report
              </Button>
            </div>
          </Card>
        </div>
      )}

      <FeePaymentForm
        record={selectedRecord}
        isOpen={isPaymentFormOpen}
        onClose={() => setIsPaymentFormOpen(false)}
        onSave={handleSavePayment}
      />

      <FeeReceiptModal
        record={selectedRecord}
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
      />
    </div>
  );
}

export default FeeView;

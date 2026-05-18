import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Receipt, IndianRupee, Bell, Mail } from "lucide-react";
import { FeeRecord } from '../Constants';
import { Checkbox } from "@/components/ui/checkbox";

interface FeeTableProps {
  records: FeeRecord[];
  onRecordPayment: (record: FeeRecord) => void;
  onViewReceipt: (record: FeeRecord) => void;
  onSendReminder: (record: FeeRecord) => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onBulkRemind: () => void;
}

export function FeeTable({ 
  records, 
  onRecordPayment, 
  onViewReceipt, 
  onSendReminder,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onBulkRemind
}: FeeTableProps) {
  const allSelected = records.length > 0 && selectedIds.length === records.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  return (
    <Card className="border-0 shadow-xl hover-lift glass-card print:hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Fee Records ({records.length})
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">Overview of student fee payments and dues</CardDescription>
          </div>
          {selectedIds.length > 0 && (
            <Button 
              variant="outline" 
              className="gap-2 border-amber-200 text-amber-700 hover:bg-amber-50"
              onClick={onBulkRemind}
            >
              <Mail className="h-4 w-4" />
              Remind Selected ({selectedIds.length})
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100">
                <TableHead className="w-12 text-center pl-6">
                  <Checkbox 
                    checked={allSelected ? true : someSelected ? "indeterminate" : false}
                    onCheckedChange={onToggleSelectAll}
                    className="border-slate-300 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                </TableHead>
                <TableHead className="font-medium text-slate-600">Student Info</TableHead>
                <TableHead className="font-medium text-slate-600">Class</TableHead>
                <TableHead className="font-medium text-slate-600">Total Amount</TableHead>
                <TableHead className="font-medium text-slate-600">Late Fee</TableHead>
                <TableHead className="font-medium text-slate-600">Paid</TableHead>
                <TableHead className="font-medium text-slate-600">Balance</TableHead>
                <TableHead className="font-medium text-slate-600">Due Date</TableHead>
                <TableHead className="font-medium text-slate-600">Status</TableHead>
                <TableHead className="font-medium text-slate-600 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => {
                const isOverdue = new Date() > new Date(record.dueDate) && record.balance > 0;
                // Dynamically show late fee if overdue but wasn't statically calculated in mock data
                const displayLateFee = record.breakdown.lateFee > 0 ? record.breakdown.lateFee : (isOverdue ? 100 : 0);

                return (
                  <TableRow key={record.id} className={`border-slate-100 transition-colors ${selectedIds.includes(record.id) ? 'bg-amber-50/50' : 'hover:bg-slate-50/50'}`}>
                    <TableCell className="text-center pl-6">
                      <Checkbox 
                        checked={selectedIds.includes(record.id)}
                        onCheckedChange={() => onToggleSelect(record.id)}
                        className="border-slate-300 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-1 ring-slate-200">
                          <AvatarImage src={record.avatar} />
                          <AvatarFallback className="gradient-amber text-white font-medium text-xs">
                            {record.studentName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <div className="font-medium text-slate-900">{record.studentName}</div>
                          <div className="text-xs text-slate-500">{record.studentId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                        {record.className}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-slate-900">₹{record.totalAmount.toLocaleString()}</div>
                      {record.breakdown.discount > 0 && (
                        <div className="text-xs text-emerald-600 mt-1">-₹{record.breakdown.discount} discount</div>
                      )}
                    </TableCell>
                    <TableCell>
                      {displayLateFee > 0 ? (
                        <div className="text-sm font-medium text-rose-500">+₹{displayLateFee}</div>
                      ) : (
                        <div className="text-sm text-slate-400">-</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-emerald-600">₹{record.amountPaid.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-rose-600">₹{record.balance.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-slate-600">{new Date(record.dueDate).toLocaleDateString()}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        record.status === 'Paid' ? 'default' : 
                        record.status === 'Pending' ? 'secondary' : 'destructive'
                      } 
                      className={
                        record.status === 'Paid' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 
                        record.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                        'bg-rose-100 text-rose-800 border-rose-200'
                      }>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-rose-50 hover:scale-110 transition-all duration-200"
                          onClick={() => onSendReminder(record)}
                          disabled={record.status === 'Paid'}
                          title="Send Reminder"
                        >
                          <Bell className={`h-4 w-4 ${record.status === 'Paid' ? 'text-slate-300' : 'text-rose-600'}`} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-emerald-50 hover:scale-110 transition-all duration-200"
                          onClick={() => onRecordPayment(record)}
                          disabled={record.status === 'Paid'}
                          title="Record Payment"
                        >
                          <IndianRupee className={`h-4 w-4 ${record.status === 'Paid' ? 'text-slate-300' : 'text-emerald-600'}`} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-cyan-50 hover:scale-110 transition-all duration-200"
                          onClick={() => onViewReceipt(record)}
                          title="View Receipt"
                        >
                          <Receipt className="h-4 w-4 text-cyan-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

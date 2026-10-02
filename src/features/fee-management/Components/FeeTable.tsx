import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Receipt, IndianRupee, Bell, Mail, Inbox } from "lucide-react";
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
    <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl overflow-hidden print:hidden">
      <CardHeader className="p-5 border-b border-slate-100 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold text-slate-900">
            Fee Records ({records.length})
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 mt-0.5">
            Overview of student fee payments, dues, discounts, and payment history
          </CardDescription>
        </div>
        {selectedIds.length > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            className="gap-2 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs rounded-xl h-9 font-medium"
            onClick={onBulkRemind}
          >
            <Mail className="h-3.5 w-3.5" />
            Send Reminders ({selectedIds.length})
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow className="border-b border-slate-200/80">
                <TableHead className="w-12 text-center pl-6">
                  <Checkbox 
                    checked={allSelected ? true : someSelected ? "indeterminate" : false}
                    onCheckedChange={onToggleSelectAll}
                    className="border-slate-300 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                  />
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Student Info</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Class</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Total Amount</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Late Fee</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Paid</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Balance</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Due Date</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Status</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2 py-8">
                      <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <Inbox className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-medium text-slate-500">No fee records found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record) => {
                  const isOverdue = new Date() > new Date(record.dueDate) && record.balance > 0;
                  const displayLateFee = record.breakdown.lateFee > 0 ? record.breakdown.lateFee : (isOverdue ? 100 : 0);

                  return (
                    <TableRow 
                      key={record.id} 
                      className={`border-b border-slate-100 transition-colors ${selectedIds.includes(record.id) ? 'bg-amber-50/40' : 'hover:bg-slate-50/70'}`}
                    >
                      <TableCell className="text-center pl-6">
                        <Checkbox 
                          checked={selectedIds.includes(record.id)}
                          onCheckedChange={() => onToggleSelect(record.id)}
                          className="border-slate-300 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 ring-1 ring-slate-200">
                            <AvatarImage src={record.avatar} />
                            <AvatarFallback className="gradient-amber text-white font-semibold text-xs">
                              {record.studentName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <div className="font-semibold text-xs text-slate-900">{record.studentName}</div>
                            <div className="text-[11px] text-slate-500">{record.studentId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 text-[11px]">
                          {record.className}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs font-semibold text-slate-900">₹{record.totalAmount.toLocaleString()}</div>
                        {record.breakdown.discount > 0 && (
                          <div className="text-[11px] text-emerald-600 font-medium">-₹{record.breakdown.discount} discount</div>
                        )}
                      </TableCell>
                      <TableCell>
                        {displayLateFee > 0 ? (
                          <div className="text-xs font-semibold text-rose-500">+₹{displayLateFee}</div>
                        ) : (
                          <div className="text-xs text-slate-400">-</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-xs font-bold text-emerald-600">₹{record.amountPaid.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs font-bold text-rose-600">₹{record.balance.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs text-slate-600 font-medium">
                          {new Date(record.dueDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            record.status === 'Paid' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]' 
                              : record.status === 'Pending' 
                              ? 'bg-amber-50 text-amber-700 border-amber-200 text-[11px]' 
                              : 'bg-rose-50 text-rose-700 border-rose-200 text-[11px]'
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex justify-end items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            onClick={() => onSendReminder(record)}
                            disabled={record.status === 'Paid'}
                            title="Send Reminder"
                          >
                            <Bell className={`h-3.5 w-3.5 ${record.status === 'Paid' ? 'text-slate-300' : 'text-rose-600'}`} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            onClick={() => onRecordPayment(record)}
                            disabled={record.status === 'Paid'}
                            title="Record Payment"
                          >
                            <IndianRupee className={`h-3.5 w-3.5 ${record.status === 'Paid' ? 'text-slate-300' : 'text-emerald-600'}`} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            onClick={() => onViewReceipt(record)}
                            title="View Receipt"
                          >
                            <Receipt className="h-3.5 w-3.5 text-indigo-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

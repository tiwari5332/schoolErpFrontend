import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Search, IndianRupee, Bell, Receipt } from "lucide-react";
import { Student } from '../constant';

interface StudentFeeTrackingProps {
  students: Student[];
}

export function StudentFeeTracking({ students }: StudentFeeTrackingProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock function to generate fee details
  const getMockFeeDetails = (student: Student) => {
    const totalAmount = 50000;
    
    let paidAmount = 0;
    if (student.feeStatus === 'Paid') paidAmount = totalAmount;
    else if (student.feeStatus === 'Pending') paidAmount = 25000;
    else paidAmount = 10000; // Overdue

    const balance = totalAmount - paidAmount;
    
    return { totalAmount, paidAmount, balance };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Fee Tracking Overview
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Monitor student fee payments and dues
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 w-full sm:w-[250px] border-2 border-slate-200 focus:border-emerald-300 focus:ring-emerald-100 transition-all duration-200"
              />
            </div>
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200">
              <Bell className="h-4 w-4" />
              Remind Defaulters
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100">
                <TableHead className="font-medium text-slate-600 pl-6">Student Info</TableHead>
                <TableHead className="font-medium text-slate-600 text-right">Total Fee</TableHead>
                <TableHead className="font-medium text-slate-600 text-right">Paid</TableHead>
                <TableHead className="font-medium text-slate-600 text-right">Balance</TableHead>
                <TableHead className="font-medium text-slate-600 text-center">Status</TableHead>
                <TableHead className="font-medium text-slate-600 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const fees = getMockFeeDetails(student);

                return (
                  <TableRow key={student.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-1 ring-slate-200">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="gradient-emerald text-white font-medium text-xs">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <div className="font-medium text-slate-900">{student.name}</div>
                          <div className="text-xs text-slate-500">{student.id} • {student.grade}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-medium text-slate-700">{formatCurrency(fees.totalAmount)}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-medium text-emerald-600">{formatCurrency(fees.paidAmount)}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-rose-600">{formatCurrency(fees.balance)}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={
                        student.feeStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        student.feeStatus === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-rose-50 text-rose-700 border-rose-200'
                      }>
                        {student.feeStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-rose-50 text-rose-600 hover:scale-110 transition-all"
                          disabled={student.feeStatus === 'Paid'}
                          title="Send Reminder"
                        >
                          <Bell className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-emerald-50 text-emerald-600 hover:scale-110 transition-all"
                          disabled={student.feeStatus === 'Paid'}
                          title="Record Payment"
                        >
                          <IndianRupee className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-cyan-50 text-cyan-600 hover:scale-110 transition-all"
                          title="View Receipt"
                        >
                          <Receipt className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredStudents.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No students found.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

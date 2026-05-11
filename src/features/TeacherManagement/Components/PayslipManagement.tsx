import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Download, PlayCircle, Eye, Building2 } from "lucide-react";
import { Teacher } from '../Constants';

interface PayslipManagementProps {
  teachers: Teacher[];
}

interface GeneratedPayslip {
  id: string;
  teacherId: string;
  month: string;
  basicPay: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'Generated' | 'Paid';
  generatedDate: string;
}

export function PayslipManagement({ teachers }: PayslipManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [payslips, setPayslips] = useState<GeneratedPayslip[]>([]);
  const [selectedPayslip, setSelectedPayslip] = useState<{ teacher: Teacher, payslip: GeneratedPayslip } | null>(null);
  const [isViewingPayslip, setIsViewingPayslip] = useState(false);

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    teacher.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const handleGeneratePayroll = () => {
    const newPayslips = teachers.map(t => {
      const basic = 50000;
      const allows = 20000;
      const deducts = 5000;
      
      return {
        id: `PS-${t.id}-${selectedMonth}`,
        teacherId: t.id,
        month: selectedMonth,
        basicPay: basic,
        allowances: allows,
        deductions: deducts,
        netSalary: basic + allows - deducts,
        status: 'Generated' as const,
        generatedDate: new Date().toISOString().split('T')[0]
      };
    });
    setPayslips(newPayslips);
  };

  const handleViewPayslip = (teacher: Teacher, payslip: GeneratedPayslip) => {
    setSelectedPayslip({ teacher, payslip });
    setIsViewingPayslip(true);
  };

  // Helper to find payslip for current month
  const getPayslipForTeacher = (teacherId: string) => {
    return payslips.find(p => p.teacherId === teacherId && p.month === selectedMonth);
  };

  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader className="pb-4 border-b border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-slate-800">
                Payroll & Payslips
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Generate and manage monthly employee payslips
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 w-full sm:w-[200px] border-2 border-slate-200 focus:border-indigo-300 focus:ring-indigo-100 transition-all duration-200"
              />
            </div>
            <Input 
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="h-10 w-full sm:w-[150px] border-2 border-slate-200 focus:border-indigo-300"
            />
            <Button 
              onClick={handleGeneratePayroll}
              className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-md shadow-indigo-200"
            >
              <PlayCircle className="h-4 w-4" />
              Run Payroll
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-slate-100">
                <TableHead className="font-medium text-slate-600 pl-6">Employee Info</TableHead>
                <TableHead className="font-medium text-slate-600 text-center">Status</TableHead>
                <TableHead className="font-medium text-slate-600 text-right">Gross Salary</TableHead>
                <TableHead className="font-medium text-slate-600 text-right">Deductions</TableHead>
                <TableHead className="font-medium text-slate-600 text-right">Net Payable</TableHead>
                <TableHead className="font-medium text-slate-600 text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => {
                const payslip = getPayslipForTeacher(teacher.id);

                return (
                  <TableRow key={teacher.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-1 ring-slate-200">
                          <AvatarImage src={teacher.avatar} />
                          <AvatarFallback className="bg-indigo-50 text-indigo-700 font-medium text-xs">
                            {teacher.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-slate-900">{teacher.name}</div>
                          <div className="text-xs text-slate-500">{teacher.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    
                    {payslip ? (
                      <>
                        <TableCell className="text-center">
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200">
                            {payslip.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-slate-600 font-medium">
                          {formatCurrency(payslip.basicPay + payslip.allowances)}
                        </TableCell>
                        <TableCell className="text-right text-rose-600">
                          - {formatCurrency(payslip.deductions)}
                        </TableCell>
                        <TableCell className="text-right font-bold text-slate-900">
                          {formatCurrency(payslip.netSalary)}
                        </TableCell>
                        <TableCell className="text-right pr-6 space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewPayslip(teacher, payslip)}
                            className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="text-slate-400 border-slate-200">
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-slate-400">-</TableCell>
                        <TableCell className="text-right text-slate-400">-</TableCell>
                        <TableCell className="text-right text-slate-400">-</TableCell>
                        <TableCell className="text-right pr-6">
                          <span className="text-xs text-slate-400">Run payroll first</span>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredTeachers.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No employees found matching your search.
            </div>
          )}
        </div>
      </CardContent>

      {/* Payslip View Modal */}
      <Dialog open={isViewingPayslip} onOpenChange={setIsViewingPayslip}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="border-b pb-4 mb-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-slate-900">EduTrio School</DialogTitle>
                  <DialogDescription>Salary Slip for the month of {selectedMonth}</DialogDescription>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" /> Download PDF
              </Button>
            </div>
          </DialogHeader>

          {selectedPayslip && (
            <div className="space-y-6">
              {/* Employee Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <div className="text-xs text-slate-500 uppercase">Employee ID</div>
                  <div className="font-semibold text-slate-900">{selectedPayslip.teacher.id}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Employee Name</div>
                  <div className="font-semibold text-slate-900">{selectedPayslip.teacher.name}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Designation</div>
                  <div className="font-semibold text-slate-900">{selectedPayslip.teacher.subject} Teacher</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Department</div>
                  <div className="font-semibold text-slate-900">{selectedPayslip.teacher.department}</div>
                </div>
              </div>

              {/* Earnings & Deductions Split */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Earnings */}
                <div>
                  <h4 className="font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-t-lg border border-emerald-100 border-b-0">Earnings</h4>
                  <div className="border border-slate-200 rounded-b-lg overflow-hidden">
                    <div className="flex justify-between p-3 border-b text-sm">
                      <span className="text-slate-600">Basic Pay</span>
                      <span className="font-medium text-slate-900">{formatCurrency(selectedPayslip.payslip.basicPay)}</span>
                    </div>
                    <div className="flex justify-between p-3 border-b text-sm">
                      <span className="text-slate-600">Allowances (HRA, TA, DA)</span>
                      <span className="font-medium text-slate-900">{formatCurrency(selectedPayslip.payslip.allowances)}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 text-sm font-bold">
                      <span className="text-slate-900">Total Earnings</span>
                      <span className="text-emerald-600">{formatCurrency(selectedPayslip.payslip.basicPay + selectedPayslip.payslip.allowances)}</span>
                    </div>
                  </div>
                </div>

                {/* Deductions */}
                <div>
                  <h4 className="font-bold text-rose-700 bg-rose-50 px-3 py-2 rounded-t-lg border border-rose-100 border-b-0">Deductions</h4>
                  <div className="border border-slate-200 rounded-b-lg overflow-hidden h-full flex flex-col">
                    <div className="flex justify-between p-3 border-b text-sm">
                      <span className="text-slate-600">Provident Fund & Taxes</span>
                      <span className="font-medium text-slate-900">{formatCurrency(selectedPayslip.payslip.deductions)}</span>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex justify-between p-3 bg-slate-50 text-sm font-bold border-t">
                      <span className="text-slate-900">Total Deductions</span>
                      <span className="text-rose-600">{formatCurrency(selectedPayslip.payslip.deductions)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net Salary Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100 mt-6">
                <div>
                  <div className="text-indigo-900 font-bold text-lg">Net Payable Amount</div>
                  <div className="text-indigo-700 text-sm">Amount will be credited to salary account</div>
                </div>
                <div className="text-3xl font-black text-indigo-700 mt-2 sm:mt-0">
                  {formatCurrency(selectedPayslip.payslip.netSalary)}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="mt-6 border-t pt-4">
            <Button variant="outline" onClick={() => setIsViewingPayslip(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

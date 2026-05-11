import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Edit2, DollarSign, Calculator } from "lucide-react";
import { Teacher } from '../Constants';

interface SalaryStructureTableProps {
  teachers: Teacher[];
}

interface SalaryDetails {
  basicPay: number;
  hra: number;
  allowances: number;
  pf: number;
  tax: number;
}

export function SalaryStructureTable({ teachers }: SalaryStructureTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  // Initialize mock salary data for teachers
  const [salaryData, setSalaryData] = useState<Record<string, SalaryDetails>>(() => {
    const initialData: Record<string, SalaryDetails> = {};
    teachers.forEach(t => {
      initialData[t.id] = {
        basicPay: 50000,
        hra: 15000,
        allowances: 5000,
        pf: 3000,
        tax: 2000
      };
    });
    return initialData;
  });

  const [editFormData, setEditFormData] = useState<SalaryDetails>({
    basicPay: 0,
    hra: 0,
    allowances: 0,
    pf: 0,
    tax: 0
  });

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    teacher.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateNetSalary = (details: SalaryDetails) => {
    const grossEarnings = Number(details.basicPay) + Number(details.hra) + Number(details.allowances);
    const totalDeductions = Number(details.pf) + Number(details.tax);
    return grossEarnings - totalDeductions;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const handleEditClick = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setEditFormData(salaryData[teacher.id] || { basicPay: 0, hra: 0, allowances: 0, pf: 0, tax: 0 });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingTeacher) {
      setSalaryData(prev => ({
        ...prev,
        [editingTeacher.id]: {
          basicPay: Number(editFormData.basicPay),
          hra: Number(editFormData.hra),
          allowances: Number(editFormData.allowances),
          pf: Number(editFormData.pf),
          tax: Number(editFormData.tax)
        }
      }));
      setIsEditModalOpen(false);
      setEditingTeacher(null);
    }
  };

  const handleInputChange = (field: keyof SalaryDetails, value: string) => {
    setEditFormData(prev => ({ ...prev, [field]: value === '' ? 0 : Number(value) }));
  };

  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader className="pb-4 border-b border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-slate-800">
                Salary Structure
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Manage basic pay, allowances, and deductions
              </CardDescription>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search employee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 w-full sm:w-[250px] border-2 border-slate-200 focus:border-emerald-300 focus:ring-emerald-100 transition-all duration-200"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-slate-100">
                <TableHead className="font-medium text-slate-600 pl-6">Employee</TableHead>
                <TableHead className="font-medium text-slate-600 text-right">Basic Pay</TableHead>
                <TableHead className="font-medium text-slate-600 text-right">Allowances</TableHead>
                <TableHead className="font-medium text-slate-600 text-right">Deductions</TableHead>
                <TableHead className="font-medium text-slate-600 text-right">Net Salary</TableHead>
                <TableHead className="font-medium text-slate-600 text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => {
                const details = salaryData[teacher.id];
                const totalAllowances = Number(details.hra) + Number(details.allowances);
                const totalDeductions = Number(details.pf) + Number(details.tax);
                const netSalary = calculateNetSalary(details);

                return (
                  <TableRow key={teacher.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-1 ring-slate-200">
                          <AvatarImage src={teacher.avatar} />
                          <AvatarFallback className="bg-emerald-50 text-emerald-700 font-medium text-xs">
                            {teacher.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-slate-900">{teacher.name}</div>
                          <div className="text-xs text-slate-500">{teacher.id} • {teacher.department}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium text-slate-700">
                      {formatCurrency(details.basicPay)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-normal">
                        + {formatCurrency(totalAllowances)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 font-normal">
                        - {formatCurrency(totalDeductions)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-slate-900 text-base">
                      {formatCurrency(netSalary)}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditClick(teacher)}
                        className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredTeachers.length === 0 && (
            <div className="p-12 text-center text-slate-400 flex flex-col items-center">
              <Calculator className="h-12 w-12 text-slate-200 mb-3" />
              <p>No employees found matching your search.</p>
            </div>
          )}
        </div>
      </CardContent>

      {/* Edit Salary Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md glass-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-900">
              Edit Salary Structure
            </DialogTitle>
            <DialogDescription>
              Update salary components for {editingTeacher?.name} ({editingTeacher?.id})
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Earnings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Basic Pay (₹)</Label>
                  <Input 
                    type="number" 
                    value={editFormData.basicPay}
                    onChange={(e) => handleInputChange('basicPay', e.target.value)}
                    className="focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label>HRA (₹)</Label>
                  <Input 
                    type="number" 
                    value={editFormData.hra}
                    onChange={(e) => handleInputChange('hra', e.target.value)}
                    className="focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Other Allowances (₹)</Label>
                  <Input 
                    type="number" 
                    value={editFormData.allowances}
                    onChange={(e) => handleInputChange('allowances', e.target.value)}
                    className="focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Deductions</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Provident Fund (₹)</Label>
                  <Input 
                    type="number" 
                    value={editFormData.pf}
                    onChange={(e) => handleInputChange('pf', e.target.value)}
                    className="focus:border-rose-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Professional Tax (₹)</Label>
                  <Input 
                    type="number" 
                    value={editFormData.tax}
                    onChange={(e) => handleInputChange('tax', e.target.value)}
                    className="focus:border-rose-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center mt-2">
              <span className="font-semibold text-slate-600">Calculated Net Salary</span>
              <span className="text-2xl font-bold text-emerald-600">
                {formatCurrency(calculateNetSalary(editFormData))}
              </span>
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-0">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

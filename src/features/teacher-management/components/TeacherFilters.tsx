import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { DEPARTMENTS } from '../constants';

interface TeacherFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
}

export function TeacherFilters({ searchTerm, onSearchChange, selectedDepartment, onDepartmentChange }: TeacherFiltersProps) {
  return (
    <Card className="border border-indigo-100/70 shadow-md bg-white rounded-2xl">
      <CardContent className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Search Teacher Name/ID/Email */}
          <div className="space-y-1.5 lg:col-span-3">
            <Label className="text-xs font-semibold text-slate-600">Teacher Name / ID / Email</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder="Search teachers by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 h-10 text-xs rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600">Department</Label>
            <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
              <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200 focus:border-indigo-500">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {DEPARTMENTS.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


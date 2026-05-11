import React from 'react';
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { GRADES, STATUSES, FEE_STATUSES } from '../constant';

interface StudentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedGrade: string;
  onGradeChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedFeeStatus: string;
  onFeeStatusChange: (value: string) => void;
}

export function StudentFilters({ 
  searchTerm, 
  onSearchChange, 
  selectedGrade, 
  onGradeChange,
  selectedStatus,
  onStatusChange,
  selectedFeeStatus,
  onFeeStatusChange
}: StudentFiltersProps) {
  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search students by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-11 border-2 border-slate-200 focus:border-indigo-300 focus:ring-indigo-100 transition-all duration-200"
            />
          </div>
          
          <Select value={selectedGrade} onValueChange={onGradeChange}>
            <SelectTrigger className="w-full sm:w-[160px] h-11 border-2 border-slate-200 focus:border-indigo-300">
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              {GRADES.map(grade => (
                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full sm:w-[160px] h-11 border-2 border-slate-200 focus:border-indigo-300">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUSES.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFeeStatus} onValueChange={onFeeStatusChange}>
            <SelectTrigger className="w-full sm:w-[160px] h-11 border-2 border-slate-200 focus:border-indigo-300">
              <SelectValue placeholder="Fee Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fee Status</SelectItem>
              {FEE_STATUSES.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

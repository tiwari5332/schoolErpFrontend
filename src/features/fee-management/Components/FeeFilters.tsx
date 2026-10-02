import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar as CalendarIcon } from "lucide-react";
import { FEE_STATUSES, CLASSES, MONTHS } from '../Constants';

interface FeeFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedClass: string;
  onClassChange: (value: string) => void;
  selectedMonth: string;
  onMonthChange: (value: string) => void;
}

export function FeeFilters({ 
  searchTerm, 
  onSearchChange, 
  selectedStatus, 
  onStatusChange,
  selectedClass,
  onClassChange,
  selectedMonth,
  onMonthChange
}: FeeFiltersProps) {
  return (
    <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl print:hidden">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Search by student name or ID..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-10 text-xs rounded-xl border-slate-200 focus:border-amber-500"
            />
          </div>
          
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200 focus:border-amber-500">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fee Statuses</SelectItem>
              {FEE_STATUSES.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedClass} onValueChange={onClassChange}>
            <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200 focus:border-amber-500">
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {CLASSES.map(cls => (
                <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMonth} onValueChange={onMonthChange}>
            <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200 focus:border-amber-500">
              <SelectValue placeholder="Filter by month due" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {MONTHS.map(month => (
                <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

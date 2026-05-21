import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
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
    <Card className="border-0 shadow-xl hover-lift glass-card print:hidden">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative lg:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-11 border-2 border-slate-200 focus:border-amber-300 focus:ring-amber-100 transition-all duration-200"
            />
          </div>
          
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="h-11 border-2 border-slate-200 focus:border-amber-300">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {FEE_STATUSES.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedClass} onValueChange={onClassChange}>
            <SelectTrigger className="h-11 border-2 border-slate-200 focus:border-amber-300">
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
            <SelectTrigger className="h-11 border-2 border-slate-200 focus:border-amber-300">
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

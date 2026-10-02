import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Search, Filter, RotateCcw, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";
import { GRADES } from '../constant';

interface StudentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedGrade: string;
  onGradeChange: (value: string) => void;
  selectedSection?: string;
  onSectionChange?: (value: string) => void;
  selectedBatch?: string;
  onBatchChange?: (value: string) => void;
  emailTerm?: string;
  onEmailChange?: (value: string) => void;
  onClearFilters?: () => void;
  showPromotedOnly?: boolean;
  onTogglePromoted?: (checked: boolean) => void;
  showBlockedOnly?: boolean;
  onToggleBlocked?: (checked: boolean) => void;
  onMoreFiltersClick?: () => void;
}

export function StudentFilters({ 
  searchTerm, 
  onSearchChange, 
  selectedGrade, 
  onGradeChange,
  selectedSection = 'all',
  onSectionChange = () => {},
  selectedBatch = 'all',
  onBatchChange = () => {},
  emailTerm = '',
  onEmailChange = () => {},
  onClearFilters = () => {},
  showPromotedOnly = false,
  onTogglePromoted = () => {},
  showBlockedOnly = false,
  onToggleBlocked = () => {},
  onMoreFiltersClick = () => {}
}: StudentFiltersProps) {
  const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreActionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Card className="border border-indigo-100/70 shadow-md bg-white rounded-2xl">
      <CardContent className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          {/* Student Name */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600">Student Name</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder="Search by Name"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 h-10 text-xs rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Class */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600">Class</Label>
            <Select value={selectedGrade} onValueChange={onGradeChange}>
              <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200 focus:border-indigo-500">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {GRADES.map(grade => (
                  <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Section */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600">Section</Label>
            <Select value={selectedSection} onValueChange={onSectionChange}>
              <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200 focus:border-indigo-500">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
                <SelectItem value="D">Section D</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Batch */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600">Batch</Label>
            <Select value={selectedBatch} onValueChange={onBatchChange}>
              <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200 focus:border-indigo-500">
                <SelectValue placeholder="Select Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Select Batch</SelectItem>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2025-2026">2025-2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-600">Email</Label>
            <Input
              placeholder="Email"
              value={emailTerm}
              onChange={(e) => onEmailChange(e.target.value)}
              className="h-10 text-xs rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Action Controls Line */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onMoreFiltersClick}
              className="h-9 px-3.5 text-xs rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 font-medium gap-1.5"
            >
              <Filter className="h-3.5 w-3.5 text-slate-500" />
              More Filters
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-9 px-3 text-xs rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-medium gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear Filters
            </Button>
          </div>

          {/* More Actions Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsMoreActionsOpen(!isMoreActionsOpen)}
              className="h-9 px-3.5 text-xs rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 font-medium gap-1.5"
            >
              More Actions
              <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
            </Button>

            {isMoreActionsOpen && (
              <div className="absolute right-0 mt-2 w-56 p-3 rounded-2xl bg-white shadow-xl border border-slate-100 space-y-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-700">Promoted Students</span>
                  <Switch 
                    checked={showPromotedOnly} 
                    onCheckedChange={onTogglePromoted}
                  />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs font-medium text-slate-700">Blocked Students</span>
                  <Switch 
                    checked={showBlockedOnly} 
                    onCheckedChange={onToggleBlocked}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

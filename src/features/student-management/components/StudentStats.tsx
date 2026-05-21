import React from 'react';
import { Card, CardContent } from "../../../components/ui/card";
import { UserPlus, Plus, Filter } from "lucide-react";
import { Student } from '../constant';

interface StudentStatsProps {
  students: Student[];
  gradesCount: number;
}

export function StudentStats({ students, gradesCount }: StudentStatsProps) {
  const activeStudents = students.filter(s => s.status === 'Active').length;
  // Mock new this month
  const newThisMonth = 12;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="relative overflow-hidden border-0 shadow-colored-indigo hover-lift">
        <div className="absolute inset-0 gradient-indigo opacity-5"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-700">Total Students</p>
              <p className="text-3xl font-bold text-indigo-900">{students.length}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl gradient-indigo flex items-center justify-center shadow-colored-indigo">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden border-0 shadow-colored-emerald hover-lift">
        <div className="absolute inset-0 gradient-emerald opacity-5"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">Active Students</p>
              <p className="text-3xl font-bold text-emerald-900">{activeStudents}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-colored-emerald">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-colored-amber hover-lift">
        <div className="absolute inset-0 gradient-amber opacity-5"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-700">New This Month</p>
              <p className="text-3xl font-bold text-amber-900">{newThisMonth}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl gradient-amber flex items-center justify-center shadow-colored-amber">
              <Plus className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-colored-purple hover-lift">
        <div className="absolute inset-0 gradient-purple opacity-5"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">Grades Covered</p>
              <p className="text-3xl font-bold text-purple-900">{gradesCount}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple">
              <Filter className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

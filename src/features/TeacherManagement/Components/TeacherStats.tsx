import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Calendar, GraduationCap } from "lucide-react";
import { Teacher } from '../Constants';

interface TeacherStatsProps {
  teachers: Teacher[];
  departmentsCount: number;
}

export function TeacherStats({ teachers, departmentsCount }: TeacherStatsProps) {
  const onLeaveCount = teachers.filter(t => t.status === 'On Leave').length;
  // Simplistic average experience calculation
  const totalExp = teachers.reduce((acc, t) => {
    const years = parseInt(t.experience) || 0;
    return acc + years;
  }, 0);
  const avgExp = teachers.length ? (totalExp / teachers.length).toFixed(1) : '0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="relative overflow-hidden border-0 shadow-colored-emerald hover-lift">
        <div className="absolute inset-0 gradient-emerald opacity-5"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">Total Teachers</p>
              <p className="text-3xl font-bold text-emerald-900">{teachers.length}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-colored-emerald">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden border-0 shadow-colored-cyan hover-lift">
        <div className="absolute inset-0 gradient-cyan opacity-5"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-cyan-700">Departments</p>
              <p className="text-3xl font-bold text-cyan-900">{departmentsCount}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl gradient-cyan flex items-center justify-center shadow-colored-cyan">
              <BookOpen className="h-6 w-6 text-white" />
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
              <p className="text-sm font-medium text-amber-700">On Leave</p>
              <p className="text-3xl font-bold text-amber-900">{onLeaveCount}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl gradient-amber flex items-center justify-center shadow-colored-amber">
              <Calendar className="h-6 w-6 text-white" />
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
              <p className="text-sm font-medium text-purple-700">Avg Experience</p>
              <p className="text-3xl font-bold text-purple-900">{avgExp}<span className="text-sm font-normal"> yrs</span></p>
            </div>
            <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

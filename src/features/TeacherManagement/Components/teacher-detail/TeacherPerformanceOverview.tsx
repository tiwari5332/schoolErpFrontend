import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, CheckCircle, Target, Star, School, Calendar, BookOpen } from "lucide-react";
import { Teacher, CLASS_PERFORMANCE_DATA } from '../../Constants';

interface TeacherPerformanceOverviewProps {
  teacher: Teacher;
}

export function TeacherPerformanceOverview({ teacher }: TeacherPerformanceOverviewProps) {
  const totalStudents = CLASS_PERFORMANCE_DATA.reduce((sum, cls) => sum + cls.studentCount, 0);
  const averageClassPerformance = Math.round(CLASS_PERFORMANCE_DATA.reduce((sum, cls) => sum + cls.averageGrade, 0) / CLASS_PERFORMANCE_DATA.length);
  const averageAttendance = Math.round(CLASS_PERFORMANCE_DATA.reduce((sum, cls) => sum + cls.attendance, 0) / CLASS_PERFORMANCE_DATA.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="relative overflow-hidden border-0 shadow-colored-emerald hover-lift">
        <div className="absolute inset-0 gradient-emerald opacity-5"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="h-12 w-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-colored-emerald">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-emerald-900">{totalStudents}</p>
              <p className="text-sm text-emerald-700">Total Students</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <School className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-emerald-600">{teacher.classes.length} Classes</span>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-colored-indigo hover-lift">
        <div className="absolute inset-0 gradient-indigo opacity-5"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="h-12 w-12 rounded-2xl gradient-indigo flex items-center justify-center shadow-colored-indigo">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-indigo-900">{averageClassPerformance}%</p>
              <p className="text-sm text-indigo-700">Avg Class Performance</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-indigo-500" />
            <span className="text-sm text-indigo-600">Excellent rating</span>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-colored-purple hover-lift">
        <div className="absolute inset-0 gradient-purple opacity-5"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-purple-900">{averageAttendance}%</p>
              <p className="text-sm text-purple-700">Class Attendance</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-purple-600">This month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-colored-amber hover-lift">
        <div className="absolute inset-0 gradient-amber opacity-5"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="h-12 w-12 rounded-2xl gradient-amber flex items-center justify-center shadow-colored-amber">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-amber-900">{teacher.subjects.length}</p>
              <p className="text-sm text-amber-700">Subjects Teaching</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-amber-600">Specialized</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import React from 'react';
import { Card, CardContent } from "../../../../components/ui/card";
import { BookOpen, Award, TrendingUp, CheckCircle, Sparkles, ArrowUpRight, Target } from "lucide-react";

interface StudentPerformanceOverviewProps {
  overallAttendance?: number;
  overallGrade?: number;
  testsCompleted?: number;
  avgPerformance?: number;
}

export function StudentPerformanceOverview({
  overallAttendance = 95.2,
  overallGrade = 92.4,
  testsCompleted = 15,
  avgPerformance = 8.5
}: StudentPerformanceOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="relative overflow-hidden border-0 shadow-colored-emerald hover-lift">
        <div className="absolute inset-0 gradient-emerald opacity-5"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="h-12 w-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-colored-emerald">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-emerald-900">{overallAttendance}%</p>
              <p className="text-sm text-emerald-700">Overall Attendance</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-emerald-600">+2.1% from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-colored-indigo hover-lift">
        <div className="absolute inset-0 gradient-indigo opacity-5"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="h-12 w-12 rounded-2xl gradient-indigo flex items-center justify-center shadow-colored-indigo">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-indigo-900">{overallGrade}%</p>
              <p className="text-sm text-indigo-700">Overall Grade</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4 text-indigo-500" />
            <span className="text-sm text-indigo-600">Grade A- Student</span>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-colored-purple hover-lift">
        <div className="absolute inset-0 gradient-purple opacity-5"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-purple-900">{testsCompleted}</p>
              <p className="text-sm text-purple-700">Tests Completed</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-purple-600">3 this week</span>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-colored-amber hover-lift">
        <div className="absolute inset-0 gradient-amber opacity-5"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="h-12 w-12 rounded-2xl gradient-amber flex items-center justify-center shadow-colored-amber">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-amber-900">{avgPerformance}</p>
              <p className="text-sm text-amber-700">Avg Performance</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-amber-600">Excellent rank</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

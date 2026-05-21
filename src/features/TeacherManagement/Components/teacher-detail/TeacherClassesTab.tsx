import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ChevronRight } from "lucide-react";
import { Teacher, CLASS_PERFORMANCE_DATA } from '../../Constants';

interface TeacherClassesTabProps {
  teacher: Teacher;
}

export function TeacherClassesTab({ teacher }: TeacherClassesTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Class Overview
          </CardTitle>
          <CardDescription>Performance summary by class</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {CLASS_PERFORMANCE_DATA.map((classData, index) => (
            <div key={index} className="p-4 rounded-xl border bg-gradient-to-r from-slate-50/50 to-slate-100/50 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl gradient-emerald flex items-center justify-center">
                    <span className="text-white font-medium">{classData.class}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Class {classData.class}</h4>
                    <p className="text-sm text-slate-500">{classData.studentCount} students</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  {classData.averageGrade}% avg
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Average Grade</p>
                  <div className="flex items-center gap-2">
                    <Progress value={classData.averageGrade} className="h-2" />
                    <span className="text-sm font-medium">{classData.averageGrade}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Attendance</p>
                  <div className="flex items-center gap-2">
                    <Progress value={classData.attendance} className="h-2" />
                    <span className="text-sm font-medium">{classData.attendance}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Subject Distribution
          </CardTitle>
          <CardDescription>Subjects currently teaching</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teacher.subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                </div>
                <span className="font-medium text-slate-900">{subject}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          ))}
          
          <div className="mt-6 pt-4 border-t border-slate-200">
            <h4 className="font-medium text-slate-900 mb-3">Class Assignments</h4>
            {teacher.classes.map((cls, index) => (
              <Badge key={index} variant="outline" className="mr-2 mb-2 bg-purple-50 text-purple-700 border-purple-200">
                Class {cls}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronRight, School } from "lucide-react";
import { Teacher } from '../../constants';

interface TeacherClassesTabProps {
  teacher: Teacher;
}

export function TeacherClassesTab({ teacher }: TeacherClassesTabProps) {
  const safeSubjects = Array.isArray(teacher?.subjects) ? teacher.subjects : [];
  const safeClasses = Array.isArray(teacher?.classes) ? teacher.classes : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Class Overview
          </CardTitle>
          <CardDescription>Assigned class cohorts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {safeClasses.length > 0 ? (
            safeClasses.map((cls, index) => (
              <div key={index} className="p-4 rounded-xl border bg-gradient-to-r from-slate-50/50 to-slate-100/50 hover:shadow-lg transition-all duration-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl gradient-emerald flex items-center justify-center text-white">
                    <School className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Class {cls}</h4>
                    <p className="text-xs text-slate-500">Active Academic Cohort</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  Assigned
                </Badge>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-slate-500 text-xs italic">
              No classes currently assigned to this teacher.
            </div>
          )}
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
          {safeSubjects.length > 0 ? (
            safeSubjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="font-medium text-slate-900">{subject}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 italic py-4 text-center">No subjects assigned.</p>
          )}
          
          <div className="mt-6 pt-4 border-t border-slate-200">
            <h4 className="font-medium text-slate-900 mb-3">Class Assignments</h4>
            {safeClasses.length > 0 ? (
              safeClasses.map((cls, index) => (
                <Badge key={index} variant="outline" className="mr-2 mb-2 bg-purple-50 text-purple-700 border-purple-200">
                  Class {cls}
                </Badge>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No class assignments found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

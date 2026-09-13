import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3, LineChart as LineChartIcon } from 'lucide-react';

export function TeacherPerformanceTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Monthly Performance Trend
          </CardTitle>
          <CardDescription>Class average performance over time</CardDescription>
        </CardHeader>
        <CardContent className="py-12 flex flex-col items-center justify-center text-center space-y-3">
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <LineChartIcon className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-semibold text-slate-700">No Performance Evaluations Recorded</h4>
          <p className="text-xs text-slate-500 max-w-xs">
            Performance trend lines will populate automatically once exam marks and attendance records are submitted for this teacher's classes.
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Student Grade Distribution
          </CardTitle>
          <CardDescription>Distribution of grades across all classes</CardDescription>
        </CardHeader>
        <CardContent className="py-12 flex flex-col items-center justify-center text-center space-y-3">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-semibold text-slate-700">No Grade Data Available</h4>
          <p className="text-xs text-slate-500 max-w-xs">
            Grade breakdown distribution will display after student exam assessments are finalized.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

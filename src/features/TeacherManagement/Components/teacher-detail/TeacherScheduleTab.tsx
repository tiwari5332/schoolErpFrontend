import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, CalendarX } from "lucide-react";

export function TeacherScheduleTab() {
  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Today's Schedule
        </CardTitle>
        <CardDescription>Current day teaching schedule</CardDescription>
      </CardHeader>
      <CardContent className="py-12 flex flex-col items-center justify-center text-center space-y-3">
        <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
          <CalendarX className="h-6 w-6" />
        </div>
        <h4 className="text-sm font-semibold text-slate-700">No Timetable Sessions Scheduled</h4>
        <p className="text-xs text-slate-500 max-w-xs">
          Scheduled class periods for today will appear here when configured in Schedule Management.
        </p>
      </CardContent>
    </Card>
  );
}

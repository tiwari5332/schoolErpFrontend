import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { UPCOMING_SCHEDULE } from '../../Constants';

export function TeacherScheduleTab() {
  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Today's Schedule
        </CardTitle>
        <CardDescription>Current day teaching schedule</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {UPCOMING_SCHEDULE.map((schedule, index) => (
          <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/50 to-pink-50/50 border border-purple-100">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-xl gradient-purple flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-slate-900">{schedule.subject}</h4>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  {schedule.class}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>{schedule.time}</span>
                <span>•</span>
                <span>{schedule.room}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { RECENT_ACTIVITIES } from '../../Constants';

export function TeacherActivitiesTab() {
  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Recent Activities
        </CardTitle>
        <CardDescription>Latest teaching activities and updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {RECENT_ACTIVITIES.map((activity, index) => (
          <div key={index} className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 hover:shadow-lg ${
            activity.status === 'completed' ? 'bg-gradient-to-r from-emerald-50/50 to-green-50/50 border-emerald-100 hover:shadow-colored-emerald' :
            activity.status === 'active' ? 'bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border-amber-100 hover:shadow-colored-amber' :
            'bg-gradient-to-r from-cyan-50/50 to-blue-50/50 border-cyan-100 hover:shadow-colored-cyan'
          }`}>
            <div className={`w-3 h-3 rounded-full mt-2 animate-pulse-slow ${
              activity.status === 'completed' ? 'bg-emerald-500' :
              activity.status === 'active' ? 'bg-amber-500' :
              'bg-cyan-500'
            }`}></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{activity.title}</p>
              <p className="text-xs text-slate-600 mb-1">{activity.description}</p>
              <p className="text-xs text-slate-500">{activity.time}</p>
            </div>
            <Badge className={`${
              activity.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
              activity.status === 'active' ? 'bg-amber-100 text-amber-800 border-amber-200' :
              'bg-cyan-100 text-cyan-800 border-cyan-200'
            }`}>
              {activity.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { RECENT_ACTIVITIES } from '../../constant';

export function StudentActivitiesTab() {
  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Recent Activities & Achievements
        </CardTitle>
        <CardDescription>Latest student activities and accomplishments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {RECENT_ACTIVITIES.map((activity, index) => (
          <div key={index} className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 hover:shadow-lg ${
            activity.status === 'good' ? 'bg-gradient-to-r from-emerald-50/50 to-green-50/50 border-emerald-100 hover:shadow-colored-emerald' :
            activity.status === 'warning' ? 'bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border-amber-100 hover:shadow-colored-amber' :
            'bg-gradient-to-r from-cyan-50/50 to-blue-50/50 border-cyan-100 hover:shadow-colored-cyan'
          }`}>
            <div className={`w-3 h-3 rounded-full mt-2 animate-pulse-slow ${
              activity.status === 'good' ? 'bg-emerald-500' :
              activity.status === 'warning' ? 'bg-amber-500' :
              'bg-cyan-500'
            }`}></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{activity.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-slate-500">{activity.time}</p>
                {activity.score && (
                  <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                    {activity.score}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

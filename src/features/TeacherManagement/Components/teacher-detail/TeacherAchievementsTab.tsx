import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import { ACHIEVEMENTS } from '../../Constants';

export function TeacherAchievementsTab() {
  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Achievements & Recognition
        </CardTitle>
        <CardDescription>Awards, certifications, and recognitions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {ACHIEVEMENTS.map((achievement, index) => (
          <div key={index} className="p-4 rounded-xl border bg-gradient-to-r from-amber-50/50 to-orange-50/50 border-amber-100 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                achievement.type === 'award' ? 'gradient-amber' :
                achievement.type === 'certification' ? 'gradient-indigo' :
                'gradient-emerald'
              }`}>
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 mb-1">{achievement.title}</h4>
                <p className="text-sm text-slate-600 mb-2">{achievement.description}</p>
                <p className="text-xs text-slate-500">{new Date(achievement.date).toLocaleDateString()}</p>
              </div>
              <Badge className={`${
                achievement.type === 'award' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                achievement.type === 'certification' ? 'bg-indigo-100 text-indigo-800 border-indigo-200' :
                'bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}>
                {achievement.type}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award } from "lucide-react";

export function TeacherAchievementsTab() {
  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Achievements & Recognition
        </CardTitle>
        <CardDescription>Awards, certifications, and recognitions</CardDescription>
      </CardHeader>
      <CardContent className="py-12 flex flex-col items-center justify-center text-center space-y-3">
        <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
          <Award className="h-6 w-6" />
        </div>
        <h4 className="text-sm font-semibold text-slate-700">No Achievements Recorded</h4>
        <p className="text-xs text-slate-500 max-w-xs">
          Certifications and awards added to this teacher's profile will be listed here.
        </p>
      </CardContent>
    </Card>
  );
}

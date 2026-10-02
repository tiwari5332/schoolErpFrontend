import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function TeacherActivitiesTab() {
  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Recent Activities
        </CardTitle>
        <CardDescription>Latest teaching activities and updates</CardDescription>
      </CardHeader>
      <CardContent className="py-12 flex flex-col items-center justify-center text-center space-y-3">
        <div className="h-12 w-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100">
          <Sparkles className="h-6 w-6" />
        </div>
        <h4 className="text-sm font-semibold text-slate-700">No Recent Activity</h4>
        <p className="text-xs text-slate-500 max-w-xs">
          Activity logs will track attendance submissions, grade posts, and updates in real time.
        </p>
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserMinus, CheckCircle2, Search } from "lucide-react";
import { Teacher, ScheduleSession, TimeSlot } from '../Constants';

interface SubstitutePanelProps {
  teachers: Teacher[];
  sessions: ScheduleSession[];
  currentDay: string;
  currentTimeSlot: TimeSlot | null;
}

export function SubstitutePanel({ teachers, sessions, currentDay, currentTimeSlot }: SubstitutePanelProps) {
  
  // Find teachers who are FREE right now (not teaching in the current timeslot on the current day)
  const busyTeacherIds = new Set(
    sessions
      .filter(s => s.dayOfWeek === currentDay && currentTimeSlot && s.timeSlotId === currentTimeSlot.id)
      .map(s => s.teacherId)
  );

  const availableTeachers = teachers.filter(t => !busyTeacherIds.has(t.id));

  return (
    <Card className="border-0 shadow-lg glass-card flex flex-col h-full sticky top-6">
      <CardHeader className="bg-gradient-to-b from-indigo-50/80 to-transparent pb-4 border-b border-indigo-100/50">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold text-indigo-900 flex items-center gap-2">
              <UserMinus className="h-5 w-5 text-indigo-500" />
              Substitute / Relief
            </CardTitle>
            <CardDescription className="mt-1">
              Find available teachers for cover
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 overflow-y-auto">
        {!currentTimeSlot ? (
          <div className="p-8 text-center text-slate-500 flex flex-col items-center">
            <Search className="h-8 w-8 mb-3 opacity-20" />
            <p className="text-sm">Select a specific time period on the grid to see available teachers.</p>
          </div>
        ) : currentTimeSlot.isBreak ? (
          <div className="p-8 text-center text-slate-500 flex flex-col items-center">
            <div className="h-10 w-10 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-3 border border-amber-100">
              ☕
            </div>
            <p className="text-sm">This is a scheduled break period. All teachers are off-duty.</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center px-1">
              <p className="text-sm font-medium text-slate-700">Available Now</p>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                {availableTeachers.length} Available
              </Badge>
            </div>
            
            <div className="space-y-3">
              {availableTeachers.map(teacher => (
                <div key={teacher.id} className="p-3 rounded-lg border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-sm transition-all group flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">{teacher.name}</h4>
                    <p className="text-xs text-slate-500">{teacher.subjectSpecialty}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50">
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {availableTeachers.length === 0 && (
                <div className="p-4 text-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-slate-500 text-sm">
                  No teachers are currently free in this period.
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

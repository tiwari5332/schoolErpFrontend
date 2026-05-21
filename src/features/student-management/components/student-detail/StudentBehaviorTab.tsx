import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Award, AlertOctagon, ThumbsUp, ThumbsDown, User, Calendar } from "lucide-react";
import { MOCK_STUDENT_INCIDENTS, StudentIncident } from '../../constant';

interface StudentBehaviorTabProps {
  studentId: string;
}

export function StudentBehaviorTab({ studentId }: StudentBehaviorTabProps) {
  // In a real app, we'd fetch incidents for the specific student ID
  // For now, we'll just use the mock data
  const incidents = MOCK_STUDENT_INCIDENTS;

  const totalPoints = incidents.reduce((sum, inc) => sum + inc.points, 0);
  const merits = incidents.filter(i => i.type === 'Merit').length;
  const demerits = incidents.filter(i => i.type === 'Demerit').length;

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Behavior & Discipline</h3>
          <p className="text-sm text-slate-500">Track student merits, demerits, and overall conduct</p>
        </div>
        <Button className="gap-2 gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all">
          <Plus className="h-4 w-4" />
          Log Incident
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Net Conduct Score</p>
                <h4 className={`text-3xl font-bold ${totalPoints >= 0 ? 'text-indigo-600' : 'text-rose-600'}`}>
                  {totalPoints > 0 ? '+' : ''}{totalPoints}
                </h4>
              </div>
              <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
                <Award className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Merits</p>
                <h4 className="text-3xl font-bold text-emerald-600">{merits}</h4>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                <ThumbsUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-rose-50 to-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Demerits</p>
                <h4 className="text-3xl font-bold text-rose-600">{demerits}</h4>
              </div>
              <div className="p-3 bg-rose-100 rounded-xl text-rose-600">
                <ThumbsDown className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Incident Timeline */}
      <Card className="border-0 shadow-md glass-card">
        <CardHeader className="border-b border-slate-100 bg-white/50 pb-4">
          <CardTitle className="text-lg text-slate-800">Incident Timeline</CardTitle>
          <CardDescription>Chronological log of all recorded behaviors</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {incidents.map((incident: StudentIncident) => (
              <div key={incident.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="mt-1 flex-shrink-0">
                    {incident.type === 'Merit' ? (
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                        <Award className="h-5 w-5 text-emerald-600" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center border border-rose-200">
                        <AlertOctagon className="h-5 w-5 text-rose-600" />
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-2 gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-slate-800">{incident.category}</h4>
                          <Badge variant="outline" className={
                            incident.type === 'Merit' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }>
                            {incident.points > 0 ? '+' : ''}{incident.points} pts
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">{incident.description}</p>
                      </div>
                      <div className="flex sm:flex-col gap-3 sm:gap-1 text-sm text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{new Date(incident.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          <span>{incident.reportedBy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

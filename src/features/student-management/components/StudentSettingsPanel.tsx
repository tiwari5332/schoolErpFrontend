import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import { Settings, Percent, Clock, Save, Plus, Trash2 } from "lucide-react";

interface GradingScale {
  id: string;
  grade: string;
  minScore: number;
  color: string;
}

export function StudentSettingsPanel() {
  const [activeSetting, setActiveSetting] = useState<'grading' | 'attendance'>('grading');

  // Mock State for Grading Scales
  const [gradingScales, setGradingScales] = useState<GradingScale[]>([
    { id: '1', grade: 'A', minScore: 90, color: 'emerald' },
    { id: '2', grade: 'B', minScore: 80, color: 'blue' },
    { id: '3', grade: 'C', minScore: 70, color: 'amber' },
    { id: '4', grade: 'D', minScore: 60, color: 'orange' },
    { id: '5', grade: 'F', minScore: 0, color: 'rose' },
  ]);

  const [newGradeName, setNewGradeName] = useState('');
  const [newGradeMinScore, setNewGradeMinScore] = useState('');

  // Mock State for Attendance Policy
  const [attendancePolicy, setAttendancePolicy] = useState({
    minRequired: '75',
    lateMarksHalfDay: '3',
    alertThreshold: '80'
  });

  const handleAddGrade = () => {
    if (newGradeName && newGradeMinScore) {
      setGradingScales([...gradingScales, {
        id: Date.now().toString(),
        grade: newGradeName.toUpperCase(),
        minScore: parseInt(newGradeMinScore),
        color: 'slate' 
      }].sort((a, b) => b.minScore - a.minScore));
      setNewGradeName('');
      setNewGradeMinScore('');
    }
  };

  const handleDeleteGrade = (id: string) => {
    setGradingScales(gradingScales.filter(g => g.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Settings Navigation */}
      <Card className="md:col-span-1 border-0 shadow-lg glass-card h-fit">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2 text-slate-800">
            <Settings className="h-5 w-5 text-indigo-500" />
            Configurations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-4 pt-0">
          <Button
            variant={activeSetting === 'grading' ? 'default' : 'ghost'}
            onClick={() => setActiveSetting('grading')}
            className={`w-full justify-start gap-3 ${activeSetting === 'grading' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
          >
            <Percent className="h-4 w-4" />
            Grading Scale
          </Button>
          <Button
            variant={activeSetting === 'attendance' ? 'default' : 'ghost'}
            onClick={() => setActiveSetting('attendance')}
            className={`w-full justify-start gap-3 ${activeSetting === 'attendance' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
          >
            <Clock className="h-4 w-4" />
            Attendance Policy
          </Button>
        </CardContent>
      </Card>

      {/* Settings Content Area */}
      <Card className="md:col-span-3 border-0 shadow-xl glass-card min-h-[400px]">
        {activeSetting === 'grading' && (
          <>
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-xl font-bold text-slate-800">Grading Scale & Rubrics</CardTitle>
              <CardDescription>Configure the minimum score required for each letter grade</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              {/* Add New Grade Form */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-end gap-4">
                <div className="space-y-2 w-full sm:w-32">
                  <Label>Letter Grade</Label>
                  <Input 
                    placeholder="e.g. A+" 
                    value={newGradeName}
                    onChange={(e) => setNewGradeName(e.target.value)}
                  />
                </div>
                <div className="space-y-2 w-full sm:w-32">
                  <Label>Min Score (%)</Label>
                  <Input 
                    type="number" 
                    placeholder="90" 
                    value={newGradeMinScore}
                    onChange={(e) => setNewGradeMinScore(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddGrade} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" /> Add Grade
                </Button>
              </div>

              {/* Grades List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gradingScales.map(scale => (
                  <div key={scale.id} className="relative bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-2">
                      <div className={`w-10 h-10 rounded-full bg-${scale.color}-100 flex items-center justify-center`}>
                        <span className={`text-xl font-bold text-${scale.color}-700`}>{scale.grade}</span>
                      </div>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer text-xs" onClick={() => handleDeleteGrade(scale.id)}>
                        <Trash2 className="h-3 w-3 text-rose-500 mr-1" />
                        Remove
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">Requires minimum <span className="font-bold text-slate-700">{scale.minScore}%</span></p>
                  </div>
                ))}
              </div>
            </CardContent>
          </>
        )}

        {activeSetting === 'attendance' && (
          <>
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-xl font-bold text-slate-800">Attendance Policies</CardTitle>
              <CardDescription>Define requirements and penalties related to student attendance</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="max-w-md space-y-6">
                
                <div className="space-y-2">
                  <Label>Minimum Required Attendance (%)</Label>
                  <Input 
                    type="number" 
                    value={attendancePolicy.minRequired}
                    onChange={(e) => setAttendancePolicy({...attendancePolicy, minRequired: e.target.value})}
                  />
                  <p className="text-xs text-slate-500">Students falling below this percentage will be flagged for review.</p>
                </div>

                <div className="space-y-2">
                  <Label>Low Attendance Alert Threshold (%)</Label>
                  <Input 
                    type="number" 
                    value={attendancePolicy.alertThreshold}
                    onChange={(e) => setAttendancePolicy({...attendancePolicy, alertThreshold: e.target.value})}
                  />
                  <p className="text-xs text-slate-500">System will send warnings to parents when attendance drops below this.</p>
                </div>

                <div className="space-y-2">
                  <Label>Late Marks per Half-Day Penalty</Label>
                  <Input 
                    type="number" 
                    value={attendancePolicy.lateMarksHalfDay}
                    onChange={(e) => setAttendancePolicy({...attendancePolicy, lateMarksHalfDay: e.target.value})}
                  />
                  <p className="text-xs text-slate-500">How many 'Late' marks automatically convert to 1 Half-Day absence.</p>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4">
                  <Save className="h-4 w-4 mr-2" /> Save Attendance Policies
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}

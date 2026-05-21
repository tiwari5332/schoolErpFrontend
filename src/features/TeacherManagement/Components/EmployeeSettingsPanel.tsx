import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings, Clock, CalendarHeart, Save, Plus, Trash2 } from "lucide-react";

interface LeaveType {
  id: string;
  name: string;
  days: number;
  color: string;
}

export function EmployeeSettingsPanel() {
  const [activeSetting, setActiveSetting] = useState<'leave' | 'hours'>('leave');

  // Mock State for Leave Types
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    { id: '1', name: 'Casual Leave (CL)', days: 12, color: 'emerald' },
    { id: '2', name: 'Sick Leave (SL)', days: 8, color: 'rose' },
    { id: '3', name: 'Earned Leave (EL)', days: 15, color: 'indigo' },
  ]);

  const [newLeaveName, setNewLeaveName] = useState('');
  const [newLeaveDays, setNewLeaveDays] = useState('');

  // Mock State for Working Hours
  const [workingHours, setWorkingHours] = useState({
    startTime: '08:00',
    endTime: '15:30',
    lateGrace: '15',
    halfDayThreshold: '11:30'
  });

  const handleAddLeaveType = () => {
    if (newLeaveName && newLeaveDays) {
      setLeaveTypes([...leaveTypes, {
        id: Date.now().toString(),
        name: newLeaveName,
        days: parseInt(newLeaveDays),
        color: 'slate' // default generic color
      }]);
      setNewLeaveName('');
      setNewLeaveDays('');
    }
  };

  const handleDeleteLeave = (id: string) => {
    setLeaveTypes(leaveTypes.filter(l => l.id !== id));
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
            variant={activeSetting === 'leave' ? 'default' : 'ghost'}
            onClick={() => setActiveSetting('leave')}
            className={`w-full justify-start gap-3 ${activeSetting === 'leave' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
          >
            <CalendarHeart className="h-4 w-4" />
            Leave Policy
          </Button>
          <Button
            variant={activeSetting === 'hours' ? 'default' : 'ghost'}
            onClick={() => setActiveSetting('hours')}
            className={`w-full justify-start gap-3 ${activeSetting === 'hours' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
          >
            <Clock className="h-4 w-4" />
            Working Hours
          </Button>
        </CardContent>
      </Card>

      {/* Settings Content Area */}
      <Card className="md:col-span-3 border-0 shadow-xl glass-card min-h-[400px]">
        {activeSetting === 'leave' && (
          <>
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-xl font-bold text-slate-800">Leave Types & Quotas</CardTitle>
              <CardDescription>Configure the annual leave allowance for employees</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              {/* Add New Leave Form */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-end gap-4">
                <div className="space-y-2 w-full">
                  <Label>Leave Type Name</Label>
                  <Input 
                    placeholder="e.g. Maternity Leave" 
                    value={newLeaveName}
                    onChange={(e) => setNewLeaveName(e.target.value)}
                  />
                </div>
                <div className="space-y-2 w-full sm:w-32">
                  <Label>Annual Days</Label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    value={newLeaveDays}
                    onChange={(e) => setNewLeaveDays(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddLeaveType} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>

              {/* Leave Types List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {leaveTypes.map(leave => (
                  <div key={leave.id} className="relative bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-2">
                      <div className={`w-8 h-8 rounded-full bg-${leave.color}-100 flex items-center justify-center`}>
                        <CalendarHeart className={`h-4 w-4 text-${leave.color}-600`} />
                      </div>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer text-xs" onClick={() => handleDeleteLeave(leave.id)}>
                        <Trash2 className="h-3 w-3 text-rose-500 mr-1" />
                        Remove
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-slate-800">{leave.name}</h4>
                    <p className="text-sm text-slate-500 mt-1"><span className="font-bold text-indigo-600 text-lg">{leave.days}</span> days / year</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </>
        )}

        {activeSetting === 'hours' && (
          <>
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-xl font-bold text-slate-800">Standard Working Hours</CardTitle>
              <CardDescription>Define default shift timings and grace periods for staff attendance</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="max-w-md space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Shift Start Time</Label>
                    <Input 
                      type="time" 
                      value={workingHours.startTime}
                      onChange={(e) => setWorkingHours({...workingHours, startTime: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Shift End Time</Label>
                    <Input 
                      type="time" 
                      value={workingHours.endTime}
                      onChange={(e) => setWorkingHours({...workingHours, endTime: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Late Coming Grace Period (Minutes)</Label>
                  <Input 
                    type="number" 
                    value={workingHours.lateGrace}
                    onChange={(e) => setWorkingHours({...workingHours, lateGrace: e.target.value})}
                  />
                  <p className="text-xs text-slate-500">Employees arriving after Start Time + Grace Period are marked Late.</p>
                </div>

                <div className="space-y-2">
                  <Label>Half-Day Cutoff Time</Label>
                  <Input 
                    type="time" 
                    value={workingHours.halfDayThreshold}
                    onChange={(e) => setWorkingHours({...workingHours, halfDayThreshold: e.target.value})}
                  />
                  <p className="text-xs text-slate-500">Employees leaving before this time are marked as Half-Day.</p>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4">
                  <Save className="h-4 w-4 mr-2" /> Save Working Hours
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}

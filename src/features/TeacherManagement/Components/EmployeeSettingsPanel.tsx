import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Settings, Clock, CalendarHeart, Save, Plus, Trash2,
  Pencil, Building2, Briefcase, UserCog, X, Check
} from "lucide-react";
import { LocalStorageSync } from "../../../services/LocalStorageSync";

// ─── Types ──────────────────────────────────────────────────

interface Department {
  id: string;
  name: string;
}

interface Designation {
  id: string;
  name: string;
}

interface EmployeeType {
  id: string;
  name: string;
  paymentMode: string;
}

interface LeaveType {
  id: string;
  name: string;
  days: number;
  color: string;
}

// ─── Reusable inline-edit list item ─────────────────────────

function EditableListItem({
  label,
  onDelete,
  onSave,
}: {
  label: string;
  onDelete: () => void;
  onSave: (newValue: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(label);

  const handleSave = () => {
    if (editValue.trim()) {
      onSave(editValue.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(label);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50/50 border border-indigo-200 rounded-xl animate-fade-in">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel(); }}
          className="h-8 text-sm flex-1 border-indigo-200 focus:border-indigo-400"
          autoFocus
        />
        <Button size="icon" variant="ghost" onClick={handleSave} className="h-7 w-7 text-emerald-600 hover:bg-emerald-50">
          <Check className="h-3.5 w-3.5" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleCancel} className="h-7 w-7 text-slate-400 hover:bg-slate-100">
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-shadow group">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)} className="h-7 w-7 text-amber-500 hover:bg-amber-50 hover:text-amber-600">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button size="icon" variant="ghost" onClick={onDelete} className="h-7 w-7 text-rose-500 hover:bg-rose-50 hover:text-rose-600">
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

// ─── Empty State illustration ───────────────────────────────

function EmptyState({ message = "No Data Found!" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="h-20 w-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
        <svg className="h-10 w-10 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M9 9h6M9 13h4" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-indigo-400 italic">{message}</p>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────

export function EmployeeSettingsPanel() {
  // ── Departments ──
  const [departments, setDepartments] = useState<Department[]>([]);
  const [newDepartment, setNewDepartment] = useState('');

  // ── Designations ──
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [newDesignation, setNewDesignation] = useState('');

  // ── Employee Types ──
  const [employeeTypes, setEmployeeTypes] = useState<EmployeeType[]>([]);
  const [newEmpType, setNewEmpType] = useState('');
  const [newPaymentMode, setNewPaymentMode] = useState('');

  // ── Leave Policy ──
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    { id: '1', name: 'Casual Leave (CL)', days: 12, color: 'emerald' },
    { id: '2', name: 'Sick Leave (SL)', days: 8, color: 'rose' },
    { id: '3', name: 'Earned Leave (EL)', days: 15, color: 'indigo' },
  ]);
  const [newLeaveName, setNewLeaveName] = useState('');
  const [newLeaveDays, setNewLeaveDays] = useState('');

  // ── Working Hours ──
  const [workingHours, setWorkingHours] = useState({
    startTime: '08:00',
    endTime: '15:30',
    lateGrace: '15',
    halfDayThreshold: '11:30'
  });

  // ── Load from LocalStorage ──
  useEffect(() => {
    const savedDepts = LocalStorageSync.get<Department[]>('edu_trio_emp_departments');
    if (savedDepts) setDepartments(savedDepts);

    const savedDesigs = LocalStorageSync.get<Designation[]>('edu_trio_emp_designations');
    if (savedDesigs) setDesignations(savedDesigs);

    const savedTypes = LocalStorageSync.get<EmployeeType[]>('edu_trio_emp_employee_types');
    if (savedTypes) setEmployeeTypes(savedTypes);

    const savedLeave = LocalStorageSync.get<LeaveType[]>('edu_trio_emp_leave_types');
    if (savedLeave) setLeaveTypes(savedLeave);

    const savedHours = LocalStorageSync.get<typeof workingHours>('edu_trio_emp_working_hours');
    if (savedHours) setWorkingHours(savedHours);
  }, []);

  // ── Persist helpers ──
  const persistDepartments = (list: Department[]) => {
    setDepartments(list);
    LocalStorageSync.set('edu_trio_emp_departments', list);
  };
  const persistDesignations = (list: Designation[]) => {
    setDesignations(list);
    LocalStorageSync.set('edu_trio_emp_designations', list);
  };
  const persistEmployeeTypes = (list: EmployeeType[]) => {
    setEmployeeTypes(list);
    LocalStorageSync.set('edu_trio_emp_employee_types', list);
  };
  const persistLeaveTypes = (list: LeaveType[]) => {
    setLeaveTypes(list);
    LocalStorageSync.set('edu_trio_emp_leave_types', list);
  };

  // ── Department actions ──
  const addDepartment = () => {
    if (!newDepartment.trim()) return;
    const list = [...departments, { id: Date.now().toString(), name: newDepartment.trim() }];
    persistDepartments(list);
    setNewDepartment('');
  };

  // ── Designation actions ──
  const addDesignation = () => {
    if (!newDesignation.trim()) return;
    const list = [...designations, { id: Date.now().toString(), name: newDesignation.trim() }];
    persistDesignations(list);
    setNewDesignation('');
  };

  // ── Employee Type actions ──
  const addEmployeeType = () => {
    if (!newEmpType.trim() || !newPaymentMode.trim()) return;
    const list = [...employeeTypes, { id: Date.now().toString(), name: newEmpType.trim(), paymentMode: newPaymentMode.trim() }];
    persistEmployeeTypes(list);
    setNewEmpType('');
    setNewPaymentMode('');
  };

  // ── Leave actions ──
  const handleAddLeaveType = () => {
    if (newLeaveName && newLeaveDays) {
      const list = [...leaveTypes, {
        id: Date.now().toString(),
        name: newLeaveName,
        days: parseInt(newLeaveDays),
        color: 'slate'
      }];
      persistLeaveTypes(list);
      setNewLeaveName('');
      setNewLeaveDays('');
    }
  };

  const handleSaveWorkingHours = () => {
    LocalStorageSync.set('edu_trio_emp_working_hours', workingHours);
  };

  return (
    <div className="space-y-6">

      {/* ═══════ ROW 1: Departments + Designations ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Departments Card ── */}
        <Card className="border-0 shadow-xl glass-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-indigo-600" />
              </div>
              Departments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Form */}
            <div className="flex gap-2">
              <Input
                placeholder="Enter Department..."
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') addDepartment(); }}
                className="flex-1 h-10 border-2 border-slate-200 focus:border-indigo-300"
              />
              <Button
                onClick={addDepartment}
                disabled={!newDepartment.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 h-10 shrink-0"
              >
                Add
              </Button>
            </div>

            {/* List */}
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {departments.length === 0 ? (
                <EmptyState message="No departments added yet!" />
              ) : (
                departments.map((dept) => (
                  <EditableListItem
                    key={dept.id}
                    label={dept.name}
                    onDelete={() => persistDepartments(departments.filter(d => d.id !== dept.id))}
                    onSave={(val) => persistDepartments(departments.map(d => d.id === dept.id ? { ...d, name: val } : d))}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* ── Designations Card ── */}
        <Card className="border-0 shadow-xl glass-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-purple-600" />
              </div>
              Designations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter Designation..."
                value={newDesignation}
                onChange={(e) => setNewDesignation(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') addDesignation(); }}
                className="flex-1 h-10 border-2 border-slate-200 focus:border-purple-300"
              />
              <Button
                onClick={addDesignation}
                disabled={!newDesignation.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 h-10 shrink-0"
              >
                Add
              </Button>
            </div>

            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {designations.length === 0 ? (
                <EmptyState message="No Data Found !" />
              ) : (
                designations.map((desig) => (
                  <EditableListItem
                    key={desig.id}
                    label={desig.name}
                    onDelete={() => persistDesignations(designations.filter(d => d.id !== desig.id))}
                    onSave={(val) => persistDesignations(designations.map(d => d.id === desig.id ? { ...d, name: val } : d))}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══════ ROW 2: Employee Types (full width) ═══════ */}
      <Card className="border-0 shadow-xl glass-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-cyan-100 flex items-center justify-center">
              <UserCog className="h-4 w-4 text-cyan-600" />
            </div>
            Employee Types
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Enter Employee Type..."
              value={newEmpType}
              onChange={(e) => setNewEmpType(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addEmployeeType(); }}
              className="flex-1 h-10 border-2 border-slate-200 focus:border-cyan-300"
            />
            <Input
              placeholder="Enter payment mode..."
              value={newPaymentMode}
              onChange={(e) => setNewPaymentMode(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addEmployeeType(); }}
              className="flex-1 h-10 border-2 border-slate-200 focus:border-cyan-300"
            />
            <Button
              onClick={addEmployeeType}
              disabled={!newEmpType.trim() || !newPaymentMode.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 h-10 shrink-0"
            >
              Add
            </Button>
          </div>

          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {employeeTypes.length === 0 ? (
              <EmptyState message="No Data Found !" />
            ) : (
              employeeTypes.map((et) => (
                <div
                  key={et.id}
                  className="flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-shadow group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-700">{et.name}</span>
                    <Badge variant="secondary" className="bg-cyan-50 text-cyan-700 border-cyan-200 text-xs">
                      {et.paymentMode}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => persistEmployeeTypes(employeeTypes.filter(t => t.id !== et.id))}
                      className="h-7 w-7 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* ═══════ ROW 3: Leave Policy + Working Hours ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Leave Policy ── */}
        <Card className="border-0 shadow-xl glass-card">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CalendarHeart className="h-4 w-4 text-emerald-600" />
              </div>
              Leave Types & Quotas
            </CardTitle>
            <CardDescription>Configure the annual leave allowance for employees</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            {/* Add Form */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-end gap-3">
              <div className="space-y-1.5 w-full">
                <Label className="text-xs font-medium">Leave Type Name</Label>
                <Input
                  placeholder="e.g. Maternity Leave"
                  value={newLeaveName}
                  onChange={(e) => setNewLeaveName(e.target.value)}
                  className="h-9"
                />
              </div>
              <div className="space-y-1.5 w-full sm:w-28">
                <Label className="text-xs font-medium">Days</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newLeaveDays}
                  onChange={(e) => setNewLeaveDays(e.target.value)}
                  className="h-9"
                />
              </div>
              <Button onClick={handleAddLeaveType} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto h-9 px-4 shrink-0">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>

            {/* Leave List */}
            <div className="grid grid-cols-1 gap-3 max-h-[250px] overflow-y-auto pr-1">
              {leaveTypes.map(leave => (
                <div key={leave.id} className="relative bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm hover:shadow-md transition-shadow group flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-${leave.color}-100 flex items-center justify-center shrink-0`}>
                      <CalendarHeart className={`h-4 w-4 text-${leave.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800">{leave.name}</h4>
                      <p className="text-xs text-slate-500"><span className="font-bold text-indigo-600">{leave.days}</span> days / year</p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => persistLeaveTypes(leaveTypes.filter(l => l.id !== leave.id))}
                    className="h-7 w-7 text-rose-400 hover:text-rose-600 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Working Hours ── */}
        <Card className="border-0 shadow-xl glass-card">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              Standard Working Hours
            </CardTitle>
            <CardDescription>Define default shift timings and grace periods</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Shift Start Time</Label>
                  <Input
                    type="time"
                    value={workingHours.startTime}
                    onChange={(e) => setWorkingHours({...workingHours, startTime: e.target.value})}
                    className="h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Shift End Time</Label>
                  <Input
                    type="time"
                    value={workingHours.endTime}
                    onChange={(e) => setWorkingHours({...workingHours, endTime: e.target.value})}
                    className="h-10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Late Coming Grace Period (Minutes)</Label>
                <Input
                  type="number"
                  value={workingHours.lateGrace}
                  onChange={(e) => setWorkingHours({...workingHours, lateGrace: e.target.value})}
                  className="h-10"
                />
                <p className="text-[11px] text-slate-400">Employees arriving after Start Time + Grace Period are marked Late.</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Half-Day Cutoff Time</Label>
                <Input
                  type="time"
                  value={workingHours.halfDayThreshold}
                  onChange={(e) => setWorkingHours({...workingHours, halfDayThreshold: e.target.value})}
                  className="h-10"
                />
                <p className="text-[11px] text-slate-400">Employees leaving before this time are marked as Half-Day.</p>
              </div>

              <Button onClick={handleSaveWorkingHours} className="w-full bg-emerald-600 hover:bg-emerald-700 mt-2 h-10">
                <Save className="h-4 w-4 mr-2" /> Save Working Hours
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

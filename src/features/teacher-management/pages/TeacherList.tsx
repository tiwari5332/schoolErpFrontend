import React from 'react';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, 
  Calendar, 
  UserPlus, 
  AlertTriangle, 
  Trash2, 
  Users, 
  Clock, 
  DollarSign, 
  FileText, 
  Settings, 
  LayoutDashboard, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  ArrowRight, 
  UserCheck, 
  BookOpen, 
  GraduationCap,
  Sparkles
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TeacherDetailView } from "../components/TeacherDetailView";
import { TeacherForm } from '../components/TeacherForm';
import { TeacherStats } from '../components/TeacherStats';
import { TeacherFilters } from '../components/TeacherFilters';
import { TeacherTable } from '../components/TeacherTable';
import { TeacherAttendanceTable } from '../components/TeacherAttendanceTable';
import { SalaryStructureTable } from '../components/SalaryStructureTable';
import { PayslipManagement } from '../components/PayslipManagement';
import { EmployeeSettingsPanel } from '../components/EmployeeSettingsPanel';
import { EmployeeCalendar } from '../components/EmployeeCalendar';
import { Teacher, DEPARTMENTS } from '../constants';
import { useTeacherList } from '../hooks/useTeacherList';

export function TeacherList() {
  const {
    teachers,
    filteredTeachers,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    activeTab,
    setActiveTab,
    isFormOpen,
    setIsFormOpen,
    isDetailViewOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedTeacher,
    editCandidate,
    deleteCandidate,
    handleViewTeacher,
    handleCloseDetailView,
    handleAddClick,
    handleEditClick,
    handleFormSave,
    handleDeleteClick,
    handleDeleteConfirm,
  } = useTeacherList();

  const totalTeachers = teachers.length || 10;
  const activeTeachersCount = teachers.filter(t => t.status === 'Active').length || Math.floor(totalTeachers * 0.9);
  const onLeaveTeachersCount = teachers.filter(t => t.status === 'On Leave').length || 1;
  const departmentsCount = DEPARTMENTS.length || 8;

  const activePct = totalTeachers > 0 ? ((activeTeachersCount / totalTeachers) * 100).toFixed(1) : '90.0';

  const pieData = [
    { name: 'Active Faculty', value: activeTeachersCount, color: '#3b82f6' },
    { name: 'On Leave', value: onLeaveTeachersCount, color: '#f59e0b' },
    { name: 'Departments', value: departmentsCount, color: '#8b5cf6' },
    { name: 'New Staff', value: 2, color: '#10b981' },
  ];

  if (isDetailViewOpen && selectedTeacher) {
    return (
      <div className="space-y-6">
        <TeacherDetailView teacher={selectedTeacher as any} onClose={handleCloseDetailView} />
      </div>
    );
  }

  if (isFormOpen) {
    return (
      <div className="space-y-6">
        <TeacherForm
          teacher={editCandidate || undefined}
          onClose={() => setIsFormOpen(false)}
          onSave={handleFormSave}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Subtitle matching Student Management UI */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Staff Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Efficiently manage teachers, attendance, salary structures, schedules, and settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-2 h-10 px-4 rounded-xl text-xs font-semibold border-slate-200 hover:bg-slate-50 text-slate-700 transition-all"
          >
            <Download className="h-4 w-4 text-emerald-500" />
            Export Data
          </Button>
          <Button
            variant="outline"
            className="gap-2 h-10 px-4 rounded-xl text-xs font-semibold border-slate-200 hover:bg-slate-50 text-slate-700 transition-all"
          >
            <Calendar className="h-4 w-4 text-cyan-500" />
            Schedule
          </Button>
          <Button
            onClick={handleAddClick}
            className="gap-2 gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200 h-10 px-4 rounded-xl text-xs font-semibold"
          >
            <UserPlus className="h-4 w-4" />
            Add Teacher
          </Button>
        </div>
      </div>

      {/* Top Underline Navigation Tabs matching Student Management UI */}
      <div className="flex border-b border-slate-200 gap-8 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'dashboard'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('employee-list')}
          className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'employee-list'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Employee List
        </button>
        <button
          onClick={() => setActiveTab('employee-attendance')}
          className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'employee-attendance'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Employee Attendance
        </button>
        <button
          onClick={() => setActiveTab('salary-structure')}
          className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'salary-structure'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Salary Structure
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'calendar'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Calendar
        </button>
        <button
          onClick={() => setActiveTab('payslip')}
          className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'payslip'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Payslip
        </button>
        <button
          onClick={() => setActiveTab('emp-settings')}
          className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'emp-settings'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Emp. Settings
        </button>
      </div>

      {/* Tab Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <ErrorBoundary title="Error loading tab contents">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Hero Banner matching Student Management UI */}
              <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-white/90">
                      <TrendingUp className="h-5 w-5" />
                      <span className="font-semibold text-lg">
                        Staff Overview & Demographics Analytics
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/80 mt-2">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      <span>Academic Session 2023 - 2024</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setActiveTab('employee-list')}
                    className="bg-white font-medium text-sm text-indigo-700 hover:bg-slate-100 shadow-md transition-all self-start sm:self-auto gap-2 rounded-xl px-5 py-2"
                  >
                    View Staff Directory <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Filter Bar Card matching Student Management UI */}
              <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl">
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                      <CalendarIcon className="h-3.5 w-3.5 text-slate-400" /> Academic Session
                    </label>
                    <Select defaultValue="2023-2024">
                      <SelectTrigger className="rounded-xl border-slate-200 h-10 text-sm">
                        <SelectValue placeholder="Select Session" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023-2024">Session 2023 - 2024</SelectItem>
                        <SelectItem value="2024-2025">Session 2024 - 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">Department</label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="rounded-xl border-slate-200 h-10 text-sm">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {DEPARTMENTS.map(d => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">Status</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="rounded-xl border-slate-200 h-10 text-sm">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active Staff</SelectItem>
                        <SelectItem value="leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* 4 Solid Gradient Status Cards matching Student Management UX exactly */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Card 1: Total Faculty */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 to-purple-900 p-5 text-white shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-indigo-200">Total Enrolled</span>
                    <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 text-3xl font-bold">{totalTeachers}</div>
                  <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 rounded-full" style={{ width: `100%` }} />
                  </div>
                  <div className="mt-2 text-[11px] text-indigo-200 flex justify-between">
                    <span>100% Capacity</span>
                    <span>Active Roster</span>
                  </div>
                </div>

                {/* Card 2: Active Teachers */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 p-5 text-white shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-emerald-100">Active Staff</span>
                    <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 text-3xl font-bold">{activeTeachersCount}</div>
                  <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-300 rounded-full" style={{ width: `${activePct}%` }} />
                  </div>
                  <div className="mt-2 text-[11px] text-emerald-100 flex justify-between">
                    <span>{activePct}% Active</span>
                    <span>Regular Status</span>
                  </div>
                </div>

                {/* Card 3: On Leave */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 p-5 text-white shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-sky-100">On Leave</span>
                    <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 text-3xl font-bold">{onLeaveTeachersCount}</div>
                  <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-200 rounded-full" style={{ width: `30%` }} />
                  </div>
                  <div className="mt-2 text-[11px] text-sky-100 flex justify-between">
                    <span>This Session</span>
                    <span>Approved Absences</span>
                  </div>
                </div>

                {/* Card 4: Departments Covered */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-700 p-5 text-white shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-purple-100">Departments Covered</span>
                    <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 text-3xl font-bold">{departmentsCount}</div>
                  <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-fuchsia-300 rounded-full" style={{ width: `100%` }} />
                  </div>
                  <div className="mt-2 text-[11px] text-purple-100 flex justify-between">
                    <span>100% Covered</span>
                    <span>All Subjects</span>
                  </div>
                </div>
              </div>

              {/* Staff Status & Lifecycle Breakdown Chart Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Donut Chart */}
                <Card className="lg:col-span-2 border border-slate-200/80 shadow-sm rounded-2xl bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-bold text-slate-800 flex items-center justify-between">
                      <span>Staff Status & Lifecycle Breakdown</span>
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                        Live Roster Analytics
                      </span>
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Proportional breakdown of faculty across active, leave, and department roles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                      <div className="h-56 relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={55}
                              outerRadius={80}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#fff', 
                                borderRadius: '12px', 
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-2xl font-bold text-slate-800">{totalTeachers}</span>
                          <span className="text-[10px] font-medium text-slate-500">Total Staff</span>
                        </div>
                      </div>

                      {/* Legend List */}
                      <div className="space-y-3">
                        {pieData.map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-2.5">
                              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-xs font-medium text-slate-700">{item.name}</span>
                            </div>
                            <span className="text-xs font-bold text-slate-900">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Right Analytics Card */}
                <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-600 mb-2">
                      <Sparkles className="h-5 w-5" />
                      <span className="text-sm font-bold">Faculty Insights</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Staff retention rate remains strong at <strong className="text-indigo-600">96.8%</strong> this academic year. Departments are fully assigned with active schedules.
                    </p>
                  </div>

                  <div className="space-y-3 mt-6 pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Avg Experience</span>
                      <span className="font-bold text-slate-800">5.4 Yrs</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Attendance Rate</span>
                      <span className="font-bold text-emerald-600">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Active Payrolls</span>
                      <span className="font-bold text-indigo-600">100% Processed</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'employee-list' && (
            <>
              <TeacherFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedDepartment={selectedDepartment}
                onDepartmentChange={setSelectedDepartment}
              />

              <TeacherTable
                teachers={filteredTeachers}
                onViewTeacher={handleViewTeacher}
                onEditTeacher={handleEditClick}
                onDeleteTeacher={handleDeleteClick}
              />
            </>
          )}

          {activeTab === 'employee-attendance' && (
            <TeacherAttendanceTable teachers={teachers} />
          )}

          {activeTab === 'salary-structure' && (
            <SalaryStructureTable teachers={teachers} />
          )}

          {activeTab === 'payslip' && (
            <PayslipManagement teachers={teachers} />
          )}

          {activeTab === 'emp-settings' && (
            <EmployeeSettingsPanel />
          )}

          {activeTab === 'calendar' && (
            <EmployeeCalendar teachers={teachers} />
          )}
        </ErrorBoundary>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md glass-card">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-slate-900">
                  Delete Teacher
                </DialogTitle>
              </div>
            </div>
            <DialogDescription className="text-slate-600">
              Are you sure you want to delete this teacher record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deleteCandidate && (
            <div className="py-4">
              <Card className="border-2 border-rose-100 bg-rose-50/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-rose-200">
                      <AvatarImage src={deleteCandidate.avatar} />
                      <AvatarFallback className="bg-rose-200 text-rose-700 font-medium">
                        {(deleteCandidate.name || 'Staff')
                          .split(' ')
                          .filter(Boolean)
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2) || 'T'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-slate-900">{deleteCandidate.name}</div>
                      <div className="text-sm text-slate-600">{deleteCandidate.id} • {deleteCandidate.department}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Teacher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TeacherList;
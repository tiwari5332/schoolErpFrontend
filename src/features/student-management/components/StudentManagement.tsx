import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import { Checkbox } from "../../../components/ui/checkbox";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import {
  Plus,
  AlertTriangle,
  Upload,
  FileSpreadsheet,
  Image,
  UserCheck,
  UserX,
  UserPlus,
  Users,
  TrendingUp,
  Calendar as CalendarIcon,
  ArrowRight,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import { GRADES, Student } from '../constant';
import { useStudentManagement } from '../hooks/useStudentManagement';
import { StudentForm } from './StudentForm';
import { StudentDetailView } from './StudentDetailView';
import { StudentTable } from './StudentTable';
import { StudentFilters } from './StudentFilters';
import { StudentAcademicRecords } from './StudentAcademicRecords';
import { StudentFeeTracking } from './StudentFeeTracking';

export function StudentManagement() {
  const {
    students,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedGrade,
    setSelectedGrade,
    isFormOpen,
    setIsFormOpen,
    isDetailViewOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedStudent,
    editCandidate,
    deleteCandidate,
    isDeletePermanently,
    setIsDeletePermanently,
    handleViewStudent,
    handleCloseDetailView,
    handleAddClick,
    handleEditClick,
    handleFormSave,
    handleDeleteClick,
    handleDeleteConfirm,
  } = useStudentManagement();

  // Active top tab state: Dashboard | Students | View Report | Promotions
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'view-report' | 'promotions'>('dashboard');

  // Bulk operations menu state
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const bulkRef = useRef<HTMLDivElement>(null);

  // Dashboard filter states
  const [dashboardSession, setDashboardSession] = useState<string>('2023-2024');
  const [dashboardClass, setDashboardClass] = useState<string>('all');
  const [dashboardSection, setDashboardSection] = useState<string>('all');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bulkRef.current && !bulkRef.current.contains(event.target as Node)) {
        setIsBulkOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Extended filter states for Students tab
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedBatch, setSelectedBatch] = useState<string>('all');
  const [emailTerm, setEmailTerm] = useState<string>('');
  const [showPromotedOnly, setShowPromotedOnly] = useState<boolean>(false);
  const [showBlockedOnly, setShowBlockedOnly] = useState<boolean>(false);

  // Promotions tab states
  const [currentSession, setCurrentSession] = useState<string>('2023-2024');
  const [nextSession, setNextSession] = useState<string>('2024-2025');
  const [currentClass, setCurrentClass] = useState<string>('Grade 5');
  const [nextClass, setNextClass] = useState<string>('Grade 6');
  const [allotSameSection, setAllotSameSection] = useState<boolean>(true);
  const [allotSameRoll, setAllotSameRoll] = useState<boolean>(true);

  // Dashboard Student Lifecycle Statistics (Content strictly student-focused)
  const dashboardStats = useMemo(() => {
    const total = students.length || 10;
    const active = students.filter(s => s.status === 'Active').length || Math.floor(total * 0.9);
    const inactive = total - active;
    const newAdmissions = 12;
    const eligibleForPromotion = Math.floor(total * 0.85);

    const activePct = total > 0 ? ((active / total) * 100).toFixed(1) : '90.0';
    const inactivePct = total > 0 ? ((inactive / total) * 100).toFixed(1) : '10.0';
    const promotionPct = total > 0 ? ((eligibleForPromotion / total) * 100).toFixed(1) : '85.0';

    return {
      total,
      active,
      inactive,
      newAdmissions,
      eligibleForPromotion,
      activePct,
      inactivePct,
      promotionPct,
      retentionRate: '96.8'
    };
  }, [students]);

  // Donut chart data for Student Status Distribution
  const pieData = [
    { name: 'Active Students', value: dashboardStats.active, color: '#3b82f6' },
    { name: 'New Admissions', value: dashboardStats.newAdmissions, color: '#10b981' },
    { name: 'Eligible for Promotion', value: dashboardStats.eligibleForPromotion, color: '#8b5cf6' },
    { name: 'Inactive / Pending', value: dashboardStats.inactive, color: '#f59e0b' },
  ];

  // Comprehensive student filtering for Students tab
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      if (!student) return false;
      const name = (student.name || '').toLowerCase();
      const id = (student.id || '').toLowerCase();
      const email = (student.email || '').toLowerCase();
      const grade = student.grade || '';

      const query = (searchTerm || '').toLowerCase();
      const matchesSearch = name.includes(query) || id.includes(query) || email.includes(query);
      const matchesGrade = selectedGrade === 'all' || grade === selectedGrade;

      const sectionDisplay = student.section || (student.class ? student.class.replace(/[0-9]/g, '') || 'A' : 'A');
      const matchesSection = selectedSection === 'all' || sectionDisplay === selectedSection;

      const batchDisplay = student.batchCode || '2023-2024';
      const matchesBatch = selectedBatch === 'all' || batchDisplay === selectedBatch;

      const matchesEmail = !emailTerm || email.includes(emailTerm.toLowerCase());
      const matchesPromoted = !showPromotedOnly || student.isPromoted === true;
      const matchesBlocked = !showBlockedOnly || student.isBlocked === true;

      return matchesSearch && matchesGrade && matchesSection && matchesBatch && matchesEmail && matchesPromoted && matchesBlocked;
    });
  }, [students, searchTerm, selectedGrade, selectedSection, selectedBatch, emailTerm, showPromotedOnly, showBlockedOnly]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedGrade('all');
    setSelectedSection('all');
    setSelectedBatch('all');
    setEmailTerm('');
    setShowPromotedOnly(false);
    setShowBlockedOnly(false);
  };

  const handlePromoteStudents = () => {
    alert(`Successfully promoted students from ${currentClass} (${currentSession}) to ${nextClass} (${nextSession})!`);
  };

  if (isFormOpen) {
    return <StudentForm student={editCandidate || undefined} onClose={() => setIsFormOpen(false)} onSave={handleFormSave} />;
  }

  if (isDetailViewOpen && selectedStudent) {
    return (
      <div className="space-y-6">
        <StudentDetailView student={selectedStudent} onClose={handleCloseDetailView} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Subtitle */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Student Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Efficiently manage students, reports, promotions, and bulk operations
          </p>
        </div>

        {/* Top Right Actions (+ Add Student & Bulk Upload) */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleAddClick}
            className="gap-2 gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200 h-10 px-4 rounded-xl text-xs font-semibold"
          >
            <Plus className="h-4 w-4" />
            Add Student
          </Button>

          {/* Bulk Operations Dropdown */}
          <div className="relative" ref={bulkRef}>
            <Button
              variant="outline"
              onClick={() => setIsBulkOpen(!isBulkOpen)}
              className="h-10 w-10 p-0 rounded-xl border-slate-200 hover:bg-slate-50 hover:border-indigo-300 text-slate-700 transition-all"
              title="Bulk Operations"
            >
              <Upload className="h-4 w-4 text-slate-600" />
            </Button>

            {isBulkOpen && (
              <div className="absolute right-0 mt-2 w-48 p-1.5 rounded-2xl bg-white shadow-xl border border-slate-100 space-y-1 z-50 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => { alert('Bulk Upload initiated'); setIsBulkOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
                >
                  <Upload className="h-3.5 w-3.5 text-indigo-500" />
                  Bulk Upload
                </button>
                <button
                  onClick={() => { alert('Bulk Update initiated'); setIsBulkOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-xl transition-colors"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 text-cyan-500" />
                  Bulk Update
                </button>
                <button
                  onClick={() => { alert('Bulk Photo Upload initiated'); setIsBulkOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-colors"
                >
                  <Image className="h-3.5 w-3.5 text-purple-500" />
                  Bulk Photo Upload
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Navigation Tabs: Dashboard | Students | View Report | Promotions */}
      <div className="flex border-b border-slate-200 gap-8">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`pb-3 text-xs font-bold transition-all relative ${activeTab === 'dashboard'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
            }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`pb-3 text-xs font-bold transition-all relative ${activeTab === 'students'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
            }`}
        >
          Students
        </button>
        <button
          onClick={() => setActiveTab('view-report')}
          className={`pb-3 text-xs font-bold transition-all relative ${activeTab === 'view-report'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
            }`}
        >
          View Report
        </button>
        <button
          onClick={() => setActiveTab('promotions')}
          className={`pb-3 text-xs font-bold transition-all relative ${activeTab === 'promotions'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
            }`}
        >
          Promotions
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════ */}
      {/* TAB 1: DASHBOARD (SAME ATTENDANCE UX, BUT STUDENT CONTENT) */}
      {/* ════════════════════════════════════════════════════════ */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Hero Banner with Attendance UX */}
          <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-white/90">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-semibold text-lg">
                    Student Overview & Demographics Analytics
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80 mt-2">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>Academic Session 2023 - 2024</span>
                </div>
              </div>
              <Button
                onClick={() => setActiveTab('students')}
                className="bg-white font-medium text-sm text-indigo-700 hover:bg-slate-100 shadow-md transition-all self-start sm:self-auto gap-2 rounded-xl px-5 py-2"
              >
                View Student Roster <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl">
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5 text-slate-400" /> Academic Session
                </label>
                <Select value={dashboardSession} onValueChange={setDashboardSession}>
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
                <label className="text-xs font-medium text-slate-600">Class</label>
                <Select value={dashboardClass} onValueChange={setDashboardClass}>
                  <SelectTrigger className="rounded-xl border-slate-200 h-10 text-sm">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {GRADES.map(g => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Section</label>
                <Select value={dashboardSection} onValueChange={setDashboardSection}>
                  <SelectTrigger className="rounded-xl border-slate-200 h-10 text-sm">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                    <SelectItem value="D">Section D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 4 Status Gradient Cards (Strictly Student Lifecycle Metrics) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Enrolled Students */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 to-purple-900 p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-indigo-200">Total Enrolled</span>
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold">{dashboardStats.total}</div>
              <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-400 rounded-full" style={{ width: `100%` }} />
              </div>
              <div className="mt-2 text-[11px] text-indigo-200 flex justify-between">
                <span>100% Capacity</span>
                <span>Active Roster</span>
              </div>
            </div>

            {/* Active Students */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-100">Active Students</span>
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold">{dashboardStats.active}</div>
              <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-300 rounded-full" style={{ width: `${dashboardStats.activePct}%` }} />
              </div>
              <div className="mt-2 text-[11px] text-emerald-100 flex justify-between">
                <span>{dashboardStats.activePct}% Active</span>
                <span>Regular Status</span>
              </div>
            </div>

            {/* New Admissions */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-sky-100">New Admissions</span>
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold">{dashboardStats.newAdmissions}</div>
              <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-sky-200 rounded-full" style={{ width: `65%` }} />
              </div>
              <div className="mt-2 text-[11px] text-sky-100 flex justify-between">
                <span>This Session</span>
                <span>Fresh Enrollments</span>
              </div>
            </div>

            {/* Eligible for Promotion */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-700 p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-purple-100">Eligible for Promotion</span>
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold">{dashboardStats.eligibleForPromotion}</div>
              <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-fuchsia-300 rounded-full" style={{ width: `${dashboardStats.promotionPct}%` }} />
              </div>
              <div className="mt-2 text-[11px] text-purple-100 flex justify-between">
                <span>{dashboardStats.promotionPct}% Ready</span>
                <span>Next Session</span>
              </div>
            </div>
          </div>

          {/* Student Status Breakdown Chart & Detail Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Donut Chart Side */}
            <Card className="lg:col-span-2 border border-slate-200/80 shadow-sm rounded-2xl bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-lg font-semibold text-slate-800">
                  Student Status & Lifecycle Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="h-64 w-full flex justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Custom Legend */}
                <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs font-medium text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-blue-600 inline-block" />
                    <span>Active Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
                    <span>New Admissions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-purple-600 inline-block" />
                    <span>Eligible for Promotion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
                    <span>Inactive / Pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detail Metric Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Active Students</div>
                  <div className="text-2xl font-bold text-slate-800">{dashboardStats.active}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-amber-50 flex items-center justify-center">
                  <UserX className="h-5 w-5 text-amber-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Inactive / Pending</div>
                  <div className="text-2xl font-bold text-slate-800">{dashboardStats.inactive}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-purple-50 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Grades Covered</div>
                  <div className="text-2xl font-bold text-slate-800">{GRADES.length}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-sky-50 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-sky-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Verified Guardians</div>
                  <div className="text-2xl font-bold text-slate-800">{dashboardStats.total}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Total Enrolled</div>
                  <div className="text-2xl font-bold text-slate-800">{dashboardStats.total}</div>
                </div>
              </Card>

              <Card className="border border-emerald-100 shadow-sm rounded-2xl p-4 bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-emerald-100">Student Retention Rate</div>
                  <div className="text-2xl font-bold text-white">{dashboardStats.retentionRate}%</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════ */}
      {/* TAB 2: STUDENTS (Filter Bar & Table matching screenshot) */}
      {/* ════════════════════════════════════════════════════════ */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <StudentFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedGrade={selectedGrade}
            onGradeChange={setSelectedGrade}
            selectedSection={selectedSection}
            onSectionChange={setSelectedSection}
            selectedBatch={selectedBatch}
            onBatchChange={setSelectedBatch}
            emailTerm={emailTerm}
            onEmailChange={setEmailTerm}
            onClearFilters={handleClearFilters}
            showPromotedOnly={showPromotedOnly}
            onTogglePromoted={setShowPromotedOnly}
            showBlockedOnly={showBlockedOnly}
            onToggleBlocked={setShowBlockedOnly}
          />

          <StudentTable
            students={filteredStudents}
            onViewStudent={handleViewStudent}
            onEditStudent={handleEditClick}
            onDeleteStudent={handleDeleteClick}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════════ */}
      {/* TAB 3: VIEW REPORT (Overview Stats & Detailed Performance Reports) */}
      {/* ════════════════════════════════════════════════════════ */}
      {activeTab === 'view-report' && (
        <div className="space-y-6">
          <StudentStats students={students} gradesCount={GRADES.length} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StudentAcademicRecords students={students} />
            <StudentFeeTracking students={students} />
          </div>

          <StudentAttendanceTable students={students} />
        </div>
      )}

      {/* ════════════════════════════════════════════════════════ */}
      {/* TAB 4: PROMOTIONS (Session & Class Promotion Workflow matching screenshot) */}
      {/* ════════════════════════════════════════════════════════ */}
      {activeTab === 'promotions' && (
        <div className="bg-white p-6 rounded-2xl border border-indigo-100/70 shadow-md space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">Promotions</h3>
            <p className="text-xs text-slate-500 mt-0.5">Promote students to the next class or session</p>
          </div>

          {/* Session Block */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Session</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Current Session</Label>
                <Input
                  value={currentSession}
                  onChange={(e) => setCurrentSession(e.target.value)}
                  className="h-10 text-xs rounded-xl bg-slate-50 border-slate-200"
                  readOnly
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Select Next Session</Label>
                <Select value={nextSession} onValueChange={setNextSession}>
                  <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200">
                    <SelectValue placeholder="Select Next Session" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Promote Class Block */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Promote Class</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Select Current Class</Label>
                <Select value={currentClass} onValueChange={setCurrentClass}>
                  <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200">
                    <SelectValue placeholder="Select Current Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADES.map(g => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Select Next Class</Label>
                <Select value={nextClass} onValueChange={setNextClass}>
                  <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200">
                    <SelectValue placeholder="Select Next Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADES.map(g => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                    <SelectItem value="Graduated">Graduated / Passed Out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Checkboxes / Options */}
          <div className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700 block">Allot Same Section?</Label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={allotSameSection} onChange={(e) => setAllotSameSection(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                  Yes
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={!allotSameSection} onChange={(e) => setAllotSameSection(!e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                  No
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700 block">Allot Same Roll Number?</Label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={allotSameRoll} onChange={(e) => setAllotSameRoll(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                  Yes
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={!allotSameRoll} onChange={(e) => setAllotSameRoll(!e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button
              onClick={handlePromoteStudents}
              className="gradient-indigo text-white font-semibold rounded-xl h-10 px-6 text-xs transition-all shadow-colored-indigo hover:scale-[1.02]"
            >
              Promote Students
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-slate-600 pt-2 text-xs">
              Are you sure you want to delete <span className="font-semibold text-slate-900">{deleteCandidate?.name}</span>?
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2 py-4">
            <Checkbox
              id="permanent-delete"
              checked={isDeletePermanently}
              onCheckedChange={(checked) => setIsDeletePermanently(checked as boolean)}
            />
            <label htmlFor="permanent-delete" className="text-xs text-slate-600 cursor-pointer">
              Delete permanently from database
            </label>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="rounded-xl h-9 text-xs">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} className="rounded-xl h-9 text-xs">
              Delete Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentManagement;

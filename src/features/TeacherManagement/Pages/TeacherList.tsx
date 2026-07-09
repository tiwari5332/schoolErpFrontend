import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Calendar, UserPlus, AlertTriangle, Trash2, Users, Clock, DollarSign, FileText, Settings } from "lucide-react";
import { TeacherDetailView } from "../Components/TeacherDetailView";
import { TeacherForm } from '../Components/TeacherForm';
import { TeacherStats } from '../Components/TeacherStats';
import { TeacherFilters } from '../Components/TeacherFilters';
import { TeacherTable } from '../Components/TeacherTable';
import { TeacherAttendanceTable } from '../Components/TeacherAttendanceTable';
import { SalaryStructureTable } from '../Components/SalaryStructureTable';
import { PayslipManagement } from '../Components/PayslipManagement';
import { EmployeeSettingsPanel } from '../Components/EmployeeSettingsPanel';
import { EmployeeCalendar } from '../Components/EmployeeCalendar';
import { Teacher, DEPARTMENTS } from '../Constants';
import { useTeacherList } from '../Hooks/useTeacherList';

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
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Teacher Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage teacher profiles and assignments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200">
            <Download className="h-4 w-4 text-emerald-500" />
            Export Data
          </Button>
          <Button variant="outline" className="gap-2 border-2 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all duration-200">
            <Calendar className="h-4 w-4 text-cyan-500" />
            Schedule
          </Button>
          <Button
            onClick={handleAddClick}
            className="gap-2 gradient-emerald text-white shadow-colored-emerald hover:scale-[1.02] transition-all duration-200"
          >
            <UserPlus className="h-4 w-4" />
            Add Teacher
          </Button>
        </div>
      </div>

      <TeacherStats teachers={teachers} departmentsCount={DEPARTMENTS.length} />

      {/* Tabs Navigation */}
      <div className="flex justify-between overflow-x-auto gap-2 pb-2 scrollbar-hide bg-indigo-50/50 p-2 rounded-2xl border border-indigo-100/50 shadow-inner w-full">
        <Button 
          variant={activeTab === 'employee-list' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('employee-list')}
          className={`gap-2 rounded-xl px-5 transition-all duration-300 ${activeTab === 'employee-list' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-white/60 hover:text-indigo-600'}`}
        >
          <Users className="h-4 w-4" />
          Employee List
        </Button>
        <Button 
          variant={activeTab === 'employee-attendance' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('employee-attendance')}
          className={`gap-2 rounded-xl px-5 transition-all duration-300 ${activeTab === 'employee-attendance' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-white/60 hover:text-indigo-600'}`}
        >
          <Clock className="h-4 w-4" />
          Employee Attendance
        </Button>
        <Button 
          variant={activeTab === 'salary-structure' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('salary-structure')}
          className={`gap-2 rounded-xl px-5 transition-all duration-300 ${activeTab === 'salary-structure' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-white/60 hover:text-indigo-600'}`}
        >
          <DollarSign className="h-4 w-4" />
          Salary Structure
        </Button>
        <Button 
          variant={activeTab === 'calendar' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('calendar')}
          className={`gap-2 rounded-xl px-5 transition-all duration-300 ${activeTab === 'calendar' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-white/60 hover:text-indigo-600'}`}
        >
          <Calendar className="h-4 w-4" />
          Calendar
        </Button>
        <Button 
          variant={activeTab === 'payslip' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('payslip')}
          className={`gap-2 rounded-xl px-5 transition-all duration-300 ${activeTab === 'payslip' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-white/60 hover:text-indigo-600'}`}
        >
          <FileText className="h-4 w-4" />
          Payslip
        </Button>
        <Button 
          variant={activeTab === 'emp-settings' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('emp-settings')}
          className={`gap-2 rounded-xl px-5 transition-all duration-300 ${activeTab === 'emp-settings' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-white/60 hover:text-indigo-600'}`}
        >
          <Settings className="h-4 w-4" />
          Emp. Settings
        </Button>
      </div>

      {/* Tab Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      ) : (
        <>
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
        </>
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
                        {deleteCandidate.name.split(' ').map(n => n[0]).join('')}
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
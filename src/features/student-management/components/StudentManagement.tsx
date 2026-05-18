import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Card, CardContent } from "../../../components/ui/card";
import { Checkbox } from "../../../components/ui/checkbox";
import { Label } from "../../../components/ui/label";
import { Download, UserPlus, AlertTriangle, Trash2, Users, Clock, BookOpen, IndianRupee, Settings } from "lucide-react";

import { Student, GRADES, INITIAL_STUDENTS } from '../constant';
import { StudentForm } from './StudentForm';
import { StudentDetailView } from './StudentDetailView';
import { StudentTable } from './StudentTable';
import { StudentStats } from './StudentStats';
import { StudentFilters } from './StudentFilters';
import { StudentAttendanceTable } from './StudentAttendanceTable';
import { StudentAcademicRecords } from './StudentAcademicRecords';
import { StudentFeeTracking } from './StudentFeeTracking';
import { StudentSettingsPanel } from './StudentSettingsPanel';

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [activeTab, setActiveTab] = useState('student-list');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editCandidate, setEditCandidate] = useState<Student | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Student | null>(null);
  const [isDeletePermanently, setIsDeletePermanently] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
    setSelectedStudent(null);
  };

  const handleAddClick = () => {
    setEditCandidate(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (student: Student) => {
    setEditCandidate({ ...student });
    setIsFormOpen(true);
  };

  const handleFormSave = (studentData: Student) => {
    if (editCandidate) {
      setStudents(students.map(s => s.id === studentData.id ? studentData : s));
    } else {
      setStudents([...students, studentData]);
    }
    setIsFormOpen(false);
    setEditCandidate(null);
  };

  const handleDeleteClick = (student: Student) => {
    setDeleteCandidate(student);
    setIsDeletePermanently(false);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteCandidate) {
      setStudents(students.filter(s => s.id !== deleteCandidate.id));
      setIsDeleteDialogOpen(false);
      setDeleteCandidate(null);
    }
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
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Student Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage student records and information</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200">
            <Download className="h-4 w-4 text-indigo-500" />
            Export Data
          </Button>
          <Button 
            onClick={handleAddClick}
            className="gap-2 gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200"
          >
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <StudentStats students={students} gradesCount={GRADES.length} />

      {/* Tabs Navigation */}
      <div className="flex justify-between overflow-x-auto gap-2 pb-2 scrollbar-hide bg-indigo-50/50 p-2 rounded-2xl border border-indigo-100/50 shadow-inner w-full">
        <Button 
          variant={activeTab === 'student-list' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('student-list')}
          className={`gap-2 rounded-xl px-5 transition-all duration-300 ${activeTab === 'student-list' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-white/60 hover:text-indigo-600'}`}
        >
          <Users className="h-4 w-4" />
          Student List
        </Button>
        <Button 
          variant={activeTab === 'attendance' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('attendance')}
          className={`gap-2 rounded-xl px-5 transition-all duration-300 ${activeTab === 'attendance' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-white/60 hover:text-indigo-600'}`}
        >
          <Clock className="h-4 w-4" />
          Attendance
        </Button>
        <Button 
          variant={activeTab === 'academic-records' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('academic-records')}
          className={`gap-2 rounded-xl px-5 transition-all duration-300 ${activeTab === 'academic-records' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-white/60 hover:text-indigo-600'}`}
        >
          <BookOpen className="h-4 w-4" />
          Academic Records
        </Button>
        <Button 
          variant={activeTab === 'fee-tracking' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('fee-tracking')}
          className={`gap-2 rounded-xl px-5 transition-all duration-300 ${activeTab === 'fee-tracking' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-white/60 hover:text-indigo-600'}`}
        >
          <IndianRupee className="h-4 w-4" />
          Fee Tracking
        </Button>
        <Button 
          variant={activeTab === 'settings' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('settings')}
          className={`gap-2 rounded-xl px-5 transition-all duration-300 ${activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-white/60 hover:text-indigo-600'}`}
        >
          <Settings className="h-4 w-4" />
          Student Settings
        </Button>
      </div>

      {activeTab === 'student-list' && (
        <>
          <StudentFilters 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            selectedGrade={selectedGrade} 
            onGradeChange={setSelectedGrade} 
          />

          <StudentTable 
            students={filteredStudents} 
            onViewStudent={handleViewStudent} 
            onEditStudent={handleEditClick} 
            onDeleteStudent={handleDeleteClick} 
          />
        </>
      )}

      {activeTab === 'attendance' && (
        <StudentAttendanceTable students={students} />
      )}

      {activeTab === 'academic-records' && (
        <StudentAcademicRecords students={students} />
      )}

      {activeTab === 'fee-tracking' && (
        <StudentFeeTracking students={students} />
      )}

      {activeTab === 'settings' && (
        <StudentSettingsPanel />
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
                  Delete Student
                </DialogTitle>
              </div>
            </div>
            <DialogDescription className="text-slate-600">
              Are you sure you want to delete this student record? This action cannot be undone.
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
                      <div className="text-sm text-slate-600">{deleteCandidate.id} • {deleteCandidate.grade}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center space-x-2 mt-4 px-1">
                <Checkbox 
                  id="deletePermanently" 
                  checked={isDeletePermanently}
                  onCheckedChange={(checked) => setIsDeletePermanently(checked as boolean)}
                  className="border-rose-300 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                />
                <Label htmlFor="deletePermanently" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 cursor-pointer">
                  Delete permanently
                </Label>
              </div>
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
              Delete Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import React from 'react';
import { Network, Building2, LayoutTemplate, UserPlus, BookOpen, Library } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Department,
  ClassGroup,
  SetupStudent,
  SetupTeacher,
  Section
} from '../../features/academic-setup/Constants';
import { useAcademicSetup } from '../../features/academic-setup/hooks/useAcademicSetup';

import { DepartmentsTab } from '../../features/academic-setup/Components/DepartmentsTab';
import { ClassesTab } from '../../features/academic-setup/Components/ClassesTab';
import { StudentMappingTab } from '../../features/academic-setup/Components/StudentMappingTab';
import { ManageDepartmentModal } from '../../features/academic-setup/Components/ManageDepartmentModal';
import { ManageGradeModal } from '../../features/academic-setup/Components/ManageGradeModal';
import { ManageSectionModal } from '../../features/academic-setup/Components/ManageSectionModal';
import { TeacherMappingTab } from '../../features/academic-setup/Components/TeacherMappingTab';
import { SubjectsTab, Subject } from '../../features/academic-setup/Components/SubjectsTab';

export default function AcademicSetupPage() {
  const {
    departments,
    classes,
    students,
    setupTeachers,
    isLoading,
    subjects,
    classSubjects,
    subjectMappings,
    isDeptModalOpen,
    setIsDeptModalOpen,
    editingDept,
    setEditingDept,
    isGradeModalOpen,
    setIsGradeModalOpen,
    isSectionModalOpen,
    setIsSectionModalOpen,
    editingSection,
    setEditingSection,
    handleSaveDepartment,
    handleDeleteDepartment,
    handleSaveGrade,
    handleSaveSection,
    handleAssignStudents,
    handleUnassignStudents,
    handleSaveSubjectMapping,
    handleAddSubject,
    handleDeleteSubject,
    handleAssignSubjectsToClass
  } = useAcademicSetup();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
            <Network className="h-6 w-6 text-indigo-500" />
            Academic Setup
          </h2>
          <p className="text-sm text-slate-500 mt-1">Configure departments, grade hierarchies, and map students.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <Tabs defaultValue="departments" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6 bg-slate-100/70 backdrop-blur-sm p-1 rounded-xl shadow-inner border border-slate-200/50">
            <TabsTrigger value="departments" className="gap-2">
              <Building2 className="h-4 w-4 hidden sm:block" />
              Departments
            </TabsTrigger>
            <TabsTrigger value="subjects" className="gap-2">
              <Library className="h-4 w-4 hidden sm:block" />
              Subjects
            </TabsTrigger>
            <TabsTrigger value="classes" className="gap-2">
              <LayoutTemplate className="h-4 w-4 hidden sm:block" />
              Classes & Sections
            </TabsTrigger>
            <TabsTrigger value="mapping" className="gap-2">
              <UserPlus className="h-4 w-4 hidden sm:block" />
              Student Mapping
            </TabsTrigger>
            <TabsTrigger value="teacher-mapping" className="gap-2">
              <BookOpen className="h-4 w-4 hidden sm:block" />
              Teacher Mapping
            </TabsTrigger>
          </TabsList>

          <TabsContent value="departments" className="mt-0 focus-visible:outline-none">
            <DepartmentsTab 
              departments={departments} 
              teachers={setupTeachers}
              onAddDepartment={() => {
                setEditingDept(null);
                setIsDeptModalOpen(true);
              }}
              onEditDepartment={(dept) => {
                setEditingDept(dept);
                setIsDeptModalOpen(true);
              }}
              onDeleteDepartment={handleDeleteDepartment}
            />
          </TabsContent>

          <TabsContent value="classes" className="mt-0 focus-visible:outline-none">
            <ClassesTab 
              classes={classes} 
              teachers={setupTeachers}
              onAddGrade={() => setIsGradeModalOpen(true)}
              onAddSection={(classGrpId) => {
                setEditingSection({ classGrpId, section: null });
                setIsSectionModalOpen(true);
              }}
              onEditSection={(classGrpId, section) => {
                setEditingSection({ classGrpId, section });
                setIsSectionModalOpen(true);
              }}
            />
          </TabsContent>

          <TabsContent value="mapping" className="mt-0 focus-visible:outline-none">
            <StudentMappingTab 
              students={students} 
              classes={classes} 
              onAssignStudents={handleAssignStudents} 
              onUnassignStudents={handleUnassignStudents}
            />
          </TabsContent>

          <TabsContent value="teacher-mapping" className="mt-0 focus-visible:outline-none">
            <TeacherMappingTab
              classes={classes}
              teachers={setupTeachers as any}
              subjects={subjects}
              classSubjects={classSubjects}
              subjectMappings={subjectMappings}
              onSaveMapping={handleSaveSubjectMapping}
            />
          </TabsContent>

          <TabsContent value="subjects" className="mt-0 focus-visible:outline-none">
            <SubjectsTab
              subjects={subjects}
              classes={classes}
              classSubjects={classSubjects}
              onAddSubject={handleAddSubject}
              onDeleteSubject={handleDeleteSubject}
              onAssignSubjectsToClass={handleAssignSubjectsToClass}
            />
          </TabsContent>
        </Tabs>
      </div>
      )}

      {/* Modals */}
      <ManageDepartmentModal
        isOpen={isDeptModalOpen}
        onClose={() => setIsDeptModalOpen(false)}
        onSave={handleSaveDepartment}
        departmentData={editingDept}
        teachers={setupTeachers}
      />
      <ManageGradeModal
        isOpen={isGradeModalOpen}
        onClose={() => setIsGradeModalOpen(false)}
        onSave={handleSaveGrade}
      />
      <ManageSectionModal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
        onSave={handleSaveSection}
        sectionData={editingSection?.section}
        teachers={setupTeachers}
      />
    </div>
  );
}

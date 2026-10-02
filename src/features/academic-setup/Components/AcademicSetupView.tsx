import React, { useState } from 'react';
import { Network, Building2, LayoutTemplate, UserPlus, BookOpen, Library, X, Copy, Info, Sparkles, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { useAcademicSetup } from '../hooks/useAcademicSetup';

import { DepartmentsTab } from '../Components/DepartmentsTab';
import { DepartmentDetailDrawer } from '../Components/DepartmentDetailDrawer';
import { ClassesTab } from '../Components/ClassesTab';
import { StudentMappingTab } from '../Components/StudentMappingTab';
import { ManageDepartmentModal } from '../Components/ManageDepartmentModal';
import { ManageGradeModal } from '../Components/ManageGradeModal';
import { ManageSectionModal } from '../Components/ManageSectionModal';
import { BulkAddSectionsModal } from '../Components/BulkAddSectionsModal';
import { StudentPromotionWizardModal } from '../Components/StudentPromotionWizardModal';
import { TeacherMappingTab } from '../Components/TeacherMappingTab';
import { SubjectsTab } from '../Components/SubjectsTab';
import { SubjectMappingMatrix } from '../Components/SubjectMappingMatrix';
import { DeleteImpactModal } from '../Components/DeleteImpactModal';
import { Department, ClassGroup } from '../Constants';

export function AcademicSetupView() {
  const {
    academicYears,
    configuringYearId,
    setConfiguringYearId,
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
    viewingDept,
    setViewingDept,
    isDeptDrawerOpen,
    setIsDeptDrawerOpen,
    isGradeModalOpen,
    setIsGradeModalOpen,
    editingGrade,
    setEditingGrade,
    isSectionModalOpen,
    setIsSectionModalOpen,
    editingSection,
    setEditingSection,
    isBulkSectionModalOpen,
    setIsBulkSectionModalOpen,
    bulkTargetClassGrpId,
    setBulkTargetClassGrpId,
    isPromotionWizardOpen,
    setIsPromotionWizardOpen,
    apiErrorNotice,
    setApiErrorNotice,
    handleSaveDepartment,
    handleToggleDepartmentStatus,
    handleDeleteDepartment,
    handleSaveGrade,
    handleDeleteGrade,
    handleSaveSection,
    handleDeleteSection,
    handleBulkAddSections,
    handleAssignClassTeacherInline,
    handleExecutePromotion,
    handleAssignStudents,
    handleUnassignStudents,
    handleSaveSubjectMapping,
    handleAddSubject,
    handleUpdateSubject,
    handleDeleteSubject,
    handleAssignSubjectsToClass,
    handleSaveClassSubjectsBatch,
    handleCloneStructureFromPreviousYear,
  } = useAcademicSetup();

  const [activeTab, setActiveTab] = useState<string>('departments');
  const [isMatrixViewActive, setIsMatrixViewActive] = useState<boolean>(false);
  const [matrixInitialSectionId, setMatrixInitialSectionId] = useState<string>('');
  const [isDraftBannerDismissed, setIsDraftBannerDismissed] = useState<boolean>(false);

  const handleOpenSubjectMatrixForSection = (classGrpId?: string, sectionId?: string) => {
    const targetSection = sectionId || classGrpId;
    if (targetSection) setMatrixInitialSectionId(targetSection);
    setActiveTab('subjects');
    setIsMatrixViewActive(true);
  };

  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'department' | 'grade' | 'section';
    id: string;
    classGrpId?: string;
    name: string;
    impactDetails: { label: string; count: number }[];
    warningText?: string;
  } | null>(null);

  const configuringYearObj = academicYears.find(ay => ay.id === configuringYearId);
  const currentActiveYearObj = academicYears.find(ay => ay.isCurrent) || academicYears[1];

  const triggerDeleteDepartment = (deptId: string) => {
    const dept = departments.find(d => d.id === deptId);
    if (!dept) return;
    const linkedGrades = classes.filter(c => c.departmentId === dept.id).length;
    const linkedTeachers = setupTeachers.filter(t => t.department === dept.name || dept.teacherIds?.includes(t.id)).length;
    const linkedSubjects = subjects.filter(s => s.departmentId === dept.id).length;

    setDeleteTarget({
      type: 'department',
      id: deptId,
      name: dept.name,
      impactDetails: [
        { label: 'Linked Grades', count: linkedGrades },
        { label: 'Faculty Teachers', count: linkedTeachers },
        { label: 'Registered Subjects', count: linkedSubjects },
      ],
      warningText: 'Deleting this department will un-tag associated grades and subjects.',
    });
  };

  const triggerDeleteGrade = (gradeId: string) => {
    const grade = classes.find(c => c.id === gradeId);
    if (!grade) return;
    const sectionsCount = grade.sections?.length || 0;
    const studentCount = (grade.sections || []).reduce((acc, s) => acc + (s.studentIds?.length || 0), 0);
    const mappedSubjectsCount = (classSubjects[grade.id] || []).length;

    setDeleteTarget({
      type: 'grade',
      id: gradeId,
      name: grade.grade || `Class ${grade.id}`,
      impactDetails: [
        { label: 'Section Cohorts', count: sectionsCount },
        { label: 'Active Students', count: studentCount },
        { label: 'Curriculum Subjects Mapped', count: mappedSubjectsCount },
      ],
      warningText: 'Deleting this grade will permanently remove all underlying sections.',
    });
  };

  const triggerDeleteSection = (classGrpId: string, sectionId: string) => {
    const grade = classes.find(c => c.id === classGrpId);
    const section = (grade?.sections || []).find(s => s.id === sectionId);
    if (!section) return;
    const studentCount = section.studentIds?.length || 0;

    setDeleteTarget({
      type: 'section',
      id: sectionId,
      classGrpId,
      name: `Section ${section.name} (${grade?.grade || ''})`,
      impactDetails: [
        { label: 'Enrolled Students', count: studentCount },
      ],
      warningText: 'Students assigned to this section will become unassigned.',
    });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'department') {
      handleDeleteDepartment(deleteTarget.id);
    } else if (deleteTarget.type === 'grade') {
      handleDeleteGrade(deleteTarget.id);
    } else if (deleteTarget.type === 'section' && deleteTarget.classGrpId) {
      handleDeleteSection(deleteTarget.classGrpId, deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
            <Network className="h-6 w-6 text-indigo-500" />
            Academic Setup
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure faculty departments, grade hierarchies, matrix curriculum mappings, and student promotions.
          </p>
        </div>
      </div>

      {apiErrorNotice && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 px-4 flex items-center justify-between text-rose-900 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-rose-100 rounded-lg text-rose-700 shrink-0">
              <AlertCircle className="h-4 w-4" />
            </div>
            <p className="text-xs font-semibold">{apiErrorNotice}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setApiErrorNotice(null)}
            className="h-7 w-7 p-0 text-rose-600 hover:text-rose-800 hover:bg-rose-100 rounded-lg shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {configuringYearObj && configuringYearObj.id !== currentActiveYearObj?.id && !isDraftBannerDismissed && (
        <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3.5 px-4 flex items-center justify-between text-amber-900 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-amber-100 rounded-lg text-amber-700 shrink-0">
              <Info className="h-4 w-4" />
            </div>
            <p className="text-xs font-medium">
              You're setting up structure for <span className="font-bold">{configuringYearObj.name} ({configuringYearObj.status})</span>. Changes made here are saved separately and won't affect the active <span className="font-semibold">{currentActiveYearObj?.name}</span> session.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDraftBannerDismissed(true)}
            className="h-7 w-7 p-0 text-amber-600 hover:text-amber-800 hover:bg-amber-100 rounded-lg shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {configuringYearObj && classes.length === 0 && (
        <div className="bg-gradient-to-r from-indigo-50 via-cyan-50 to-blue-50 border border-indigo-200/70 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shrink-0 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">No Classes Configured for {configuringYearObj.name}</h4>
              <p className="text-xs text-slate-600">
                Speed up setup by copying all grades, sections, and subject mappings from <span className="font-semibold">{currentActiveYearObj?.name}</span>.
              </p>
            </div>
          </div>
          <Button
            onClick={() => handleCloneStructureFromPreviousYear(currentActiveYearObj?.id || 'ay_2024_25')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm shrink-0 gap-1.5"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy Structure from {currentActiveYearObj?.name}
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
        </div>
      ) : (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <ErrorBoundary title="Error loading academic setup tab">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex items-center justify-start w-full overflow-x-auto overflow-y-hidden gap-1 mb-6 bg-slate-100/70 backdrop-blur-sm p-1.5 rounded-xl shadow-inner border border-slate-200/50 no-scrollbar">
                <TabsTrigger value="departments" className="flex-1 min-w-[130px] whitespace-nowrap gap-2 text-xs sm:text-sm font-medium py-2">
                  <Building2 className="h-4 w-4 shrink-0 hidden sm:block" />
                  Departments
                </TabsTrigger>
                <TabsTrigger value="classes" className="flex-1 min-w-[145px] whitespace-nowrap gap-2 text-xs sm:text-sm font-medium py-2">
                  <LayoutTemplate className="h-4 w-4 shrink-0 hidden sm:block" />
                  Classes & Sections
                </TabsTrigger>
                <TabsTrigger value="subjects" className="flex-1 min-w-[110px] whitespace-nowrap gap-2 text-xs sm:text-sm font-medium py-2">
                  <Library className="h-4 w-4 shrink-0 hidden sm:block" />
                  Subjects
                </TabsTrigger>
                <TabsTrigger value="mapping" className="flex-1 min-w-[145px] whitespace-nowrap gap-2 text-xs sm:text-sm font-medium py-2">
                  <UserPlus className="h-4 w-4 shrink-0 hidden sm:block" />
                  Student Mapping
                </TabsTrigger>
                <TabsTrigger value="teacher-mapping" className="flex-1 min-w-[145px] whitespace-nowrap gap-2 text-xs sm:text-sm font-medium py-2">
                  <BookOpen className="h-4 w-4 shrink-0 hidden sm:block" />
                  Teacher Mapping
                </TabsTrigger>
              </TabsList>

              <TabsContent value="departments" className="mt-0 focus-visible:outline-none">
                <DepartmentsTab 
                  departments={departments} 
                  teachers={setupTeachers}
                  classes={classes}
                  students={students}
                  onAddDepartment={() => {
                    setEditingDept(null);
                    setIsDeptModalOpen(true);
                  }}
                  onEditDepartment={(dept) => {
                    setEditingDept(dept);
                    setIsDeptModalOpen(true);
                  }}
                  onDeleteDepartment={triggerDeleteDepartment}
                  onViewDepartment={(dept) => {
                    setViewingDept(dept);
                    setIsDeptDrawerOpen(true);
                  }}
                />
              </TabsContent>

              <TabsContent value="classes" className="mt-0 focus-visible:outline-none">
                <ClassesTab 
                  classes={classes} 
                  teachers={setupTeachers}
                  departments={departments}
                  classSubjects={classSubjects}
                  onAddGrade={() => {
                    setEditingGrade(null);
                    setIsGradeModalOpen(true);
                  }}
                  onEditGrade={(classGrp) => {
                    setEditingGrade(classGrp);
                    setIsGradeModalOpen(true);
                  }}
                  onDeleteGrade={triggerDeleteGrade}
                  onAddSection={(classGrpId) => {
                    setEditingSection({ classGrpId, section: null });
                    setIsSectionModalOpen(true);
                  }}
                  onEditSection={(classGrpId, section) => {
                    setEditingSection({ classGrpId, section });
                    setIsSectionModalOpen(true);
                  }}
                  onDeleteSection={triggerDeleteSection}
                  onOpenBulkSectionModal={(classGrpId) => {
                    setBulkTargetClassGrpId(classGrpId || '');
                    setIsBulkSectionModalOpen(true);
                  }}
                  onOpenPromotionWizard={() => setIsPromotionWizardOpen(true)}
                  onOpenSubjectMatrixForSection={handleOpenSubjectMatrixForSection}
                />
              </TabsContent>

              <TabsContent value="subjects" className="mt-0 focus-visible:outline-none">
                {isMatrixViewActive ? (
                  <SubjectMappingMatrix
                    classes={classes}
                    subjects={subjects}
                    classSubjects={classSubjects}
                    onSaveClassSubjectsBatch={handleSaveClassSubjectsBatch}
                    initialSectionId={matrixInitialSectionId}
                    onNavigateBack={() => setIsMatrixViewActive(false)}
                  />
                ) : (
                  <SubjectsTab 
                    subjects={subjects} 
                    classes={classes}
                    departments={departments}
                    classSubjects={classSubjects}
                    onAddSubject={handleAddSubject}
                    onUpdateSubject={handleUpdateSubject}
                    onDeleteSubject={handleDeleteSubject}
                    onAssignSubjectsToClass={handleAssignSubjectsToClass}
                    onOpenMatrixView={() => setIsMatrixViewActive(true)}
                  />
                )}
              </TabsContent>

              <TabsContent value="mapping" className="mt-0 focus-visible:outline-none">
                <StudentMappingTab 
                  classes={classes} 
                  students={students}
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
                  onAssignClassTeacher={handleAssignClassTeacherInline}
                />
              </TabsContent>
            </Tabs>
          </ErrorBoundary>
        </div>
      )}

      <ManageDepartmentModal
        isOpen={isDeptModalOpen}
        onClose={() => setIsDeptModalOpen(false)}
        onSave={handleSaveDepartment}
        departmentData={editingDept}
        teachers={setupTeachers}
      />

      <DepartmentDetailDrawer
        isOpen={isDeptDrawerOpen}
        onClose={() => setIsDeptDrawerOpen(false)}
        department={viewingDept}
        classes={classes}
        teachers={setupTeachers}
        subjects={subjects}
      />

      <ManageGradeModal
        isOpen={isGradeModalOpen}
        onClose={() => setIsGradeModalOpen(false)}
        onSave={handleSaveGrade}
        gradeData={editingGrade}
        departments={departments}
      />

      <ManageSectionModal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
        onSave={handleSaveSection}
        sectionData={editingSection?.section}
        teachers={setupTeachers}
      />

      <BulkAddSectionsModal
        isOpen={isBulkSectionModalOpen}
        onClose={() => setIsBulkSectionModalOpen(false)}
        classes={classes}
        onBulkAdd={handleBulkAddSections}
        selectedClassGrpId={bulkTargetClassGrpId}
      />

      <StudentPromotionWizardModal
        isOpen={isPromotionWizardOpen}
        onClose={() => setIsPromotionWizardOpen(false)}
        classes={classes}
        students={students}
        academicYears={academicYears}
        onExecutePromotion={handleExecutePromotion}
      />

      {deleteTarget && (
        <DeleteImpactModal
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          title={`Delete ${deleteTarget.type.charAt(0).toUpperCase() + deleteTarget.type.slice(1)}`}
          entityName={deleteTarget.name}
          impactDetails={deleteTarget.impactDetails}
          warningText={deleteTarget.warningText}
        />
      )}
    </div>
  );
}

export default AcademicSetupView;

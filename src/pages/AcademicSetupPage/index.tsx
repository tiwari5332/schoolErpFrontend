import React, { useState } from 'react';
import { Network, Building2, LayoutTemplate, UserPlus, BookOpen, Library } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { 
  MOCK_DEPARTMENTS, 
  MOCK_CLASSES, 
  MOCK_SETUP_TEACHERS, 
  MOCK_SETUP_STUDENTS,
  Department,
  ClassGroup,
  SetupStudent,
  Section
} from '../../features/academic-setup/Constants';

import { DepartmentsTab } from '../../features/academic-setup/Components/DepartmentsTab';
import { ClassesTab } from '../../features/academic-setup/Components/ClassesTab';
import { StudentMappingTab } from '../../features/academic-setup/Components/StudentMappingTab';
import { ManageDepartmentModal } from '../../features/academic-setup/Components/ManageDepartmentModal';
import { ManageGradeModal } from '../../features/academic-setup/Components/ManageGradeModal';
import { ManageSectionModal } from '../../features/academic-setup/Components/ManageSectionModal';
import { TeacherMappingTab } from '../../features/academic-setup/Components/TeacherMappingTab';
import { SubjectsTab, Subject } from '../../features/academic-setup/Components/SubjectsTab';

const MOCK_SUBJECTS: Subject[] = [
  { id: 'SUB1', name: 'Mathematics', code: 'MAT101', type: 'Core' },
  { id: 'SUB2', name: 'Science', code: 'SCI101', type: 'Core' },
  { id: 'SUB3', name: 'English Literature', code: 'ENG101', type: 'Language' },
  { id: 'SUB4', name: 'History', code: 'HIS101', type: 'Elective' },
  { id: 'SUB5', name: 'Computer Science', code: 'CS101', type: 'Elective' },
];

export default function AcademicSetupPage() {
  const [departments, setDepartments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [classes, setClasses] = useState<ClassGroup[]>(MOCK_CLASSES);
  const [students, setStudents] = useState<SetupStudent[]>(MOCK_SETUP_STUDENTS);
  
  const [subjects, setSubjects] = useState<Subject[]>(MOCK_SUBJECTS);
  const [classSubjects, setClassSubjects] = useState<Record<string, string[]>>({});
  
  const [subjectMappings, setSubjectMappings] = useState<Record<string, Record<string, string>>>({});

  // Modals State
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<{classGrpId: string, section: Section | null} | null>(null);

  // ---- Departments Logic ----
  const handleSaveDepartment = (dept: Partial<Department>) => {
    if (dept.id) {
      // Edit
      setDepartments(departments.map(d => d.id === dept.id ? { ...d, ...dept } as Department : d));
    } else {
      // Add
      const newDept: Department = {
        id: `DEPT${Math.floor(Math.random() * 1000)}`,
        name: dept.name!,
        description: dept.description!,
        hodId: dept.hodId!,
        teacherIds: []
      };
      setDepartments([...departments, newDept]);
    }
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter(d => d.id !== id));
  };

  // ---- Classes & Sections Logic ----
  const handleSaveGrade = (gradeName: string) => {
    const newGrade: ClassGroup = {
      id: `CLS${Math.floor(Math.random() * 1000)}`,
      grade: gradeName,
      sections: []
    };
    setClasses([...classes, newGrade]);
  };

  const handleSaveSection = (section: Partial<Section>) => {
    if (!editingSection) return;
    const { classGrpId, section: existingSection } = editingSection;

    setClasses(classes.map(c => {
      if (c.id === classGrpId) {
        if (existingSection) {
          // Edit section
          return {
            ...c,
            sections: c.sections.map(s => s.id === existingSection.id ? { ...s, ...section } as Section : s)
          };
        } else {
          // Add section
          const newSection: Section = {
            id: `SEC${Math.floor(Math.random() * 1000)}`,
            name: section.name!,
            classTeacherId: section.classTeacherId!,
            studentIds: []
          };
          return { ...c, sections: [...c.sections, newSection] };
        }
      }
      return c;
    }));
  };

  // ---- Student Mapping Logic ----
  const handleAssignStudents = (studentIds: string[], sectionId: string) => {
    const updatedClasses = classes.map(c => ({
      ...c,
      sections: c.sections.map(s => {
        if (s.id === sectionId) {
          return { ...s, studentIds: [...s.studentIds, ...studentIds] };
        }
        return s;
      })
    }));

    const updatedStudents = students.map(s => {
      if (studentIds.includes(s.id)) {
        return { ...s, isMapped: true };
      }
      return s;
    });

    setClasses(updatedClasses);
    setStudents(updatedStudents);
  };

  const handleUnassignStudents = (studentIds: string[], sectionId: string) => {
    const updatedClasses = classes.map(c => ({
      ...c,
      sections: c.sections.map(s => {
        if (s.id === sectionId) {
          return { ...s, studentIds: s.studentIds.filter(id => !studentIds.includes(id)) };
        }
        return s;
      })
    }));

    const updatedStudents = students.map(s => {
      if (studentIds.includes(s.id)) {
        return { ...s, isMapped: false };
      }
      return s;
    });

    setClasses(updatedClasses);
    setStudents(updatedStudents);
  };

  // ---- Teacher Mapping Logic ----
  const handleSaveSubjectMapping = (sectionId: string, subjectId: string, teacherId: string) => {
    setSubjectMappings(prev => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [subjectId]: teacherId
      }
    }));
  };

  // ---- Subject Management Logic ----
  const handleAddSubject = (subject: Omit<Subject, 'id'>) => {
    setSubjects([...subjects, { ...subject, id: `SUB${Date.now()}` }]);
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const handleAssignSubjectsToClass = (classGrpId: string, subjectIds: string[]) => {
    setClassSubjects(prev => ({ ...prev, [classGrpId]: subjectIds }));
  };

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
              teachers={MOCK_SETUP_TEACHERS}
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
              teachers={MOCK_SETUP_TEACHERS}
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
              teachers={MOCK_SETUP_TEACHERS as any}
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

      {/* Modals */}
      <ManageDepartmentModal
        isOpen={isDeptModalOpen}
        onClose={() => setIsDeptModalOpen(false)}
        onSave={handleSaveDepartment}
        departmentData={editingDept}
        teachers={MOCK_SETUP_TEACHERS}
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
        teachers={MOCK_SETUP_TEACHERS}
      />
    </div>
  );
}

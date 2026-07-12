import { useState, useEffect } from 'react';
import {
  Department,
  ClassGroup,
  SetupStudent,
  SetupTeacher,
  Section
} from '../Constants';
import { AcademicApi } from '../api/AcademicApi';
import { Subject } from '../Components/SubjectsTab';

const MOCK_SUBJECTS: Subject[] = [
  { id: 'SUB1', name: 'Mathematics', code: 'MAT101', type: 'Core' },
  { id: 'SUB2', name: 'Science', code: 'SCI101', type: 'Core' },
  { id: 'SUB3', name: 'English Literature', code: 'ENG101', type: 'Language' },
  { id: 'SUB4', name: 'History', code: 'HIS101', type: 'Elective' },
  { id: 'SUB5', name: 'Computer Science', code: 'CS101', type: 'Elective' },
];

import { LocalStorageSync } from '../../../services/LocalStorageSync';

export function useAcademicSetup() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [students, setStudents] = useState<SetupStudent[]>([]);
  const [setupTeachers, setSetupTeachers] = useState<SetupTeacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [subjects, setSubjects] = useState<Subject[]>(MOCK_SUBJECTS);
  const [classSubjects, setClassSubjects] = useState<Record<string, string[]>>({});
  
  const [subjectMappings, setSubjectMappings] = useState<Record<string, Record<string, string>>>({});
 
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<{classGrpId: string, section: Section | null} | null>(null);

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        setIsLoading(true);
        const [fetchedDepts, fetchedClasses, fetchedStudents, fetchedTeachers] = await Promise.all([
          AcademicApi.getDepartments(),
          AcademicApi.getClasses(),
          AcademicApi.getStudents(),
          AcademicApi.getTeachers()
        ]);
        setDepartments(fetchedDepts);
        setClasses(fetchedClasses);
        setStudents(fetchedStudents);
        setSetupTeachers(fetchedTeachers);

        // Load subjects and mappings from local storage
        const storedSubjects = LocalStorageSync.get<Subject[]>("edu_trio_subjects");
        if (storedSubjects) setSubjects(storedSubjects);

        const storedClassSubjects = LocalStorageSync.get<Record<string, string[]>>("edu_trio_class_subjects");
        if (storedClassSubjects) setClassSubjects(storedClassSubjects);

        const storedSubjectMappings = LocalStorageSync.get<Record<string, Record<string, string>>>("edu_trio_subject_mappings");
        if (storedSubjectMappings) setSubjectMappings(storedSubjectMappings);
      } catch (error) {
        console.error("Failed to fetch academic setup data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAcademicData();
  }, []);

  // Save to Local Storage when states change
  useEffect(() => {
    if (!isLoading) {
      LocalStorageSync.set("edu_trio_classes", classes);
    }
  }, [classes, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      LocalStorageSync.set("edu_trio_departments", departments);
    }
  }, [departments, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      LocalStorageSync.set("edu_trio_students", students);
    }
  }, [students, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      LocalStorageSync.set("edu_trio_teachers", setupTeachers);
    }
  }, [setupTeachers, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      LocalStorageSync.set("edu_trio_subjects", subjects);
    }
  }, [subjects, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      LocalStorageSync.set("edu_trio_class_subjects", classSubjects);
    }
  }, [classSubjects, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      LocalStorageSync.set("edu_trio_subject_mappings", subjectMappings);
    }
  }, [subjectMappings, isLoading]);

  const handleSaveDepartment = async (dept: Partial<Department>) => {
    try {
      const savedDept = await AcademicApi.saveDepartment(dept);
      if (dept.id) {
        setDepartments(departments.map(d => d.id === savedDept.id ? savedDept : d));
      } else {
        setDepartments([...departments, savedDept]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter(d => d.id !== id));
  };

  const handleSaveGrade = async (gradeName: string) => {
    try {
      const savedGrade = await AcademicApi.saveClass({ grade: gradeName, sections: [] });
      setClasses([...classes, savedGrade]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveSection = (section: Partial<Section>) => {
    if (!editingSection) return;
    const { classGrpId, section: existingSection } = editingSection;

    setClasses(classes.map(c => {
      if (c.id === classGrpId) {
        if (existingSection) {
          return {
            ...c,
            sections: c.sections.map(s => s.id === existingSection.id ? { ...s, ...section } as Section : s)
          };
        } else {
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

  const handleSaveSubjectMapping = (sectionId: string, subjectId: string, teacherId: string) => {
    setSubjectMappings(prev => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [subjectId]: teacherId
      }
    }));
  };

  const handleAddSubject = (subject: Omit<Subject, 'id'>) => {
    setSubjects([...subjects, { ...subject, id: `SUB${Date.now()}` }]);
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const handleAssignSubjectsToClass = (classGrpId: string, subjectIds: string[]) => {
    setClassSubjects(prev => ({ ...prev, [classGrpId]: subjectIds }));
  };

  return {
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
  };
}

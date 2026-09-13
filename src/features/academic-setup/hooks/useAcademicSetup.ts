import { useState, useEffect } from 'react';
import {
  Department,
  ClassGroup,
  SetupStudent,
  SetupTeacher,
  Section,
  SetupSubject,
  AcademicYear,
  MOCK_ACADEMIC_YEARS,
  MOCK_SUBJECTS,
  DEFAULT_CLASS_SUBJECTS,
  DEFAULT_SUBJECT_MAPPINGS
} from '../Constants';
import { AcademicApi } from '../api/AcademicApi';
import { toast } from '../../../components/ui/Toast';
import {
  useDepartmentsQuery,
  useClassesQuery,
  useSubjectsQuery,
  useSaveDepartmentMutation,
  useDeleteDepartmentMutation,
  useSaveClassMutation,
  useDeleteClassMutation,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation
} from '../../../api/queries/useAcademicQuery';

export function useAcademicSetup() {
  const { departments: queryDepartments, isLoading: isDeptsLoading } = useDepartmentsQuery();
  const { classes: queryClasses, isLoading: isClassesLoading } = useClassesQuery();
  const { subjects: querySubjects, isLoading: isSubjectsLoading } = useSubjectsQuery();
  const saveDeptMutation = useSaveDepartmentMutation();
  const deleteDeptMutation = useDeleteDepartmentMutation();

  const saveClassMutation = useSaveClassMutation();
  const deleteClassMutation = useDeleteClassMutation();

  const createSectionMutation = useCreateSectionMutation();
  const updateSectionMutation = useUpdateSectionMutation();
  const deleteSectionMutation = useDeleteSectionMutation();

  const [apiErrorNotice, setApiErrorNotice] = useState<string | null>(null);

  const [academicYears] = useState<AcademicYear[]>(MOCK_ACADEMIC_YEARS);
  
  // Configuring For (local setup year) vs Global Active Operating Year
  const [configuringYearId, setConfiguringYearId] = useState<string>('ay_2024_25');

  const [departments, setDepartments] = useState<Department[]>([]);
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [students, setStudents] = useState<SetupStudent[]>([]);
  const [setupTeachers, setSetupTeachers] = useState<SetupTeacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [subjects, setSubjects] = useState<SetupSubject[]>([]);
  const [classSubjects, setClassSubjects] = useState<Record<string, string[]>>({});
  const [subjectMappings, setSubjectMappings] = useState<Record<string, Record<string, string>>>({});
 
  // Modals & Drawers
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [viewingDept, setViewingDept] = useState<Department | null>(null);
  const [isDeptDrawerOpen, setIsDeptDrawerOpen] = useState(false);

  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<ClassGroup | null>(null);
  
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<{classGrpId: string, section: Section | null} | null>(null);

  const [isBulkSectionModalOpen, setIsBulkSectionModalOpen] = useState(false);
  const [bulkTargetClassGrpId, setBulkTargetClassGrpId] = useState<string>('');

  const [isPromotionWizardOpen, setIsPromotionWizardOpen] = useState(false);

  useEffect(() => {
    if (queryDepartments.length > 0) setDepartments(queryDepartments);
  }, [queryDepartments]);

  useEffect(() => {
    if (queryClasses.length > 0) setClasses(queryClasses);
  }, [queryClasses]);

  useEffect(() => {
    if (querySubjects.length > 0) setSubjects(querySubjects as SetupSubject[]);
  }, [querySubjects]);

  // Load data scoped to configuringYearId when configuringYearId changes
  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        setIsLoading(true);
        const [fetchedStudents, fetchedTeachers] = await Promise.all([
          AcademicApi.getStudents(),
          AcademicApi.getTeachers()
        ]);
        setStudents(fetchedStudents);
        setSetupTeachers(fetchedTeachers);

        if (queryClasses.length > 0) setClasses(queryClasses);
        if (querySubjects.length > 0) setSubjects(querySubjects as SetupSubject[]);
        setClassSubjects(DEFAULT_CLASS_SUBJECTS);
        setSubjectMappings(DEFAULT_SUBJECT_MAPPINGS);
      } catch (error) {
        console.error("Failed to fetch academic setup data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAcademicData();
  }, [configuringYearId, queryClasses, querySubjects]);

  // Clone Structure From Previous Year
  const handleCloneStructureFromPreviousYear = (sourceYearId: string = 'ay_2024_25') => {
    const sourceClasses = classes;
    const sourceClassSubjects = classSubjects || DEFAULT_CLASS_SUBJECTS;

    const clonedClasses: ClassGroup[] = sourceClasses.map(c => ({
      ...c,
      id: `${c.id}_${configuringYearId}`,
      sections: (c.sections || []).map(s => ({
        ...s,
        id: `${s.id}_${configuringYearId}`,
        studentIds: [], // Clear student mappings for new year
        classTeacherId: null, // Clear class teacher assignment
      }))
    }));

    const clonedClassSubjects: Record<string, string[]> = {};
    sourceClasses.forEach(c => {
      const oldKey = c.id;
      const newKey = `${c.id}_${configuringYearId}`;
      clonedClassSubjects[newKey] = sourceClassSubjects[oldKey] || [];
    });

    setClasses(clonedClasses);
    setClassSubjects(clonedClassSubjects);
    setSubjectMappings({});
    toast.success("Academic structure cloned from previous year!");
  };

  const handleSaveDepartment = async (dept: Partial<Department>) => {
    try {
      const savedDept = await saveDeptMutation.mutateAsync(dept);
      if (dept.id) {
        setDepartments(prev => prev.map(d => d.id === savedDept.id ? { ...d, ...savedDept } : d));
        toast.success("Department updated successfully!");
      } else {
        setDepartments(prev => [...prev, savedDept]);
        toast.success("Department created successfully!");
      }
      setApiErrorNotice(null);
    } catch (e: any) {
      console.error('[useAcademicSetup] Failed to save department:', e);
      const errMsg = e?.message || 'Failed to save department. Server error encountered.';
      toast.error(errMsg);
      throw e;
    }
  };

  const handleToggleDepartmentStatus = (id: string, newStatus: 'Active' | 'Inactive') => {
    setDepartments(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
    toast.info(`Department status updated to ${newStatus}`);
  };

  const handleDeleteDepartment = async (id: string) => {
    try {
      await deleteDeptMutation.mutateAsync(id);
      setDepartments(prev => prev.filter(d => d.id !== id));
      setApiErrorNotice(null);
      toast.success("Department deleted successfully!");
    } catch (e: any) {
      console.error('[useAcademicSetup] Failed to delete department:', e);
      const errMsg = e?.message || 'Failed to delete department. Server error encountered.';
      toast.error(errMsg);
      throw e;
    }
  };

  const handleSaveGrade = async (gradeData: Partial<ClassGroup>) => {
    try {
      const sanitizedSeq = Math.max(1, Number(gradeData.sequenceOrder) || 1);
      const targetDeptId = gradeData.departmentId || (departments.length > 0 ? departments[0].id : null);

      const payload: Partial<ClassGroup> = {
        ...gradeData,
        grade: gradeData.grade || '',
        departmentId: targetDeptId,
        sequenceOrder: sanitizedSeq,
        stream: gradeData.stream || 'General',
      };

      const savedGrade = await saveClassMutation.mutateAsync(payload);

      if (gradeData.id) {
        setClasses(prev => prev.map(c => c.id === savedGrade.id || c.id === gradeData.id ? { 
          ...c, 
          ...savedGrade, 
          departmentId: targetDeptId, 
          sequenceOrder: sanitizedSeq 
        } as ClassGroup : c));
        toast.success("Grade updated successfully!");
      } else {
        const newClassItem: ClassGroup = {
          id: savedGrade.id || `class_${Date.now()}`,
          grade: savedGrade.grade || gradeData.grade || '',
          departmentId: targetDeptId,
          sequenceOrder: sanitizedSeq,
          stream: gradeData.stream || 'General',
          sections: savedGrade.sections || []
        };
        setClasses(prev => [...prev, newClassItem]);
        toast.success("Grade created successfully!");
      }
      setApiErrorNotice(null);
    } catch (e: any) {
      console.error('[useAcademicSetup] Failed to save grade:', e);
      const errMsg = e?.message || 'Failed to save grade. Server error encountered.';
      toast.error(errMsg);
      throw e;
    }
  };

  const handleDeleteGrade = async (id: string) => {
    try {
      await deleteClassMutation.mutateAsync(id);
      setClasses(prev => prev.filter(c => c.id !== id));
      toast.success("Grade deleted successfully!");
    } catch (e: any) {
      console.error('[useAcademicSetup] Failed to delete grade:', e);
      const errMsg = e?.message || 'Failed to delete grade. Server error encountered.';
      toast.error(errMsg);
    }
  };

  const handleSaveSection = async (section: Partial<Section>) => {
    if (!editingSection) return;
    const { classGrpId, section: existingSection } = editingSection;

    if (existingSection) {
      // UPDATE SECTION API CALL
      try {
        await updateSectionMutation.mutateAsync({
          sectionId: existingSection.id,
          payload: {
            gradeId: classGrpId,
            academicYearId: configuringYearId,
            name: section.name || existingSection.name,
            classTeacherId: section.classTeacherId === 'unassigned' ? null : (section.classTeacherId ?? existingSection.classTeacherId ?? null),
            capacity: Number(section.capacity) || existingSection.capacity || 30,
          }
        });

        setClasses(prev => prev.map(c => {
          if (c.id === classGrpId) {
            const sectionsList = c.sections || [];
            return {
              ...c,
              sections: sectionsList.map(s => s.id === existingSection.id ? { 
                ...s, 
                ...section, 
                classTeacherId: section.classTeacherId === 'unassigned' ? null : (section.classTeacherId ?? s.classTeacherId) 
              } as Section : s)
            };
          }
          return c;
        }));
        setApiErrorNotice(null);
        toast.success("Section updated successfully!");
      } catch (err: any) {
        console.error('[useAcademicSetup] updateSection API failed:', err);
        const errMsg = err?.message || 'Failed to update section. Server error encountered.';
        toast.error(errMsg);
        throw err; // Re-throw so modal caller handles error & stays open
      }
    } else {
      // CREATE SECTION API CALL
      const sectionName = section.name || 'A';
      try {
        const apiRes = await createSectionMutation.mutateAsync({
          gradeId: classGrpId,
          academicYearId: configuringYearId,
          name: [sectionName],
          classTeacherId: section.classTeacherId === 'unassigned' ? null : (section.classTeacherId || null),
          capacity: Number(section.capacity) || 30,
        });

        const createdSectionId = apiRes?.id || (Array.isArray(apiRes) && apiRes[0]?.id) || `SEC_${Date.now()}`;

        const newSection: Section = {
          id: createdSectionId,
          name: sectionName,
          capacity: Number(section.capacity) || 30,
          classTeacherId: section.classTeacherId === 'unassigned' ? null : (section.classTeacherId || null),
          studentIds: []
        };

        setClasses(prev => prev.map(c => {
          if (c.id === classGrpId) {
            return { ...c, sections: [...(c.sections || []), newSection] };
          }
          return c;
        }));
        setApiErrorNotice(null);
        toast.success("Section created successfully!");
      } catch (err: any) {
        console.error('[useAcademicSetup] createSection API failed:', err);
        const errMsg = err?.message || 'Failed to create section. Server error encountered.';
        toast.error(errMsg);
        throw err; // Re-throw so modal caller handles error & stays open
      }
    }
  };

  const handleDeleteSection = async (classGrpId: string, sectionId: string) => {
    // DELETE SECTION API CALL
    try {
      await deleteSectionMutation.mutateAsync(sectionId);
      setClasses(prev => prev.map(c => {
        if (c.id === classGrpId) {
          return { ...c, sections: (c.sections || []).filter(s => s.id !== sectionId) };
        }
        return c;
      }));
      setApiErrorNotice(null);
      toast.success("Section deleted successfully!");
    } catch (err: any) {
      console.error('[useAcademicSetup] deleteSection API failed:', err);
      const errMsg = err?.message || 'Failed to delete section. Server error encountered.';
      toast.error(errMsg);
    }
  };

  const handleBulkAddSections = async (classGrpId: string, sectionNames: string[], defaultCapacity: number) => {
    if (sectionNames.length > 0) {
      // BULK CREATE SECTION API CALL
      try {
        await createSectionMutation.mutateAsync({
          gradeId: classGrpId,
          academicYearId: configuringYearId,
          name: sectionNames,
          capacity: defaultCapacity || 30,
        });

        setClasses(prev => prev.map(c => {
          if (c.id === classGrpId) {
            const existingNames = (c.sections || []).map(s => s.name.toUpperCase());
            const newSections: Section[] = sectionNames
              .filter(name => !existingNames.includes(name.toUpperCase()))
              .map(name => ({
                id: `SEC_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                name,
                capacity: defaultCapacity || 30,
                classTeacherId: null,
                studentIds: []
              }));
            return { ...c, sections: [...(c.sections || []), ...newSections] };
          }
          return c;
        }));
        setApiErrorNotice(null);
        toast.success(`${sectionNames.length} sections created successfully!`);
      } catch (err: any) {
        console.error('[useAcademicSetup] bulk createSection API failed:', err);
        const errMsg = err?.message || 'Failed to bulk create sections. Server error encountered.';
        toast.error(errMsg);
        throw err;
      }
    }
  };

  const handleAssignClassTeacherInline = async (classGrpId: string, sectionId: string, teacherId: string) => {
    const updatedTeacherId = teacherId === 'unassigned' ? null : teacherId;
    const targetGrade = classes.find(c => c.id === classGrpId);
    const targetSection = (targetGrade?.sections || []).find(s => s.id === sectionId);

    if (targetSection) {
      // UPDATE SECTION CLASS TEACHER API CALL
      try {
        await updateSectionMutation.mutateAsync({
          sectionId,
          payload: {
            gradeId: classGrpId,
            academicYearId: configuringYearId,
            name: targetSection.name,
            classTeacherId: updatedTeacherId,
            capacity: targetSection.capacity || 30,
          }
        });

        setClasses(prev => prev.map(c => {
          if (c.id === classGrpId) {
            return {
              ...c,
              sections: (c.sections || []).map(s => s.id === sectionId ? { ...s, classTeacherId: updatedTeacherId } : s)
            };
          }
          return c;
        }));
        setApiErrorNotice(null);
        toast.success("Class teacher updated successfully!");
      } catch (err: any) {
        console.error('[useAcademicSetup] updateSection class teacher API failed:', err);
        const errMsg = err?.message || 'Failed to assign class teacher. Server error encountered.';
        toast.error(errMsg);
      }
    }
  };

  const handleExecutePromotion = (
    _sourceYearId: string,
    _sourceSectionId: string,
    targetYearId: string,
    targetSectionId: string,
    promotedStudentIds: string[]
  ) => {
    setClasses(prev => prev.map(c => ({
      ...c,
      sections: (c.sections || []).map(s => {
        if (s.id === targetSectionId) {
          const combined = Array.from(new Set([...(s.studentIds || []), ...promotedStudentIds]));
          return { ...s, studentIds: combined };
        }
        return s;
      })
    })));

    setStudents(prev => prev.map(s => {
      if (promotedStudentIds.includes(s.id)) {
        return { ...s, isMapped: true, academicYearId: targetYearId };
      }
      return s;
    }));
    toast.success(`Successfully promoted ${promotedStudentIds.length} student(s)!`);
  };

  const handleAssignStudents = (studentIds: string[], sectionId: string) => {
    const updatedClasses = (classes || []).map(c => ({
      ...c,
      sections: (c.sections || []).map(s => {
        if (s.id === sectionId) {
          return { ...s, studentIds: [...(s.studentIds || []), ...studentIds] };
        }
        return s;
      })
    }));

    const updatedStudents = (students || []).map(s => {
      if (studentIds.includes(s.id)) {
        return { ...s, isMapped: true, academicYearId: configuringYearId };
      }
      return s;
    });

    setClasses(updatedClasses);
    setStudents(updatedStudents);
    toast.success(`Assigned ${studentIds.length} student(s) to section!`);
  };

  const handleUnassignStudents = (studentIds: string[], sectionId: string) => {
    const updatedClasses = (classes || []).map(c => ({
      ...c,
      sections: (c.sections || []).map(s => {
        if (s.id === sectionId) {
          return { ...s, studentIds: (s.studentIds || []).filter(id => !studentIds.includes(id)) };
        }
        return s;
      })
    }));

    const updatedStudents = (students || []).map(s => {
      if (studentIds.includes(s.id)) {
        return { ...s, isMapped: false };
      }
      return s;
    });

    setClasses(updatedClasses);
    setStudents(updatedStudents);
    toast.success(`Unassigned ${studentIds.length} student(s)!`);
  };

  const handleSaveSubjectMapping = (sectionId: string, subjectId: string, teacherId: string) => {
    setSubjectMappings(prev => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [subjectId]: teacherId
      }
    }));
    toast.success("Teacher subject assignment saved!");
  };

  const handleAddSubject = (subject: Omit<SetupSubject, 'id'>) => {
    const cleanId = subject.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const newSubject: SetupSubject = {
      ...subject,
      id: cleanId || `sub_${Date.now()}`
    };
    setSubjects(prev => [...prev, newSubject]);
    toast.success(`Subject "${subject.name}" added successfully!`);
  };

  const handleUpdateSubject = (id: string, updates: Partial<SetupSubject>) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    toast.success("Subject details updated successfully!");
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
    toast.success("Subject deleted successfully!");
  };

  const handleAssignSubjectsToClass = (classGrpId: string, subjectIds: string[]) => {
    setClassSubjects(prev => ({ ...prev, [classGrpId]: subjectIds }));
    toast.success("Class subject mapping updated!");
  };

  const handleSaveClassSubjectsBatch = (updatedBatch: Record<string, string[]>) => {
    setClassSubjects(updatedBatch);
    toast.success("Subject-Class matrix mappings saved successfully!");
  };

  return {
    academicYears,
    configuringYearId,
    setConfiguringYearId,
    departments,
    classes,
    students,
    setupTeachers,
    isLoading: isLoading || isDeptsLoading || isClassesLoading || isSubjectsLoading,
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
  };
}

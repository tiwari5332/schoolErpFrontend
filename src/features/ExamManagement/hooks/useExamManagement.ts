import { useState, useEffect } from "react";
import { 
  getMaxMarks, 
} from "../Constants/mockData";
import { LocalStorageSync } from "../../../services/LocalStorageSync";

export interface StudentMarkRecord {
  studentId: string;
  rollNo: string;
  studentName: string;
  marksObtained: number | "";
  remarks: string;
  status: "Pass" | "Fail" | "Pending";
  error?: string;
}

export interface ExamFilters {
  classId: string;
  examCategoryId: string;
  subjectId: string;
}

export function useExamManagement() {
  const [filters, setFilters] = useState<ExamFilters>({
    classId: "",
    examCategoryId: "",
    subjectId: "",
  });

  const [activeFilters, setActiveFilters] = useState<ExamFilters | null>(null);
  const [maxMarks, setMaxMarks] = useState<number>(100);
  const [studentsData, setStudentsData] = useState<StudentMarkRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  // Toast notifications state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Dynamic max marks calculation on filter change
  useEffect(() => {
    if (filters.classId && filters.subjectId && filters.examCategoryId) {
      const classesList = LocalStorageSync.get<any[]>("edu_trio_classes") || [];
      let foundClassId = "";
      let foundSectionId = "";
      for (const cg of classesList) {
        const sec = cg.sections.find((s: any) => s.id === filters.classId);
        if (sec) {
          foundClassId = cg.id;
          foundSectionId = sec.id;
          break;
        }
      }

      const schedules = LocalStorageSync.get<any[]>("edu_trio_exam_schedules") || [];
      const matchingSchedule = schedules.find(s => 
        s.status === "PUBLISHED" &&
        s.header.classId === foundClassId &&
        s.header.sectionId === foundSectionId &&
        s.header.examCategoryId === filters.examCategoryId
      ) || schedules.find(s =>
        s.status === "PUBLISHED" &&
        s.header.classId === foundClassId &&
        s.header.sectionId === "All" &&
        s.header.examCategoryId === filters.examCategoryId
      );

      const timetableRow = matchingSchedule?.timetable.find((row: any) => row.subjectId === filters.subjectId);
      if (timetableRow) {
        const calculatedMax = (Number(timetableRow.theoryMax) || 0) + (Number(timetableRow.practicalMax) || 0);
        setMaxMarks(calculatedMax);
      } else {
        const calculatedMax = getMaxMarks(filters.subjectId, filters.examCategoryId);
        setMaxMarks(calculatedMax);
      }
    } else if (filters.subjectId && filters.examCategoryId) {
      const calculatedMax = getMaxMarks(filters.subjectId, filters.examCategoryId);
      setMaxMarks(calculatedMax);
    } else {
      setMaxMarks(100); // default fallback
    }
  }, [filters.classId, filters.subjectId, filters.examCategoryId]);

  const setFilterValue = (key: keyof ExamFilters, value: string) => {
    setFilters(prev => {
      const nextFilters = {
        ...prev,
        [key]: value,
      };

      // Reset subject filter if it is not in the new class curriculum mapping
      if (key === "classId" && nextFilters.subjectId) {
        const classGroups = LocalStorageSync.get<any[]>("edu_trio_classes") || [];
        const selectedCG = classGroups.find(cg => cg.sections.some((sec: any) => sec.id === value));
        if (selectedCG) {
          const classSubjects = LocalStorageSync.get<Record<string, string[]>>("edu_trio_class_subjects") || {};
          const mappedIds = classSubjects[selectedCG.id] || [];
          if (!mappedIds.includes(nextFilters.subjectId)) {
            nextFilters.subjectId = "";
          }
        }
      }

      return nextFilters;
    });
  };

  // Fetch student roster from local storage
  const fetchStudents = () => {
    if (!filters.classId || !filters.examCategoryId || !filters.subjectId) {
      showToast("Please fill in all filters first.", "error");
      return;
    }

    setIsLoading(true);
    setStudentsData([]); // clear previous grid while loading
    setActiveFilters({ ...filters });

    setTimeout(() => {
      // Find the class group containing the selected section
      const classesList = LocalStorageSync.get<any[]>("edu_trio_classes") || [];
      let targetSection: any = null;
      for (const cg of classesList) {
        const sec = cg.sections.find((s: any) => s.id === filters.classId);
        if (sec) {
          targetSection = sec;
          break;
        }
      }

      const studentIds = targetSection ? targetSection.studentIds || [] : [];
      const studentsList = LocalStorageSync.get<any[]>("edu_trio_students") || [];
      const matchedStudents = studentsList.filter(s => studentIds.includes(s.id));

      // Load previously entered marks
      const marksKey = `${filters.classId}_${filters.examCategoryId}_${filters.subjectId}`;
      const allMarks = LocalStorageSync.get<Record<string, Record<string, { marksObtained: number | ""; remarks: string; status: "Pass" | "Fail" | "Pending" }>>>("edu_trio_student_marks") || {};
      const marksForKey = allMarks[marksKey] || {};

      const records: StudentMarkRecord[] = matchedStudents.map(student => {
        const studentMark = marksForKey[student.id];
        return {
          studentId: student.id,
          rollNo: student.enrollmentId || student.id,
          studentName: student.name,
          marksObtained: studentMark ? studentMark.marksObtained : "",
          remarks: studentMark ? studentMark.remarks : "",
          status: studentMark ? studentMark.status : "Pending",
        };
      });

      setStudentsData(records);
      setIsLoading(false);
      showToast(`Loaded ${records.length} students successfully.`, "success");
    }, 1200);
  };

  // Update specific student's marks and recalculate status/errors
  const updateStudentMark = (studentId: string, markValue: string) => {
    let currentMaxMarks = maxMarks;
    let currentPassMarks = maxMarks * 0.33;

    if (activeFilters) {
      const classesList = LocalStorageSync.get<any[]>("edu_trio_classes") || [];
      let foundClassId = "";
      let foundSectionId = "";
      for (const cg of classesList) {
        const sec = cg.sections.find((s: any) => s.id === activeFilters.classId);
        if (sec) {
          foundClassId = cg.id;
          foundSectionId = sec.id;
          break;
        }
      }
      const schedules = LocalStorageSync.get<any[]>("edu_trio_exam_schedules") || [];
      const matchingSchedule = schedules.find(s => 
        s.status === "PUBLISHED" &&
        s.header.classId === foundClassId &&
        s.header.sectionId === foundSectionId &&
        s.header.examCategoryId === activeFilters.examCategoryId
      ) || schedules.find(s =>
        s.status === "PUBLISHED" &&
        s.header.classId === foundClassId &&
        s.header.sectionId === "All" &&
        s.header.examCategoryId === activeFilters.examCategoryId
      );
      const timetableRow = matchingSchedule?.timetable.find((row: any) => row.subjectId === activeFilters.subjectId);
      if (timetableRow) {
        currentMaxMarks = (Number(timetableRow.theoryMax) || 0) + (Number(timetableRow.practicalMax) || 0);
        currentPassMarks = (Number(timetableRow.theoryPass) || 0) + (Number(timetableRow.practicalPass) || 0);
      } else {
        currentMaxMarks = getMaxMarks(activeFilters.subjectId, activeFilters.examCategoryId);
        currentPassMarks = currentMaxMarks * 0.33;
      }
    }

    setStudentsData(prev =>
      prev.map(record => {
        if (record.studentId !== studentId) return record;

        // Handle empty input
        if (markValue.trim() === "") {
          return {
            ...record,
            marksObtained: "",
            status: "Pending",
            error: undefined,
          };
        }

        const mark = parseFloat(markValue);
        
        // Out-of-bounds checks and validation
        let error: string | undefined = undefined;
        if (isNaN(mark)) {
          error = "Invalid number format";
        } else if (mark < 0) {
          error = "Marks cannot be negative";
        } else if (mark > currentMaxMarks) {
          error = `Marks exceed maximum of ${currentMaxMarks}`;
        }

        // Pass/Fail status calculation (Passing threshold)
        let status: "Pass" | "Fail" | "Pending" = "Pending";
        if (!error && !isNaN(mark)) {
          status = mark >= currentPassMarks ? "Pass" : "Fail";
        }

        return {
          ...record,
          marksObtained: isNaN(mark) ? "" : mark,
          status,
          error,
        };
      })
    );
  };

  // Update specific student's remarks
  const updateStudentRemark = (studentId: string, remarks: string) => {
    setStudentsData(prev =>
      prev.map(record =>
        record.studentId === studentId ? { ...record, remarks } : record
      )
    );
  };

  // Check if grid contains any validation errors
  const hasValidationError = studentsData.some(record => !!record.error);

  // Check if grid is populated
  const isGridReady = studentsData.length > 0;

  // Save bulk marks payload to local storage
  const saveResults = () => {
    if (!activeFilters) return;
    if (hasValidationError) {
      showToast("Cannot save results. Please resolve all validation errors first.", "error");
      return;
    }

    setIsSaving(true);

    const marksKey = `${activeFilters.classId}_${activeFilters.examCategoryId}_${activeFilters.subjectId}`;
    const allMarks = LocalStorageSync.get<Record<string, any>>("edu_trio_student_marks") || {};
    
    const marksForCurrentKey: Record<string, any> = {};
    studentsData.forEach(student => {
      marksForCurrentKey[student.studentId] = {
        marksObtained: student.marksObtained,
        remarks: student.remarks,
        status: student.status,
      };
    });
    
    allMarks[marksKey] = marksForCurrentKey;
    LocalStorageSync.set("edu_trio_student_marks", allMarks);

    // Build the bulk payload
    const payload = {
      meta: {
        classId: activeFilters.classId,
        examCategoryId: activeFilters.examCategoryId,
        subjectId: activeFilters.subjectId,
        maxMarks: maxMarks,
        timestamp: new Date().toISOString(),
      },
      students: studentsData.map(student => ({
        studentId: student.studentId,
        rollNo: student.rollNo,
        studentName: student.studentName,
        marksObtained: student.marksObtained,
        remarks: student.remarks,
        status: student.status,
      })),
    };

    setTimeout(() => {
      // Print target payload for reviewer/system log validation
      console.log("bulk_payload_saved", JSON.stringify(payload, null, 2));

      setIsSaving(false);
      showToast(
        `Marks for ${studentsData.length} students saved successfully!`,
        "success"
      );
    }, 1000);
  };

  // Toast trigger utility
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  return {
    filters,
    activeFilters,
    maxMarks,
    studentsData,
    isLoading,
    isSaving,
    toast,
    hasValidationError,
    isGridReady,
    setFilterValue,
    fetchStudents,
    updateStudentMark,
    updateStudentRemark,
    saveResults,
    closeToast,
    showToast,
  };
}

import { LocalStorageSync } from "../../../services/LocalStorageSync";
import { useEffect, useState } from "react";

export interface ExamScheduleRow {
  id: string;
  subjectId: string;
  date: string;
  sessionPreset: "custom" | "morning" | "afternoon";
  startTime: string;
  endTime: string;
  theoryMax: number | "";
  theoryPass: number | "";
  practicalMax: number | "";
  practicalPass: number | "";
  roomNo: string;
  invigilatorId: string;
  errors: Record<string, string>;
}

export interface HeaderConfig {
  classId: string;
  sectionId: string;
  examCategoryId: string;
}

export function useExamScheduler(showToast: (msg: string, type: "success" | "error") => void) {
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({
    classId: "",
    sectionId: "",
    examCategoryId: "",
  });

  const [timetableRows, setTimetableRows] = useState<ExamScheduleRow[]>([]);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isSavingDraft, setIsSavingDraft] = useState<boolean>(false);

  const setHeaderValue = (key: keyof HeaderConfig, value: string) => {
    setHeaderConfig((prev) => {
      const next = {
        ...prev,
        [key]: value,
      };

      // Reset sectionId if it is not valid for the newly selected class group
      if (key === "classId" && next.sectionId && next.sectionId !== "All") {
        const list = LocalStorageSync.get<any[]>("edu_trio_classes") || [];
        const foundClass = list.find(cg => cg.id === value);
        if (foundClass) {
          const sects = foundClass.sections || [];
          const isValid = sects.some((sec: any) => sec.id === next.sectionId);
          if (!isValid) {
            next.sectionId = "";
          }
        } else {
          next.sectionId = "";
        }
      }

      return next;
    });
  };

  const generateId = () => {
    return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  };

  // Load existing schedule when scope selection changes
  useEffect(() => {
    if (headerConfig.classId && headerConfig.sectionId && headerConfig.examCategoryId) {
      const scheduleId = `${headerConfig.classId}_${headerConfig.sectionId}_${headerConfig.examCategoryId}`;
      const list = LocalStorageSync.get<any[]>("edu_trio_exam_schedules") || [];
      const found = list.find(item => item.id === scheduleId);
      if (found) {
        setTimetableRows(
          found.timetable.map((row: any) => ({
            id: generateId(),
            subjectId: row.subjectId || "",
            date: row.date || "",
            sessionPreset: row.sessionPreset || "custom",
            startTime: row.startTime || "",
            endTime: row.endTime || "",
            theoryMax: row.theoryMax !== undefined ? row.theoryMax : "",
            theoryPass: row.theoryPass !== undefined ? row.theoryPass : "",
            practicalMax: row.practicalMax !== undefined ? row.practicalMax : "",
            practicalPass: row.practicalPass !== undefined ? row.practicalPass : "",
            roomNo: row.roomNo || "",
            invigilatorId: row.invigilatorId || "",
            errors: {},
          }))
        );
      } else {
        setTimetableRows([]);
      }
    } else {
      setTimetableRows([]);
    }
  }, [headerConfig.classId, headerConfig.sectionId, headerConfig.examCategoryId]);

  const addSubjectRow = () => {
    const newRow: ExamScheduleRow = {
      id: generateId(),
      subjectId: "",
      date: "",
      sessionPreset: "custom",
      startTime: "",
      endTime: "",
      theoryMax: "",
      theoryPass: "",
      practicalMax: "",
      practicalPass: "",
      roomNo: "",
      invigilatorId: "",
      errors: {},
    };
    setTimetableRows((prev) => [...prev, newRow]);
  };

  const removeSubjectRow = (id: string) => {
    setTimetableRows((prev) => prev.filter((row) => row.id !== id));
  };

  // Perform complex validations across rows (date overlaps, teacher overlaps, duplicates, passing marks, time order)
  const validateTimetable = (rows: ExamScheduleRow[]): ExamScheduleRow[] => {
    return rows.map((row, idx) => {
      const errors: Record<string, string> = {};

      // 1. Theory Marks validations
      if (row.theoryMax !== "" && row.theoryMax <= 0) {
        errors.theoryMax = "Must be greater than 0";
      }
      if (row.theoryPass !== "" && row.theoryPass <= 0) {
        errors.theoryPass = "Must be greater than 0";
      }
      if (row.theoryMax !== "" && row.theoryPass !== "" && row.theoryPass > row.theoryMax) {
        errors.theoryPass = "Cannot exceed theory maximum marks";
      }

      // 2. Practical Marks validations (Optional, but if filled must be correct)
      if (row.practicalMax !== "" && row.practicalMax < 0) {
        errors.practicalMax = "Cannot be negative";
      }
      if (row.practicalPass !== "" && row.practicalPass < 0) {
        errors.practicalPass = "Cannot be negative";
      }
      if (row.practicalMax !== "" && row.practicalPass !== "" && row.practicalPass > row.practicalMax) {
        errors.practicalPass = "Cannot exceed practical maximum marks";
      }

      // 3. Start/End Time bounds validation
      if (row.startTime && row.endTime) {
        const [startH, startM] = row.startTime.split(":").map(Number);
        const [endH, endM] = row.endTime.split(":").map(Number);
        const startVal = startH * 60 + startM;
        const endVal = endH * 60 + endM;

        if (endVal <= startVal) {
          errors.endTime = "End time must be after start time";
        }
      }

      // 4. Duplicate subject checks
      if (row.subjectId) {
        const isDuplicateSubject = rows.some(
          (otherRow, otherIdx) => otherIdx !== idx && otherRow.subjectId === row.subjectId
        );
        if (isDuplicateSubject) {
          errors.subjectId = "Subject is already scheduled in this timetable";
        }
      }

      // Helper values for overlap checking
      const [startH, startM] = row.startTime ? row.startTime.split(":").map(Number) : [0, 0];
      const [endH, endM] = row.endTime ? row.endTime.split(":").map(Number) : [0, 0];
      const startVal = startH * 60 + startM;
      const endVal = endH * 60 + endM;

      // 5. Overlapping classroom schedules validation (same date, overlapping times, same room)
      if (row.date && row.startTime && row.endTime && row.roomNo.trim() !== "") {
        const isRoomOverlapping = rows.some((otherRow, otherIdx) => {
          if (otherIdx === idx) return false;
          if (otherRow.date !== row.date || !otherRow.startTime || !otherRow.endTime) return false;
          if (otherRow.roomNo.trim().toLowerCase() !== row.roomNo.trim().toLowerCase()) return false;

          const [oStartH, oStartM] = otherRow.startTime.split(":").map(Number);
          const [oEndH, oEndM] = otherRow.endTime.split(":").map(Number);
          const oStartVal = oStartH * 60 + oStartM;
          const oEndVal = oEndH * 60 + oEndM;

          return startVal < oEndVal && oStartVal < endVal;
        });

        if (isRoomOverlapping) {
          errors.roomNo = "Classroom conflict: Room is occupied at this time";
        }
      }

      // 6. Invigilator overlapping validation (same date, overlapping times, same teacher)
      if (row.date && row.startTime && row.endTime && row.invigilatorId) {
        const isTeacherOverlapping = rows.some((otherRow, otherIdx) => {
          if (otherIdx === idx) return false;
          if (otherRow.date !== row.date || !otherRow.startTime || !otherRow.endTime) return false;
          if (otherRow.invigilatorId !== row.invigilatorId) return false;

          const [oStartH, oStartM] = otherRow.startTime.split(":").map(Number);
          const [oEndH, oEndM] = otherRow.endTime.split(":").map(Number);
          const oStartVal = oStartH * 60 + oStartM;
          const oEndVal = oEndH * 60 + oEndM;

          return startVal < oEndVal && oStartVal < endVal;
        });

        if (isTeacherOverlapping) {
          errors.invigilatorId = "Invigilator overlap: Teacher is assigned to another room at this time";
        }
      }

      return {
        ...row,
        errors,
      };
    });
  };

  const updateRowValue = (id: string, key: keyof Omit<ExamScheduleRow, "id" | "errors">, value: any) => {
    setTimetableRows((prev) => {
      const updated = prev.map((row) => {
        if (row.id !== id) return row;

        const updatedRow = { ...row };

        // Handle preset changes
        if (key === "sessionPreset") {
          updatedRow.sessionPreset = value;
          if (value === "morning") {
            updatedRow.startTime = "09:00";
            updatedRow.endTime = "12:00";
          } else if (value === "afternoon") {
            updatedRow.startTime = "13:30";
            updatedRow.endTime = "16:30";
          }
        } else {
          let processedValue = value;

          // Parse numerical fields correctly
          if (
            key === "theoryMax" ||
            key === "theoryPass" ||
            key === "practicalMax" ||
            key === "practicalPass"
          ) {
            if (value === "") {
              processedValue = "";
            } else {
              const val = parseFloat(value);
              processedValue = isNaN(val) ? "" : val;
            }
          }

          // If start/end time is manually typed, set preset to 'custom'
          if (key === "startTime" || key === "endTime") {
            updatedRow.sessionPreset = "custom";
          }

          updatedRow[key] = processedValue;
        }

        return updatedRow;
      });

      return validateTimetable(updated);
    });
  };

  const hasValidationError = timetableRows.some((row) => Object.keys(row.errors).length > 0);

  const isFormComplete = () => {
    if (!headerConfig.classId || !headerConfig.sectionId || !headerConfig.examCategoryId) {
      return false;
    }
    if (timetableRows.length === 0) {
      return false;
    }

    // Core requirements for Tier 2/3 scheduled subject rows:
    // Subject, Date, Times, Theory Max/Pass, Room Number and Invigilator must be filled out.
    // Practical marks are optional since not all subjects have practical/internal portions.
    return timetableRows.every(
      (row) =>
        row.subjectId &&
        row.date &&
        row.startTime &&
        row.endTime &&
        row.theoryMax !== "" &&
        row.theoryPass !== "" &&
        row.roomNo.trim() !== "" &&
        row.invigilatorId
    );
  };

  const saveDraft = () => {
    if (!headerConfig.classId || !headerConfig.sectionId || !headerConfig.examCategoryId) {
      showToast("Please fill in the class and exam header configuration.", "error");
      return;
    }

    setIsSavingDraft(true);

    const newSchedule = {
      id: `${headerConfig.classId}_${headerConfig.sectionId}_${headerConfig.examCategoryId}`,
      status: "DRAFT" as const,
      header: headerConfig,
      timetable: timetableRows.map((row) => ({
        subjectId: row.subjectId,
        date: row.date,
        sessionPreset: row.sessionPreset,
        startTime: row.startTime,
        endTime: row.endTime,
        theoryMax: row.theoryMax,
        theoryPass: row.theoryPass,
        practicalMax: row.practicalMax,
        practicalPass: row.practicalPass,
        roomNo: row.roomNo,
        invigilatorId: row.invigilatorId,
      })),
      timestamp: new Date().toISOString(),
    };

    setTimeout(() => {
      console.log("exam_schedule_draft_saved", JSON.stringify(newSchedule, null, 2));
      const list = LocalStorageSync.get<any[]>("edu_trio_exam_schedules") || [];
      const filtered = list.filter(item => item.id !== newSchedule.id);
      filtered.push(newSchedule);
      LocalStorageSync.set("edu_trio_exam_schedules", filtered);

      setIsSavingDraft(false);
      showToast("Draft timetable saved successfully!", "success");
    }, 800);
  };

  const publishSchedule = () => {
    if (!isFormComplete()) {
      showToast("Please fill in all details, theory marks, rooms, and invigilators.", "error");
      return;
    }

    if (hasValidationError) {
      showToast("Please resolve all conflicts (invigilator overlap, room conflicts) first.", "error");
      return;
    }

    setIsPublishing(true);

    const newSchedule = {
      id: `${headerConfig.classId}_${headerConfig.sectionId}_${headerConfig.examCategoryId}`,
      status: "PUBLISHED" as const,
      header: headerConfig,
      timetable: timetableRows.map((row) => ({
        subjectId: row.subjectId,
        date: row.date,
        sessionPreset: row.sessionPreset,
        startTime: row.startTime,
        endTime: row.endTime,
        theoryMax: row.theoryMax,
        theoryPass: row.theoryPass,
        practicalMax: row.practicalMax,
        practicalPass: row.practicalPass,
        roomNo: row.roomNo,
        invigilatorId: row.invigilatorId,
      })),
      timestamp: new Date().toISOString(),
    };

    setTimeout(() => {
      console.log("exam_schedule_published", JSON.stringify(newSchedule, null, 2));
      const list = LocalStorageSync.get<any[]>("edu_trio_exam_schedules") || [];
      const filtered = list.filter(item => item.id !== newSchedule.id);
      filtered.push(newSchedule);
      LocalStorageSync.set("edu_trio_exam_schedules", filtered);

      setIsPublishing(false);
      showToast("Exam schedule published and sent to teachers/parents!", "success");
    }, 1000);
  };

  return {
    headerConfig,
    timetableRows,
    isPublishing,
    isSavingDraft,
    hasValidationError,
    isFormComplete: isFormComplete(),
    setHeaderValue,
    addSubjectRow,
    removeSubjectRow,
    updateRowValue,
    saveDraft,
    publishSchedule,
  };
}

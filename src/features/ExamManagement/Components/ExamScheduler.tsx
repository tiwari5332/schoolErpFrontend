import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  examCategories
} from "../Constants/mockData";
import { LocalStorageSync } from "../../../services/LocalStorageSync";
import { useExamScheduler, ExamScheduleRow } from "../hooks/useExamScheduler";
import { 
  CalendarRange, 
  Plus, 
  Trash2, 
  Loader2, 
  Save, 
  Send, 
  AlertTriangle,
  Building,
  Clock,
  BookOpen,
  CalendarDays,
  Target,
  Printer,
  Sparkles,
  UserCheck
} from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface ExamSchedulerProps {
  showToast: (msg: string, type: "success" | "error") => void;
}

export function ExamScheduler({ showToast }: ExamSchedulerProps) {
  const {
    headerConfig,
    timetableRows,
    isPublishing,
    isSavingDraft,
    hasValidationError,
    isFormComplete,
    setHeaderValue,
    addSubjectRow,
    removeSubjectRow,
    updateRowValue,
    saveDraft,
    publishSchedule,
  } = useExamScheduler(showToast);

  // Dynamic options loaded from Local Storage
  const classOptions = React.useMemo(() => {
    const list = LocalStorageSync.get<any[]>("edu_trio_classes") || [];
    return list.map((cg) => ({ id: cg.id, name: cg.grade }));
  }, []);

  const sectionOptions = React.useMemo(() => {
    if (!headerConfig.classId) return [];
    const list = LocalStorageSync.get<any[]>("edu_trio_classes") || [];
    const foundClass = list.find((cg) => cg.id === headerConfig.classId);
    if (!foundClass) return [];
    const sects = (foundClass.sections || []).map((sec: any) => ({
      id: sec.id,
      name: sec.name,
    }));
    return [...sects, { id: "All", name: "All Sections" }];
  }, [headerConfig.classId]);

  const subjectOptions = React.useMemo(() => {
    const allSubjects = LocalStorageSync.get<any[]>("edu_trio_subjects") || [];
    if (!headerConfig.classId) return allSubjects;
    const classSubjects = LocalStorageSync.get<Record<string, string[]>>("edu_trio_class_subjects") || {};
    const mappedIds = classSubjects[headerConfig.classId] || [];
    if (mappedIds.length === 0) return allSubjects;
    return allSubjects.filter(sub => mappedIds.includes(sub.id));
  }, [headerConfig.classId]);

  const teacherOptions = React.useMemo(() => {
    return LocalStorageSync.get<any[]>("edu_trio_teachers") || [];
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const getSubjectName = (subId: string) => {
    const list = LocalStorageSync.get<any[]>("edu_trio_subjects") || [];
    return list.find(s => s.id === subId)?.name || "—";
  };
  const getTeacherName = (tId: string) => {
    const list = LocalStorageSync.get<any[]>("edu_trio_teachers") || [];
    return list.find(t => t.id === tId)?.name || "—";
  };
  const getExamCategoryName = (cId: string) => examCategories.find(c => c.id === cId)?.name || "—";
  const getClassName = (clsId: string) => {
    const list = LocalStorageSync.get<any[]>("edu_trio_classes") || [];
    return list.find(c => c.id === clsId)?.grade || "—";
  };

  return (
    <TooltipProvider delayDuration={100}>
      {/* Editor Screen (Hidden during browser prints) */}
      <div className="space-y-6 print:hidden">
        
        {/* Header Configuration Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-6 shadow-xl relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center border border-purple-100 dark:border-purple-900/50">
                <CalendarRange className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Schedule Scope</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Select the target classes and exam category for this timetable.</p>
              </div>
            </div>

            {/* Print Timetable Trigger (Only active if schedule rows exist) */}
            {timetableRows.length > 0 && (
              <Button
                variant="outline"
                onClick={handlePrint}
                className="h-9 rounded-xl text-xs font-semibold px-4.5 bg-slate-50 hover:bg-slate-100 border-slate-200 dark:bg-slate-950 dark:border-slate-800 flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="h-4 w-4" />
                <span>Print Schedule (A4)</span>
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
            {/* Class */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-600 dark:text-slate-350">Class</Label>
              <Select
                value={headerConfig.classId}
                onValueChange={(val) => setHeaderValue("classId", val)}
              >
                <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-10 shadow-sm rounded-xl focus:ring-purple-500 focus:border-purple-500">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  {classOptions.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>{opt.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-600 dark:text-slate-350">Section</Label>
              <Select
                value={headerConfig.sectionId}
                onValueChange={(val) => setHeaderValue("sectionId", val)}
              >
                <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-10 shadow-sm rounded-xl focus:ring-purple-500 focus:border-purple-500">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  {sectionOptions.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>{opt.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Exam Category */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-600 dark:text-slate-350">Exam Category</Label>
              <Select
                value={headerConfig.examCategoryId}
                onValueChange={(val) => setHeaderValue("examCategoryId", val)}
              >
                <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-10 shadow-sm rounded-xl focus:ring-purple-500 focus:border-purple-500">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  {examCategories.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>{opt.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Dynamic Timetable Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-6 shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <CalendarRange className="h-5 w-5 text-indigo-500" />
                Exam Timetable Configurator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Configure subjects, invigilator teachers, room seating, shift schedules, and marks.</p>
            </div>
            <span className="text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200/30 px-3 py-1.5 rounded-xl">
              Added Subjects: {timetableRows.length}
            </span>
          </div>

          {timetableRows.length === 0 ? (
            <div className="border border-dashed border-slate-200 dark:border-slate-800 p-10 text-center rounded-2xl bg-slate-50/20 dark:bg-slate-950/10 flex flex-col items-center justify-center min-h-[220px]">
              <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                <CalendarRange className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-350">Timetable Roster Empty</h4>
              <p className="text-xs text-slate-500 dark:text-slate-450 mt-1 max-w-xs">
                Click "+ Add Subject" to begin scheduling invigilators, rooms, shifts, and paper scores.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {timetableRows.map((row, index) => {
                return (
                  <div 
                    key={row.id}
                    className="p-5 bg-slate-50/40 dark:bg-slate-900/30 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl flex flex-col gap-4 relative hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Header Row: Subject Index & Remove Button */}
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800/80">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
                        Exam Slot #{index + 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSubjectRow(row.id)}
                        className="h-8 w-8 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600 rounded-xl"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </Button>
                    </div>

                    {/* Form Fields: Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                      {/* Subject */}
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-500 dark:text-slate-400">Subject</Label>
                        <Tooltip open={!!row.errors.subjectId}>
                          <TooltipTrigger asChild>
                            <div>
                              <Select
                                value={row.subjectId}
                                onValueChange={(val) => updateRowValue(row.id, "subjectId", val)}
                              >
                                <SelectTrigger className={`w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-9.5 text-xs rounded-xl ${
                                  row.errors.subjectId ? "border-rose-500 focus-visible:ring-rose-500/20" : ""
                                }`}>
                                  <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                  {subjectOptions.map((sub) => (
                                    <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-rose-650 text-white text-[11px] p-2 font-medium z-50">
                            {row.errors.subjectId}
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* Date */}
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-500 dark:text-slate-400">Date</Label>
                        <Tooltip open={!!row.errors.date}>
                          <TooltipTrigger asChild>
                            <Input
                              type="date"
                              value={row.date}
                              onChange={(e) => updateRowValue(row.id, "date", e.target.value)}
                              className={`h-9.5 text-xs bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 font-mono ${
                                row.errors.date ? "border-rose-500 focus-visible:ring-rose-500/20" : ""
                              }`}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="bg-rose-650 text-white text-[11px] p-2 font-medium max-w-[240px] z-50">
                            {row.errors.date}
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* Shift Preset (Convenient for Tier 2/3) */}
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-500 dark:text-slate-400">Shift / Preset</Label>
                        <Select
                          value={row.sessionPreset}
                          onValueChange={(val) => updateRowValue(row.id, "sessionPreset", val)}
                        >
                          <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-9.5 text-xs rounded-xl focus:ring-indigo-500 focus:border-indigo-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                            <SelectItem value="custom">Custom Time</SelectItem>
                            <SelectItem value="morning">Morning (9 - 12)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (1:30 - 4:30)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Start Time */}
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-500 dark:text-slate-400">Start Time</Label>
                        <Input
                          type="time"
                          value={row.startTime}
                          onChange={(e) => updateRowValue(row.id, "startTime", e.target.value)}
                          className="h-9.5 text-xs bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 font-mono"
                        />
                      </div>

                      {/* End Time */}
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-500 dark:text-slate-400">End Time</Label>
                        <Tooltip open={!!row.errors.endTime}>
                          <TooltipTrigger asChild>
                            <Input
                              type="time"
                              value={row.endTime}
                              onChange={(e) => updateRowValue(row.id, "endTime", e.target.value)}
                              className={`h-9.5 text-xs bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 font-mono ${
                                row.errors.endTime ? "border-rose-500 focus-visible:ring-rose-500/20 bg-rose-50/5" : ""
                              }`}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="bg-rose-650 text-white text-[11px] p-2 font-medium z-50">
                            {row.errors.endTime}
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* Classroom seating (Mandatory) */}
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-500 dark:text-slate-400">Room No.</Label>
                        <Tooltip open={!!row.errors.roomNo}>
                          <TooltipTrigger asChild>
                            <Input
                              type="text"
                              placeholder="e.g. 104"
                              value={row.roomNo}
                              onChange={(e) => updateRowValue(row.id, "roomNo", e.target.value)}
                              className={`h-9.5 text-xs bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 font-mono ${
                                row.errors.roomNo ? "border-rose-500 focus-visible:ring-rose-550/20" : ""
                              }`}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="bg-rose-650 text-white text-[11px] p-2 font-medium max-w-[200px] z-50">
                            {row.errors.roomNo}
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* Invigilator duty allocation */}
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-500 dark:text-slate-400">Invigilator</Label>
                        <Tooltip open={!!row.errors.invigilatorId}>
                          <TooltipTrigger asChild>
                            <div>
                              <Select
                                value={row.invigilatorId}
                                onValueChange={(val) => updateRowValue(row.id, "invigilatorId", val)}
                              >
                                <SelectTrigger className={`w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-9.5 text-xs rounded-xl focus:ring-indigo-500 focus:border-indigo-500 ${
                                  row.errors.invigilatorId ? "border-rose-500 focus-visible:ring-rose-550/20" : ""
                                }`}>
                                  <SelectValue placeholder="Invigilator" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                  {teacherOptions.map((tch) => (
                                    <SelectItem key={tch.id} value={tch.id}>{tch.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-rose-650 text-white text-[11px] p-2 font-medium max-w-[240px] z-50">
                            {row.errors.invigilatorId}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    {/* Marks Breakdown Sub-grid (Theory / Practical marks splitting) */}
                    <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-200/50 dark:border-slate-850/50 flex flex-wrap items-center gap-6">
                      <span className="text-[11px] font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                        <Target className="h-4 w-4" />
                        Board Weightage Splits:
                      </span>

                      {/* Theory */}
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-350">Theory Marks:</span>
                        <div className="flex items-center gap-2">
                          <Label className="text-[10px] text-slate-500">Max</Label>
                          <Tooltip open={!!row.errors.theoryMax}>
                            <TooltipTrigger asChild>
                              <Input
                                type="number"
                                placeholder="Max"
                                value={row.theoryMax}
                                onChange={(e) => updateRowValue(row.id, "theoryMax", e.target.value)}
                                className={`h-8 w-16 text-center text-xs bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 font-mono ${
                                  row.errors.theoryMax ? "border-rose-500" : ""
                                }`}
                              />
                            </TooltipTrigger>
                            <TooltipContent className="bg-rose-600 text-white text-[10px] p-1 font-medium z-50">
                              {row.errors.theoryMax}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-[10px] text-slate-500">Pass</Label>
                          <Tooltip open={!!row.errors.theoryPass}>
                            <TooltipTrigger asChild>
                              <Input
                                type="number"
                                placeholder="Pass"
                                value={row.theoryPass}
                                onChange={(e) => updateRowValue(row.id, "theoryPass", e.target.value)}
                                className={`h-8 w-16 text-center text-xs bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 font-mono ${
                                  row.errors.theoryPass ? "border-rose-500" : ""
                                }`}
                              />
                            </TooltipTrigger>
                            <TooltipContent className="bg-rose-600 text-white text-[10px] p-1 font-medium z-50">
                              {row.errors.theoryPass}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>

                      {/* Practical */}
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-350">Practical Marks <span className="text-[10px] font-normal text-slate-400">(Optional)</span>:</span>
                        <div className="flex items-center gap-2">
                          <Label className="text-[10px] text-slate-500">Max</Label>
                          <Tooltip open={!!row.errors.practicalMax}>
                            <TooltipTrigger asChild>
                              <Input
                                type="number"
                                placeholder="None"
                                value={row.practicalMax}
                                onChange={(e) => updateRowValue(row.id, "practicalMax", e.target.value)}
                                className={`h-8 w-16 text-center text-xs bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 font-mono ${
                                  row.errors.practicalMax ? "border-rose-500" : ""
                                }`}
                              />
                            </TooltipTrigger>
                            <TooltipContent className="bg-rose-600 text-white text-[10px] p-1 font-medium z-50">
                              {row.errors.practicalMax}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-[10px] text-slate-500">Pass</Label>
                          <Tooltip open={!!row.errors.practicalPass}>
                            <TooltipTrigger asChild>
                              <Input
                                type="number"
                                placeholder="None"
                                value={row.practicalPass}
                                onChange={(e) => updateRowValue(row.id, "practicalPass", e.target.value)}
                                className={`h-8 w-16 text-center text-xs bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 font-mono ${
                                  row.errors.practicalPass ? "border-rose-500" : ""
                                }`}
                              />
                            </TooltipTrigger>
                            <TooltipContent className="bg-rose-600 text-white text-[10px] p-1 font-medium z-50">
                              {row.errors.practicalPass}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* Add Subject Row Button */}
          <div className="mt-5 border-t border-slate-100 dark:border-slate-800/80 pt-4 flex justify-start">
            <Button
              type="button"
              variant="outline"
              onClick={addSubjectRow}
              className="h-9.5 rounded-xl text-xs font-semibold px-4.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200/50 hover:border-indigo-300 dark:bg-indigo-950/30 dark:hover:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-900/50 flex items-center gap-1.5 shadow-sm transition-all duration-300"
            >
              <Plus className="h-4 w-4" /> Add Subject to Timetable
            </Button>
          </div>
        </div>

        {/* Action Panel Sticky Bar */}
        {timetableRows.length > 0 && (
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 p-4.5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-2xl transition-all duration-300">
            {/* Warnings and validation info */}
            <div className="flex items-center gap-2">
              {hasValidationError ? (
                <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 px-3.5 py-2 rounded-xl text-xs font-semibold border border-rose-200/30 dark:border-rose-900/30">
                  <AlertTriangle className="h-4 w-4 shrink-0 animate-bounce" />
                  <span>Validation Error: Resolve room occupancy overlaps or invigilator conflicts.</span>
                </div>
              ) : !isFormComplete ? (
                <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-450 px-3.5 py-2 rounded-xl text-xs font-semibold border border-amber-200/30 dark:border-amber-900/30">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>Fill in all details (subjects, dates, times, rooms, max/pass marks, invigilators) to publish.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 px-3.5 py-2 rounded-xl text-xs font-semibold border border-emerald-200/30 dark:border-emerald-900/30">
                  <Send className="h-4 w-4 shrink-0" />
                  <span>Timetable verified. Ready to publish and distribute schedule.</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex w-full sm:w-auto gap-3.5 justify-end">
              {/* Save Draft */}
              <Button
                onClick={saveDraft}
                disabled={isSavingDraft || isPublishing}
                variant="outline"
                className="w-full sm:w-auto h-11 px-5 rounded-xl font-bold bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
              >
                {isSavingDraft ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>Save as Draft</span>
              </Button>

              {/* Publish */}
              <Button
                onClick={publishSchedule}
                disabled={!isFormComplete || hasValidationError || isPublishing || isSavingDraft}
                className={`w-full sm:w-auto h-11 px-5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md ${
                  isFormComplete && !hasValidationError && !isPublishing
                    ? "bg-purple-600 hover:bg-purple-755 text-white shadow-colored-purple hover:shadow-lg hover:scale-[1.01]"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-250/20 shadow-none"
                }`}
              >
                {isPublishing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span>Publish Schedule</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Printable Sheet View (Only shown during printing) */}
      <div className="hidden print:block p-8 bg-white text-black min-h-screen font-sans">
        <div className="text-center mb-8 border-b-2 border-slate-800 pb-5">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-slate-900">Official Exam Timetable</h1>
          <div className="flex justify-center gap-8 mt-3 text-sm font-semibold text-slate-700">
            <span>Class: {getClassName(headerConfig.classId)}</span>
            <span>Section: {headerConfig.sectionId === "All" ? "All Sections" : headerConfig.sectionId}</span>
            <span>Exam Scope: {getExamCategoryName(headerConfig.examCategoryId)}</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Generated dynamically by EduTrio School ERP Portal</p>
        </div>

        {timetableRows.length === 0 ? (
          <p className="text-center text-slate-500 italic mt-10">No subjects scheduled on this timetable.</p>
        ) : (
          <table className="w-full border-collapse border border-slate-800 text-xs">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-800 p-2.5 text-left font-bold uppercase text-slate-800">Subject</th>
                <th className="border border-slate-800 p-2.5 text-left font-bold uppercase text-slate-800">Date</th>
                <th className="border border-slate-800 p-2.5 text-left font-bold uppercase text-slate-800">Session/Time</th>
                <th className="border border-slate-800 p-2.5 text-center font-bold uppercase text-slate-800">Theory Marks (Max/Pass)</th>
                <th className="border border-slate-800 p-2.5 text-center font-bold uppercase text-slate-800">Practical Marks (Max/Pass)</th>
                <th className="border border-slate-800 p-2.5 text-left font-bold uppercase text-slate-800">Room No</th>
                <th className="border border-slate-800 p-2.5 text-left font-bold uppercase text-slate-800">Invigilator</th>
              </tr>
            </thead>
            <tbody>
              {timetableRows.map((row) => (
                <tr key={row.id}>
                  <td className="border border-slate-800 p-2.5 font-bold text-slate-900">{getSubjectName(row.subjectId)}</td>
                  <td className="border border-slate-800 p-2.5 font-mono text-slate-800">{row.date || "—"}</td>
                  <td className="border border-slate-800 p-2.5 font-mono text-slate-800">
                    {row.sessionPreset === "morning" && "Morning Shift: "}
                    {row.sessionPreset === "afternoon" && "Afternoon Shift: "}
                    {row.startTime || "—"} to {row.endTime || "—"}
                  </td>
                  <td className="border border-slate-800 p-2.5 text-center font-mono text-slate-800">
                    {row.theoryMax !== "" ? `${row.theoryMax} / ${row.theoryPass}` : "—"}
                  </td>
                  <td className="border border-slate-800 p-2.5 text-center font-mono text-slate-800">
                    {row.practicalMax !== "" ? `${row.practicalMax} / ${row.practicalPass}` : "—"}
                  </td>
                  <td className="border border-slate-800 p-2.5 font-mono font-semibold text-slate-900">{row.roomNo || "—"}</td>
                  <td className="border border-slate-800 p-2.5 text-slate-800">{getTeacherName(row.invigilatorId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Footer Authority Signatures */}
        <div className="mt-16 flex justify-between items-end px-4 text-xs font-semibold">
          <div className="text-center w-36">
            <div className="border-b border-black h-8 mb-1"></div>
            <span>Prepared By</span>
          </div>
          <div className="text-center w-36">
            <div className="border-b border-black h-8 mb-1"></div>
            <span>Verified By</span>
          </div>
          <div className="text-center w-36">
            <div className="border-b border-black h-8 mb-1"></div>
            <span>Principal Seal</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
export default ExamScheduler;

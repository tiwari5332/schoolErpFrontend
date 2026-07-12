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
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Target,
  Sparkles,
  Loader2
} from "lucide-react";
import { ExamFilters } from "../hooks/useExamManagement";

interface FilterHeaderProps {
  filters: ExamFilters;
  maxMarks: number;
  isLoading: boolean;
  onFilterChange: (key: keyof ExamFilters, value: string) => void;
  onFetchStudents: () => void;
}

export function FilterHeader({
  filters,
  maxMarks,
  isLoading,
  onFilterChange,
  onFetchStudents,
}: FilterHeaderProps) {
  // 1. Fetch class groups and flatten sections to construct "Class & Section" options
  const classOptions = React.useMemo(() => {
    const classGroups = LocalStorageSync.get<any[]>("edu_trio_classes") || [];
    return classGroups.flatMap((cg) =>
      (cg.sections || []).map((sec: any) => {
        // If the grade name already contains the section name, just use the grade name.
        const hasSectionInGrade = cg.grade.toLowerCase().includes(`- ${sec.name.toLowerCase()}`) || cg.grade.toLowerCase().includes(` ${sec.name.toLowerCase()}`);
        const displayName = hasSectionInGrade ? cg.grade : `${cg.grade} - Section ${sec.name}`;
        return {
          id: sec.id,
          name: displayName,
        };
      })
    );
  }, []);

  // 2. Identify the selected class group for curriculum-based filtering
  const selectedClassGroup = React.useMemo(() => {
    if (!filters.classId) return null;
    const classGroups = LocalStorageSync.get<any[]>("edu_trio_classes") || [];
    return classGroups.find((cg) => cg.sections.some((sec: any) => sec.id === filters.classId));
  }, [filters.classId]);

  // 3. Filter subject list based on the chosen class's curriculum mapping in local storage
  const subjectOptions = React.useMemo(() => {
    const allSubjects = LocalStorageSync.get<any[]>("edu_trio_subjects") || [];
    if (!selectedClassGroup) return allSubjects;
    
    const classSubjects = LocalStorageSync.get<Record<string, string[]>>("edu_trio_class_subjects") || {};
    const mappedIds = classSubjects[selectedClassGroup.id] || [];
    // If there are no subjects mapped to this class in local storage, fall back to all subjects
    if (mappedIds.length === 0) return allSubjects;
    return allSubjects.filter((sub) => mappedIds.includes(sub.id));
  }, [selectedClassGroup]);

  // Check if all fields are selected to enable Fetch button
  const isButtonEnabled = filters.classId && filters.examCategoryId && filters.subjectId;

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-6 shadow-xl relative overflow-hidden transition-all duration-300">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full translate-y-32 -translate-x-32 blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50">
          <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Selection Filters</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Select class, exam type, and subject to begin data entry.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end relative z-10">
        {/* Class Filter */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-600 dark:text-slate-350 flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5 text-indigo-500" />
            Class & Section
          </Label>
          <Select
            value={filters.classId}
            onValueChange={(val) => onFilterChange("classId", val)}
          >
            <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-10 shadow-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              {classOptions.map((cls) => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Exam Category Filter */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-600 dark:text-slate-350 flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-indigo-500" />
            Exam Category
          </Label>
          <Select
            value={filters.examCategoryId}
            onValueChange={(val) => onFilterChange("examCategoryId", val)}
          >
            <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-10 shadow-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500">
              <SelectValue placeholder="Select Exam" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              {examCategories.map((exam) => (
                <SelectItem key={exam.id} value={exam.id}>
                  {exam.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subject Filter */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-600 dark:text-slate-350 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
            Subject
          </Label>
          <Select
            value={filters.subjectId}
            onValueChange={(val) => onFilterChange("subjectId", val)}
          >
            <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-10 shadow-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              {subjectOptions.map((sub) => (
                <SelectItem key={sub.id} value={sub.id}>
                  {sub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Max Marks & Fetch Button */}
        <div className="grid grid-cols-5 gap-3">
          {/* Max Marks (Read-Only) */}
          <div className="space-y-2 col-span-2">
            <Label className="text-xs font-semibold text-slate-600 dark:text-slate-350 flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-indigo-500" />
              Max Marks
            </Label>
            <Input
              type="text"
              readOnly
              disabled
              value={maxMarks}
              className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 h-10 font-mono font-bold text-center rounded-xl shadow-inner select-none cursor-not-allowed"
            />
          </div>

          {/* Fetch Students Button */}
          <div className="col-span-3">
            <Button
              onClick={onFetchStudents}
              disabled={!isButtonEnabled || isLoading}
              className={`w-full h-10 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                isButtonEnabled && !isLoading
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-colored-indigo hover:shadow-lg hover:scale-[1.01]"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-250/20"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading</span>
                </>
              ) : (
                <span>Fetch Students</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

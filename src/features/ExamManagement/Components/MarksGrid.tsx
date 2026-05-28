import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  StudentMarkRecord, 
  ExamFilters 
} from "../hooks/useExamManagement";
import { 
  FileSpreadsheet, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  ClipboardList
} from "lucide-react";
import { examCategories } from "../Constants/mockData";
import { LocalStorageSync } from "../../../services/LocalStorageSync";

interface MarksGridProps {
  studentsData: StudentMarkRecord[];
  activeFilters: ExamFilters | null;
  isLoading: boolean;
  onMarkChange: (studentId: string, mark: string) => void;
  onRemarkChange: (studentId: string, remark: string) => void;
  maxMarks: number;
}

export function MarksGrid({
  studentsData,
  activeFilters,
  isLoading,
  onMarkChange,
  onRemarkChange,
  maxMarks,
}: MarksGridProps) {
  // If not fetched yet
  if (!activeFilters && !isLoading) {
    return (
      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center shadow-inner flex flex-col items-center justify-center min-h-[350px] transition-all duration-300">
        <div className="h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center mb-4 border border-indigo-150/20 text-indigo-500 animate-pulse-slow">
          <FileSpreadsheet className="h-8 w-8" />
        </div>
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">No Student Roster Loaded</h4>
        <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
          Please select a Class, Exam Category, and Subject from the filters panel above, and click <strong className="text-indigo-600 dark:text-indigo-400">"Fetch Students"</strong> to populate the marks sheet.
        </p>
      </div>
    );
  }

  const currentMax = maxMarks;

  // Render Skeleton Loader
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  // Calculate grid summary statistics
  const total = studentsData.length;
  const passed = studentsData.filter(s => s.status === "Pass").length;
  const failed = studentsData.filter(s => s.status === "Fail").length;
  const pending = studentsData.filter(s => s.status === "Pending").length;

  const subjectName = React.useMemo(() => {
    if (!activeFilters?.subjectId) return "";
    const list = LocalStorageSync.get<any[]>("edu_trio_subjects") || [];
    return list.find(s => s.id === activeFilters.subjectId)?.name || "";
  }, [activeFilters?.subjectId]);

  const examName = React.useMemo(() => {
    if (!activeFilters?.examCategoryId) return "";
    return examCategories.find(e => e.id === activeFilters.examCategoryId)?.name || "";
  }, [activeFilters?.examCategoryId]);

  return (
    <TooltipProvider delayDuration={100}>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl overflow-hidden transition-all duration-300">
        
        {/* Table Header/Stats Bar */}
        <div className="bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200/60 dark:border-slate-800/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                Mark Entry Sheet: {subjectName}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Assigned Exam: {examName} • Max Marks Limit: <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{currentMax}</span>
            </p>
          </div>

          {/* Quick Stats badges */}
          <div className="flex flex-wrap gap-2.5">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 border border-slate-200/40 dark:border-slate-700/40">
              Roster: {total}
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-450 border border-emerald-200/30 dark:border-emerald-900/30 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Pass: {passed}
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-450 border border-rose-200/30 dark:border-rose-900/30 flex items-center gap-1">
              <XCircle className="h-3.5 w-3.5" />
              Fail: {failed}
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-450 border border-amber-200/30 dark:border-amber-900/30 flex items-center gap-1">
              <HelpCircle className="h-3.5 w-3.5 animate-bounce-slow" />
              Pending: {pending}
            </span>
          </div>
        </div>

        {/* Data Table */}
        <div className="relative w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50 select-none">
              <TableRow className="border-b border-slate-200/60 dark:border-slate-800/60 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300 w-[12%] pl-6">Roll No</TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300 w-[30%]">Student Name</TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300 w-[20%]">Marks Obtained</TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300 w-[23%]">Remarks</TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300 w-[15%] pr-6 text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100 dark:divide-slate-800/40">
              {studentsData.map((record) => {
                const isError = !!record.error;

                return (
                  <TableRow 
                    key={record.studentId}
                    className="group hover:bg-slate-50/40 dark:hover:bg-slate-850/20 transition-colors duration-200"
                  >
                    {/* Roll No */}
                    <TableCell className="font-mono font-medium text-slate-600 dark:text-slate-400 pl-6">
                      {record.rollNo}
                    </TableCell>

                    {/* Student Name */}
                    <TableCell className="font-semibold text-slate-800 dark:text-slate-200">
                      {record.studentName}
                    </TableCell>

                    {/* Marks Obtained Input */}
                    <TableCell className="relative py-2">
                      <Tooltip open={isError}>
                        <TooltipTrigger asChild>
                          <div className="relative flex items-center max-w-[140px]">
                            <Input
                              type="number"
                              placeholder="Enter marks"
                              value={record.marksObtained}
                              onChange={(e) => onMarkChange(record.studentId, e.target.value)}
                              className={`h-9 pr-8 text-sm font-mono font-semibold rounded-xl bg-white dark:bg-slate-950 transition-all duration-300 focus:scale-[1.01] ${
                                isError
                                  ? "border-rose-500 focus-visible:ring-rose-500/30 focus-visible:border-rose-500 bg-rose-50/10 dark:bg-rose-950/10 shadow-sm"
                                  : "border-slate-200 dark:border-slate-800 focus:border-indigo-400 dark:focus:border-indigo-500"
                              }`}
                              min={0}
                              max={currentMax}
                            />
                            {isError && (
                              <AlertCircle className="absolute right-2.5 h-4 w-4 text-rose-500 animate-shake pointer-events-none" />
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="top" 
                          align="start" 
                          className="bg-rose-600 text-white font-medium shadow-lg rounded-lg border-none text-[11px] px-2.5 py-1 flex items-center gap-1 z-50"
                        >
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>{record.error}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>

                    {/* Remarks Input */}
                    <TableCell className="py-2">
                      <Input
                        type="text"
                        placeholder="Add remarks..."
                        value={record.remarks}
                        onChange={(e) => onRemarkChange(record.studentId, e.target.value)}
                        className="h-9 text-xs rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:border-indigo-400 dark:focus:border-indigo-500"
                      />
                    </TableCell>

                    {/* Pass/Fail Status Badge */}
                    <TableCell className="text-center pr-6 py-2">
                      <div className="flex justify-center">
                        {record.status === "Pass" ? (
                          <Badge 
                            variant="outline" 
                            className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/50 rounded-xl px-2.5 py-1 text-[11px] font-bold tracking-wide"
                          >
                            Pass
                          </Badge>
                        ) : record.status === "Fail" ? (
                          <Badge 
                            variant="outline" 
                            className="bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-450 border-rose-200/50 dark:border-rose-900/50 rounded-xl px-2.5 py-1 text-[11px] font-bold tracking-wide"
                          >
                            Fail
                          </Badge>
                        ) : (
                          <Badge 
                            variant="outline" 
                            className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-450 border-slate-200/50 dark:border-slate-700/50 rounded-xl px-2.5 py-1 text-[11px] font-bold tracking-wide"
                          >
                            Pending
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  );
}

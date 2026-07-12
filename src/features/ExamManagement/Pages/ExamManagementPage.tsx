import React from "react";
import { FilterHeader } from "../Components/FilterHeader";
import { MarksGrid } from "../Components/MarksGrid";
import { ExamScheduler } from "../Components/ExamScheduler";
import { Toast } from "../Components/Toast";
import { useExamManagement } from "../hooks/useExamManagement";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ClipboardCheck, 
  Save, 
  Loader2, 
  AlertTriangle, 
  CheckCircle2,
  CalendarRange
} from "lucide-react";

export function ExamManagementPage() {
  const {
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
  } = useExamManagement();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-650 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2.5">
            <ClipboardCheck className="h-7 w-7 text-indigo-500" />
            Exam Management Control Center
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create academic schedules, assign rooms, input student grades, and publish class marksheets.
          </p>
        </div>
      </div>

      <Tabs defaultValue="marks_entry" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6 max-w-[400px] bg-slate-100/70 dark:bg-slate-800/70 p-1 rounded-xl shadow-inner border border-slate-200/50 dark:border-slate-850/50">
          <TabsTrigger value="marks_entry" className="gap-2 rounded-lg py-2 text-xs font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950">
            <ClipboardCheck className="h-4 w-4 text-indigo-500" />
            Marks Entry
          </TabsTrigger>
          <TabsTrigger value="exam_scheduler" className="gap-2 rounded-lg py-2 text-xs font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950">
            <CalendarRange className="h-4 w-4 text-purple-500" />
            Exam Scheduler
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Marks Entry */}
        <TabsContent value="marks_entry" className="space-y-6 focus-visible:outline-none">
          {/* Filter Selection Panel */}
          <FilterHeader
            filters={filters}
            maxMarks={maxMarks}
            isLoading={isLoading}
            onFilterChange={setFilterValue}
            onFetchStudents={fetchStudents}
          />

          {/* Mark Entry Grid Section */}
          <div className="relative">
            <MarksGrid
              studentsData={studentsData}
              activeFilters={activeFilters}
              isLoading={isLoading}
              onMarkChange={updateStudentMark}
              onRemarkChange={updateStudentRemark}
              maxMarks={maxMarks}
            />

            {/* Sticky Footer Action Bar (only visible when roster is loaded) */}
            {isGridReady && !isLoading && (
              <div className="sticky bottom-4 mt-6 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 p-4.5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-2xl transition-all duration-300">
                {/* Validation Info Badge */}
                <div className="flex items-center gap-2">
                  {hasValidationError ? (
                    <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 px-3.5 py-2 rounded-xl text-xs font-semibold border border-rose-200/30 dark:border-rose-900/30">
                      <AlertTriangle className="h-4 w-4 shrink-0 animate-bounce" />
                      <span>Validation Error: Some entries exceed the maximum marks limit.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 px-3.5 py-2 rounded-xl text-xs font-semibold border border-emerald-200/30 dark:border-emerald-900/30">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>All marks verified. Ready to submit marksheet payload.</span>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <Button
                  onClick={saveResults}
                  disabled={hasValidationError || isSaving}
                  className={`w-full sm:w-auto h-11 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                    !hasValidationError && !isSaving
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-colored-emerald hover:shadow-lg hover:scale-[1.01]"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-250/20 shadow-none"
                  }`}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving Results...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Results</span>
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Tab 2: Exam Scheduler */}
        <TabsContent value="exam_scheduler" className="focus-visible:outline-none">
          <ExamScheduler showToast={showToast} />
        </TabsContent>
      </Tabs>

      {/* Floating System Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
}

export default ExamManagementPage;

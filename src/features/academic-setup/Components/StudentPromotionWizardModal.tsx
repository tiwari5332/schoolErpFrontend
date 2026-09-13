import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserCheck, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { ClassGroup, AcademicYear, SetupStudent, MOCK_ACADEMIC_YEARS } from '../Constants';

interface StudentPromotionWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: ClassGroup[];
  students: SetupStudent[];
  academicYears?: AcademicYear[];
  onExecutePromotion: (
    sourceYearId: string,
    sourceSectionId: string,
    targetYearId: string,
    targetSectionId: string,
    promotedStudentIds: string[]
  ) => void;
}

export function StudentPromotionWizardModal({
  isOpen,
  onClose,
  classes = [],
  students = [],
  academicYears = MOCK_ACADEMIC_YEARS,
  onExecutePromotion,
}: StudentPromotionWizardModalProps) {
  const [step, setStep] = useState<number>(1);
  const [sourceYearId, setSourceYearId] = useState<string>(academicYears[0]?.id || 'ay_2024_25');
  const [sourceClassId, setSourceClassId] = useState<string>('all');
  const [sourceSectionId, setSourceSectionId] = useState<string>('');
  
  const [targetYearId, setTargetYearId] = useState<string>(academicYears[1]?.id || 'ay_2025_26');
  const [targetClassId, setTargetClassId] = useState<string>('all');
  const [targetSectionId, setTargetSectionId] = useState<string>('');
  
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Auto select section when step 1 opens
  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsCompleted(false);
      const firstClass = classes[0]?.id || 'all';
      setSourceClassId(firstClass);
      const firstSection = (classes[0]?.sections || classes.flatMap(c => c.sections || []))[0]?.id || '';
      setSourceSectionId(firstSection);
      
      const targetClass = classes[1]?.id || firstClass;
      setTargetClassId(targetClass);
      const secondSection = (classes.find(c => c.id === targetClass)?.sections || [])[0]?.id || firstSection;
      setTargetSectionId(secondSection);
    }
  }, [isOpen, classes]);

  const filteredSourceClasses = sourceClassId === 'all' 
    ? classes 
    : classes.filter(c => c.id === sourceClassId);

  const filteredTargetClasses = targetClassId === 'all' 
    ? classes 
    : classes.filter(c => c.id === targetClassId);

  // Find students in source section
  const sourceStudents = students.filter(s => {
    return classes.some(c => (c.sections || []).some(sec => sec.id === sourceSectionId && sec.studentIds?.includes(s.id)));
  });

  // When moving to step 2/3, default select all source students
  React.useEffect(() => {
    if (sourceStudents.length > 0 && selectedStudentIds.length === 0) {
      setSelectedStudentIds(sourceStudents.map(s => s.id));
    }
  }, [sourceSectionId]);

  const toggleStudent = (id: string) => {
    setSelectedStudentIds(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => setSelectedStudentIds(sourceStudents.map(s => s.id));
  const handleClearAll = () => setSelectedStudentIds([]);

  const handleExecute = () => {
    if (!sourceSectionId || !targetSectionId || selectedStudentIds.length === 0) return;
    onExecutePromotion(sourceYearId, sourceSectionId, targetYearId, targetSectionId, selectedStudentIds);
    setIsCompleted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const getSectionLabel = (sectionId: string) => {
    for (const c of classes) {
      const s = (c.sections || []).find(sec => sec.id === sectionId);
      if (s) return `${c.grade || c.name} - Section ${s.name}`;
    }
    return 'Select Section';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white border-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl shrink-0">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-800">Student Rollover & Promotion Wizard</DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Bulk promote or roll over students to a new academic year without overwriting past history.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isCompleted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200 animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">Rollover Completed Successfully!</h4>
            <p className="text-sm text-slate-500 max-w-sm">
              Promoted <strong className="text-slate-800">{selectedStudentIds.length} students</strong> to {getSectionLabel(targetSectionId)}.
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            {/* Step Wizard Bar */}
            <div className="grid grid-cols-3 gap-2 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/80 text-xs font-medium text-slate-600">
              <div className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all ${step === 1 ? 'bg-white text-indigo-700 font-bold shadow-sm border border-slate-200/60' : 'text-slate-500'}`}>
                <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
                Source Mapping
              </div>
              <div className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all ${step === 2 ? 'bg-white text-indigo-700 font-bold shadow-sm border border-slate-200/60' : 'text-slate-500'}`}>
                <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
                Destination
              </div>
              <div className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all ${step === 3 ? 'bg-white text-indigo-700 font-bold shadow-sm border border-slate-200/60' : 'text-slate-500'}`}>
                <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
                Preview & Run
              </div>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-slate-800">Select Source Class & Year</h4>
                
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-slate-700">Source Academic Year</Label>
                  <Select value={sourceYearId} onValueChange={setSourceYearId}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-slate-900 z-[100]">
                      {academicYears.map(ay => (
                        <SelectItem key={ay.id} value={ay.id}>{ay.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-slate-700">Source Grade / Class</Label>
                    <Select 
                      value={sourceClassId} 
                      onValueChange={(val) => {
                        setSourceClassId(val);
                        const matchedClass = classes.find(c => c.id === val);
                        if (matchedClass && matchedClass.sections?.length > 0) {
                          setSourceSectionId(matchedClass.sections[0].id);
                        }
                      }}
                    >
                      <SelectTrigger className="bg-white border-slate-200">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-slate-900 z-[100]">
                        <SelectItem value="all">All Classes</SelectItem>
                        {classes.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.grade || c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-slate-700">Source Section</Label>
                    <Select value={sourceSectionId} onValueChange={setSourceSectionId}>
                      <SelectTrigger className="bg-white border-slate-200">
                        <SelectValue placeholder="Select Section" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-slate-900 z-[100]">
                        {filteredSourceClasses.map(c => (
                          <div key={c.id}>
                            {sourceClassId === 'all' && (
                              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase bg-slate-50">
                                {c.grade || c.name}
                              </div>
                            )}
                            {(c.sections || []).map(sec => (
                              <SelectItem key={sec.id} value={sec.id} className="pl-3">
                                {c.grade || c.name} - Section {sec.name}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-indigo-50/80 p-3 rounded-xl border border-indigo-100 flex items-center justify-between text-xs text-indigo-900">
                  <span className="font-medium">Enrolled Students in Source Section:</span>
                  <Badge className="bg-indigo-600 text-white font-semibold">{sourceStudents.length} Students Available</Badge>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-slate-800">Select Destination Target Class & Year</h4>
                
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-slate-700">Destination Academic Year</Label>
                  <Select value={targetYearId} onValueChange={setTargetYearId}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-slate-900 z-[100]">
                      {academicYears.map(ay => (
                        <SelectItem key={ay.id} value={ay.id}>{ay.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-slate-700">Destination Grade / Class</Label>
                    <Select 
                      value={targetClassId} 
                      onValueChange={(val) => {
                        setTargetClassId(val);
                        const matchedClass = classes.find(c => c.id === val);
                        if (matchedClass && matchedClass.sections?.length > 0) {
                          setTargetSectionId(matchedClass.sections[0].id);
                        }
                      }}
                    >
                      <SelectTrigger className="bg-white border-slate-200">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-slate-900 z-[100]">
                        <SelectItem value="all">All Classes</SelectItem>
                        {classes.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.grade || c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-slate-700">Target Section</Label>
                    <Select value={targetSectionId} onValueChange={setTargetSectionId}>
                      <SelectTrigger className="bg-white border-slate-200">
                        <SelectValue placeholder="Select Section" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-slate-900 z-[100]">
                        {filteredTargetClasses.map(c => (
                          <div key={c.id}>
                            {targetClassId === 'all' && (
                              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase bg-slate-50">
                                {c.grade || c.name}
                              </div>
                            )}
                            {(c.sections || []).map(sec => (
                              <SelectItem key={sec.id} value={sec.id} className="pl-3">
                                {c.grade || c.name} - Section {sec.name}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {sourceSectionId === targetSectionId && sourceYearId === targetYearId && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>Target section is identical to source. Select the promoted grade for next year.</span>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-slate-800">Preview & Confirm Student List</h4>
                  <div className="flex items-center gap-2 text-xs">
                    <Button variant="ghost" size="sm" onClick={handleSelectAll} className="h-6 text-indigo-600">Select All</Button>
                    <Button variant="ghost" size="sm" onClick={handleClearAll} className="h-6 text-slate-500">Clear</Button>
                  </div>
                </div>

                <div className="max-h-52 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 bg-white">
                  {sourceStudents.length > 0 ? (
                    sourceStudents.map(student => (
                      <label key={student.id} className="p-2.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer text-xs">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedStudentIds.includes(student.id)}
                            onCheckedChange={() => toggleStudent(student.id)}
                          />
                          <span className="font-semibold text-slate-800">{student.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{student.enrollmentId || student.id}</span>
                      </label>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No students currently mapped in source section.
                    </div>
                  )}
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                  <span>Selected for Promotion:</span>
                  <span className="font-bold">{selectedStudentIds.length} Students</span>
                </div>
              </div>
            )}
          </div>
        )}

        {!isCompleted && (
          <DialogFooter className="border-t pt-3 flex justify-between items-center w-full">
            <div>
              {step > 1 && (
                <Button variant="outline" size="sm" onClick={() => setStep(step - 1)} className="border-slate-200 text-slate-600">
                  Back
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onClose} className="border-slate-200 text-slate-600">
                Cancel
              </Button>
              {step < 3 ? (
                <Button
                  size="sm"
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && !sourceSectionId}
                  className="gradient-indigo text-white gap-1"
                >
                  Next Step <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleExecute}
                  disabled={selectedStudentIds.length === 0 || !targetSectionId}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 shadow-md"
                >
                  <Sparkles className="h-4 w-4" /> Execute Rollover
                </Button>
              )}
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default StudentPromotionWizardModal;

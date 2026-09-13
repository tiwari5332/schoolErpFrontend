import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, UserPlus, CheckCircle2, Filter, Sparkles, AlertCircle } from "lucide-react";
import { ClassGroup, Teacher } from '../Constants';

interface Subject {
  id: string;
  name: string;
  code?: string;
  type?: string;
}

interface TeacherMappingTabProps {
  classes: ClassGroup[];
  teachers: Teacher[];
  subjects: Subject[];
  classSubjects: Record<string, string[]>;
  subjectMappings: Record<string, Record<string, string>>; // sectionId -> subjectId -> teacherId
  onSaveMapping: (sectionId: string, subjectId: string, teacherId: string) => void;
  onAssignClassTeacher?: (classGrpId: string, sectionId: string, teacherId: string) => void;
}

export function TeacherMappingTab({
  classes = [],
  teachers = [],
  subjects = [],
  classSubjects = {},
  subjectMappings = {},
  onSaveMapping,
  onAssignClassTeacher,
}: TeacherMappingTabProps) {
  const [targetSectionId, setTargetSectionId] = useState<string>('');
  const [showAllSubjects, setShowAllSubjects] = useState<boolean>(false);
  const [lastSavedSubjectId, setLastSavedSubjectId] = useState<string | null>(null);

  // Auto-select first available section if none is currently selected
  React.useEffect(() => {
    if (!targetSectionId && (classes || []).length > 0) {
      const firstWithSec = (classes || []).find(c => (c?.sections || []).length > 0);
      if (firstWithSec && (firstWithSec.sections || []).length > 0) {
        setTargetSectionId(firstWithSec.sections[0].id);
      }
    }
  }, [classes, targetSectionId]);

  const handleTeacherChange = (subjectId: string, teacherId: string) => {
    if (!targetSectionId) return;
    onSaveMapping(targetSectionId, subjectId, teacherId);

    // Show temporary feedback badge
    setLastSavedSubjectId(subjectId);
    setTimeout(() => {
      setLastSavedSubjectId(null);
    }, 2000);
  };

  // Determine target class & mapped subject IDs for selected section
  const selectedClass = (classes || []).find(c => (c.sections || []).some(s => s.id === targetSectionId));
  const selectedSection = (selectedClass?.sections || []).find(s => s.id === targetSectionId);
  const classGrpId = selectedClass?.id;
  const rawMappedSubjectIds = classGrpId ? ((classSubjects || {})[classGrpId] || []) : [];

  // Normalize mapped subject IDs (lowercase for matching resilience)
  const normalizedMappedIds = rawMappedSubjectIds.map(id => (id || '').toLowerCase());

  // Filter subjects available for this section
  const mappedSubjects = (subjects || []).filter(s => {
    const sId = (s.id || '').toLowerCase();
    const sName = (s.name || '').toLowerCase();
    return normalizedMappedIds.includes(sId) || normalizedMappedIds.includes(sName);
  });

  // If no mapped subjects exist for this class, fallback to showing all subjects
  const isFallback = mappedSubjects.length === 0;
  const displayedSubjects = (showAllSubjects || isFallback) ? (subjects || []) : mappedSubjects;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-600" />
          Subject Teacher Mapping & Class Teacher Assignment
        </h3>
        <p className="text-sm text-slate-500">Assign subject specialist teachers and designate class teachers for specific sections.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Select Class & Section */}
        <Card className="border-0 shadow-lg glass-card flex flex-col lg:col-span-1">
          <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-indigo-500" />
              Select Target Section
            </CardTitle>
            <div className="space-y-3">
              <Select value={targetSectionId} onValueChange={setTargetSectionId}>
                <SelectTrigger className="border-slate-200 focus:border-indigo-400 bg-white h-11">
                  <SelectValue placeholder="Choose Class & Section..." />
                </SelectTrigger>
                <SelectContent className="bg-white text-slate-900 z-[100]">
                  {(classes || []).map(classGrp => {
                    const gradeName = classGrp?.grade || classGrp?.name || (classGrp as any)?.className || (classGrp as any)?.gradeName || 'Class';
                    return (
                      <div key={classGrp?.id || gradeName}>
                        <div className="px-2 py-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 mt-1">
                          {gradeName}
                        </div>
                        {(classGrp?.sections || []).map(sec => (
                          <SelectItem key={sec?.id} value={sec?.id} className="pl-6">
                            {gradeName} - Section {sec?.name || sec?.id}
                          </SelectItem>
                        ))}
                      </div>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-slate-50/30 flex-1 flex flex-col items-center justify-center text-center">
            {targetSectionId ? (
              <div className="space-y-4 w-full">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-1 border border-emerald-200">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{selectedClass?.grade || ''} - Section {selectedSection?.name || ''}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {(displayedSubjects || []).length} Subject{(displayedSubjects || []).length !== 1 ? 's' : ''} available for assignment
                  </p>
                </div>

                {/* Class Teacher Picker */}
                {selectedClass && selectedSection && onAssignClassTeacher && (
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 text-left">
                    <span className="text-[11px] uppercase font-bold text-slate-400">Section Class Teacher</span>
                    <Select
                      value={selectedSection.classTeacherId || 'unassigned'}
                      onValueChange={(val) => onAssignClassTeacher(selectedClass.id, selectedSection.id, val)}
                    >
                      <SelectTrigger className="h-9 text-xs bg-slate-50 border-slate-200">
                        <SelectValue placeholder="Assign Class Teacher" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-slate-900 z-[100]">
                        <SelectItem value="unassigned" className="text-slate-400 italic">-- Unassigned --</SelectItem>
                        {(teachers || []).map(t => (
                          <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllSubjects(!showAllSubjects)}
                    className="text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50 gap-1.5"
                  >
                    <Filter className="h-3.5 w-3.5" />
                    {showAllSubjects ? "Show Mapped Only" : "Show All School Subjects"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-3 border border-indigo-100">
                  <UserPlus className="h-6 w-6 text-indigo-400" />
                </div>
                <p className="text-sm text-slate-500 font-medium">Select a section above</p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">Choose any class section from the dropdown menu to assign subject teachers.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Subject Mapping List */}
        <Card className="border-0 shadow-lg glass-card flex flex-col lg:col-span-2 min-h-[500px]">
          <CardHeader className="pb-4 border-b border-slate-100 bg-white rounded-t-xl flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-indigo-500" />
              Subject Teacher Assignments
            </CardTitle>

            {targetSectionId && isFallback && (
              <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Showing All Subjects (No specific curriculum mapped yet)</span>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="p-0">
            {targetSectionId ? (
              (displayedSubjects || []).length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {(displayedSubjects || []).map(subject => {
                    const currentTeacherId = subjectMappings[targetSectionId]?.[subject.id] || "unassigned";
                    const assignedTeacher = (teachers || []).find(t => t?.id === currentTeacherId);
                    const isJustSaved = lastSavedSubjectId === subject.id;

                    return (
                      <div
                        key={subject.id}
                        className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                          isJustSaved ? 'bg-emerald-50/70' : 'hover:bg-slate-50/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-xs border border-indigo-100 uppercase">
                            {subject.code ? subject.code.substring(0, 3) : subject.name.substring(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-slate-800 text-sm">{subject.name}</h4>
                              {isJustSaved && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full animate-fade-in">
                                  <Sparkles className="h-3 w-3" /> Saved
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500">
                              {subject.code || 'CODE101'} {subject.type ? `• ${subject.type}` : ''}
                            </p>
                          </div>
                        </div>

                        <div className="w-full sm:w-72 flex items-center gap-3">
                          {assignedTeacher && (
                            <Avatar className="h-8 w-8 hidden sm:block ring-2 ring-indigo-100">
                              <AvatarImage src={assignedTeacher.avatar} />
                              <AvatarFallback className="bg-indigo-600 text-white text-xs">
                                {(assignedTeacher?.name || 'T').charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <Select
                            value={currentTeacherId}
                            onValueChange={(val) => handleTeacherChange(subject.id, val)}
                          >
                            <SelectTrigger className={`flex-1 border-slate-200 focus:border-indigo-400 bg-white ${
                              currentTeacherId === 'unassigned' ? 'text-slate-400' : 'text-slate-800 font-medium'
                            }`}>
                              <SelectValue placeholder="Assign Teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unassigned" className="text-slate-400 italic">-- Unassigned --</SelectItem>
                              {(teachers || []).map(t => (
                                <SelectItem key={t.id} value={t.id}>
                                  {t.name} ({t.department || 'Staff'})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-10 text-center text-slate-400 h-full flex flex-col items-center justify-center min-h-[400px]">
                  <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                    <BookOpen className="h-8 w-8 text-slate-300" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-600 mb-1">No Subjects Configured</h4>
                  <p className="max-w-sm mx-auto text-sm text-slate-500">
                    Add subjects in the <strong>Subjects</strong> tab to begin mapping teachers.
                  </p>
                </div>
              )
            ) : (
              <div className="p-10 text-center text-slate-400 h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="h-16 w-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4 border border-indigo-100">
                  <BookOpen className="h-8 w-8 text-indigo-400" />
                </div>
                <h4 className="text-lg font-semibold text-slate-700 mb-1">No Section Selected</h4>
                <p className="max-w-xs mx-auto text-sm text-slate-500">Please select a class and section from the left panel to assign subject teachers.</p>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

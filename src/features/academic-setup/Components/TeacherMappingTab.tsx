import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, UserPlus, CheckCircle2 } from "lucide-react";
import { ClassGroup, Teacher } from '../Constants';

interface Subject {
  id: string;
  name: string;
}

interface TeacherMappingTabProps {
  classes: ClassGroup[];
  teachers: Teacher[];
  subjects: Subject[];
  classSubjects: Record<string, string[]>;
  subjectMappings: Record<string, Record<string, string>>; // sectionId -> subjectId -> teacherId
  onSaveMapping: (sectionId: string, subjectId: string, teacherId: string) => void;
}

export function TeacherMappingTab({ classes, teachers, subjects, classSubjects, subjectMappings, onSaveMapping }: TeacherMappingTabProps) {
  const [targetSectionId, setTargetSectionId] = useState<string>('');

  const handleTeacherChange = (subjectId: string, teacherId: string) => {
    if (!targetSectionId) return;
    onSaveMapping(targetSectionId, subjectId, teacherId);
  };

  // Determine available subjects based on the selected section's parent class
  const selectedClass = classes.find(c => c.sections.some(s => s.id === targetSectionId));
  const classGrpId = selectedClass?.id;
  const mappedSubjectIds = classGrpId ? (classSubjects[classGrpId] || []) : [];
  const availableSubjects = subjects.filter(s => mappedSubjectIds.includes(s.id));

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-slate-800">Subject Teacher Mapping</h3>
        <p className="text-sm text-slate-500">Assign specific teachers to teach subjects in a selected class section.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Select Class & Section */}
        <Card className="border-0 shadow-lg glass-card flex flex-col lg:col-span-1">
          <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-slate-500" />
              Select Target Section
            </CardTitle>
            <div className="space-y-3">
              <Select value={targetSectionId} onValueChange={setTargetSectionId}>
                <SelectTrigger className="border-slate-200 focus:border-indigo-400 bg-white h-11">
                  <SelectValue placeholder="Choose Class & Section..." />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(classGrp => (
                    <div key={classGrp.id}>
                      <div className="px-2 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 mt-1">
                        {classGrp.grade}
                      </div>
                      {classGrp.sections.map(sec => (
                        <SelectItem key={sec.id} value={sec.id} className="pl-6">
                          {classGrp.grade} - {sec.name}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-slate-50/30 flex-1 flex flex-col items-center justify-center text-center">
            {targetSectionId ? (
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-slate-800">Section Selected</h4>
                <p className="text-sm text-slate-500">You can now assign subject teachers in the right panel.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-3">
                  <UserPlus className="h-6 w-6 text-indigo-300" />
                </div>
                <p className="text-sm text-slate-400">Select a section above to begin mapping teachers.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Subject Mapping */}
        <Card className="border-0 shadow-lg glass-card flex flex-col lg:col-span-2 min-h-[500px]">
          <CardHeader className="pb-4 border-b border-slate-100 bg-white rounded-t-xl">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-slate-500" />
                Subject Assignments
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {targetSectionId ? (
              availableSubjects.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {availableSubjects.map(subject => {
                    const currentTeacherId = subjectMappings[targetSectionId]?.[subject.id] || "unassigned";
                    const assignedTeacher = teachers.find(t => t.id === currentTeacherId);

                    return (
                      <div key={subject.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-100">
                            {subject.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{subject.name}</h4>
                            <p className="text-xs text-slate-500">Subject Code: {subject.id}</p>
                          </div>
                        </div>

                        <div className="w-full sm:w-72 flex items-center gap-3">
                          {assignedTeacher && (
                            <Avatar className="h-8 w-8 hidden sm:block ring-2 ring-indigo-100">
                              <AvatarImage src={assignedTeacher.avatar} />
                              <AvatarFallback className="bg-indigo-600 text-white text-xs">{assignedTeacher.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <Select 
                            value={currentTeacherId} 
                            onValueChange={(val) => handleTeacherChange(subject.id, val)}
                          >
                            <SelectTrigger className={`flex-1 border-slate-200 focus:border-indigo-400 bg-white ${currentTeacherId === 'unassigned' ? 'text-slate-400' : 'text-slate-800 font-medium'}`}>
                              <SelectValue placeholder="Assign Teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unassigned" className="text-slate-400 italic">-- Unassigned --</SelectItem>
                              {teachers.map(t => (
                                <SelectItem key={t.id} value={t.id}>
                                  {t.name} ({t.department})
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
                  <div className="h-16 w-16 rounded-full bg-rose-50 flex items-center justify-center mb-4 border border-rose-100">
                    <BookOpen className="h-8 w-8 text-rose-300" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-600 mb-1">No Subjects Configured</h4>
                  <p className="max-w-sm mx-auto text-sm">There are no subjects mapped to <strong>{selectedClass?.grade}</strong> yet. Please go to the <strong>Subjects & Curriculum</strong> tab to map subjects to this class first.</p>
                </div>
              )
            ) : (
              <div className="p-10 text-center text-slate-400 h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                  <BookOpen className="h-8 w-8 text-slate-300" />
                </div>
                <h4 className="text-lg font-medium text-slate-600 mb-1">No Section Selected</h4>
                <p className="max-w-xs mx-auto">Please select a class and section from the left panel to map subject teachers.</p>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

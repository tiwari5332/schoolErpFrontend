import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, Plus, Trash2, LayoutTemplate, ArrowRight } from "lucide-react";
import { ClassGroup } from '../Constants';

export interface Subject {
  id: string;
  name: string;
  code: string;
  type: 'Core' | 'Elective' | 'Language' | 'Extracurricular';
}

interface SubjectsTabProps {
  subjects: Subject[];
  classes: ClassGroup[];
  classSubjects: Record<string, string[]>; // classGrpId -> array of subjectIds
  onAddSubject: (subject: Omit<Subject, 'id'>) => void;
  onDeleteSubject: (id: string) => void;
  onAssignSubjectsToClass: (classGrpId: string, subjectIds: string[]) => void;
}

export function SubjectsTab({ subjects, classes, classSubjects, onAddSubject, onDeleteSubject, onAssignSubjectsToClass }: SubjectsTabProps) {
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubType, setNewSubType] = useState<Subject['type']>('Core');
  
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  
  // Local state for checkboxes before saving
  const [draftClassSubjects, setDraftClassSubjects] = useState<string[]>([]);

  const handleAddSubmit = () => {
    if (newSubName && newSubCode) {
      onAddSubject({ name: newSubName, code: newSubCode, type: newSubType });
      setNewSubName('');
      setNewSubCode('');
      setNewSubType('Core');
    }
  };

  const handleClassSelect = (classId: string) => {
    setSelectedClassId(classId);
    setDraftClassSubjects(classSubjects[classId] || []);
  };

  const toggleSubjectDraft = (subjectId: string) => {
    setDraftClassSubjects(prev => 
      prev.includes(subjectId) ? prev.filter(id => id !== subjectId) : [...prev, subjectId]
    );
  };

  const handleSaveMapping = () => {
    if (selectedClassId) {
      onAssignSubjectsToClass(selectedClassId, draftClassSubjects);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Left Panel: Subject Master List */}
        <Card className="border-0 shadow-lg glass-card flex flex-col h-[600px]">
          <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              Subject Master List
            </CardTitle>
            <CardDescription>Manage the global list of subjects available across the school.</CardDescription>
          </CardHeader>
          
          <CardContent className="p-4 flex flex-col h-full gap-4">
            {/* Add Subject Form */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Create New Subject</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Subject Name</Label>
                  <Input 
                    placeholder="e.g. Mathematics" 
                    value={newSubName}
                    onChange={e => setNewSubName(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Subject Code</Label>
                  <Input 
                    placeholder="e.g. MAT101" 
                    value={newSubCode}
                    onChange={e => setNewSubCode(e.target.value)}
                    className="h-9 text-sm uppercase"
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <Label className="text-xs">Subject Type</Label>
                  <Select value={newSubType} onValueChange={(val: any) => setNewSubType(val)}>
                    <SelectTrigger className="h-9 text-sm bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Core">Core</SelectItem>
                      <SelectItem value="Elective">Elective</SelectItem>
                      <SelectItem value="Language">Language</SelectItem>
                      <SelectItem value="Extracurricular">Extracurricular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddSubmit} disabled={!newSubName || !newSubCode} className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white h-9">
                <Plus className="h-4 w-4 mr-2" /> Add Subject
              </Button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto border border-slate-100 rounded-xl bg-white">
              {subjects.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {subjects.map(sub => (
                    <div key={sub.id} className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-indigo-50 flex flex-col items-center justify-center text-indigo-700 border border-indigo-100">
                          <span className="text-[10px] font-bold uppercase leading-none">{sub.code.substring(0,3)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-slate-800">{sub.name}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{sub.code}</span>
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                              sub.type === 'Core' ? 'bg-blue-100 text-blue-700' :
                              sub.type === 'Elective' ? 'bg-amber-100 text-amber-700' :
                              sub.type === 'Language' ? 'bg-emerald-100 text-emerald-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {sub.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-rose-50 hover:text-rose-600" onClick={() => onDeleteSubject(sub.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center">
                  <BookOpen className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">No subjects created yet. Add one above.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel: Class Mapping */}
        <Card className="border-0 shadow-lg glass-card flex flex-col h-[600px]">
          <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-3">
              <LayoutTemplate className="h-5 w-5 text-emerald-500" />
              Class Curriculum Mapping
            </CardTitle>
            <div className="space-y-1">
              <Label className="text-xs text-slate-500">Select Grade/Class to configure its curriculum</Label>
              <Select value={selectedClassId} onValueChange={handleClassSelect}>
                <SelectTrigger className="border-slate-200 focus:border-emerald-400 bg-white">
                  <SelectValue placeholder="Select Class..." />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-full bg-slate-50/30">
            {selectedClassId ? (
              <div className="flex flex-col h-full p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-semibold text-slate-700">Assign Subjects</h4>
                  <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                    {draftClassSubjects.length} Selected
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
                  {subjects.length > 0 ? (
                    subjects.map(sub => (
                      <label key={sub.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer transition-colors group">
                        <Checkbox 
                          checked={draftClassSubjects.includes(sub.id)}
                          onCheckedChange={() => toggleSubjectDraft(sub.id)}
                          className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-800 group-hover:text-emerald-700 transition-colors">
                            {sub.name}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{sub.code} • {sub.type}</p>
                        </div>
                      </label>
                    ))
                  ) : (
                     <div className="p-6 text-center text-sm text-slate-400">
                       No subjects available to assign.
                     </div>
                  )}
                </div>

                <Button 
                  onClick={handleSaveMapping} 
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                >
                  Save Curriculum for {classes.find(c => c.id === selectedClassId)?.grade}
                </Button>
              </div>
            ) : (
              <div className="p-10 text-center text-slate-400 h-full flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <ArrowRight className="h-8 w-8 text-slate-300" />
                </div>
                <h4 className="text-lg font-medium text-slate-600 mb-1">No Class Selected</h4>
                <p className="max-w-xs mx-auto text-sm">Please select a class from the dropdown above to manage its subjects.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

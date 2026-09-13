import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List, Save, RotateCcw, Copy, Sparkles, Filter, CheckSquare, Layers } from "lucide-react";
import { ClassGroup, SetupSubject } from '../Constants';

interface SubjectMappingMatrixProps {
  classes: ClassGroup[];
  subjects: SetupSubject[];
  classSubjects: Record<string, string[]>; // classGrpId -> subjectIds[]
  onSaveClassSubjectsBatch: (updatedClassSubjects: Record<string, string[]>) => void;
  initialSectionId?: string;
  onNavigateBack?: () => void;
}

export function SubjectMappingMatrix({
  classes = [],
  subjects = [],
  classSubjects = {},
  onSaveClassSubjectsBatch,
  initialSectionId,
  onNavigateBack,
}: SubjectMappingMatrixProps) {
  const [viewMode, setViewMode] = useState<'matrix' | 'list'>('matrix');
  const [selectedGradeIdFilter, setSelectedGradeIdFilter] = useState<string>('all');
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState<string>('all');
  
  // Local state copy for batch edits
  const [draftClassSubjects, setDraftClassSubjects] = useState<Record<string, string[]>>({});
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [copySourceGradeId, setCopySourceGradeId] = useState<string>('');
  const [copyTargetGradeId, setCopyTargetGradeId] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  useEffect(() => {
    setDraftClassSubjects(classSubjects || {});
  }, [classSubjects]);

  const handleToggleCell = (classGrpId: string, subjectId: string) => {
    const currentList = draftClassSubjects[classGrpId] || [];
    const isMapped = currentList.includes(subjectId);
    const updatedList = isMapped
      ? currentList.filter(id => id !== subjectId)
      : [...currentList, subjectId];

    setDraftClassSubjects(prev => ({
      ...prev,
      [classGrpId]: updatedList
    }));
    setHasChanges(true);
  };

  const handleSelectAllCore = (classGrpId: string) => {
    const coreSubjectIds = subjects.filter(s => s.type === 'Core').map(s => s.id);
    const currentList = draftClassSubjects[classGrpId] || [];
    const combined = Array.from(new Set([...currentList, ...coreSubjectIds]));

    setDraftClassSubjects(prev => ({
      ...prev,
      [classGrpId]: combined
    }));
    setHasChanges(true);
  };

  const handleCopyMapping = () => {
    if (!copySourceGradeId || !copyTargetGradeId) return;
    const sourceSubjectIds = draftClassSubjects[copySourceGradeId] || [];

    setDraftClassSubjects(prev => ({
      ...prev,
      [copyTargetGradeId]: [...sourceSubjectIds]
    }));
    setHasChanges(true);
    setCopySourceGradeId('');
    setCopyTargetGradeId('');
  };

  const handleSaveChanges = () => {
    onSaveClassSubjectsBatch(draftClassSubjects);
    setHasChanges(false);
    setSaveSuccessMsg('Subject-Class matrix mappings saved successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleReset = () => {
    setDraftClassSubjects(classSubjects || {});
    setHasChanges(false);
  };

  // Filter classes & subjects
  const filteredClasses = classes.filter(c => {
    if (selectedGradeIdFilter !== 'all' && c.id !== selectedGradeIdFilter) return false;
    return true;
  });

  const filteredSubjects = subjects.filter(s => {
    if (selectedDepartmentFilter !== 'all' && s.departmentId !== selectedDepartmentFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 relative pb-20">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-800">Subject ↔ Class Curriculum Matrix</h3>
            {onNavigateBack && (
              <Button variant="ghost" size="sm" onClick={onNavigateBack} className="text-xs text-indigo-600">
                ← Back to List
              </Button>
            )}
          </div>
          <p className="text-xs text-slate-500">Map subjects to class grades in a unified grid view.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Grade filter */}
          <div className="w-40">
            <Select value={selectedGradeIdFilter} onValueChange={setSelectedGradeIdFilter}>
              <SelectTrigger className="h-9 text-xs bg-white">
                <SelectValue placeholder="All Grades" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900 z-[100]">
                <SelectItem value="all">All Grades</SelectItem>
                {classes.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* View toggle button */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <Button
              variant={viewMode === 'matrix' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('matrix')}
              className="h-7 text-xs px-2.5 gap-1"
            >
              <Grid className="h-3.5 w-3.5" /> Matrix
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-7 text-xs px-2.5 gap-1"
            >
              <List className="h-3.5 w-3.5" /> List
            </Button>
          </div>
        </div>
      </div>

      {/* Copy Mapping Helper Tool */}
      <Card className="border border-indigo-100 bg-indigo-50/50 p-3 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-indigo-900 font-semibold">
            <Copy className="h-4 w-4 text-indigo-600" />
            <span>Copy Curriculum Mapping:</span>
          </div>
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <Select value={copySourceGradeId} onValueChange={setCopySourceGradeId}>
              <SelectTrigger className="h-8 text-xs bg-white">
                <SelectValue placeholder="From Grade..." />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900 z-[100]">
                {classes.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span className="text-slate-400">→</span>

            <Select value={copyTargetGradeId} onValueChange={setCopyTargetGradeId}>
              <SelectTrigger className="h-8 text-xs bg-white">
                <SelectValue placeholder="To Grade..." />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900 z-[100]">
                {classes.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              size="sm"
              onClick={handleCopyMapping}
              disabled={!copySourceGradeId || !copyTargetGradeId || copySourceGradeId === copyTargetGradeId}
              className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white shrink-0"
            >
              Copy
            </Button>
          </div>
        </div>
      </Card>

      {/* MATRIX VIEW */}
      {viewMode === 'matrix' ? (
        <Card className="border-0 shadow-lg glass-card overflow-hidden">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200">
                  <th className="p-3 text-xs font-bold text-slate-700 sticky left-0 bg-slate-100 z-20 min-w-[220px] shadow-sm">
                    Subject Name & Code
                  </th>
                  {filteredClasses.map(c => (
                    <th key={c.id} className="p-3 text-center text-xs font-bold text-slate-700 min-w-[140px] border-l border-slate-200/60">
                      <div>{c.grade}</div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                        {draftClassSubjects[c.id]?.length || 0} Subjects
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectAllCore(c.id)}
                        className="h-5 text-[9px] px-1.5 text-indigo-600 hover:bg-indigo-50 mt-1"
                      >
                        + All Core
                      </Button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubjects.map(sub => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 sticky left-0 bg-white z-10 border-r border-slate-100 shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0 border border-indigo-100">
                          {sub.code ? sub.code.substring(0, 3) : sub.name.substring(0, 2)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{sub.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1 rounded">{sub.code}</span>
                            <Badge className="text-[9px] px-1 py-0 bg-blue-50 text-blue-700 border-blue-200">{sub.type}</Badge>
                          </div>
                        </div>
                      </div>
                    </td>

                    {filteredClasses.map(c => {
                      const isChecked = (draftClassSubjects[c.id] || []).includes(sub.id);
                      return (
                        <td key={c.id} className="p-3 text-center border-l border-slate-100">
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => handleToggleCell(c.id, sub.id)}
                            className="h-5 w-5 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 cursor-pointer"
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : (
        /* LIST VIEW */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map(c => {
            const currentSubIds = draftClassSubjects[c.id] || [];
            return (
              <Card key={c.id} className="border border-slate-200 shadow-sm p-4">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                  <h4 className="font-bold text-slate-800 text-sm">{c.grade}</h4>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    {currentSubIds.length} Mapped
                  </Badge>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {subjects.map(s => {
                    const isChecked = currentSubIds.includes(s.id);
                    return (
                      <label key={s.id} className="flex items-center justify-between p-1.5 hover:bg-slate-50 rounded cursor-pointer text-xs">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => handleToggleCell(c.id, s.id)}
                          />
                          <span className="font-medium text-slate-700">{s.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{s.code}</span>
                      </label>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Floating Save Banner */}
      {hasChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 animate-fade-in border border-slate-700">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>You have unsaved matrix mapping changes.</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={handleReset} className="h-8 text-xs text-slate-300 hover:text-white hover:bg-slate-800">
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
            </Button>
            <Button size="sm" onClick={handleSaveChanges} className="h-8 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold gap-1 shadow-md">
              <Save className="h-3.5 w-3.5" /> Save Changes
            </Button>
          </div>
        </div>
      )}

      {saveSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center animate-fade-in">
          ✅ {saveSuccessMsg}
        </div>
      )}
    </div>
  );
}

export default SubjectMappingMatrix;

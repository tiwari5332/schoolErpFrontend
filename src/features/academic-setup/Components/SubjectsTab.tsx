import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { BookOpen, Plus, Trash2, Edit2, Search, Grid, Save } from "lucide-react";
import { ClassGroup, Department, SetupSubject } from '../Constants';

interface SubjectsTabProps {
  subjects: SetupSubject[];
  classes: ClassGroup[];
  departments?: Department[];
  classSubjects: Record<string, string[]>;
  onAddSubject: (subject: Omit<SetupSubject, 'id'>) => void;
  onUpdateSubject?: (id: string, updates: Partial<SetupSubject>) => void;
  onDeleteSubject: (id: string) => void;
  onAssignSubjectsToClass: (classGrpId: string, subjectIds: string[]) => void;
  onOpenMatrixView?: () => void;
}

export function SubjectsTab({
  subjects = [],
  classes = [],
  departments = [],
  classSubjects = {},
  onAddSubject,
  onUpdateSubject,
  onDeleteSubject,
  onAssignSubjectsToClass,
  onOpenMatrixView,
}: SubjectsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SetupSubject | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const openAddModal = () => {
    setEditingSubject(null);
    setName('');
    setCode('');
    setIsModalOpen(true);
  };

  const openEditModal = (sub: SetupSubject) => {
    setEditingSubject(sub);
    setName(sub.name);
    setCode(sub.code);
    setIsModalOpen(true);
  };

  const handleSaveModal = () => {
    if (!name || !code) return;

    const payload = {
      name,
      code: code.toUpperCase(),
    };

    if (editingSubject && onUpdateSubject) {
      onUpdateSubject(editingSubject.id, payload);
    } else {
      onAddSubject(payload);
    }
    setIsModalOpen(false);
  };

  // Filter subjects
  const filteredSubjects = (subjects || []).filter(sub => {
    return sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.code.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getMappedClassesCount = (subjectId: string) => {
    return Object.values(classSubjects || {}).filter(list => (list || []).includes(subjectId)).length;
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Subject Master Catalog</h3>
          <p className="text-sm text-slate-500">Manage school-wide subjects and grade allocations.</p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenMatrixView && (
            <Button
              variant="outline"
              onClick={onOpenMatrixView}
              className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 gap-1.5"
            >
              <Grid className="h-4 w-4" /> Open Subject-Class Matrix
            </Button>
          )}
          <Button onClick={openAddModal} className="gradient-indigo text-white shadow-colored-indigo">
            <Plus className="h-4 w-4 mr-2" /> Add Subject
          </Button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search subject by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 border-slate-200"
          />
        </div>
      </div>

      {/* Subject List Table */}
      <Card className="border-0 shadow-lg glass-card overflow-hidden">
        <CardContent className="p-0">
          {filteredSubjects.length > 0 ? (
            <div className="divide-y divide-slate-100 overflow-x-auto">
              {filteredSubjects.map(sub => {
                const mappedCount = getMappedClassesCount(sub.id);
                return (
                  <div key={sub.id} className="p-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors gap-4">
                    <div className="flex items-center gap-3 min-w-[240px]">
                      <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-xs border border-indigo-100 uppercase shrink-0">
                        {sub.code ? sub.code.substring(0, 3) : sub.name.substring(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">{sub.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{sub.code}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="hidden lg:flex flex-col text-right">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Curriculum</span>
                        <span className="font-medium text-slate-700">{mappedCount} Grades Mapped</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {onOpenMatrixView && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={onOpenMatrixView}
                          className="h-8 text-xs text-indigo-600 hover:bg-indigo-50"
                        >
                          Map to Classes
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600" onClick={() => openEditModal(sub)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-rose-50" onClick={() => onDeleteSubject(sub.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center">
              <BookOpen className="h-10 w-10 mb-3 opacity-40 text-indigo-400" />
              <h4 className="text-base font-semibold text-slate-700 mb-1">No Subjects Found</h4>
              <p className="text-xs text-slate-500 max-w-xs mb-4">
                {searchTerm ? `No subjects matched search query "${searchTerm}".` : 'Create your subject master list to begin building class curriculums.'}
              </p>
              <Button onClick={openAddModal} className="gradient-indigo text-white text-xs">
                <Plus className="h-4 w-4 mr-1.5" /> Add New Subject
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add / Edit Subject Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[480px] bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              {editingSubject ? 'Edit Subject' : 'Add New Subject'}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Configure subject name and code.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Subject Name *</Label>
                <Input
                  placeholder="e.g. Mathematics"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-slate-200"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Subject Code *</Label>
                <Input
                  placeholder="e.g. MAT101"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="border-slate-200 uppercase"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="border-t pt-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-slate-200 text-slate-600">
              Cancel
            </Button>
            <Button onClick={handleSaveModal} disabled={!name || !code} className="gradient-indigo text-white gap-1.5">
              <Save className="h-4 w-4" /> {editingSubject ? 'Save Changes' : 'Create Subject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SubjectsTab;


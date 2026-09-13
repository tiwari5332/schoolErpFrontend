import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, LayoutTemplate, Users, BookOpen, Crown } from "lucide-react";
import { Department, ClassGroup, SetupTeacher, SetupSubject } from '../Constants';

interface DepartmentDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  department: Department | null;
  classes?: ClassGroup[];
  teachers?: SetupTeacher[];
  subjects?: SetupSubject[];
}

export function DepartmentDetailDrawer({
  isOpen,
  onClose,
  department,
  classes = [],
  teachers = [],
  subjects = [],
}: DepartmentDetailDrawerProps) {
  if (!department) return null;

  const hodTeacher = teachers.find(
    t => t.id === department.hodTeacherId || t.id === department.hodId
  );

  const linkedGrades = classes.filter(c => c.departmentId === department.id);
  const linkedTeachers = teachers.filter(
    t => t.department === department.name || department.teacherIds?.includes(t.id)
  );
  const linkedSubjects = subjects.filter(s => s.departmentId === department.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white border border-slate-200 shadow-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0"
              style={{ backgroundColor: department.color || '#4F46E5' }}
            >
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-xl font-bold text-slate-800">{department.name}</DialogTitle>
                <Badge className={department.status === 'Inactive' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-700'}>
                  {department.status || 'Active'}
                </Badge>
              </div>
              <DialogDescription className="text-sm text-slate-500 mt-1">
                {department.description || 'Department details and associated rollup stats.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* HOD Banner */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 ring-2 ring-indigo-200">
                <AvatarImage src={hodTeacher?.avatar} />
                <AvatarFallback className="bg-indigo-600 text-white font-bold">
                  {hodTeacher ? hodTeacher.name.charAt(0) : 'H'}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Crown className="h-3.5 w-3.5 text-amber-500" /> Head of Department (HOD)
                </span>
                <h4 className="text-base font-bold text-slate-800">{hodTeacher ? hodTeacher.name : 'Unassigned'}</h4>
                <p className="text-xs text-slate-500">{hodTeacher?.email || 'No contact specified'}</p>
              </div>
            </div>
            <Badge variant="outline" className="border-indigo-200 text-indigo-700 bg-indigo-50">
              Department Lead
            </Badge>
          </div>

          {/* Rollup Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-center">
              <span className="text-2xl font-bold text-blue-700">{linkedGrades.length}</span>
              <p className="text-xs text-blue-600 font-medium mt-0.5">Linked Grades</p>
            </div>
            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-center">
              <span className="text-2xl font-bold text-emerald-700">{linkedTeachers.length}</span>
              <p className="text-xs text-emerald-600 font-medium mt-0.5">Faculty Staff</p>
            </div>
            <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-xl text-center">
              <span className="text-2xl font-bold text-purple-700">{linkedSubjects.length}</span>
              <p className="text-xs text-purple-600 font-medium mt-0.5">Offered Subjects</p>
            </div>
          </div>

          {/* Linked Grades List */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <LayoutTemplate className="h-4 w-4 text-indigo-500" />
              Associated Grades ({linkedGrades.length})
            </h4>
            {linkedGrades.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {linkedGrades.map(c => (
                  <Badge key={c.id} className="bg-slate-100 text-slate-800 border border-slate-200 py-1 px-3">
                    {c.grade} ({c.sections?.length || 0} Sections)
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No grades currently tagged under this department.</p>
            )}
          </div>

          {/* Linked Teachers List */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-500" />
              Department Faculty Teachers ({linkedTeachers.length})
            </h4>
            {linkedTeachers.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {linkedTeachers.map(t => (
                  <div key={t.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2 text-xs">
                    <Avatar className="h-7 w-7 shrink-0">
                      <AvatarFallback className="bg-emerald-600 text-white text-[10px]">
                        {t.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="truncate">
                      <p className="font-semibold text-slate-800 truncate">{t.name}</p>
                      <p className="text-[10px] text-slate-400">{t.subjectSpecialty || 'Faculty'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No teachers assigned to this department yet.</p>
            )}
          </div>

          {/* Linked Subjects List */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-500" />
              Department Subjects ({linkedSubjects.length})
            </h4>
            {linkedSubjects.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {linkedSubjects.map(s => (
                  <Badge key={s.id} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 py-1">
                    {s.name} ({s.code})
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No subjects registered under this department.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DepartmentDetailDrawer;

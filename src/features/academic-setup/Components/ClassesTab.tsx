import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, LayoutTemplate, Users, Edit2, Trash2, Layers, UserCheck, BookOpen, Clock, Search, Filter, X, UserPlus } from "lucide-react";
import { ClassGroup, SetupTeacher, Section, Department } from '../Constants';

interface ClassesTabProps {
  classes: ClassGroup[];
  teachers: SetupTeacher[];
  departments?: Department[];
  classSubjects?: Record<string, string[]>;
  onAddGrade: () => void;
  onEditGrade?: (classGrp: ClassGroup) => void;
  onDeleteGrade?: (classGrpId: string) => void;
  onAddSection: (classGrpId: string) => void;
  onEditSection: (classGrpId: string, section: Section) => void;
  onDeleteSection?: (classGrpId: string, sectionId: string) => void;
  onOpenBulkSectionModal?: (classGrpId?: string) => void;
  onOpenPromotionWizard?: () => void;
  onOpenSubjectMatrixForSection?: (classGrpId: string, sectionId: string) => void;
  onAssignClassTeacherInline?: (classGrpId: string, sectionId: string, teacherId: string) => void;
}

export function ClassesTab({ 
  classes = [], 
  teachers = [],
  departments = [],
  classSubjects = {},
  onAddGrade, 
  onEditGrade,
  onDeleteGrade,
  onAddSection, 
  onEditSection,
  onDeleteSection,
  onOpenBulkSectionModal,
  onOpenPromotionWizard,
  onOpenSubjectMatrixForSection,
  onAssignClassTeacherInline,
}: ClassesTabProps) {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('all');
  const [selectedStream, setSelectedStream] = useState<string>('all');

  const getTeacher = (id?: string | null) => {
    if (!id) return null;
    return (teachers || []).find(t => t.id === id) || null;
  };

  const getDepartmentName = (deptId?: string | null) => {
    if (!deptId) return null;
    return (departments || []).find(d => d.id === deptId)?.name || null;
  };

  // Filter Classes by Search Query, Department, and Stream
  const filteredClasses = (classes || []).filter(c => {
    const gradeName = (c.grade || c.name || '').toLowerCase();
    const matchesSearch = gradeName.includes(searchQuery.toLowerCase()) ||
      (c.sections || []).some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDept = selectedDeptId === 'all' || c.departmentId === selectedDeptId;
    const matchesStream = selectedStream === 'all' || c.stream === selectedStream;

    return matchesSearch && matchesDept && matchesStream;
  });

  const isFilterActive = searchQuery !== '' || selectedDeptId !== 'all' || selectedStream !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDeptId('all');
    setSelectedStream('all');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Class & Section Hierarchy</h3>
          <p className="text-sm text-slate-500">Configure top-level grade structures, section cohorts, and class teachers.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {onOpenPromotionWizard && (
            <Button 
              variant="outline"
              onClick={onOpenPromotionWizard}
              className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 gap-1.5"
            >
              <UserCheck className="h-4 w-4 text-indigo-600" />
              Promote Students
            </Button>
          )}

          {onOpenBulkSectionModal && (
            <Button
              variant="outline"
              onClick={() => onOpenBulkSectionModal()}
              className="border-cyan-200 text-cyan-700 hover:bg-cyan-50 gap-1.5"
            >
              <Layers className="h-4 w-4 text-cyan-600" />
              Bulk Add Sections
            </Button>
          )}

          <Button 
            onClick={onAddGrade}
            className="gradient-cyan text-white shadow-colored-cyan hover:scale-[1.02] transition-transform"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Grade
          </Button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by grade or section name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-slate-200 h-9 text-xs focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mr-1 hidden lg:flex">
            <Filter className="h-3.5 w-3.5 text-slate-400" /> Filters:
          </div>

          {/* Department Filter */}
          <Select value={selectedDeptId} onValueChange={setSelectedDeptId}>
            <SelectTrigger className="h-9 w-[150px] bg-white border-slate-200 text-xs text-slate-700">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent className="bg-white text-slate-900 z-[100]">
              <SelectItem value="all" className="text-xs">All Departments</SelectItem>
              {departments.map(d => (
                <SelectItem key={d.id} value={d.id} className="text-xs">{d.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Stream Filter */}
          <Select value={selectedStream} onValueChange={setSelectedStream}>
            <SelectTrigger className="h-9 w-[130px] bg-white border-slate-200 text-xs text-slate-700">
              <SelectValue placeholder="Stream" />
            </SelectTrigger>
            <SelectContent className="bg-white text-slate-900 z-[100]">
              <SelectItem value="all" className="text-xs">All Streams</SelectItem>
              <SelectItem value="General" className="text-xs">General</SelectItem>
              <SelectItem value="Science" className="text-xs">Science</SelectItem>
              <SelectItem value="Commerce" className="text-xs">Commerce</SelectItem>
              <SelectItem value="Arts" className="text-xs">Arts</SelectItem>
            </SelectContent>
          </Select>

          {isFilterActive && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-9 px-2 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
            >
              <X className="h-3.5 w-3.5 mr-1" /> Reset
            </Button>
          )}
        </div>
      </div>

      {filteredClasses.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <LayoutTemplate className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-slate-700">No Grades Found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {isFilterActive ? 'Try adjusting your search query or filter chips.' : 'Get started by creating your first Grade.'}
          </p>
          {isFilterActive && (
            <Button variant="outline" size="sm" onClick={resetFilters} className="mt-4 text-xs">
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <Accordion type="multiple" defaultValue={filteredClasses.map(c => c.id)} className="space-y-4">
          {filteredClasses.map(classGrp => {
            const sectionsList = classGrp.sections || [];
            const totalStudents = sectionsList.reduce((acc, sec) => acc + (sec.studentIds?.length || 0), 0);
            const deptName = getDepartmentName(classGrp.departmentId);
            const mappedSubjectsCount = (classSubjects[classGrp.id] || []).length;

            return (
              <AccordionItem key={classGrp.id} value={classGrp.id} className="border-0 shadow-sm rounded-xl overflow-hidden glass-card">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50 transition-colors data-[state=open]:bg-slate-50 data-[state=open]:border-b border-slate-100">
                  <div className="flex items-center justify-between w-full text-left pr-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-cyan-100 text-cyan-600 rounded-xl shrink-0 font-bold text-xs flex items-center justify-center">
                        <LayoutTemplate className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Visible Grade Name Title */}
                          <h4 className="text-xl font-bold text-slate-800">{classGrp.grade || classGrp.name || `Class ${classGrp.id}`}</h4>
                          
                          {/* Department Badge */}
                          {deptName && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] font-semibold">
                              {deptName}
                            </Badge>
                          )}

                          {/* Stream Badge */}
                          {classGrp.stream && classGrp.stream !== 'General' && (
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-[10px]">
                              {classGrp.stream}
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-slate-500 font-normal mt-1 flex items-center gap-2 flex-wrap">
                          <span>{sectionsList.length} Sections</span>
                          <span>•</span>
                          <span>{totalStudents} Total Students</span>
                          <span>•</span>
                          <span className="font-semibold text-cyan-700">{mappedSubjectsCount} Subjects Mapped</span>
                        </p>
                      </div>
                    </div>

                    {/* Actions on Grade Header */}
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      {onEditGrade && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditGrade(classGrp)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50"
                          title="Edit Grade Properties"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                      {onDeleteGrade && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteGrade(classGrp.id)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          title="Delete Grade"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="bg-white/50 p-6 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sectionsList.map(section => {
                      const studentCount = section.studentIds?.length || 0;
                      const capacity = section.capacity || 30;
                      const assignedTeacher = getTeacher(section.classTeacherId);

                      return (
                        <Card key={section.id} className="border border-slate-200 shadow-sm hover:border-cyan-300 hover:shadow-md transition-all group flex flex-col justify-between">
                          <div>
                            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                              <CardTitle className="text-lg font-bold text-slate-800">
                                Section {section.name}
                              </CardTitle>
                              
                              {/* Capacity Ratio */}
                              <Badge variant="outline" className={`text-xs font-semibold ${
                                studentCount >= capacity ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-50 text-slate-700 border-slate-200'
                              }`}>
                                <Users className="h-3 w-3 mr-1" />
                                {studentCount} / {capacity}
                              </Badge>
                            </CardHeader>
                            
                            <CardContent className="p-4 pt-2 space-y-3">
                              {/* Class Teacher + Inline Assign Dropdown */}
                              <div className="flex items-center gap-2.5 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                <Avatar className="h-7 w-7 shrink-0 ring-1 ring-slate-200">
                                  <AvatarImage src={assignedTeacher?.avatar} />
                                  <AvatarFallback className="bg-indigo-600 text-white font-bold text-[10px]">
                                    {assignedTeacher ? assignedTeacher.name.charAt(0) : 'T'}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] uppercase font-bold text-slate-400 leading-tight">Class Teacher</p>
                                  {onAssignClassTeacherInline ? (
                                    <Select
                                      value={section.classTeacherId || 'unassigned'}
                                      onValueChange={(tId) => onAssignClassTeacherInline(classGrp.id, section.id, tId)}
                                    >
                                      <SelectTrigger className="border-0 shadow-none p-0 h-auto font-semibold text-slate-700 text-xs focus:ring-0 bg-transparent hover:text-indigo-600">
                                        <SelectValue placeholder="Assign Teacher" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-white text-slate-900 z-[100]">
                                        <SelectItem value="unassigned" className="text-xs font-medium text-slate-500">
                                          -- Unassigned --
                                        </SelectItem>
                                        {teachers.map(t => (
                                          <SelectItem key={t.id} value={t.id} className="text-xs font-medium">
                                            {t.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <p className="font-semibold text-slate-700 truncate">{assignedTeacher ? assignedTeacher.name : 'Unassigned'}</p>
                                  )}
                                </div>
                              </div>

                              {/* Subjects Mapped Shortcut Link */}
                              {onOpenSubjectMatrixForSection && (
                                <button
                                  type="button"
                                  onClick={() => onOpenSubjectMatrixForSection(classGrp.id, section.id)}
                                  className="w-full text-left text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center justify-between p-2 bg-indigo-50/50 hover:bg-indigo-50 rounded-md border border-indigo-100 transition-colors"
                                >
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
                                    {mappedSubjectsCount} Subjects Mapped
                                  </span>
                                  <span>→</span>
                                </button>
                              )}
                            </CardContent>
                          </div>

                          <CardContent className="p-4 pt-0">
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => onEditSection(classGrp.id, section)}
                                className="flex-1 text-xs h-8 hover:bg-cyan-50 hover:text-cyan-600 border-slate-200"
                              >
                                <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
                              </Button>
                              {onDeleteSection && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onDeleteSection(classGrp.id, section.id)}
                                  className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}

                    {/* Add Section Card */}
                    <div 
                      onClick={() => onAddSection(classGrp.id)}
                      className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:text-cyan-600 hover:border-cyan-300 hover:bg-cyan-50/50 cursor-pointer transition-all min-h-[160px]"
                    >
                      <Plus className="h-6 w-6 mb-2" />
                      <span className="text-sm font-semibold">Add Section</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}

export default ClassesTab;

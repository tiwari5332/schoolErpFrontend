import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, UserPlus, Users, X } from "lucide-react";
import { ClassGroup, SetupStudent } from '../Constants';

interface StudentMappingTabProps {
  students: SetupStudent[];
  classes: ClassGroup[];
  onAssignStudents: (studentIds: string[], sectionId: string) => void;
  onUnassignStudents: (studentIds: string[], sectionId: string) => void;
}

export function StudentMappingTab({ students, classes, onAssignStudents, onUnassignStudents }: StudentMappingTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [selectedAssignedStudentIds, setSelectedAssignedStudentIds] = useState<string[]>([]);
  const [targetSectionId, setTargetSectionId] = useState<string>('');

  // Get only unassigned students for the left panel
  const unassignedStudents = useMemo(() => {
    return students.filter(s => !s.isMapped && s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [students, searchQuery]);

  const toggleStudentSelection = (id: string) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedStudentIds.length === unassignedStudents.length) {
      setSelectedStudentIds([]); // Deselect all
    } else {
      setSelectedStudentIds(unassignedStudents.map(s => s.id));
    }
  };

  const handleAssign = () => {
    if (selectedStudentIds.length === 0 || !targetSectionId) return;
    onAssignStudents(selectedStudentIds, targetSectionId);
    setSelectedStudentIds([]); // Clear selection after mapping
  };

  const toggleAssignedStudentSelection = (id: string) => {
    setSelectedAssignedStudentIds(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const handleUnassign = () => {
    if (selectedAssignedStudentIds.length === 0 || !targetSectionId) return;
    onUnassignStudents(selectedAssignedStudentIds, targetSectionId);
    setSelectedAssignedStudentIds([]); // Clear selection after unmapping
  };

  // Reset selected assigned students when changing target section
  const handleTargetSectionChange = (val: string) => {
    setTargetSectionId(val);
    setSelectedAssignedStudentIds([]);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-slate-800">Bulk Student Mapping</h3>
        <p className="text-sm text-slate-500">Quickly assign newly enrolled students to their respective classes and sections.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-start">
        
        {/* Left Column: Unassigned Students */}
        <Card className="border-0 shadow-lg glass-card flex flex-col h-[600px]">
          <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
            <div className="flex justify-between items-center mb-3">
              <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-500" />
                Unassigned Pool
              </CardTitle>
              <div className="bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded-md">
                {unassignedStudents.length} Found
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search by name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-slate-200 focus:border-indigo-400 bg-white"
              />
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex-1 overflow-y-auto">
            {unassignedStudents.length > 0 ? (
              <>
                <div className="p-3 border-b border-slate-100 bg-white sticky top-0 z-10 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                    <Checkbox 
                      checked={unassignedStudents.length > 0 && selectedStudentIds.length === unassignedStudents.length}
                      onCheckedChange={selectAll}
                    />
                    Select All
                  </label>
                  {selectedStudentIds.length > 0 && (
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                      {selectedStudentIds.length} Selected
                    </span>
                  )}
                </div>
                <div className="divide-y divide-slate-100">
                  {unassignedStudents.map(student => (
                    <label key={student.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer transition-colors group">
                      <Checkbox 
                        checked={selectedStudentIds.includes(student.id)}
                        onCheckedChange={() => toggleStudentSelection(student.id)}
                        className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-700 transition-colors">{student.name}</p>
                        <p className="text-xs text-slate-400">{student.enrollmentId}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-10 text-center text-slate-400 flex flex-col items-center justify-center h-full">
                <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                  <CheckCircle className="h-6 w-6 text-emerald-400" />
                </div>
                <p>All students have been assigned!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Middle Action */}
        <div className="hidden lg:flex flex-col items-center justify-center h-[600px] gap-6">
          <div className="flex flex-col items-center gap-2">
            <Button 
              size="lg" 
              className="rounded-full h-14 w-14 p-0 shadow-lg shadow-indigo-500/20 gradient-indigo text-white disabled:opacity-50 hover:scale-105 transition-all"
              disabled={selectedStudentIds.length === 0 || !targetSectionId}
              onClick={handleAssign}
              title="Assign to Section"
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
            {selectedStudentIds.length > 0 && targetSectionId && (
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full animate-pulse-slow">
                Move {selectedStudentIds.length}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-full h-14 w-14 p-0 shadow-lg border-2 border-rose-200 text-rose-600 disabled:opacity-50 hover:scale-105 hover:bg-rose-50 hover:border-rose-300 transition-all"
              disabled={selectedAssignedStudentIds.length === 0 || !targetSectionId}
              onClick={handleUnassign}
              title="Unassign from Section"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            {selectedAssignedStudentIds.length > 0 && targetSectionId && (
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full animate-pulse-slow">
                Remove {selectedAssignedStudentIds.length}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Target Class */}
        <Card className="border-0 shadow-lg glass-card flex flex-col h-[600px]">
          <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-3">
              <UserPlus className="h-4 w-4 text-slate-500" />
              Target Class & Section
            </CardTitle>
            <div className="space-y-3">
              <Select value={targetSectionId} onValueChange={handleTargetSectionChange}>
                <SelectTrigger className="border-slate-200 focus:border-indigo-400 bg-white h-11">
                  <SelectValue placeholder="Select Destination Section..." />
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
          
          <CardContent className="p-0 flex-1 overflow-y-auto bg-slate-50/30">
            {targetSectionId ? (() => {
              // Find the selected section to show its current roster
              let selectedSection = null;
              for (const c of classes) {
                const s = c.sections.find(sec => sec.id === targetSectionId);
                if (s) {
                  selectedSection = s;
                  break;
                }
              }

              if (!selectedSection) return null;

              return (
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-semibold text-slate-700">Current Roster</h4>
                    <span className="text-xs font-medium bg-white px-2 py-1 rounded border border-slate-200">
                      {selectedSection.studentIds.length} Students
                    </span>
                  </div>
                  
                  {selectedSection.studentIds.length > 0 ? (
                    <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden bg-white shadow-sm">
                      <div className="p-2 bg-slate-50 flex items-center justify-between border-b border-slate-100">
                         <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                           <Checkbox 
                             checked={selectedAssignedStudentIds.length === selectedSection.studentIds.length}
                             onCheckedChange={(checked) => {
                               if (checked) setSelectedAssignedStudentIds(selectedSection!.studentIds);
                               else setSelectedAssignedStudentIds([]);
                             }}
                           />
                           Select All
                         </label>
                      </div>
                      {selectedSection.studentIds.map(sId => {
                        // Find student name from original array
                        const studentInfo = students.find(s => s.id === sId);
                        return (
                          <label key={sId} className="p-3 flex items-center gap-3 text-sm cursor-pointer hover:bg-slate-50 transition-colors">
                            <Checkbox 
                              checked={selectedAssignedStudentIds.includes(sId)}
                              onCheckedChange={() => toggleAssignedStudentSelection(sId)}
                              className="data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
                            />
                            <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs border border-indigo-200">
                              {studentInfo?.name.charAt(0) || '?'}
                            </div>
                            <span className="font-medium text-slate-700">{studentInfo?.name || sId}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-white">
                      Section is currently empty.
                    </div>
                  )}
                </div>
              );
            })() : (
              <div className="p-10 text-center text-slate-400 h-full flex flex-col items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <LayoutTemplate className="h-6 w-6 text-slate-300" />
                </div>
                <p>Select a destination section from the dropdown above to view its roster.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mobile Action Button */}
        <div className="lg:hidden flex flex-col gap-3">
          <Button 
            className="w-full h-12 gradient-indigo text-white shadow-colored-indigo"
            disabled={selectedStudentIds.length === 0 || !targetSectionId}
            onClick={handleAssign}
          >
            Assign {selectedStudentIds.length} Students
          </Button>
          <Button 
            variant="outline"
            className="w-full h-12 border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100"
            disabled={selectedAssignedStudentIds.length === 0 || !targetSectionId}
            onClick={handleUnassign}
          >
            Unassign {selectedAssignedStudentIds.length} Students
          </Button>
        </div>

      </div>
    </div>
  );
}

// Needed icons that weren't imported initially to fix compilation if any
import { CheckCircle, LayoutTemplate, ArrowLeft } from 'lucide-react';

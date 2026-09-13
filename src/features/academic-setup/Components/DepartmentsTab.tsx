import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Building2, Plus, Users, Crown, Edit2, Trash2, Search, Eye, LayoutTemplate } from "lucide-react";
import { Department, SetupTeacher, ClassGroup, SetupStudent } from '../Constants';

interface DepartmentsTabProps {
  departments: Department[];
  teachers: SetupTeacher[];
  classes?: ClassGroup[];
  students?: SetupStudent[];
  onAddDepartment: () => void;
  onEditDepartment: (dept: Department) => void;
  onDeleteDepartment: (deptId: string) => void;
  onViewDepartment?: (dept: Department) => void;
  onToggleStatus?: (deptId: string, newStatus: 'Active' | 'Inactive') => void;
}

export function DepartmentsTab({ 
  departments = [], 
  teachers = [],
  classes = [],
  students = [],
  onAddDepartment, 
  onEditDepartment, 
  onDeleteDepartment,
  onViewDepartment,
  onToggleStatus,
}: DepartmentsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getTeacherName = (id: string | null) => {
    if (!id) return 'Unassigned';
    return (teachers || []).find(t => t.id === id)?.name || 'Unknown';
  };

  const filteredDepartments = (departments || []).filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dept.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Faculty Departments</h3>
          <p className="text-sm text-slate-500">Manage academic faculties, HOD assignments, and linked resources.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search departments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 border-slate-200 bg-white"
            />
          </div>
          <Button 
            onClick={onAddDepartment}
            className="gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-transform shrink-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Department
          </Button>
        </div>
      </div>

      {/* Grid */}
      {filteredDepartments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map(dept => {
            const linkedGradesCount = classes.filter(c => c.departmentId === dept.id).length;
            const teacherCount = teachers.filter(t => t.department === dept.name || dept.teacherIds?.includes(t.id)).length;
            const isActive = dept.status !== 'Inactive';

            return (
              <Card key={dept.id} className="border-0 shadow-lg glass-card group hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                {/* Top Accent Line */}
                <div 
                  className="absolute top-0 left-0 w-full h-1.5 transition-colors"
                  style={{ backgroundColor: dept.color || '#6366F1' }}
                />

                <CardHeader className="pb-3 pt-5">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div 
                        className="p-3 text-white rounded-xl shadow-md shrink-0"
                        style={{ backgroundColor: dept.color || '#6366F1' }}
                      >
                        <Building2 className="h-6 w-6" />
                      </div>
                      <Badge 
                        onClick={() => onToggleStatus && onToggleStatus(dept.id, isActive ? 'Inactive' : 'Active')}
                        className={`cursor-pointer transition-colors ${
                          isActive 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                      {onViewDepartment && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onViewDepartment(dept)}
                          className="h-8 w-8 p-0 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                          title="View Linked Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onEditDepartment(dept)}
                        className="h-8 w-8 p-0 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                        title="Edit Department"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onDeleteDepartment(dept.id)}
                        className="h-8 w-8 p-0 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        title="Delete Department"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardTitle className="text-xl font-bold text-slate-800 mt-2">{dept.name}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1 h-10 text-xs text-slate-500">
                    {dept.description || 'No description provided.'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-2">
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    {/* HOD */}
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                        <Crown className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Head of Department</p>
                        <p className="text-xs font-semibold text-slate-700">{getTeacherName(dept.hodTeacherId || dept.hodId)}</p>
                      </div>
                    </div>

                    {/* Rollup Stats */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 font-medium">
                        <LayoutTemplate className="h-3.5 w-3.5 text-indigo-500" />
                        <span>{linkedGradesCount} Grades</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Users className="h-3.5 w-3.5 text-emerald-500" />
                        <span>{teacherCount} Teachers</span>
                      </div>
                    </div>

                    {onViewDepartment && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onViewDepartment(dept)}
                        className="w-full text-xs h-8 border-indigo-200 text-indigo-700 hover:bg-indigo-50 mt-1"
                      >
                        View Department Details →
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl text-center">
          <div className="h-16 w-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4 border border-indigo-100">
            <Building2 className="h-8 w-8 text-indigo-400" />
          </div>
          <h4 className="text-lg font-bold text-slate-700 mb-1">No Departments Found</h4>
          <p className="text-sm text-slate-500 max-w-sm mb-4">
            {searchTerm ? `No results match "${searchTerm}".` : 'Get started by creating your school faculty departments.'}
          </p>
          <Button onClick={onAddDepartment} className="gradient-indigo text-white">
            <Plus className="h-4 w-4 mr-2" /> Add New Department
          </Button>
        </div>
      )}
    </div>
  );
}

export default DepartmentsTab;

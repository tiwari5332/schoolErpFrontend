import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Users, Crown, Edit2, Trash2 } from "lucide-react";
import { Department, SetupTeacher } from '../Constants';

interface DepartmentsTabProps {
  departments: Department[];
  teachers: SetupTeacher[];
  onAddDepartment: () => void;
  onEditDepartment: (dept: Department) => void;
  onDeleteDepartment: (deptId: string) => void;
}

export function DepartmentsTab({ 
  departments, 
  teachers, 
  onAddDepartment, 
  onEditDepartment, 
  onDeleteDepartment 
}: DepartmentsTabProps) {
  
  const getTeacherName = (id: string | null) => {
    if (!id) return 'Unassigned';
    return teachers.find(t => t.id === id)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-slate-800">Faculty Departments</h3>
          <p className="text-sm text-slate-500">Manage academic departments and assign heads.</p>
        </div>
        <Button 
          onClick={onAddDepartment}
          className="gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-transform"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => (
          <Card key={dept.id} className="border-0 shadow-lg glass-card group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-70"></div>
            
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl mb-3">
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onEditDepartment(dept)}
                    className="h-8 w-8 p-0 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onDeleteDepartment(dept.id)}
                    className="h-8 w-8 p-0 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-slate-800">{dept.name}</CardTitle>
              <CardDescription className="line-clamp-2 mt-1 h-10">
                {dept.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4 pt-2 border-t border-slate-100">
                {/* HOD */}
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Crown className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Head of Dept</p>
                    <p className="text-sm font-semibold text-slate-700">{getTeacherName(dept.hodId)}</p>
                  </div>
                </div>

                {/* Teacher Count */}
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">Faculty Members</span>
                  </div>
                  <Badge variant="secondary" className="bg-white border-slate-200">
                    {dept.teacherIds.length} Assigned
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

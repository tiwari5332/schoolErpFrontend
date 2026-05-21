import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, LayoutTemplate, Users, UserCircle } from "lucide-react";
import { ClassGroup, SetupTeacher, Section } from '../Constants';

interface ClassesTabProps {
  classes: ClassGroup[];
  teachers: SetupTeacher[];
  onAddGrade: () => void;
  onAddSection: (classGrpId: string) => void;
  onEditSection: (classGrpId: string, section: Section) => void;
}

export function ClassesTab({ classes, teachers, onAddGrade, onAddSection, onEditSection }: ClassesTabProps) {
  
  const getTeacherName = (id: string | null) => {
    if (!id) return 'Unassigned';
    return teachers.find(t => t.id === id)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-slate-800">Class & Section Hierarchy</h3>
          <p className="text-sm text-slate-500">Manage grades, sections, and assign class teachers.</p>
        </div>
        <Button 
          onClick={onAddGrade}
          className="gradient-cyan text-white shadow-colored-cyan hover:scale-[1.02] transition-transform"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Grade
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={classes.map(c => c.id)} className="space-y-4">
        {classes.map(classGrp => (
          <AccordionItem key={classGrp.id} value={classGrp.id} className="border-0 shadow-sm rounded-xl overflow-hidden glass-card">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50 transition-colors data-[state=open]:bg-slate-50 data-[state=open]:border-b border-slate-100">
              <div className="flex items-center gap-4 w-full text-left">
                <div className="p-2.5 bg-cyan-100 text-cyan-600 rounded-lg shrink-0">
                  <LayoutTemplate className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-800">{classGrp.grade}</h4>
                  <p className="text-sm text-slate-500 font-normal">
                    {classGrp.sections.length} Sections • {classGrp.sections.reduce((acc, sec) => acc + sec.studentIds.length, 0)} Total Students
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent className="bg-white/50 p-6 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {classGrp.sections.map(section => (
                  <Card key={section.id} className="border border-slate-200 shadow-sm hover:border-cyan-200 hover:shadow-md transition-all group">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                      <CardTitle className="text-xl font-bold text-slate-800">
                        {section.name}
                      </CardTitle>
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 font-medium">
                        <Users className="h-3 w-3 mr-1" />
                        {section.studentIds.length}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <UserCircle className="h-4 w-4 text-slate-400" />
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-semibold text-slate-400 leading-tight">Class Teacher</span>
                          <span className="font-medium text-slate-700">{getTeacherName(section.classTeacherId)}</span>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-slate-100 flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onEditSection(classGrp.id, section)}
                          className="w-full text-xs h-8 hover:bg-cyan-50 hover:text-cyan-600"
                        >
                          Edit Section
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Section Card */}
                <div 
                  onClick={() => onAddSection(classGrp.id)}
                  className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:text-cyan-600 hover:border-cyan-300 hover:bg-cyan-50/50 cursor-pointer transition-all min-h-[140px]"
                >
                  <Plus className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Add Section</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

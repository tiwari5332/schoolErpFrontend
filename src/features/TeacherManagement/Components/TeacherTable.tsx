import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Teacher } from '../Constants';

interface TeacherTableProps {
  teachers: Teacher[];
  onViewTeacher: (teacher: Teacher) => void;
  onEditTeacher: (teacher: Teacher) => void;
  onDeleteTeacher: (teacher: Teacher) => void;
}

export function TeacherTable({ teachers, onViewTeacher, onEditTeacher, onDeleteTeacher }: TeacherTableProps) {
  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Teachers ({teachers.length})
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">Complete list of faculty members</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100">
                <TableHead className="w-12 font-medium text-slate-600"></TableHead>
                <TableHead className="font-medium text-slate-600">Teacher Info</TableHead>
                <TableHead className="font-medium text-slate-600">Department</TableHead>
                <TableHead className="font-medium text-slate-600">Subjects</TableHead>
                <TableHead className="font-medium text-slate-600">Classes</TableHead>
                <TableHead className="font-medium text-slate-600">Experience</TableHead>
                <TableHead className="font-medium text-slate-600">Status</TableHead>
                <TableHead className="font-medium text-slate-600 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <TableCell>
                    <Avatar className="h-10 w-10 ring-2 ring-emerald-100">
                      <AvatarImage src={teacher.avatar} />
                      <AvatarFallback className="gradient-emerald text-white font-medium">
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-slate-900">{teacher.name}</div>
                      <div className="text-sm text-slate-500">{teacher.id}</div>
                      <div className="text-sm text-slate-500">{teacher.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                      {teacher.department}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.slice(0, 2).map((subject, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-slate-50 text-slate-700 border-slate-200">
                          {subject}
                        </Badge>
                      ))}
                      {teacher.subjects.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-slate-50 text-slate-700 border-slate-200">
                          +{teacher.subjects.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.classes.slice(0, 2).map((cls, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                          {cls}
                        </Badge>
                      ))}
                      {teacher.classes.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                          +{teacher.classes.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-slate-900">{teacher.experience}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={teacher.status === 'Active' ? 'default' : 'secondary'} 
                           className={teacher.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'}>
                      {teacher.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-emerald-50 hover:scale-110 transition-all duration-200"
                        onClick={() => onViewTeacher(teacher)}
                      >
                        <Eye className="h-4 w-4 text-emerald-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-cyan-50 hover:scale-110 transition-all duration-200"
                        onClick={() => onEditTeacher(teacher)}
                      >
                        <Edit className="h-4 w-4 text-cyan-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-rose-50 hover:scale-110 transition-all duration-200"
                        onClick={() => onDeleteTeacher(teacher)}
                      >
                        <Trash2 className="h-4 w-4 text-rose-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

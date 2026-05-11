import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Filter, Eye, Edit, Trash2 } from "lucide-react";
import { Student } from '../constant';

interface StudentTableProps {
  students: Student[];
  onViewStudent: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
}

export function StudentTable({ students, onViewStudent, onEditStudent, onDeleteStudent }: StudentTableProps) {
  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Students ({students.length})
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">Complete list of enrolled students</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2 border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200">
            <Filter className="h-4 w-4 text-indigo-500" />
            More Filters
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100">
                <TableHead className="w-12 font-medium text-slate-600"></TableHead>
                <TableHead className="font-medium text-slate-600">Student Info</TableHead>
                <TableHead className="font-medium text-slate-600">Grade & Class</TableHead>
                <TableHead className="font-medium text-slate-600">Guardian</TableHead>
                <TableHead className="font-medium text-slate-600">Contact</TableHead>
                <TableHead className="font-medium text-slate-600">Status</TableHead>
                <TableHead className="font-medium text-slate-600">Fee Status</TableHead>
                <TableHead className="font-medium text-slate-600 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <TableCell>
                    <Avatar className="h-10 w-10 ring-2 ring-indigo-100">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback className="gradient-indigo text-white font-medium">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-slate-900">{student.name}</div>
                      <div className="text-sm text-slate-500">{student.id}</div>
                      <div className="text-sm text-slate-500">{student.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                        {student.grade}
                      </Badge>
                      <div className="text-sm text-slate-600">Class {student.class}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-slate-900">{student.guardian}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-slate-600">{student.phone}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'Active' ? 'default' : 'secondary'} 
                           className={student.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-800 border-slate-200'}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      student.feeStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      student.feeStatus === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-rose-50 text-rose-700 border-rose-200'
                    }>
                      {student.feeStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-indigo-50 hover:scale-110 transition-all duration-200"
                        onClick={() => onViewStudent(student)}
                      >
                        <Eye className="h-4 w-4 text-indigo-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-emerald-50 hover:scale-110 transition-all duration-200"
                        onClick={() => onEditStudent(student)}
                      >
                        <Edit className="h-4 w-4 text-emerald-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-rose-50 hover:scale-110 transition-all duration-200"
                        onClick={() => onDeleteStudent(student)}
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

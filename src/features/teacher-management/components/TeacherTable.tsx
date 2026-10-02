import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Edit, Trash2, Inbox } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Teacher } from '../constants';

interface TeacherTableProps {
  teachers: Teacher[];
  onViewTeacher: (teacher: Teacher) => void;
  onEditTeacher: (teacher: Teacher) => void;
  onDeleteTeacher: (teacher: Teacher) => void;
}

export function TeacherTable({ teachers = [], onViewTeacher, onEditTeacher, onDeleteTeacher }: TeacherTableProps) {
  const safeTeachers = Array.isArray(teachers) ? teachers : [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.max(1, Math.ceil(safeTeachers.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, safeTeachers.length);
  const paginatedTeachers = safeTeachers.slice(startIndex, endIndex);

  return (
    <Card className="border border-indigo-100/70 shadow-md bg-white rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow className="border-b border-slate-200/80">
                <TableHead className="font-semibold text-xs text-slate-700 pl-6">Teacher Info</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Department</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Subjects</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Classes</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Experience</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Status</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTeachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2 py-8">
                      <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-400">
                        <Inbox className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-medium text-slate-500">No teachers found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTeachers.map((teacher) => (
                  <TableRow key={teacher.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-1 ring-slate-200">
                          <AvatarImage src={teacher.avatar} />
                          <AvatarFallback className="gradient-indigo text-white font-medium text-xs">
                            {teacher.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <div className="font-medium text-slate-900 text-xs">{teacher.name}</div>
                          <div className="text-[11px] text-slate-500">{teacher.id} • {teacher.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs font-medium">
                        {teacher.department}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(teacher.subjects || []).slice(0, 2).map((subject, index) => (
                          <Badge key={index} variant="outline" className="text-[11px] bg-slate-50 text-slate-700 border-slate-200">
                            {subject}
                          </Badge>
                        ))}
                        {(teacher.subjects || []).length > 2 && (
                          <Badge variant="outline" className="text-[11px] bg-slate-50 text-slate-700 border-slate-200">
                            +{(teacher.subjects || []).length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(teacher.classes || []).slice(0, 2).map((cls, index) => (
                          <Badge key={index} variant="outline" className="text-[11px] bg-purple-50 text-purple-700 border-purple-200">
                            {cls}
                          </Badge>
                        ))}
                        {(teacher.classes || []).length > 2 && (
                          <Badge variant="outline" className="text-[11px] bg-purple-50 text-purple-700 border-purple-200">
                            +{(teacher.classes || []).length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-medium text-slate-900">{teacher.experience}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={teacher.status === 'Active' ? 'default' : 'secondary'} 
                             className={teacher.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 text-xs' : 'bg-amber-50 text-amber-700 border-amber-200 text-xs'}>
                        {teacher.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-all"
                          onClick={() => onViewTeacher(teacher)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-cyan-50 text-cyan-600 rounded-lg transition-all"
                          onClick={() => onEditTeacher(teacher)}
                          title="Edit Teacher"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-rose-50 text-rose-600 rounded-lg transition-all"
                          onClick={() => onDeleteTeacher(teacher)}
                          title="Delete Teacher"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {safeTeachers.length > 0 && (
          <div className="py-3 border-t border-slate-100 flex items-center justify-between px-6">
            <div className="text-xs text-slate-500">
              Showing {startIndex + 1} to {endIndex} of {safeTeachers.length} entries
            </div>
            <Pagination className="w-auto mx-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50 text-xs" : "cursor-pointer text-xs"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <PaginationItem key={idx}>
                    <PaginationLink 
                      onClick={() => setCurrentPage(idx + 1)}
                      isActive={currentPage === idx + 1}
                      className="cursor-pointer text-xs h-8 w-8 rounded-lg"
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50 text-xs" : "cursor-pointer text-xs"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


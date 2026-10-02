import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Card, CardContent } from "../../../components/ui/card";
import { Checkbox } from "../../../components/ui/checkbox";
import { Eye, Edit, Trash2, ArrowUpDown, Inbox } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "../../../components/ui/pagination";
import { Student } from '../constant';
import { STUDENT_FIELD_KEYS, getStudentValue } from '../constant/studentKeys';

interface StudentTableProps {
  students: Student[];
  onViewStudent: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
}

export function StudentTable({ students = [], onViewStudent, onEditStudent, onDeleteStudent }: StudentTableProps) {
  const safeStudents = Array.isArray(students) ? students : [];
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const itemsPerPage = 8;

  const totalPages = Math.max(1, Math.ceil(safeStudents.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, safeStudents.length);
  const paginatedStudents = safeStudents.slice(startIndex, endIndex);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedStudents.map(s => getStudentValue(s, STUDENT_FIELD_KEYS.ID)));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <Card className="border border-indigo-100/70 shadow-md bg-white rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow className="border-b border-slate-200/80">
                <TableHead className="w-12 pl-4">
                  <Checkbox 
                    checked={paginatedStudents.length > 0 && selectedIds.length === paginatedStudents.length} 
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors">
                    Student Name
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Class</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Section</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Batch Code</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors">
                    Roll No.
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Father Name</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2 py-8">
                      <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-400">
                        <Inbox className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-medium text-slate-500">No data found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedStudents.map((student, idx) => {
                  const id = getStudentValue(student, STUDENT_FIELD_KEYS.ID, `stu-${idx}`);
                  const name = getStudentValue(student, STUDENT_FIELD_KEYS.NAME, 'Unknown Student');
                  const avatar = getStudentValue(student, STUDENT_FIELD_KEYS.AVATAR, '');
                  const cls = getStudentValue(student, STUDENT_FIELD_KEYS.CLASS, '');
                  const grade = getStudentValue(student, STUDENT_FIELD_KEYS.GRADE, '');
                  const section = getStudentValue(student, STUDENT_FIELD_KEYS.SECTION, '');
                  const batchCode = getStudentValue(student, STUDENT_FIELD_KEYS.BATCH_CODE, '2023-2024');
                  const rollNo = getStudentValue(student, STUDENT_FIELD_KEYS.ROLL_NO, '');
                  const fatherName = getStudentValue(student, STUDENT_FIELD_KEYS.FATHER_NAME, '');
                  const guardian = getStudentValue(student, STUDENT_FIELD_KEYS.GUARDIAN, '');

                  const initials = name.split(' ').filter(Boolean).map((n: string) => n[0]).join('').toUpperCase() || 'S';
                  const sectionDisplay = section || (cls ? cls.replace(/[0-9]/g, '') || 'A' : 'A');
                  const classDisplay = cls ? cls.replace(/[^0-9]/g, '') || grade : grade;
                  const rollDisplay = rollNo || `RN-${(startIndex + idx + 1).toString().padStart(3, '0')}`;
                  const fatherDisplay = fatherName || guardian || 'N/A';

                  return (
                    <TableRow key={id} className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
                      <TableCell className="pl-4">
                        <Checkbox 
                          checked={selectedIds.includes(id)} 
                          onCheckedChange={() => toggleSelectRow(id)}
                          aria-label={`Select ${name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 ring-1 ring-slate-200">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="gradient-indigo text-white font-medium text-xs">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <div className="font-semibold text-xs text-slate-900">{name}</div>
                            <div className="text-[11px] text-slate-400">{id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-slate-700 font-medium">{classDisplay}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[11px] bg-slate-50 text-slate-700 border-slate-200 px-2 py-0.5">
                          {sectionDisplay}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-slate-600">{batchCode}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-mono font-medium text-indigo-700 bg-indigo-50/70 px-2 py-0.5 rounded-lg border border-indigo-100">
                          {rollDisplay}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-slate-700">{fatherDisplay}</span>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex justify-end items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            onClick={() => onViewStudent(student)}
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                            onClick={() => onEditStudent(student)}
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            onClick={() => onDeleteStudent(student)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {safeStudents.length > 0 && (
          <div className="py-3 border-t border-slate-100 flex items-center justify-between px-6 bg-slate-50/40">
            <div className="text-xs text-slate-500">
              Showing {startIndex + 1} to {endIndex} of {safeStudents.length} entries
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
                      className="cursor-pointer text-xs h-8 w-8"
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

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Search, FileText, Download } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "../../../components/ui/pagination";
import { Student } from '../constant';
import { StudentReportCardModal } from './StudentReportCardModal';

interface StudentAcademicRecordsProps {
  students: Student[];
}

export function StudentAcademicRecords({ students }: StudentAcademicRecordsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedGrades, setSelectedGrades] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  // Mock function to get a random grade for a student based on their ID
  const getMockGrades = (studentId: string) => {
    const hash = studentId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const math = 70 + (hash % 30);
    const science = 75 + (hash % 25);
    const english = 80 + (hash % 20);
    const total = Math.round((math + science + english) / 3);
    
    let gradeLetter = 'C';
    if (total >= 90) gradeLetter = 'A';
    else if (total >= 80) gradeLetter = 'B';
    else if (total >= 70) gradeLetter = 'C';
    else if (total >= 60) gradeLetter = 'D';

    return { math, science, english, total, gradeLetter };
  };

  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Academic Records
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Overview of student grades and academic performance
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 w-full sm:w-[250px] border-2 border-slate-200 focus:border-blue-300 focus:ring-blue-100 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100">
                <TableHead className="font-medium text-slate-600 pl-6">Student Info</TableHead>
                <TableHead className="font-medium text-slate-600">Math</TableHead>
                <TableHead className="font-medium text-slate-600">Science</TableHead>
                <TableHead className="font-medium text-slate-600">English</TableHead>
                <TableHead className="font-medium text-slate-600">Average</TableHead>
                <TableHead className="font-medium text-slate-600">Grade</TableHead>
                <TableHead className="font-medium text-slate-600 text-right pr-6">Report Card</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.map((student) => {
                const grades = getMockGrades(student.id);

                return (
                  <TableRow key={student.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-1 ring-slate-200">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="gradient-blue text-white font-medium text-xs">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <div className="font-medium text-slate-900">{student.name}</div>
                          <div className="text-xs text-slate-500">{student.id} • {student.grade}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-slate-700">{grades.math}%</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-slate-700">{grades.science}%</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-slate-700">{grades.english}%</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-slate-900">{grades.total}%</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        grades.gradeLetter === 'A' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        grades.gradeLetter === 'B' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        grades.gradeLetter === 'C' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-rose-50 text-rose-700 border-rose-200'
                      }>
                        {grades.gradeLetter}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => {
                          setSelectedStudent(student);
                          setSelectedGrades(grades);
                          setIsModalOpen(true);
                        }}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 ml-1"
                        onClick={() => {
                          setSelectedStudent(student);
                          setSelectedGrades(grades);
                          setIsModalOpen(true);
                          // A real app would trigger a direct PDF download here
                          // For mock purposes, we'll just open the modal and let the user print
                        }}
                        title="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredStudents.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No students found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredStudents.length > 0 && (
          <div className="py-4 border-t border-slate-100 flex items-center justify-between px-6">
            <div className="text-sm text-slate-500">
              Showing {startIndex + 1} to {endIndex} of {filteredStudents.length} entries
            </div>
            <Pagination className="w-auto mx-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <PaginationItem key={idx}>
                    <PaginationLink 
                      onClick={() => setCurrentPage(idx + 1)}
                      isActive={currentPage === idx + 1}
                      className="cursor-pointer"
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>

      <StudentReportCardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        student={selectedStudent || undefined} 
        grades={selectedGrades} 
      />
    </Card>
  );
}

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Search } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "../../../components/ui/pagination";
import { Student } from '../constant';

interface StudentAttendanceTableProps {
  students: Student[];
}

type AttendanceStatus = 'Present' | 'Absent' | 'Half Day' | 'Leave';

export function StudentAttendanceTable({ students }: StudentAttendanceTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Local state to mock attendance tracking.
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, AttendanceStatus>>({});

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

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case 'Present': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Absent': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Half Day': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Leave': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    const key = `${studentId}-${selectedDate}`;
    setAttendanceRecords(prev => ({ ...prev, [key]: status }));
  };

  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Student Attendance
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Manage and track daily attendance for students
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 w-full sm:w-[200px] border-2 border-slate-200 focus:border-indigo-300 focus:ring-indigo-100 transition-all duration-200"
              />
            </div>
            <Input 
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-10 w-full sm:w-[150px] border-2 border-slate-200 focus:border-indigo-300 focus:ring-indigo-100 transition-all duration-200"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100">
                <TableHead className="font-medium text-slate-600 pl-6">Student Info</TableHead>
                <TableHead className="font-medium text-slate-600">Grade & Class</TableHead>
                <TableHead className="font-medium text-slate-600 text-center">Status Badge</TableHead>
                <TableHead className="font-medium text-slate-600 text-right pr-6">Update Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.map((student) => {
                const recordKey = `${student.id}-${selectedDate}`;
                const currentStatus = attendanceRecords[recordKey] || 'Present'; // Defaulting to Present for display

                return (
                  <TableRow key={student.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-1 ring-slate-200">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="gradient-indigo text-white font-medium text-xs">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <div className="font-medium text-slate-900">{student.name}</div>
                          <div className="text-xs text-slate-500">{student.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                          {student.grade}
                        </Badge>
                        <div className="text-xs text-slate-600 ml-1">Class {student.class}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={`${getStatusColor(currentStatus)} px-3 py-1 font-medium`}>
                        {currentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Select 
                        value={currentStatus} 
                        onValueChange={(val: AttendanceStatus) => handleStatusChange(student.id, val)}
                      >
                        <SelectTrigger className="w-[130px] h-9 inline-flex border-slate-200">
                          <SelectValue placeholder="Mark Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Present">Present</SelectItem>
                          <SelectItem value="Absent">Absent</SelectItem>
                          <SelectItem value="Half Day">Half Day</SelectItem>
                          <SelectItem value="Leave">Leave</SelectItem>
                        </SelectContent>
                      </Select>
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
    </Card>
  );
}

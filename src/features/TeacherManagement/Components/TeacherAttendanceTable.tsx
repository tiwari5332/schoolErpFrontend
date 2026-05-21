import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Teacher } from '../Constants';
import { Badge } from 'lucide-react';

interface TeacherAttendanceTableProps {
  teachers: Teacher[];
}

type AttendanceStatus = 'Present' | 'Absent' | 'Half Day' | 'Leave';

export function TeacherAttendanceTable({ teachers }: TeacherAttendanceTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Local state to mock attendance tracking. In a real app, this would be fetched and saved to a backend.
  // We'll track it using a composite key of `${teacherId}-${date}`
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, AttendanceStatus>>({});

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredTeachers.length);
  const paginatedTeachers = filteredTeachers.slice(startIndex, endIndex);

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case 'Present': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Absent': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Half Day': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Leave': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleStatusChange = (teacherId: string, status: AttendanceStatus) => {
    const key = `${teacherId}-${selectedDate}`;
    setAttendanceRecords(prev => ({ ...prev, [key]: status }));
  };

  return (
    <Card className="border-0 shadow-xl hover-lift glass-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Employee Attendance
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Manage and track daily attendance for all staff
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search employee..."
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
                <TableHead className="font-medium text-slate-600 pl-6">Employee Info</TableHead>
                <TableHead className="font-medium text-slate-600">Department</TableHead>
                <TableHead className="font-medium text-slate-600 text-center">Status Badge</TableHead>
                <TableHead className="font-medium text-slate-600 text-right pr-6">Update Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTeachers.map((teacher) => {
                const recordKey = `${teacher.id}-${selectedDate}`;
                const currentStatus = attendanceRecords[recordKey] || 'Present'; // Defaulting to Present for display, could be 'Unmarked'

                return (
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
                          <div className="font-medium text-slate-900">{teacher.name}</div>
                          <div className="text-xs text-slate-500">{teacher.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200 font-normal">
                        {teacher.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={`${getStatusColor(currentStatus)} px-3 py-1 font-medium`}>
                        {currentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Select
                        value={currentStatus}
                        onValueChange={(val: AttendanceStatus) => handleStatusChange(teacher.id, val)}
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

          {filteredTeachers.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No employees found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredTeachers.length > 0 && (
          <div className="py-4 border-t border-slate-100 flex items-center justify-between px-6">
            <div className="text-sm text-slate-500">
              Showing {startIndex + 1} to {endIndex} of {filteredTeachers.length} entries
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

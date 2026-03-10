import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search, Plus, Edit, Eye, Trash2, Download, Filter, MoreHorizontal, UserPlus } from "lucide-react";
import { StudentDetailView } from "./StudentDetailView";

// Mock student data
const students = [
  {
    id: 'STU001',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    grade: 'Grade 5',
    class: '5A',
    phone: '+1 234-567-8901',
    address: '123 Oak Street, City, State',
    status: 'Active',
    admissionDate: '2023-08-15',
    guardian: 'Robert Johnson',
    avatar: ''
  },
  {
    id: 'STU002',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    grade: 'Grade 4',
    class: '4B',
    phone: '+1 234-567-8902',
    address: '456 Pine Avenue, City, State',
    status: 'Active',
    admissionDate: '2023-08-20',
    guardian: 'Mary Smith',
    avatar: ''
  },
  {
    id: 'STU003',
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    grade: 'Grade 3',
    class: '3A',
    phone: '+1 234-567-8903',
    address: '789 Elm Drive, City, State',
    status: 'Inactive',
    admissionDate: '2023-08-18',
    guardian: 'David Davis',
    avatar: ''
  },
  {
    id: 'STU004',
    name: 'Daniel Wilson',
    email: 'daniel.wilson@email.com',
    grade: 'Grade 5',
    class: '5B',
    phone: '+1 234-567-8904',
    address: '321 Maple Road, City, State',
    status: 'Active',
    admissionDate: '2023-08-22',
    guardian: 'Lisa Wilson',
    avatar: ''
  },
  {
    id: 'STU005',
    name: 'Emma Brown',
    email: 'emma.brown@email.com',
    grade: 'Grade 2',
    class: '2A',
    phone: '+1 234-567-8905',
    address: '654 Cedar Lane, City, State',
    status: 'Active',
    admissionDate: '2023-08-25',
    guardian: 'Michael Brown',
    avatar: ''
  }
];

export function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];

  const handleViewStudent = (student: typeof students[0]) => {
    setSelectedStudent(student);
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
    setSelectedStudent(null);
  };

  if (isDetailViewOpen && selectedStudent) {
    return (
      <div className="space-y-6">
        <StudentDetailView student={selectedStudent} onClose={handleCloseDetailView} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Student Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage student records and information</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200">
            <Download className="h-4 w-4 text-indigo-500" />
            Export Data
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200">
                <UserPlus className="h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Add New Student</DialogTitle>
                <DialogDescription>Enter student information to create a new record in the system</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                  <Input id="name" placeholder="Enter student's full name" className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input id="email" type="email" placeholder="student@email.com" className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-sm font-medium">Grade *</Label>
                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map(grade => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class" className="text-sm font-medium">Class Section</Label>
                  <Input id="class" placeholder="e.g., 5A, 5B" className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardian" className="text-sm font-medium">Guardian Name *</Label>
                  <Input id="guardian" placeholder="Parent/Guardian full name" className="h-10" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="text-sm font-medium">Home Address</Label>
                  <Input id="address" placeholder="Complete home address" className="h-10" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)} className="gradient-indigo text-white shadow-colored-indigo">
                  Add Student
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-colored-indigo hover-lift">
          <div className="absolute inset-0 gradient-indigo opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-700">Total Students</p>
                <p className="text-3xl font-bold text-indigo-900">{students.length}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-indigo flex items-center justify-center shadow-colored-indigo">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-0 shadow-colored-emerald hover-lift">
          <div className="absolute inset-0 gradient-emerald opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">Active Students</p>
                <p className="text-3xl font-bold text-emerald-900">{students.filter(s => s.status === 'Active').length}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-colored-emerald">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-0 shadow-colored-amber hover-lift">
          <div className="absolute inset-0 gradient-amber opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">New This Month</p>
                <p className="text-3xl font-bold text-amber-900">12</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-amber flex items-center justify-center shadow-colored-amber">
                <Plus className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-0 shadow-colored-purple hover-lift">
          <div className="absolute inset-0 gradient-purple opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Grades Covered</p>
                <p className="text-3xl font-bold text-purple-900">{grades.length}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple">
                <Filter className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search students by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 border-2 border-slate-200 focus:border-indigo-300 focus:ring-indigo-100 transition-all duration-200"
              />
            </div>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-full sm:w-[200px] h-11 border-2 border-slate-200 focus:border-indigo-300">
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {grades.map(grade => (
                  <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Student Table */}
      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Students ({filteredStudents.length})</CardTitle>
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
                  <TableHead className="font-medium text-slate-600 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-indigo-50 hover:scale-110 transition-all duration-200"
                          onClick={() => handleViewStudent(student)}
                        >
                          <Eye className="h-4 w-4 text-indigo-600" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-emerald-50 hover:scale-110 transition-all duration-200">
                          <Edit className="h-4 w-4 text-emerald-600" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-rose-50 hover:scale-110 transition-all duration-200">
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
    </div>
  );
}
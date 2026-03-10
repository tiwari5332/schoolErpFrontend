import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search, Plus, Edit, Eye, Trash2, Download, BookOpen, Calendar, UserPlus, GraduationCap, Users } from "lucide-react";
import { TeacherDetailView } from "./TeacherDetailView";

// Mock teacher data
const teachers = [
  {
    id: 'TCH001',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@school.edu',
    phone: '+1 234-567-9001',
    department: 'Mathematics',
    subjects: ['Algebra', 'Geometry'],
    classes: ['5A', '5B', '4A'],
    experience: '8 years',
    qualification: 'PhD in Mathematics',
    status: 'Active',
    joinDate: '2020-08-15',
    address: '789 Academic Lane, City, State',
    avatar: ''
  },
  {
    id: 'TCH002',
    name: 'Mr. James Rodriguez',
    email: 'james.rodriguez@school.edu',
    phone: '+1 234-567-9002',
    department: 'Science',
    subjects: ['Physics', 'Chemistry'],
    classes: ['5A', '4B'],
    experience: '6 years',
    qualification: 'MSc in Physics',
    status: 'Active',
    joinDate: '2021-02-20',
    address: '456 Science Park, City, State',
    avatar: ''
  },
  {
    id: 'TCH003',
    name: 'Ms. Emily Chen',
    email: 'emily.chen@school.edu',
    phone: '+1 234-567-9003',
    department: 'English',
    subjects: ['Literature', 'Grammar'],
    classes: ['3A', '3B', '2A'],
    experience: '5 years',
    qualification: 'MA in English Literature',
    status: 'Active',
    joinDate: '2022-08-01',
    address: '123 Literary Road, City, State',
    avatar: ''
  },
  {
    id: 'TCH004',
    name: 'Mr. Michael Thompson',
    email: 'michael.thompson@school.edu',
    phone: '+1 234-567-9004',
    department: 'Physical Education',
    subjects: ['Sports', 'Health Education'],
    classes: ['All Grades'],
    experience: '10 years',
    qualification: 'BPE in Physical Education',
    status: 'On Leave',
    joinDate: '2019-06-10',
    address: '321 Sports Avenue, City, State',
    avatar: ''
  },
  {
    id: 'TCH005',
    name: 'Ms. Lisa Kumar',
    email: 'lisa.kumar@school.edu',
    phone: '+1 234-567-9005',
    department: 'Arts',
    subjects: ['Drawing', 'Music'],
    classes: ['1A', '1B', '2A', '2B'],
    experience: '4 years',
    qualification: 'BFA in Fine Arts',
    status: 'Active',
    joinDate: '2023-01-15',
    address: '567 Creative Street, City, State',
    avatar: ''
  }
];

const departments = ['Mathematics', 'Science', 'English', 'Physical Education', 'Arts', 'Social Studies'];

export function TeacherManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<typeof teachers[0] | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleViewTeacher = (teacher: typeof teachers[0]) => {
    setSelectedTeacher(teacher);
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
    setSelectedTeacher(null);
  };

  if (isDetailViewOpen && selectedTeacher) {
    return (
      <div className="space-y-6">
        <TeacherDetailView teacher={selectedTeacher} onClose={handleCloseDetailView} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Teacher Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage teacher profiles and assignments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200">
            <Download className="h-4 w-4 text-emerald-500" />
            Export Data
          </Button>
          <Button variant="outline" className="gap-2 border-2 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all duration-200">
            <Calendar className="h-4 w-4 text-cyan-500" />
            Schedule
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 gradient-emerald text-white shadow-colored-emerald hover:scale-[1.02] transition-all duration-200">
                <UserPlus className="h-4 w-4" />
                Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Add New Teacher</DialogTitle>
                <DialogDescription>Enter teacher information to create a new profile in the system</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                  <Input id="name" placeholder="Enter teacher's full name" className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                  <Input id="email" type="email" placeholder="teacher@school.edu" className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-medium">Department *</Label>
                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-medium">Years of Experience</Label>
                  <Input id="experience" placeholder="e.g., 5 years" className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualification" className="text-sm font-medium">Highest Qualification</Label>
                  <Input id="qualification" placeholder="e.g., MSc in Physics" className="h-10" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="subjects" className="text-sm font-medium">Subjects Teaching</Label>
                  <Input id="subjects" placeholder="Enter subjects (comma separated)" className="h-10" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                  <Textarea id="address" placeholder="Enter complete address" rows={3} />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)} className="gradient-emerald text-white shadow-colored-emerald">
                  Add Teacher
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-colored-emerald hover-lift">
          <div className="absolute inset-0 gradient-emerald opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">Total Teachers</p>
                <p className="text-3xl font-bold text-emerald-900">{teachers.length}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-colored-emerald">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-0 shadow-colored-cyan hover-lift">
          <div className="absolute inset-0 gradient-cyan opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-700">Departments</p>
                <p className="text-3xl font-bold text-cyan-900">{departments.length}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-cyan flex items-center justify-center shadow-colored-cyan">
                <BookOpen className="h-6 w-6 text-white" />
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
                <p className="text-sm font-medium text-amber-700">On Leave</p>
                <p className="text-3xl font-bold text-amber-900">{teachers.filter(t => t.status === 'On Leave').length}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-amber flex items-center justify-center shadow-colored-amber">
                <Calendar className="h-6 w-6 text-white" />
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
                <p className="text-sm font-medium text-purple-700">Avg Experience</p>
                <p className="text-3xl font-bold text-purple-900">6.6<span className="text-sm font-normal"> yrs</span></p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple">
                <GraduationCap className="h-6 w-6 text-white" />
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
                placeholder="Search teachers by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 border-2 border-slate-200 focus:border-emerald-300 focus:ring-emerald-100 transition-all duration-200"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-[220px] h-11 border-2 border-slate-200 focus:border-emerald-300">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Teacher Table */}
      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Teachers ({filteredTeachers.length})</CardTitle>
              <CardDescription className="text-sm text-slate-500">Complete list of teaching staff</CardDescription>
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
                {filteredTeachers.map((teacher) => (
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
                          onClick={() => handleViewTeacher(teacher)}
                        >
                          <Eye className="h-4 w-4 text-emerald-600" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-cyan-50 hover:scale-110 transition-all duration-200">
                          <Edit className="h-4 w-4 text-cyan-600" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-purple-50 hover:scale-110 transition-all duration-200">
                          <BookOpen className="h-4 w-4 text-purple-600" />
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
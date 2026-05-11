import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Edit, Eye, Trash2, Shield, Key, UserCheck, UserPlus, Users } from "lucide-react";

// Mock admin data
const admins = [
  {
    id: 'ADM001',
    name: 'John Anderson',
    email: 'john.anderson@school.edu',
    phone: '+1 234-567-8001',
    role: 'Super Admin',
    department: 'Administration',
    permissions: ['All Access'],
    status: 'Active',
    lastLogin: '2024-01-20 09:15 AM',
    createdDate: '2020-01-15',
    avatar: ''
  },
  {
    id: 'ADM002',
    name: 'Maria Garcia',
    email: 'maria.garcia@school.edu',
    phone: '+1 234-567-8002',
    role: 'Academic Admin',
    department: 'Academics',
    permissions: ['Student Management', 'Teacher Management', 'Academic Reports'],
    status: 'Active',
    lastLogin: '2024-01-20 08:30 AM',
    createdDate: '2021-03-10',
    avatar: ''
  },
  {
    id: 'ADM003',
    name: 'David Kim',
    email: 'david.kim@school.edu',
    phone: '+1 234-567-8003',
    role: 'Finance Admin',
    department: 'Finance',
    permissions: ['Fee Management', 'Financial Reports', 'Payment Processing'],
    status: 'Active',
    lastLogin: '2024-01-19 04:45 PM',
    createdDate: '2022-06-20',
    avatar: ''
  },
  {
    id: 'ADM004',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@school.edu',
    phone: '+1 234-567-8004',
    role: 'IT Admin',
    department: 'IT',
    permissions: ['System Management', 'User Accounts', 'Technical Support'],
    status: 'Active',
    lastLogin: '2024-01-20 07:20 AM',
    createdDate: '2021-09-05',
    avatar: ''
  },
  {
    id: 'ADM005',
    name: 'Robert Lee',
    email: 'robert.lee@school.edu',
    phone: '+1 234-567-8005',
    role: 'HR Admin',
    department: 'Human Resources',
    permissions: ['Staff Management', 'Attendance', 'HR Reports'],
    status: 'Inactive',
    lastLogin: '2024-01-15 02:10 PM',
    createdDate: '2023-02-14',
    avatar: ''
  }
];

const roles = ['Super Admin', 'Academic Admin', 'Finance Admin', 'IT Admin', 'HR Admin'];
const departments = ['Administration', 'Academics', 'Finance', 'IT', 'Human Resources'];
const allPermissions = [
  'Student Management',
  'Teacher Management',
  'Staff Management',
  'Academic Reports',
  'Financial Reports',
  'HR Reports',
  'Fee Management',
  'Payment Processing',
  'System Management',
  'User Accounts',
  'Technical Support',
  'Attendance',
  'All Access'
];

export function AdminList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || admin.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Admin Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage administrator accounts and permissions</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 gradient-purple text-white shadow-colored-purple hover:scale-[1.02] transition-all duration-200">
                <UserPlus className="h-4 w-4" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Add New Admin</DialogTitle>
                <DialogDescription>Create a new administrator account with specific permissions</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                  <Input id="name" placeholder="Enter admin's full name" className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                  <Input id="email" type="email" placeholder="admin@school.edu" className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">Role *</Label>
                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium">Permissions</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {allPermissions.map(permission => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox id={permission} />
                        <label htmlFor={permission} className="text-sm text-slate-600 cursor-pointer">
                          {permission}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)} className="gradient-purple text-white shadow-colored-purple">
                  Add Admin
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-colored-purple hover-lift">
          <div className="absolute inset-0 gradient-purple opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Total Admins</p>
                <p className="text-3xl font-bold text-purple-900">{admins.length}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-0 shadow-colored-pink hover-lift">
          <div className="absolute inset-0 gradient-pink opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-pink-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pink-700">Active</p>
                <p className="text-3xl font-bold text-pink-900">{admins.filter(a => a.status === 'Active').length}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-pink flex items-center justify-center shadow-colored-pink">
                <UserCheck className="h-6 w-6 text-white" />
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
                <Users className="h-6 w-6 text-white" />
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
                <p className="text-sm font-medium text-amber-700">Roles</p>
                <p className="text-3xl font-bold text-amber-900">{roles.length}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-amber flex items-center justify-center shadow-colored-amber">
                <Key className="h-6 w-6 text-white" />
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
                placeholder="Search admins by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 border-2 border-slate-200 focus:border-purple-300 focus:ring-purple-100 transition-all duration-200"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-[220px] h-11 border-2 border-slate-200 focus:border-purple-300">
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

      {/* Admin Table */}
      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Admins ({filteredAdmins.length})</CardTitle>
              <CardDescription className="text-sm text-slate-500">Administrator accounts and permissions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100">
                  <TableHead className="w-12 font-medium text-slate-600"></TableHead>
                  <TableHead className="font-medium text-slate-600">Admin Info</TableHead>
                  <TableHead className="font-medium text-slate-600">Role</TableHead>
                  <TableHead className="font-medium text-slate-600">Department</TableHead>
                  <TableHead className="font-medium text-slate-600">Permissions</TableHead>
                  <TableHead className="font-medium text-slate-600">Status</TableHead>
                  <TableHead className="font-medium text-slate-600 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <TableRow key={admin.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell>
                      <Avatar className="h-10 w-10 ring-2 ring-purple-100">
                        <AvatarImage src={admin.avatar} />
                        <AvatarFallback className="gradient-purple text-white font-medium">
                          {admin.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-slate-900">{admin.name}</div>
                        <div className="text-sm text-slate-500">{admin.id}</div>
                        <div className="text-sm text-slate-500">{admin.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        {admin.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-slate-600">{admin.department}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-slate-600 max-w-[200px] truncate">{admin.permissions.join(', ')}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={admin.status === 'Active' ? 'default' : 'secondary'} 
                             className={admin.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-800 border-slate-200'}>
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-purple-50 hover:scale-110 transition-all duration-200">
                          <Eye className="h-4 w-4 text-purple-600" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-pink-50 hover:scale-110 transition-all duration-200">
                          <Edit className="h-4 w-4 text-pink-600" />
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

export default AdminList;
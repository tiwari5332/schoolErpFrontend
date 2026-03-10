import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search, Plus, Edit, Eye, Trash2, Shield, Key, UserCheck, UserPlus, Users, Lock } from "lucide-react";

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

export function AdminManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || admin.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handlePermissionChange = (permission, checked) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permission]);
    } else {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Administrator Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage administrative users and permissions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Key className="h-4 w-4" />
            Reset Passwords
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                <UserPlus className="h-4 w-4" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Add New Administrator</DialogTitle>
                <DialogDescription>Create a new admin user with specific permissions and access levels</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Label htmlFor="role" className="text-sm font-medium">Admin Role *</Label>
                    <Select>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select administrative role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="department" className="text-sm font-medium">Department</Label>
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
                </div>
                
                <div className="space-y-4">
                  <Label className="text-sm font-medium">System Permissions</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                    {allPermissions.map((permission) => (
                      <div key={permission} className="flex items-center space-x-3">
                        <Checkbox
                          id={permission}
                          checked={selectedPermissions.includes(permission)}
                          onCheckedChange={(checked) => handlePermissionChange(permission, checked)}
                          className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                        <Label htmlFor={permission} className="text-sm font-medium text-gray-700">
                          {permission}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => {
                  setIsAddDialogOpen(false);
                  setSelectedPermissions([]);
                }}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setIsAddDialogOpen(false);
                  setSelectedPermissions([]);
                }} className="bg-purple-600 hover:bg-purple-700">
                  Create Admin User
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Total Admins</p>
                <p className="text-2xl font-bold text-purple-900">{admins.length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Active Admins</p>
                <p className="text-2xl font-bold text-green-900">{admins.filter(a => a.status === 'Active').length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <UserCheck className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Super Admins</p>
                <p className="text-2xl font-bold text-amber-900">{admins.filter(a => a.role === 'Super Admin').length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                <Shield className="h-4 w-4 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Departments</p>
                <p className="text-2xl font-bold text-blue-900">{departments.length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Lock className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search admins by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full sm:w-[200px] h-10">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Admin Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Administrators ({filteredAdmins.length})</CardTitle>
              <CardDescription className="text-sm text-gray-500">System administrators and their access levels</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100">
                  <TableHead className="w-12 font-medium text-gray-600"></TableHead>
                  <TableHead className="font-medium text-gray-600">Admin Info</TableHead>
                  <TableHead className="font-medium text-gray-600">Role & Department</TableHead>
                  <TableHead className="font-medium text-gray-600">Permissions</TableHead>
                  <TableHead className="font-medium text-gray-600">Last Login</TableHead>
                  <TableHead className="font-medium text-gray-600">Status</TableHead>
                  <TableHead className="font-medium text-gray-600 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <TableRow key={admin.id} className="border-gray-100 hover:bg-gray-50/50">
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={admin.avatar} />
                        <AvatarFallback className="bg-purple-100 text-purple-700 text-xs font-medium">
                          {admin.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {admin.role === 'Super Admin' && <Shield className="h-3 w-3 text-amber-500" />}
                          <span className="font-medium text-gray-900">{admin.name}</span>
                        </div>
                        <div className="text-sm text-gray-500">{admin.id}</div>
                        <div className="text-sm text-gray-500">{admin.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Badge variant={admin.role === 'Super Admin' ? 'default' : 'secondary'} 
                               className={admin.role === 'Super Admin' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-purple-50 text-purple-700 border-purple-200'}>
                          {admin.role}
                        </Badge>
                        <div className="text-sm text-gray-600">{admin.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {admin.permissions.slice(0, 2).map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                            {permission}
                          </Badge>
                        ))}
                        {admin.permissions.length > 2 && (
                          <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                            +{admin.permissions.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {admin.lastLogin}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={admin.status === 'Active' ? 'default' : 'secondary'} 
                             className={admin.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'}>
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-50">
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-50">
                          <Edit className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-amber-50">
                          <Key className="h-4 w-4 text-amber-600" />
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
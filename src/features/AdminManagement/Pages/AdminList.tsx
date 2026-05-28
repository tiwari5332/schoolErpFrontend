import { useState, useEffect } from 'react';
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
import { LocalStorageSync } from '../../../services/LocalStorageSync';

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
  const [admins, setAdmins] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  
  // Modals/Dialogs state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Selection state
  const [selectedAdmin, setSelectedAdmin] = useState<any | null>(null);
  const [editCandidate, setEditCandidate] = useState<any | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<any | null>(null);

  // Form inputs state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Academic Admin',
    department: 'Academics',
    permissions: [] as string[],
    status: 'Active'
  });

  useEffect(() => {
    const list = LocalStorageSync.get<any[]>("edu_trio_admins") || [];
    setAdmins(list);
  }, []);

  const saveAdminsToStorage = (updatedList: any[]) => {
    setAdmins(updatedList);
    LocalStorageSync.set("edu_trio_admins", updatedList);
  };

  const handlePermissionChange = (perm: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, perm]
        : prev.permissions.filter(p => p !== perm)
    }));
  };

  const handleOpenAddDialog = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Academic Admin',
      department: 'Academics',
      permissions: [],
      status: 'Active'
    });
    setIsAddDialogOpen(true);
  };

  const handleAddSubmit = () => {
    if (!formData.name || !formData.email) {
      alert("Name and Email are required.");
      return;
    }
    const newAdmin = {
      ...formData,
      id: `ADM${String(admins.length + 1).padStart(3, '0')}`,
      lastLogin: 'Never',
      createdDate: new Date().toISOString().split('T')[0],
      avatar: ''
    };
    const updated = [...admins, newAdmin];
    saveAdminsToStorage(updated);
    setIsAddDialogOpen(false);
  };

  const handleOpenEditDialog = (admin: any) => {
    setEditCandidate(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone || '',
      role: admin.role,
      department: admin.department,
      permissions: admin.permissions || [],
      status: admin.status
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (!editCandidate) return;
    const updated = admins.map(a => a.id === editCandidate.id ? {
      ...a,
      ...formData
    } : a);
    saveAdminsToStorage(updated);
    setIsEditDialogOpen(false);
    setEditCandidate(null);
  };

  const handleOpenDeleteDialog = (admin: any) => {
    setDeleteCandidate(admin);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSubmit = () => {
    if (!deleteCandidate) return;
    const updated = admins.filter(a => a.id !== deleteCandidate.id);
    saveAdminsToStorage(updated);
    setIsDeleteDialogOpen(false);
    setDeleteCandidate(null);
  };

  const handleViewAdmin = (admin: any) => {
    setSelectedAdmin(admin);
    setIsDetailDialogOpen(true);
  };

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
            <Button 
              onClick={handleOpenAddDialog}
              className="gap-2 gradient-purple text-white shadow-colored-purple hover:scale-[1.02] transition-all duration-200"
            >
              <UserPlus className="h-4 w-4" />
              Add Admin
            </Button>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Add New Admin</DialogTitle>
                <DialogDescription>Create a new administrator account with specific permissions</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter admin's full name" 
                    className="h-10" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="admin@school.edu" 
                    className="h-10" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone} 
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 000-0000" 
                    className="h-10" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">Role *</Label>
                  <Select value={formData.role} onValueChange={(val) => setFormData(prev => ({ ...prev, role: val }))}>
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
                  <Select value={formData.department} onValueChange={(val) => setFormData(prev => ({ ...prev, department: val }))}>
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
                        <Checkbox 
                          id={permission} 
                          checked={formData.permissions.includes(permission)} 
                          onCheckedChange={(checked) => handlePermissionChange(permission, !!checked)} 
                        />
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
                <Button onClick={handleAddSubmit} className="gradient-purple text-white shadow-colored-purple">
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
                  <TableHead className="font-medium text-slate-600 pl-6">Admin Info</TableHead>
                  <TableHead className="font-medium text-slate-600">Role</TableHead>
                  <TableHead className="font-medium text-slate-600">Department</TableHead>
                  <TableHead className="font-medium text-slate-600">Permissions</TableHead>
                  <TableHead className="font-medium text-slate-600">Status</TableHead>
                  <TableHead className="font-medium text-slate-600 text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <TableRow key={admin.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-1 ring-slate-200">
                          <AvatarImage src={admin.avatar} />
                          <AvatarFallback className="gradient-purple text-white font-medium text-xs">
                            {admin.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <div className="font-medium text-slate-900">{admin.name}</div>
                          <div className="text-xs text-slate-500">{admin.id}</div>
                          <div className="text-xs text-slate-500">{admin.email}</div>
                        </div>
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
                     <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewAdmin(admin)}
                          className="h-8 w-8 p-0 hover:bg-purple-50 hover:scale-110 transition-all duration-200"
                        >
                          <Eye className="h-4 w-4 text-purple-600" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleOpenEditDialog(admin)}
                          className="h-8 w-8 p-0 hover:bg-pink-50 hover:scale-110 transition-all duration-200"
                        >
                          <Edit className="h-4 w-4 text-pink-600" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleOpenDeleteDialog(admin)}
                          className="h-8 w-8 p-0 hover:bg-rose-50 hover:scale-110 transition-all duration-200"
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

      {/* Edit Admin Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Edit Admin</DialogTitle>
            <DialogDescription>Modify administrator details and permissions</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-sm font-medium">Full Name *</Label>
              <Input 
                id="edit-name" 
                value={formData.name} 
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} 
                className="h-10" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-sm font-medium">Email Address *</Label>
              <Input 
                id="edit-email" 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} 
                className="h-10" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone" className="text-sm font-medium">Phone Number</Label>
              <Input 
                id="edit-phone" 
                value={formData.phone} 
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} 
                className="h-10" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role" className="text-sm font-medium">Role *</Label>
              <Select value={formData.role} onValueChange={(val) => setFormData(prev => ({ ...prev, role: val }))}>
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
              <Label htmlFor="edit-department" className="text-sm font-medium">Department *</Label>
              <Select value={formData.department} onValueChange={(val) => setFormData(prev => ({ ...prev, department: val }))}>
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
              <Label htmlFor="edit-status" className="text-sm font-medium">Status *</Label>
              <Select value={formData.status} onValueChange={(val) => setFormData(prev => ({ ...prev, status: val }))}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-sm font-medium">Permissions</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {allPermissions.map(permission => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`edit-${permission}`} 
                      checked={formData.permissions.includes(permission)} 
                      onCheckedChange={(checked) => handlePermissionChange(permission, !!checked)} 
                    />
                    <label htmlFor={`edit-${permission}`} className="text-sm text-slate-600 cursor-pointer">
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} className="gradient-purple text-white shadow-colored-purple">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Admin Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-md glass-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Admin Details</DialogTitle>
          </DialogHeader>
          {selectedAdmin && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 ring-2 ring-purple-100">
                  <AvatarImage src={selectedAdmin.avatar} />
                  <AvatarFallback className="gradient-purple text-white font-semibold text-lg">
                    {selectedAdmin.name.split(' ').map((n: any) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{selectedAdmin.name}</h4>
                  <p className="text-sm text-slate-500">{selectedAdmin.id}</p>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-250 mt-1">{selectedAdmin.role}</Badge>
                </div>
              </div>
              <div className="border-t pt-4 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Email:</span>
                  <span className="text-slate-900">{selectedAdmin.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Phone:</span>
                  <span className="text-slate-900">{selectedAdmin.phone || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Department:</span>
                  <span className="text-slate-900">{selectedAdmin.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Status:</span>
                  <span className="text-slate-900">{selectedAdmin.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Created Date:</span>
                  <span className="text-slate-900">{selectedAdmin.createdDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Last Login:</span>
                  <span className="text-slate-900">{selectedAdmin.lastLogin}</span>
                </div>
                <div className="space-y-1.5 pt-2">
                  <span className="text-slate-500 font-medium block">Assigned Permissions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAdmin.permissions.map((p: any) => (
                      <Badge key={p} variant="outline" className="bg-slate-50 text-slate-700 text-xs px-2 py-0.5 rounded-md border-slate-200">{p}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={() => setIsDetailDialogOpen(false)} className="gradient-purple text-white">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-rose-650">Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you absolutely sure you want to delete administrator <span className="font-semibold">{deleteCandidate?.name}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteSubmit} className="bg-rose-650 hover:bg-rose-700 text-white font-semibold shadow-colored-rose">
              Delete Admin
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminList;
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
import { LocalStorageSync } from '@/services/LocalStorageSync';
import { useAdminsList, useCreateAdmin, useUpdateAdmin, useDeleteAdmin } from '@/api/queries/useAdminsQuery';
import { useUIFilters } from '@/store';

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

interface AdminMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  permissions: string[];
  avatar?: string;
}

export function AdminList() {
  const { searchQuery, setSearchQuery } = useUIFilters();
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const { admins, isLoading } = useAdminsList({
    search: searchQuery,
    department: selectedDepartment !== 'all' ? selectedDepartment : undefined,
  });

  const createAdminMutation = useCreateAdmin();
  const updateAdminMutation = useUpdateAdmin();
  const deleteAdminMutation = useDeleteAdmin();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminMember | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: roles[0],
    department: departments[0],
    status: 'active' as 'active' | 'inactive',
    permissions: [] as string[],
  });

  const handleCreateAdmin = () => {
    createAdminMutation.mutate(formData, {
      onSuccess: () => {
        setIsAddModalOpen(false);
        setFormData({
          name: '',
          email: '',
          role: roles[0],
          department: departments[0],
          status: 'active',
          permissions: [],
        });
      },
    });
  };

  const handleUpdateAdmin = () => {
    if (!selectedAdmin) return;
    updateAdminMutation.mutate(
      { id: selectedAdmin.id, ...formData },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setSelectedAdmin(null);
        },
      }
    );
  };

  const handleDeleteAdmin = (id: string) => {
    deleteAdminMutation.mutate(id);
  };

  const togglePermission = (perm: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Admin Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage system administrators, roles, and security permissions</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md rounded-xl text-xs font-semibold h-10 px-4"
        >
          <UserPlus className="h-4 w-4" />
          Add Administrator
        </Button>
      </div>

      <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search administrators by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-xl border-slate-200 h-10 text-sm"
            />
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full md:w-[200px] rounded-xl border-slate-200 h-10 text-sm">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow className="border-b border-slate-200/80">
                <TableHead className="font-semibold text-xs text-slate-700 pl-6">Administrator</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Role</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Department</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700">Status</TableHead>
                <TableHead className="font-semibold text-xs text-slate-700 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-xs text-slate-500">
                    Loading administrators...
                  </TableCell>
                </TableRow>
              ) : admins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Users className="h-8 w-8 mb-2 opacity-50" />
                      <p className="text-sm font-semibold text-slate-600">No administrators found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                admins.map((adm: AdminMember) => (
                  <TableRow key={adm.id} className="border-b border-slate-100 hover:bg-slate-50/60">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-slate-200">
                          <AvatarImage src={adm.avatar} data-src={adm.avatar} />
                          <AvatarFallback className="bg-indigo-50 text-indigo-700 text-xs font-bold">
                            {adm.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{adm.name}</div>
                          <div className="text-[11px] text-slate-500">{adm.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-[11px]">
                        {adm.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">{adm.department}</TableCell>
                    <TableCell>
                      <Badge className={adm.status === 'active' ? 'bg-emerald-100 text-emerald-700 border-0' : 'bg-slate-100 text-slate-600 border-0'}>
                        {adm.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedAdmin(adm);
                            setIsDetailModalOpen(true);
                          }}
                          className="h-8 w-8 p-0 text-slate-500 hover:text-indigo-600"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedAdmin(adm);
                            setFormData({
                              name: adm.name,
                              email: adm.email,
                              role: adm.role,
                              department: adm.department,
                              status: adm.status,
                              permissions: adm.permissions || [],
                            });
                            setIsEditModalOpen(true);
                          }}
                          className="h-8 w-8 p-0 text-slate-500 hover:text-amber-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteAdmin(adm.id)}
                          className="h-8 w-8 p-0 text-slate-500 hover:text-rose-600"
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
        </CardContent>
      </Card>
    </div>
  );
}

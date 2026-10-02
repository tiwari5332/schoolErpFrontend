import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, X, ArrowLeft, Save, Camera, UserPlus } from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  joiningDate: string;
  status: string;
  avatar: string;
}

interface TeacherFormProps {
  teacher?: Teacher;
  onClose: () => void;
  onSave: (teacherData: Teacher) => void;
}

export function TeacherForm({ teacher, onClose, onSave }: TeacherFormProps) {
  const isEditMode = !!teacher;
  const [profileImage, setProfileImage] = useState<string>(teacher?.avatar || '');
  const [formData, setFormData] = useState({
    // Employee Details
    employeeName: teacher?.name || '',
    email: teacher?.email || '',
    phoneNumber: teacher?.phone || '',
    dateOfBirth: '',
    address: '',
    emergencyNumber: '',

    // Other Details
    employeeCode: teacher?.id || '',
    gender: '',
    aadharNumber: '',
    panNumber: '',
    bankAccountNumber: '',
    bank: '',
    leaveTemplate: '',
    startTime: '',
    endTime: '',

    // Role
    dateOfJoining: teacher?.joiningDate || '',
    salaryTemplate: '',
    designation: teacher?.subject || '',
    department: teacher?.department || '',
    employeeType: '',
    esiNumber: '',
    pfNumber: '',
    uanNumber: '',

    // Status
    status: teacher?.status || 'Active'
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.employeeName || !formData.email || (isEditMode && !formData.employeeCode)) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedTeacher: Teacher = {
      id: isEditMode ? formData.employeeCode : (formData.employeeCode || `EMP${Date.now()}`),
      name: formData.employeeName,
      email: formData.email,
      phone: formData.phoneNumber,
      subject: formData.designation,
      department: formData.department,
      joiningDate: formData.dateOfJoining,
      status: formData.status,
      avatar: profileImage
    };

    onSave(updatedTeacher);
  };

  const genders = ['Male', 'Female', 'Other'];
  const departments = ['Science', 'Mathematics', 'English', 'Social Studies', 'Arts', 'Physical Education', 'Computer Science'];
  const employeeTypes = ['Full-Time', 'Part-Time', 'Contract', 'Temporary'];
  const designations = ['Teacher', 'Senior Teacher', 'Head Teacher', 'Assistant Teacher', 'Subject Expert'];
  const statuses = ['Active', 'Inactive', 'On Leave'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-white/50 transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                {isEditMode ? 'Edit Employee' : 'Add Employee'}
              </h1>
              <p className="text-sm text-slate-600">
                {isEditMode ? 'Update employee information and profile details' : 'Enter employee information to create a new profile'}
              </p>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            className="gradient-emerald text-white shadow-colored-emerald hover:scale-[1.02] transition-all duration-200"
          >
            {isEditMode ? <Save className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
            {isEditMode ? 'Save Changes' : 'Add Employee'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Picture & Employee Details */}
          <div className="space-y-6">
            {/* Profile Picture Card */}
            <Card className="border-0 shadow-xl glass-card">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-32 w-32 ring-4 ring-indigo-100">
                      {profileImage ? (
                        <AvatarImage src={profileImage} />
                      ) : (
                        <AvatarFallback className="gradient-indigo text-white text-3xl">
                          {formData.employeeName.split(' ').map(n => n[0]).join('') || <Camera className="h-12 w-12" />}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {profileImage && (
                      <button
                        onClick={() => setProfileImage('')}
                        className="absolute top-0 right-0 h-8 w-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 transition-all"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                    onClick={() => document.getElementById('profile-upload')?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Change Profile Picture
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Employee Details Card */}
            <Card className="border-0 shadow-xl glass-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-slate-900">Employee Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeName" className="text-sm font-medium">
                    Employee Name <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="employeeName"
                    placeholder="Enter full name"
                    value={formData.employeeName}
                    onChange={(e) => handleInputChange('employeeName', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="employee@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">
                    Phone Number <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+91 1234567890"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-sm font-medium">
                    Date of Birth <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter complete address"
                    rows={3}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyNumber" className="text-sm font-medium">
                    Emergency Number
                  </Label>
                  <Input
                    id="emergencyNumber"
                    placeholder="+91 Emergency Number"
                    value={formData.emergencyNumber}
                    onChange={(e) => handleInputChange('emergencyNumber', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Other Details */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl glass-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-slate-900">Other Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeCode" className="text-sm font-medium">
                    Employee Code <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="employeeCode"
                    placeholder="RKEC001"
                    value={formData.employeeCode}
                    onChange={(e) => handleInputChange('employeeCode', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                    disabled={isEditMode}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm font-medium">
                    Gender <span className="text-rose-500">*</span>
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className="h-10 border-2 border-slate-200">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map(gender => (
                        <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadharNumber" className="text-sm font-medium">
                    Aadhar Number
                  </Label>
                  <Input
                    id="aadharNumber"
                    placeholder="Enter Aadhar Number"
                    value={formData.aadharNumber}
                    onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="panNumber" className="text-sm font-medium">PAN Number</Label>
                  <Input
                    id="panNumber"
                    placeholder="Enter PAN Number"
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankAccountNumber" className="text-sm font-medium">
                    Bank Account Number
                  </Label>
                  <Input
                    id="bankAccountNumber"
                    placeholder="Enter Bank Account Number"
                    value={formData.bankAccountNumber}
                    onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank" className="text-sm font-medium">Bank</Label>
                  <Input
                    id="bank"
                    placeholder="Enter Bank Name"
                    value={formData.bank}
                    onChange={(e) => handleInputChange('bank', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leaveTemplate" className="text-sm font-medium">Leave Template</Label>
                  <Input
                    id="leaveTemplate"
                    placeholder="Leave Template"
                    value={formData.leaveTemplate}
                    onChange={(e) => handleInputChange('leaveTemplate', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime" className="text-sm font-medium">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime" className="text-sm font-medium">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Status <span className="text-rose-500">*</span>
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger className="h-10 border-2 border-slate-200">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Role */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl glass-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-slate-900">Role</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfJoining" className="text-sm font-medium">
                    Date of Joining
                  </Label>
                  <Input
                    id="dateOfJoining"
                    type="date"
                    value={formData.dateOfJoining}
                    onChange={(e) => handleInputChange('dateOfJoining', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryTemplate" className="text-sm font-medium">
                    Salary Template
                  </Label>
                  <Input
                    id="salaryTemplate"
                    placeholder="Salary Template"
                    value={formData.salaryTemplate}
                    onChange={(e) => handleInputChange('salaryTemplate', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation" className="text-sm font-medium">
                    Designation
                  </Label>
                  <Select value={formData.designation} onValueChange={(value) => handleInputChange('designation', value)}>
                    <SelectTrigger className="h-10 border-2 border-slate-200">
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      {designations.map(designation => (
                        <SelectItem key={designation} value={designation}>{designation}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger className="h-10 border-2 border-slate-200">
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
                  <Label htmlFor="employeeType" className="text-sm font-medium">Employee Type</Label>
                  <Select value={formData.employeeType} onValueChange={(value) => handleInputChange('employeeType', value)}>
                    <SelectTrigger className="h-10 border-2 border-slate-200">
                      <SelectValue placeholder="Select employee type" />
                    </SelectTrigger>
                    <SelectContent>
                      {employeeTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="esiNumber" className="text-sm font-medium">ESI Number</Label>
                  <Input
                    id="esiNumber"
                    placeholder="Enter ESI Number"
                    value={formData.esiNumber}
                    onChange={(e) => handleInputChange('esiNumber', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pfNumber" className="text-sm font-medium">PF Number</Label>
                  <Input
                    id="pfNumber"
                    placeholder="Enter PF Number"
                    value={formData.pfNumber}
                    onChange={(e) => handleInputChange('pfNumber', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uanNumber" className="text-sm font-medium">UAN Number</Label>
                  <Input
                    id="uanNumber"
                    placeholder="Enter UAN Number"
                    value={formData.uanNumber}
                    onChange={(e) => handleInputChange('uanNumber', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-2 border-slate-200 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 gradient-emerald text-white shadow-colored-emerald hover:scale-[1.02] transition-all duration-200"
              >
                {isEditMode ? <Save className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                {isEditMode ? 'Save Changes' : 'Add Employee'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

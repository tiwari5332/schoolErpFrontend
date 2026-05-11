import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Upload, X, ArrowLeft, Save, UserPlus, Camera } from "lucide-react";
import { Student, GRADES, BLOOD_GROUPS, GENDERS, RELATIONS, STATUSES } from '../constant';

interface StudentFormProps {
  student?: Student; // If provided, form is in edit mode
  onClose: () => void;
  onSave: (studentData: Student) => void;
}

export function StudentForm({ student, onClose, onSave }: StudentFormProps) {
  const isEditMode = !!student;
  const [profileImage, setProfileImage] = useState<string>(student?.avatar || '');

  const [formData, setFormData] = useState({
    // Student Details
    studentName: student?.name || '',
    email: student?.email || '',
    phoneNumber: student?.phone || '',
    dateOfBirth: '',
    address: student?.address || '',
    emergencyContact: '',
    
    // Other Details
    studentCode: student?.id || '',
    gender: '',
    aadharNumber: '',
    bloodGroup: '',
    nationality: '',
    religion: '',
    
    // Academic Details
    dateOfAdmission: student?.admissionDate || '',
    grade: student?.grade || '',
    classSection: student?.class || '',
    rollNumber: '',
    previousSchool: '',
    
    // Guardian Details
    guardianName: student?.guardian || '',
    guardianRelation: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianOccupation: '',
    guardianAddress: '',

    // Status
    status: student?.status || 'Active'
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
    if (!formData.studentName || !formData.grade || !formData.guardianName) {
      alert('Please fill in all required fields');
      return;
    }
    
    const submittedStudent: Student = {
      id: isEditMode ? formData.studentCode : (formData.studentCode || `STU${Date.now()}`),
      name: formData.studentName,
      email: formData.email,
      grade: formData.grade,
      class: formData.classSection,
      phone: formData.phoneNumber,
      address: formData.address,
      status: formData.status,
      admissionDate: formData.dateOfAdmission,
      guardian: formData.guardianName,
      avatar: profileImage
    };

    onSave(submittedStudent);
  };

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
              <h1 className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isEditMode ? 'from-indigo-600 via-purple-600 to-cyan-600' : 'from-indigo-600 via-purple-600 to-cyan-600'}`}>
                {isEditMode ? 'Edit Student' : 'Add Student'}
              </h1>
              <p className="text-sm text-slate-600">
                {isEditMode ? 'Update student information and profile details' : 'Enter student information to create a new profile'}
              </p>
            </div>
          </div>
          <Button 
            onClick={handleSubmit}
            className={`${isEditMode ? 'gradient-emerald shadow-colored-emerald' : 'gradient-indigo shadow-colored-indigo'} text-white hover:scale-[1.02] transition-all duration-200`}
          >
            {isEditMode ? <Save className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
            {isEditMode ? 'Save Changes' : 'Add Student'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Picture & Student Details */}
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
                          {isEditMode && formData.studentName ? formData.studentName.split(' ').map(n => n[0]).join('') : <Camera className="h-12 w-12" />}
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

            {/* Student Details Card */}
            <Card className="border-0 shadow-xl glass-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-slate-900">Student Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName" className="text-sm font-medium">
                    Student Name <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="studentName"
                    placeholder="Enter full name"
                    value={formData.studentName}
                    onChange={(e) => handleInputChange('studentName', e.target.value)}
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
                    placeholder="student@email.com"
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
                  <Label htmlFor="emergencyContact" className="text-sm font-medium">
                    Emergency Contact Number
                  </Label>
                  <Input
                    id="emergencyContact"
                    placeholder="+91 Emergency Number"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
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
                  <Label htmlFor="studentCode" className="text-sm font-medium">
                    Student Code <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="studentCode"
                    placeholder="STU001"
                    value={formData.studentCode}
                    onChange={(e) => handleInputChange('studentCode', e.target.value)}
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
                      {GENDERS.map(gender => (
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
                  <Label htmlFor="bloodGroup" className="text-sm font-medium">Blood Group</Label>
                  <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                    <SelectTrigger className="h-10 border-2 border-slate-200">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {BLOOD_GROUPS.map(group => (
                        <SelectItem key={group} value={group}>{group}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality" className="text-sm font-medium">Nationality</Label>
                  <Input
                    id="nationality"
                    placeholder="Enter Nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="religion" className="text-sm font-medium">Religion</Label>
                  <Input
                    id="religion"
                    placeholder="Enter Religion"
                    value={formData.religion}
                    onChange={(e) => handleInputChange('religion', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                {isEditMode && (
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium">
                      Status <span className="text-rose-500">*</span>
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger className="h-10 border-2 border-slate-200">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Academic Details Card */}
            <Card className="border-0 shadow-xl glass-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-slate-900">Academic Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfAdmission" className="text-sm font-medium">
                    Date of Admission
                  </Label>
                  <Input
                    id="dateOfAdmission"
                    type="date"
                    value={formData.dateOfAdmission}
                    onChange={(e) => handleInputChange('dateOfAdmission', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-sm font-medium">
                    Grade <span className="text-rose-500">*</span>
                  </Label>
                  <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)}>
                    <SelectTrigger className="h-10 border-2 border-slate-200">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {GRADES.map(grade => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="classSection" className="text-sm font-medium">
                    Class Section
                  </Label>
                  <Input
                    id="classSection"
                    placeholder="e.g., A, B, C"
                    value={formData.classSection}
                    onChange={(e) => handleInputChange('classSection', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rollNumber" className="text-sm font-medium">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    placeholder="Enter roll number"
                    value={formData.rollNumber}
                    onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="previousSchool" className="text-sm font-medium">
                    Previous School
                  </Label>
                  <Input
                    id="previousSchool"
                    placeholder="Enter previous school name"
                    value={formData.previousSchool}
                    onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Guardian Details */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl glass-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-slate-900">Guardian Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="guardianName" className="text-sm font-medium">
                    Guardian Name <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="guardianName"
                    placeholder="Enter guardian's full name"
                    value={formData.guardianName}
                    onChange={(e) => handleInputChange('guardianName', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianRelation" className="text-sm font-medium">
                    Relation <span className="text-rose-500">*</span>
                  </Label>
                  <Select value={formData.guardianRelation} onValueChange={(value) => handleInputChange('guardianRelation', value)}>
                    <SelectTrigger className="h-10 border-2 border-slate-200">
                      <SelectValue placeholder="Select relation" />
                    </SelectTrigger>
                    <SelectContent>
                      {RELATIONS.map(relation => (
                        <SelectItem key={relation} value={relation}>{relation}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianPhone" className="text-sm font-medium">
                    Guardian Phone <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="guardianPhone"
                    placeholder="+91 Guardian Phone"
                    value={formData.guardianPhone}
                    onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianEmail" className="text-sm font-medium">
                    Guardian Email
                  </Label>
                  <Input
                    id="guardianEmail"
                    type="email"
                    placeholder="guardian@email.com"
                    value={formData.guardianEmail}
                    onChange={(e) => handleInputChange('guardianEmail', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianOccupation" className="text-sm font-medium">
                    Guardian Occupation
                  </Label>
                  <Input
                    id="guardianOccupation"
                    placeholder="Enter occupation"
                    value={formData.guardianOccupation}
                    onChange={(e) => handleInputChange('guardianOccupation', e.target.value)}
                    className="h-10 border-2 border-slate-200 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianAddress" className="text-sm font-medium">
                    Guardian Address
                  </Label>
                  <Textarea
                    id="guardianAddress"
                    placeholder="Enter guardian's address"
                    rows={3}
                    value={formData.guardianAddress}
                    onChange={(e) => handleInputChange('guardianAddress', e.target.value)}
                    className="border-2 border-slate-200 focus:border-indigo-300"
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
                className={`flex-1 ${isEditMode ? 'gradient-emerald shadow-colored-emerald' : 'gradient-indigo shadow-colored-indigo'} text-white hover:scale-[1.02] transition-all duration-200`}
              >
                {isEditMode ? <Save className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                {isEditMode ? 'Save Changes' : 'Add Student'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

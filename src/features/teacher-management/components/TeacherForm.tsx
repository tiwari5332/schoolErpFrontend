import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FormStepper, StepItem } from "@/components/ui/FormStepper";
import { 
  ArrowLeft, 
  ArrowRight,
  Save, 
  UserPlus,
  User,
  Building2,
  FileText,
  Clock,
  ShieldCheck,
  UploadCloud,
  AlertCircle
} from "lucide-react";

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

const STEP_ITEMS: StepItem[] = [
  { id: 'profile', label: 'Staff Profile', subtitle: 'Personal & Photo Details', icon: User },
  { id: 'role', label: 'Role & Department', subtitle: 'Designation & Joining', icon: Building2 },
  { id: 'identity', label: 'Identity & Accounts', subtitle: 'Aadhar, PAN & Bank', icon: FileText },
  { id: 'schedule', label: 'Work Schedule & Leave', subtitle: 'Timing & Salary Template', icon: Clock },
  { id: 'statutory', label: 'Statutory Details', subtitle: 'ESI, PF & UAN Numbers', icon: ShieldCheck },
];

export function TeacherForm({ teacher, onClose, onSave }: TeacherFormProps) {
  const isEditMode = !!teacher;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [profileImage, setProfileImage] = useState<string>(teacher?.avatar || '');
  const [signatureImage, setSignatureImage] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

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
    employeeType: 'Full-Time',
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

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (formError) setFormError(null);
  };

  const validateStep = (stepIndex: number): Record<string, string> => {
    const errs: Record<string, string> = {};

    if (stepIndex === 0) {
      if (!formData.employeeName.trim()) {
        errs.employeeName = 'Staff Name is required';
      }
      if (!formData.email.trim()) {
        errs.email = 'E-mail ID is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address';
      }
      if (!formData.phoneNumber.trim()) {
        errs.phoneNumber = 'Phone number is required';
      }
      if (!formData.dateOfBirth) {
        errs.dateOfBirth = 'Date of Birth is required';
      }
      if (!formData.gender) {
        errs.gender = 'Gender is required';
      }
    }

    if (stepIndex === 1) {
      if (!formData.employeeCode.trim() && !isEditMode) {
        errs.employeeCode = 'Employee Code is required';
      }
      if (!formData.designation) {
        errs.designation = 'Designation is required';
      }
      if (!formData.department) {
        errs.department = 'Department is required';
      }
      if (!formData.dateOfJoining) {
        errs.dateOfJoining = 'Date of Joining is required';
      }
      if (!formData.status) {
        errs.status = 'Initial Status is required';
      }
    }

    return errs;
  };

  const handleNextStep = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setFormError('Please fill in all required fields before proceeding to the next step.');
      return;
    }
    setErrors({});
    setFormError(null);
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setErrors({});
    setFormError(null);
    setCurrentStep(prev => prev - 1);
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep <= currentStep) {
      setErrors({});
      setFormError(null);
      setCurrentStep(targetStep);
      return;
    }

    for (let s = 0; s < targetStep; s++) {
      const stepErrors = validateStep(s);
      if (Object.keys(stepErrors).length > 0) {
        setCurrentStep(s);
        setErrors(stepErrors);
        setFormError(`Please fill in all required fields in Step ${s + 1} (${STEP_ITEMS[s].label}) first.`);
        return;
      }
    }

    setErrors({});
    setFormError(null);
    setCurrentStep(targetStep);
  };

  const handleSubmit = () => {
    for (let s = 0; s < STEP_ITEMS.length; s++) {
      const stepErrors = validateStep(s);
      if (Object.keys(stepErrors).length > 0) {
        setCurrentStep(s);
        setErrors(stepErrors);
        setFormError(`Please fill in all required fields in Step ${s + 1} (${STEP_ITEMS[s].label}) before submitting.`);
        return;
      }
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
    <div className="min-h-screen bg-slate-50/60 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* 5-Step Horizontal Form Stepper matching reference screenshot */}
        <FormStepper
          steps={STEP_ITEMS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        {/* Main Step Section Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Top Form Error Alert Banner */}
          {formError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
              <button 
                type="button"
                onClick={() => setFormError(null)}
                className="text-rose-500 hover:text-rose-700 text-sm font-bold px-1"
              >
                ✕
              </button>
            </div>
          )}

          {/* STEP 1: STAFF PROFILE */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <User className="h-5 w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-wide uppercase">
                  STAFF PROFILE
                </h3>
              </div>

              {/* Photo & Signature Upload Box matching reference screenshot */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 items-center">
                {/* Photo Upload */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 ring-4 ring-indigo-100/80 bg-white">
                    {profileImage ? (
                      <AvatarImage src={profileImage} />
                    ) : (
                      <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold text-lg">
                        STA
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">Staff Photo</span>
                    <p className="text-[11px] text-slate-500">Upload ID card photo (JPG/PNG)</p>
                    <input
                      type="file"
                      id="photo-upload-input"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('photo-upload-input')?.click()}
                      className="h-8 px-3 rounded-xl text-[11px] font-semibold border-slate-200 hover:bg-white text-slate-700 gap-1.5"
                    >
                      <UploadCloud className="h-3.5 w-3.5 text-indigo-500" />
                      Photo Upload
                    </Button>
                  </div>
                </div>

                {/* Signature Upload */}
                <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-200/60 pt-4 md:pt-0 md:pl-6">
                  <div className="h-20 w-36 rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-center p-2">
                    {signatureImage ? (
                      <img src={signatureImage} alt="Sig" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Not uploaded</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">Staff Signature</span>
                    <p className="text-[11px] text-slate-500">Upload digital signature</p>
                    <input
                      type="file"
                      id="sig-upload-input"
                      accept="image/*"
                      onChange={handleSignatureUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('sig-upload-input')?.click()}
                      className="h-8 px-3 rounded-xl text-[11px] font-semibold border-slate-200 hover:bg-white text-slate-700 gap-1.5"
                    >
                      <UploadCloud className="h-3.5 w-3.5 text-indigo-500" />
                      Upload Sig
                    </Button>
                  </div>
                </div>
              </div>

              {/* Form Input Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="employeeName" className="text-xs font-semibold text-slate-700">
                    Staff Name <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="employeeName"
                    placeholder="Enter full name"
                    value={formData.employeeName}
                    onChange={(e) => handleInputChange('employeeName', e.target.value)}
                    className={`h-11 rounded-xl text-xs focus:ring-indigo-100 ${
                      errors.employeeName ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                  {errors.employeeName && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.employeeName}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                    E-mail ID <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="employee@school.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`h-11 rounded-xl text-xs focus:ring-indigo-100 ${
                      errors.email ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phoneNumber" className="text-xs font-semibold text-slate-700">
                    Phone Number <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+91 88788 77677"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={`h-11 rounded-xl text-xs focus:ring-indigo-100 ${
                      errors.phoneNumber ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.phoneNumber}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="dateOfBirth" className="text-xs font-semibold text-slate-700">
                    Date of Birth <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={`h-11 rounded-xl text-xs focus:ring-indigo-100 ${
                      errors.dateOfBirth ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="gender" className="text-xs font-semibold text-slate-700">
                    Gender <span className="text-rose-500">*</span>
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className={`h-11 rounded-xl text-xs ${
                      errors.gender ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-indigo-500'
                    }`}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map(g => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.gender}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="emergencyNumber" className="text-xs font-semibold text-slate-700">
                    Emergency Contact Number
                  </Label>
                  <Input
                    id="emergencyNumber"
                    placeholder="+91 Emergency Contact"
                    value={formData.emergencyNumber}
                    onChange={(e) => handleInputChange('emergencyNumber', e.target.value)}
                    className="h-11 rounded-xl border-slate-200 text-xs focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-3">
                  <Label htmlFor="address" className="text-xs font-semibold text-slate-700">
                    Complete Address
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter complete residential address"
                    rows={2}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="rounded-xl border-slate-200 text-xs focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ROLE & DEPARTMENT */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-wide uppercase">
                  ROLE & DEPARTMENT DETAILS
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="employeeCode" className="text-xs font-semibold text-slate-700">
                    Employee Code <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="employeeCode"
                    placeholder="EMP001"
                    value={formData.employeeCode}
                    onChange={(e) => handleInputChange('employeeCode', e.target.value)}
                    className={`h-11 rounded-xl text-xs focus:ring-indigo-100 ${
                      errors.employeeCode ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                    disabled={isEditMode}
                  />
                  {errors.employeeCode && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.employeeCode}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="designation" className="text-xs font-semibold text-slate-700">
                    Designation / Role <span className="text-rose-500">*</span>
                  </Label>
                  <Select value={formData.designation} onValueChange={(value) => handleInputChange('designation', value)}>
                    <SelectTrigger className={`h-11 rounded-xl text-xs ${
                      errors.designation ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-indigo-500'
                    }`}>
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      {designations.map(d => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.designation && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.designation}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="department" className="text-xs font-semibold text-slate-700">
                    Department <span className="text-rose-500">*</span>
                  </Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger className={`h-11 rounded-xl text-xs ${
                      errors.department ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-indigo-500'
                    }`}>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(d => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.department}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="employeeType" className="text-xs font-semibold text-slate-700">
                    Employment Type
                  </Label>
                  <Select value={formData.employeeType} onValueChange={(value) => handleInputChange('employeeType', value)}>
                    <SelectTrigger className="h-11 rounded-xl border-slate-200 text-xs focus:border-indigo-500">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {employeeTypes.map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="dateOfJoining" className="text-xs font-semibold text-slate-700">
                    Date of Joining <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="dateOfJoining"
                    type="date"
                    value={formData.dateOfJoining}
                    onChange={(e) => handleInputChange('dateOfJoining', e.target.value)}
                    className={`h-11 rounded-xl text-xs focus:ring-indigo-100 ${
                      errors.dateOfJoining ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                  {errors.dateOfJoining && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.dateOfJoining}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="status" className="text-xs font-semibold text-slate-700">
                    Initial Status <span className="text-rose-500">*</span>
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger className={`h-11 rounded-xl text-xs ${
                      errors.status ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-indigo-500'
                    }`}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.status}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: IDENTITY & ACCOUNTS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-wide uppercase">
                  IDENTITY & BANK ACCOUNTS
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="aadharNumber" className="text-xs font-semibold text-slate-700">
                    Aadhar Card Number
                  </Label>
                  <Input
                    id="aadharNumber"
                    placeholder="12 Digit Aadhar Number"
                    value={formData.aadharNumber}
                    onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                    className="h-11 rounded-xl border-slate-200 text-xs focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="panNumber" className="text-xs font-semibold text-slate-700">
                    PAN Card Number
                  </Label>
                  <Input
                    id="panNumber"
                    placeholder="10 Digit PAN Number"
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value)}
                    className="h-11 rounded-xl border-slate-200 text-xs focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bank" className="text-xs font-semibold text-slate-700">
                    Bank Name
                  </Label>
                  <Input
                    id="bank"
                    placeholder="Enter Bank Name"
                    value={formData.bank}
                    onChange={(e) => handleInputChange('bank', e.target.value)}
                    className="h-11 rounded-xl border-slate-200 text-xs focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bankAccountNumber" className="text-xs font-semibold text-slate-700">
                    Bank Account Number
                  </Label>
                  <Input
                    id="bankAccountNumber"
                    placeholder="Enter Bank Account Number"
                    value={formData.bankAccountNumber}
                    onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
                    className="h-11 rounded-xl border-slate-200 text-xs focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: WORK SCHEDULE & LEAVE */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-wide uppercase">
                  WORK SCHEDULE & SALARY TEMPLATE
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="startTime" className="text-xs font-semibold text-slate-700">
                    Shift Start Time
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    className="h-11 rounded-xl border-slate-200 text-xs focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="endTime" className="text-xs font-semibold text-slate-700">
                    Shift End Time
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    className="h-11 rounded-xl border-slate-200 text-xs focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="leaveTemplate" className="text-xs font-semibold text-slate-700">
                    Leave Template
                  </Label>
                  <Input
                    id="leaveTemplate"
                    placeholder="Standard Leave Template"
                    value={formData.leaveTemplate}
                    onChange={(e) => handleInputChange('leaveTemplate', e.target.value)}
                    className="h-11 rounded-xl border-slate-200 text-xs focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="salaryTemplate" className="text-xs font-semibold text-slate-700">
                    Salary Template
                  </Label>
                  <Input
                    id="salaryTemplate"
                    placeholder="Faculty Grade-A Template"
                    value={formData.salaryTemplate}
                    onChange={(e) => handleInputChange('salaryTemplate', e.target.value)}
                    className="h-11 rounded-xl border-slate-200 text-xs focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: STATUTORY DETAILS */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-wide uppercase">
                  STATUTORY & PF DETAILS
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="esiNumber" className="text-xs font-semibold text-slate-700">
                    ESI Number
                  </Label>
                  <Input
                    id="esiNumber"
                    placeholder="ESI Registration No."
                    value={formData.esiNumber}
                    onChange={(e) => handleInputChange('esiNumber', e.target.value)}
                    className="h-11 rounded-xl border-slate-200 text-xs focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="pfNumber" className="text-xs font-semibold text-slate-700">
                    PF Account Number
                  </Label>
                  <Input
                    id="pfNumber"
                    placeholder="PF Account No."
                    value={formData.pfNumber}
                    onChange={(e) => handleInputChange('pfNumber', e.target.value)}
                    className="h-11 rounded-xl border-slate-200 text-xs focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="uanNumber" className="text-xs font-semibold text-slate-700">
                    UAN Number
                  </Label>
                  <Input
                    id="uanNumber"
                    placeholder="Universal Account Number"
                    value={formData.uanNumber}
                    onChange={(e) => handleInputChange('uanNumber', e.target.value)}
                    className="h-11 rounded-xl border-slate-200 text-xs focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation Action Bar matching reference screenshot */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 px-5 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
            >
              Cancel
            </Button>

            <div className="flex items-center gap-3">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="h-11 px-5 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" /> Previous
                </Button>
              )}

              {currentStep < STEP_ITEMS.length - 1 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 text-xs font-semibold gap-2"
                >
                  Next Step <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 text-xs font-semibold gap-2"
                >
                  {isEditMode ? <Save className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                  {isEditMode ? 'Save Changes' : 'Submit Staff Profile'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherForm;

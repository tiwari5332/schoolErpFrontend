import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { DatePicker } from "../../../components/ui/date-picker";
import { Checkbox } from "../../../components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { FormStepper, StepItem } from "../../../components/ui/FormStepper";
import { cn } from "../../../components/ui/utils";
import {
  Upload,
  ArrowLeft,
  ArrowRight,
  Save,
  UserPlus,
  User,
  GraduationCap,
  MapPin,
  Users,
  FileText,
  CheckCircle2,
  FileUp,
  Camera
} from "lucide-react";
import { GRADES, BLOOD_GROUPS, GENDERS, RELATIONS, Student } from '../constant';
import { STUDENT_FIELD_KEYS, buildStudentPayload } from '../constant/studentKeys';

interface StudentFormProps {
  student?: Student; // If provided, form is in edit mode
  onClose: () => void;
  onSave: (studentData: Student) => void;
}

const STEP_ITEMS: StepItem[] = [
  { id: 'profile', label: 'Student Profile', subtitle: 'Personal & Photo Details', icon: User },
  { id: 'academic', label: 'Academic Details', subtitle: 'Class, Section & Reg', icon: GraduationCap },
  { id: 'personal', label: 'Personal & Address', subtitle: 'Location & Religion', icon: MapPin },
  { id: 'family', label: 'Family & History', subtitle: 'Parent & Previous School', icon: Users },
  { id: 'documents', label: 'Identity & Docs', subtitle: 'Upload Certificates', icon: FileText },
];

export function StudentForm({ student, onClose, onSave }: StudentFormProps) {
  const isEditMode = !!student;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [profileImage, setProfileImage] = useState<string>(student?.avatar || '');
  const [signatureImage, setSignatureImage] = useState<string>('');
  const [documents, setDocuments] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    // Step 1: STUDENT PROFILE
    studentName: student?.name || '',
    email: student?.email || '',
    altEmail: student?.altEmail || '',
    smsContactNumber: student?.smsContactNumber || '+91 88788 77677',
    studentPhoneNumber: student?.phone || '',
    dateOfBirth: student?.dateOfBirth || '',
    gender: student?.gender || '',

    // Step 2: ACADEMIC DETAILS
    academicYear: student?.academicYear || '2024-2025',
    admissionNumber: student?.id || '',
    grade: student?.grade || '',
    classSection: student?.class || '',
    rollNumber: student?.rollNumber || '',
    secondLanguage: student?.secondLanguage || '',
    admissionFormNumber: student?.admissionFormNumber || '',
    admissionRegNumber: student?.admissionRegNumber || '',
    tRegNo: student?.tRegNo || '',
    entranceRegNo: student?.entranceRegNo || '',
    dateOfAdmission: student?.admissionDate || '',
    status: student?.status || 'Active',

    // Step 3: PERSONAL & ADDRESS
    bloodGroup: student?.bloodGroup || '',
    nationality: student?.nationality || 'Indian',
    category: student?.category || 'General',
    religion: student?.religion || 'Hindu',
    caste: student?.caste || '',
    aadharNumber: student?.aadharNumber || '',
    currentAddress: student?.address || '',
    city: student?.city || '',
    state: student?.state || '',
    pinCode: student?.pinCode || '',
    isSameAddress: true,
    permAddress: '',
    permCity: '',
    permState: '',
    permPinCode: '',

    // Step 4: FAMILY & HISTORY
    fatherName: student?.fatherName || student?.guardian || '',
    fatherOccupation: student?.fatherOccupation || '',
    fatherPhone: student?.fatherPhone || '',
    fatherEmail: student?.fatherEmail || '',
    motherName: student?.motherName || '',
    motherOccupation: student?.motherOccupation || '',
    motherPhone: student?.motherPhone || '',
    motherEmail: student?.motherEmail || '',
    primaryGuardian: student?.primaryGuardian || 'Father',
    prevSchoolName: student?.prevSchoolName || '',
    lastClassPassed: student?.lastClassPassed || '',
    tcNumber: student?.tcNumber || '',
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

  const handleFileUpload = (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocuments((prev) => ({ ...prev, [docKey]: file.name }));
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validateStep = (stepIdx: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepIdx === 0) {
      if (!formData.studentName.trim()) {
        newErrors.studentName = 'Student Name is required';
      }
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of Birth is required';
      }
      if (!formData.gender) {
        newErrors.gender = 'Gender is required';
      }
    } else if (stepIdx === 1) {
      if (!formData.grade) {
        newErrors.grade = 'Class is required';
      }
      if (!formData.classSection) {
        newErrors.classSection = 'Section is required';
      }
      if (!formData.admissionNumber.trim()) {
        newErrors.admissionNumber = 'Admission Number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEP_ITEMS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep || validateStep(currentStep)) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    for (let i = 0; i < STEP_ITEMS.length; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i);
        return;
      }
    }

    const submittedStudent: Student = {
      ...student,
      ...formData,
      ...buildStudentPayload({
        ...student,
        ...formData,
        [STUDENT_FIELD_KEYS.ID]: isEditMode ? (formData.admissionNumber || formData.id) : (formData.admissionNumber || `STU${Date.now()}`),
        [STUDENT_FIELD_KEYS.NAME]: formData.studentName || formData.name,
        [STUDENT_FIELD_KEYS.EMAIL]: formData.email,
        [STUDENT_FIELD_KEYS.GRADE]: formData.grade,
        [STUDENT_FIELD_KEYS.CLASS]: formData.classSection || formData.class,
        [STUDENT_FIELD_KEYS.SECTION]: formData.section || (formData.classSection ? formData.classSection.replace(/[0-9]/g, '') : 'A'),
        [STUDENT_FIELD_KEYS.BATCH_CODE]: formData.batchCode || '2023-2024',
        [STUDENT_FIELD_KEYS.ROLL_NO]: formData.rollNo || formData.admissionNumber,
        [STUDENT_FIELD_KEYS.FATHER_NAME]: formData.fatherName || formData.guardian,
        [STUDENT_FIELD_KEYS.PHONE]: formData.studentPhoneNumber || formData.smsContactNumber || formData.phone,
        [STUDENT_FIELD_KEYS.ADDRESS]: formData.currentAddress ? `${formData.currentAddress}, ${formData.city}, ${formData.state} - ${formData.pinCode}` : formData.address,
        [STUDENT_FIELD_KEYS.STATUS]: formData.status || 'Active',
        [STUDENT_FIELD_KEYS.ADMISSION_DATE]: formData.dateOfAdmission || formData.admissionDate,
        [STUDENT_FIELD_KEYS.GUARDIAN]: formData.fatherName || formData.motherName || formData.guardian || 'Guardian',
        [STUDENT_FIELD_KEYS.AVATAR]: profileImage,
        [STUDENT_FIELD_KEYS.FEE_STATUS]: student?.feeStatus || 'Pending',
      })
    } as Student;

    onSave(submittedStudent);
  };

  const sections = ['A', 'B', 'C', 'D', 'E'];
  const languages = ['Hindi', 'English', 'Sanskrit', 'French', 'German', 'Spanish'];
  const categories = ['General', 'OBC', 'SC', 'ST', 'Other'];

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top Header Card */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="h-9 gap-1.5 border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {isEditMode ? 'EDIT STUDENT' : 'CREATE STUDENT'}
              </h1>
              <p className="text-xs text-slate-500">
                Complete student onboarding step by step.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 text-slate-600 hover:text-slate-900"
          >
            Cancel
          </Button>
        </div>

        {/* Universal Top Stepper Header (01, 02, 03 Grid Stepper matching project UX) */}
        <FormStepper
          steps={STEP_ITEMS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        {/* Main Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* STEP 1: STUDENT PROFILE */}
          {currentStep === 0 && (
            <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white">
              <CardHeader className="bg-slate-50/70 border-b border-slate-100 py-4 px-6 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-indigo-600" />
                  <CardTitle className="text-base font-bold text-slate-900 tracking-wide uppercase">
                    STUDENT PROFILE
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">

                {/* Photo & Signature Upload Section */}
                <div className="flex flex-col sm:flex-row items-start gap-8 pb-6 border-b border-slate-100">
                  {/* Photo Upload */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-4 border-slate-100 shadow-sm">
                      <AvatarImage src={profileImage} alt={formData.studentName} />
                      <AvatarFallback className="bg-indigo-50 text-indigo-600 font-bold text-lg">
                        {formData.studentName ? formData.studentName.substring(0, 2).toUpperCase() : 'STU'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-700">Student Photo</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 mb-2">Upload ID card photo (JPG/PNG)</p>
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <Button variant="outline" size="sm" type="button" className="h-8 text-xs gap-1.5 border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg px-3">
                          <Upload className="h-3.5 w-3.5 text-indigo-600" />
                          Photo Upload
                        </Button>
                        <input id="photo-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Signature Upload */}
                  <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-8">
                    <div className="h-16 w-36 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-center text-xs text-slate-400 font-medium">
                      {signatureImage ? (
                        <img src={signatureImage} alt="Signature" className="h-full w-full object-contain p-1.5" />
                      ) : (
                        "Not uploaded"
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-700">Student Signature</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 mb-2">Upload digital signature</p>
                      <label htmlFor="sig-upload" className="cursor-pointer">
                        <Button variant="outline" size="sm" type="button" className="h-8 text-xs gap-1.5 border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg px-3">
                          <Upload className="h-3.5 w-3.5 text-indigo-600" />
                          Upload Sig
                        </Button>
                        <input id="sig-upload" type="file" accept="image/*" onChange={handleSignatureUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Student Name * */}
                  <div className="space-y-1.5">
                    <Label htmlFor="studentName" className="text-xs font-semibold text-slate-700">
                      Student Name <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="studentName"
                      placeholder="Enter full name"
                      value={formData.studentName}
                      onChange={(e) => handleInputChange('studentName', e.target.value)}
                      className={cn("h-10 text-sm", errors.studentName && "border-rose-500 focus:ring-rose-500/20")}
                    />
                    {errors.studentName && (
                      <p className="text-xs font-medium text-rose-500 mt-1">{errors.studentName}</p>
                    )}
                  </div>

                  {/* Email ID */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                      E-mail ID
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="test@gmail.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* Alternative Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="altEmail" className="text-xs font-semibold text-slate-700">
                      Alternative Email
                    </Label>
                    <Input
                      id="altEmail"
                      type="email"
                      placeholder="Enter alternative email"
                      value={formData.altEmail}
                      onChange={(e) => handleInputChange('altEmail', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* Contact Number (SMS Number) * */}
                  <div className="space-y-1.5">
                    <Label htmlFor="smsContactNumber" className="text-xs font-semibold text-slate-700">
                      Contact Number (SMS Number) <span className="text-rose-500">*</span>
                    </Label>
                    <div className="flex items-center rounded-md border border-slate-200 bg-white overflow-hidden h-10 px-3 gap-2">
                      <span className="text-xs font-semibold text-slate-600 shrink-0">🇮🇳 +91</span>
                      <input
                        type="text"
                        value={formData.smsContactNumber.replace('+91 ', '')}
                        onChange={(e) => handleInputChange('smsContactNumber', `+91 ${e.target.value}`)}
                        placeholder="88788 77677"
                        className="w-full text-sm text-slate-800 bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Student's Phone Number */}
                  <div className="space-y-1.5">
                    <Label htmlFor="studentPhoneNumber" className="text-xs font-semibold text-slate-700">
                      Student's Phone Number
                    </Label>
                    <div className="flex items-center rounded-md border border-slate-200 bg-white overflow-hidden h-10 px-3 gap-2">
                      <span className="text-xs font-semibold text-slate-400 shrink-0">+91</span>
                      <input
                        type="text"
                        value={formData.studentPhoneNumber}
                        onChange={(e) => handleInputChange('studentPhoneNumber', e.target.value)}
                        placeholder="Enter student's phone number"
                        className="w-full text-sm text-slate-800 bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Date of Birth * */}
                  <div className="space-y-1.5">
                    <Label htmlFor="dateOfBirth" className="text-xs font-semibold text-slate-700">
                      Date of Birth <span className="text-rose-500">*</span>
                    </Label>
                    <DatePicker
                      id="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={(val) => handleInputChange('dateOfBirth', val)}
                      placeholder="Select Date of Birth"
                      minYear={1950}
                      maxYear={new Date().getFullYear()}
                      error={!!errors.dateOfBirth}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-xs font-medium text-rose-500 mt-1">{errors.dateOfBirth}</p>
                    )}
                  </div>

                  {/* Gender * */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs font-semibold text-slate-700 block">
                      Gender <span className="text-rose-500">*</span>
                    </Label>
                    <div className="flex items-center gap-6 pt-1">
                      {GENDERS.map((g) => (
                        <label key={g} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={formData.gender === g}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                          />
                          {g}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 2: ACADEMIC DETAILS */}
          {currentStep === 1 && (
            <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white">
              <CardHeader className="bg-slate-50/70 border-b border-slate-100 py-4 px-6 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                  <CardTitle className="text-base font-bold text-slate-900 tracking-wide uppercase">
                    ACADEMIC DETAILS
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  {/* Class * */}
                  <div className="space-y-1.5">
                    <Label htmlFor="grade" className="text-xs font-semibold text-slate-700">
                      Class <span className="text-rose-500">*</span>
                    </Label>
                    <Select
                      value={formData.grade}
                      onValueChange={(val) => handleInputChange('grade', val)}
                    >
                      <SelectTrigger id="grade" className={cn("h-10 text-sm", errors.grade && "border-rose-500 ring-2 ring-rose-500/20")}>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {GRADES.map((g) => (
                          <SelectItem key={g} value={g}>{g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.grade && <p className="text-xs font-medium text-rose-500 mt-1">{errors.grade}</p>}
                  </div>

                  {/* Section * */}
                  <div className="space-y-1.5">
                    <Label htmlFor="classSection" className="text-xs font-semibold text-slate-700">
                      Section <span className="text-rose-500">*</span>
                    </Label>
                    <Select
                      value={formData.classSection}
                      onValueChange={(val) => handleInputChange('classSection', val)}
                    >
                      <SelectTrigger id="classSection" className={cn("h-10 text-sm", errors.classSection && "border-rose-500 ring-2 ring-rose-500/20")}>
                        <SelectValue placeholder="Select Section" />
                      </SelectTrigger>
                      <SelectContent>
                        {sections.map((s) => (
                          <SelectItem key={s} value={s}>Section {s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.classSection && <p className="text-xs font-medium text-rose-500 mt-1">{errors.classSection}</p>}
                  </div>

                  {/* Roll Number */}
                  <div className="space-y-1.5">
                    <Label htmlFor="rollNumber" className="text-xs font-semibold text-slate-700">
                      Roll Number
                    </Label>
                    <Input
                      id="rollNumber"
                      placeholder="e.g. 455464566"
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* 2nd Language */}
                  <div className="space-y-1.5">
                    <Label htmlFor="secondLanguage" className="text-xs font-semibold text-slate-700">
                      2nd Language
                    </Label>
                    <Select
                      value={formData.secondLanguage}
                      onValueChange={(val) => handleInputChange('secondLanguage', val)}
                    >
                      <SelectTrigger id="secondLanguage" className="h-10 text-sm">
                        <SelectValue placeholder="Select 2nd Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Registration Number / Student ID */}
                  <div className="space-y-1.5">
                    <Label htmlFor="admissionNumber" className="text-xs font-semibold text-slate-700">
                      Registration number / Student ID <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="admissionNumber"
                      placeholder="Enter registration number / student id"
                      value={formData.admissionNumber}
                      onChange={(e) => handleInputChange('admissionNumber', e.target.value)}
                      className={cn("h-10 text-sm", errors.admissionNumber && "border-rose-500 focus:ring-rose-500/20")}
                    />
                    <p className="text-[11px] text-slate-400">You can set autogenerate from Settings</p>
                    {errors.admissionNumber && <p className="text-xs font-medium text-rose-500 mt-1">{errors.admissionNumber}</p>}
                  </div>

                  {/* Admission Form Number */}
                  <div className="space-y-1.5">
                    <Label htmlFor="admissionFormNumber" className="text-xs font-semibold text-slate-700">
                      Admission Form Number
                    </Label>
                    <Input
                      id="admissionFormNumber"
                      placeholder="Enter admission form number"
                      value={formData.admissionFormNumber}
                      onChange={(e) => handleInputChange('admissionFormNumber', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* Admission Registration Number */}
                  <div className="space-y-1.5">
                    <Label htmlFor="admissionRegNumber" className="text-xs font-semibold text-slate-700">
                      Admission Registration Number
                    </Label>
                    <Input
                      id="admissionRegNumber"
                      placeholder="Enter admission registration number"
                      value={formData.admissionRegNumber}
                      onChange={(e) => handleInputChange('admissionRegNumber', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* T. Reg. No. */}
                  <div className="space-y-1.5">
                    <Label htmlFor="tRegNo" className="text-xs font-semibold text-slate-700">
                      T. Reg. No.
                    </Label>
                    <Input
                      id="tRegNo"
                      placeholder="Enter t. reg. no."
                      value={formData.tRegNo}
                      onChange={(e) => handleInputChange('tRegNo', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* Entrance Registration No. */}
                  <div className="space-y-1.5">
                    <Label htmlFor="entranceRegNo" className="text-xs font-semibold text-slate-700">
                      Entrance Registration No.
                    </Label>
                    <Input
                      id="entranceRegNo"
                      placeholder="Enter entrance registration no."
                      value={formData.entranceRegNo}
                      onChange={(e) => handleInputChange('entranceRegNo', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* Date of Admission */}
                  <div className="space-y-1.5">
                    <Label htmlFor="dateOfAdmission" className="text-xs font-semibold text-slate-700">
                      Date of Admission
                    </Label>
                    <DatePicker
                      id="dateOfAdmission"
                      value={formData.dateOfAdmission}
                      onChange={(val) => handleInputChange('dateOfAdmission', val)}
                      placeholder="Select Date of Admission"
                      minYear={1990}
                      maxYear={2035}
                    />
                  </div>

                  {/* Student Status */}
                  <div className="space-y-1.5">
                    <Label htmlFor="status" className="text-xs font-semibold text-slate-700">
                      Student Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(val) => handleInputChange('status', val)}
                    >
                      <SelectTrigger id="status" className="h-10 text-sm">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((st) => (
                          <SelectItem key={st} value={st}>{st}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 3: PERSONAL & ADDRESS */}
          {currentStep === 2 && (
            <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white">
              <CardHeader className="bg-slate-50/70 border-b border-slate-100 py-4 px-6 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-indigo-600" />
                  <CardTitle className="text-base font-bold text-slate-900 tracking-wide uppercase">
                    PERSONAL & ADDRESS DETAILS
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  {/* Blood Group */}
                  <div className="space-y-1.5">
                    <Label htmlFor="bloodGroup" className="text-xs font-semibold text-slate-700">
                      Blood Group
                    </Label>
                    <Select
                      value={formData.bloodGroup}
                      onValueChange={(val) => handleInputChange('bloodGroup', val)}
                    >
                      <SelectTrigger id="bloodGroup" className="h-10 text-sm">
                        <SelectValue placeholder="Select Blood Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {BLOOD_GROUPS.map((bg) => (
                          <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Nationality */}
                  <div className="space-y-1.5">
                    <Label htmlFor="nationality" className="text-xs font-semibold text-slate-700">
                      Nationality
                    </Label>
                    <Input
                      id="nationality"
                      placeholder="Indian"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <Label htmlFor="category" className="text-xs font-semibold text-slate-700">
                      Category
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(val) => handleInputChange('category', val)}
                    >
                      <SelectTrigger id="category" className="h-10 text-sm">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Religion */}
                  <div className="space-y-1.5">
                    <Label htmlFor="religion" className="text-xs font-semibold text-slate-700">
                      Religion
                    </Label>
                    <Input
                      id="religion"
                      placeholder="Hindu"
                      value={formData.religion}
                      onChange={(e) => handleInputChange('religion', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* Caste */}
                  <div className="space-y-1.5">
                    <Label htmlFor="caste" className="text-xs font-semibold text-slate-700">
                      Caste
                    </Label>
                    <Input
                      id="caste"
                      placeholder="Enter Caste"
                      value={formData.caste}
                      onChange={(e) => handleInputChange('caste', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* Aadhaar Number */}
                  <div className="space-y-1.5">
                    <Label htmlFor="aadharNumber" className="text-xs font-semibold text-slate-700">
                      Aadhaar Number
                    </Label>
                    <Input
                      id="aadharNumber"
                      placeholder="1234 5678 9012"
                      value={formData.aadharNumber}
                      onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* Current Address */}
                  <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
                    <Label htmlFor="currentAddress" className="text-xs font-semibold text-slate-700">
                      Current Address
                    </Label>
                    <Textarea
                      id="currentAddress"
                      placeholder="Enter street name, locality, house no."
                      rows={2}
                      value={formData.currentAddress}
                      onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                      className="text-sm resize-none"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <Label htmlFor="city" className="text-xs font-semibold text-slate-700">City</Label>
                    <Input
                      id="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* State */}
                  <div className="space-y-1.5">
                    <Label htmlFor="state" className="text-xs font-semibold text-slate-700">State</Label>
                    <Input
                      id="state"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* PIN Code */}
                  <div className="space-y-1.5">
                    <Label htmlFor="pinCode" className="text-xs font-semibold text-slate-700">PIN Code</Label>
                    <Input
                      id="pinCode"
                      placeholder="Enter zip code"
                      value={formData.pinCode}
                      onChange={(e) => handleInputChange('pinCode', e.target.value)}
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* Permanent Address Checkbox */}
                  <div className="flex items-center space-x-2 pt-2 sm:col-span-2 lg:col-span-3">
                    <Checkbox
                      id="isSameAddress"
                      checked={formData.isSameAddress}
                      onCheckedChange={(checked) => handleInputChange('isSameAddress', Boolean(checked))}
                    />
                    <Label htmlFor="isSameAddress" className="text-xs font-semibold text-slate-700 cursor-pointer">
                      Permanent address same as current
                    </Label>
                  </div>

                  {!formData.isSameAddress && (
                    <>
                      <div className="space-y-1.5 sm:col-span-2 lg:col-span-3 pt-2 border-t border-slate-100">
                        <Label htmlFor="permAddress" className="text-xs font-semibold text-slate-700">Permanent Address</Label>
                        <Textarea
                          id="permAddress"
                          placeholder="Enter permanent address"
                          rows={2}
                          value={formData.permAddress}
                          onChange={(e) => handleInputChange('permAddress', e.target.value)}
                          className="text-sm resize-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="permCity" className="text-xs font-semibold text-slate-700">City</Label>
                        <Input id="permCity" value={formData.permCity} onChange={(e) => handleInputChange('permCity', e.target.value)} className="h-10 text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="permState" className="text-xs font-semibold text-slate-700">State</Label>
                        <Input id="permState" value={formData.permState} onChange={(e) => handleInputChange('permState', e.target.value)} className="h-10 text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="permPinCode" className="text-xs font-semibold text-slate-700">PIN Code</Label>
                        <Input id="permPinCode" value={formData.permPinCode} onChange={(e) => handleInputChange('permPinCode', e.target.value)} className="h-10 text-sm" />
                      </div>
                    </>
                  )}

                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 4: FAMILY & HISTORY */}
          {currentStep === 3 && (
            <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white">
              <CardHeader className="bg-slate-50/70 border-b border-slate-100 py-4 px-6 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <CardTitle className="text-base font-bold text-slate-900 tracking-wide uppercase">
                    FAMILY & HISTORY DETAILS
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  {/* Father Details */}
                  <div className="space-y-1.5">
                    <Label htmlFor="fatherName" className="text-xs font-semibold text-slate-700">Father Name</Label>
                    <Input id="fatherName" placeholder="Enter father name" value={formData.fatherName} onChange={(e) => handleInputChange('fatherName', e.target.value)} className="h-10 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="fatherOccupation" className="text-xs font-semibold text-slate-700">Father Occupation</Label>
                    <Input id="fatherOccupation" placeholder="Enter occupation" value={formData.fatherOccupation} onChange={(e) => handleInputChange('fatherOccupation', e.target.value)} className="h-10 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="fatherPhone" className="text-xs font-semibold text-slate-700">Father Phone Number</Label>
                    <Input id="fatherPhone" placeholder="Enter phone" value={formData.fatherPhone} onChange={(e) => handleInputChange('fatherPhone', e.target.value)} className="h-10 text-sm" />
                  </div>

                  {/* Mother Details */}
                  <div className="space-y-1.5">
                    <Label htmlFor="motherName" className="text-xs font-semibold text-slate-700">Mother Name</Label>
                    <Input id="motherName" placeholder="Enter mother name" value={formData.motherName} onChange={(e) => handleInputChange('motherName', e.target.value)} className="h-10 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="motherOccupation" className="text-xs font-semibold text-slate-700">Mother Occupation</Label>
                    <Input id="motherOccupation" placeholder="Enter occupation" value={formData.motherOccupation} onChange={(e) => handleInputChange('motherOccupation', e.target.value)} className="h-10 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="motherPhone" className="text-xs font-semibold text-slate-700">Mother Phone Number</Label>
                    <Input id="motherPhone" placeholder="Enter phone" value={formData.motherPhone} onChange={(e) => handleInputChange('motherPhone', e.target.value)} className="h-10 text-sm" />
                  </div>

                  {/* Primary Guardian */}
                  <div className="space-y-1.5 sm:col-span-2 lg:col-span-3 pt-2">
                    <Label className="text-xs font-semibold text-slate-700 block">Primary Guardian</Label>
                    <Select value={formData.primaryGuardian} onValueChange={(val) => handleInputChange('primaryGuardian', val)}>
                      <SelectTrigger className="h-10 text-sm w-64">
                        <SelectValue placeholder="Select Primary Guardian" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Previous School History */}
                  <div className="space-y-1.5 sm:col-span-2 lg:col-span-3 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider text-indigo-600">Previous School History</h4>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="prevSchoolName" className="text-xs font-semibold text-slate-700">Previous School Name</Label>
                    <Input id="prevSchoolName" placeholder="Enter school name" value={formData.prevSchoolName} onChange={(e) => handleInputChange('prevSchoolName', e.target.value)} className="h-10 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastClassPassed" className="text-xs font-semibold text-slate-700">Last Class Passed</Label>
                    <Input id="lastClassPassed" placeholder="Enter last class" value={formData.lastClassPassed} onChange={(e) => handleInputChange('lastClassPassed', e.target.value)} className="h-10 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="tcNumber" className="text-xs font-semibold text-slate-700">TC Number</Label>
                    <Input id="tcNumber" placeholder="Enter TC number" value={formData.tcNumber} onChange={(e) => handleInputChange('tcNumber', e.target.value)} className="h-10 text-sm" />
                  </div>

                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 5: DOCUMENTS */}
          {currentStep === 4 && (
            <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white">
              <CardHeader className="bg-slate-50/70 border-b border-slate-100 py-4 px-6 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <CardTitle className="text-base font-bold text-slate-900 tracking-wide uppercase">
                    IDENTITY & DOCUMENTS
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'aadhaarDoc', label: 'Aadhaar Card Copy' },
                    { key: 'birthCertDoc', label: 'Birth Certificate' },
                    { key: 'tcDoc', label: 'Previous School TC' },
                    { key: 'marksheetDoc', label: 'Previous Marksheet' },
                    { key: 'otherDoc', label: 'Other Certificates' },
                  ].map((doc) => (
                    <div
                      key={doc.key}
                      className="p-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-300 transition-colors bg-slate-50/50 flex flex-col justify-between space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-800">{doc.label}</span>
                        {documents[doc.key] ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <FileUp className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                      {documents[doc.key] ? (
                        <div className="text-xs text-indigo-600 font-medium truncate">
                          {documents[doc.key]}
                        </div>
                      ) : (
                        <label className="cursor-pointer inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                          Upload File
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileUpload(doc.key, e)}
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stepper Footer Navigation (Sticky at Bottom) */}
          <div className="sticky bottom-4 z-30 flex items-center justify-between bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/80">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="h-10 px-4 border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </Button>
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  className="h-10 px-4 border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
            </div>

            {currentStep < STEP_ITEMS.length - 1 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md shadow-indigo-500/20 transition-all"
              >
                Next Step
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="h-10 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl shadow-md shadow-emerald-500/20 transition-all"
              >
                {isEditMode ? <Save className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                {isEditMode ? 'Save Changes' : 'Create Student'}
              </Button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}

export default StudentForm;

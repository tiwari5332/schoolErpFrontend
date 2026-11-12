import React from 'react';
import {
  School,
  Building2,
  Mail,
  Phone,
  Globe,
  Calendar,
  MapPin,
  Building,
  User,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  FileText,
  BadgeCheck
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  AFFILIATION_BOARDS,
  SCHOOL_TYPES,
  ADMIN_DESIGNATIONS,
  INDIAN_STATES,
  AUTH_TEXT
} from '../constants';
import { useSignUpForm } from '../hooks/useSignUpForm';

export function SignUpForm() {
  const {
    currentStep,
    formData,
    errors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    isSuccess,
    createdSchoolInfo,
    updateField,
    nextStep,
    prevStep,
    goToStep,
    handleSubmit,
    navigateToLogin,
  } = useSignUpForm();

  // If successfully onboarded, display celebration confirmation
  if (isSuccess && createdSchoolInfo) {
    return (
      <div className="space-y-6 py-4 animate-in fade-in-50 duration-300">
        <div className="text-center space-y-3">
          <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="h-10 w-10 animate-bounce" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Onboarding Complete</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {AUTH_TEXT.SIGNUP.SUCCESS_TITLE}
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            {AUTH_TEXT.SIGNUP.SUCCESS_DESC}
          </p>
        </div>

        {/* School Summary Card */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-start justify-between pb-3 border-b border-slate-200">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Institution</p>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{createdSchoolInfo.schoolName}</h3>
              <p className="text-xs text-slate-500">Code: <span className="font-mono font-medium text-slate-700">{createdSchoolInfo.schoolCode}</span></p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <School className="h-5 w-5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-500">School ID:</span>
              <p className="font-mono font-semibold text-slate-800 mt-0.5">{createdSchoolInfo.schoolId}</p>
            </div>
            <div>
              <span className="text-slate-500">Admin Login Mobile:</span>
              <p className="font-mono font-semibold text-indigo-600 mt-0.5">{createdSchoolInfo.adminMobile}</p>
            </div>
          </div>

          <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-start gap-2.5 text-xs text-amber-800">
            <BadgeCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Your administrator credentials are ready. You can log in immediately using your registered mobile number: <strong>{createdSchoolInfo.adminMobile}</strong>.
            </span>
          </div>
        </div>

        <Button
          type="button"
          onClick={navigateToLogin}
          className="w-full gradient-indigo text-white shadow-colored-indigo hover:scale-[1.01] transition-all duration-200 py-6 text-base font-semibold"
        >
          <span>{AUTH_TEXT.SIGNUP.BTN_PROCEED_LOGIN}</span>
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stepper Navigation — horizontal icon + label + connector line style */}
      <div className="relative flex items-center justify-between px-2 py-1">

        {/* Connector line: Step 1 → Step 2 */}
        <div className="absolute left-[calc(16.67%+20px)] right-[calc(50%+20px)] top-[22px] h-[2px] z-0">
          <div className="h-full w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-500 ease-out"
              style={{ width: currentStep > 1 ? '100%' : '0%' }}
            />
          </div>
        </div>

        {/* Connector line: Step 2 → Step 3 */}
        <div className="absolute left-[calc(50%+20px)] right-[calc(16.67%+20px)] top-[22px] h-[2px] z-0">
          <div className="h-full w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-500 ease-out"
              style={{ width: currentStep > 2 ? '100%' : '0%' }}
            />
          </div>
        </div>

        {/* Step 1 */}
        <button
          type="button"
          onClick={() => goToStep(1)}
          className="relative z-10 flex flex-col items-center gap-1.5 group focus:outline-none"
        >
          <div
            className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 ring-4 ${
              currentStep === 1
                ? 'bg-indigo-600 text-white ring-indigo-100 shadow-lg shadow-indigo-200'
                : currentStep > 1
                ? 'bg-indigo-600 text-white ring-indigo-50'
                : 'bg-white text-slate-400 ring-slate-100 border-2 border-slate-200'
            }`}
          >
            {currentStep > 1 ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <Building2 className="h-5 w-5" />
            )}
          </div>
          <div className="text-center">
            <p className={`text-[11px] font-semibold leading-tight whitespace-nowrap transition-colors ${
              currentStep >= 1 ? 'text-indigo-700' : 'text-slate-400'
            }`}>
              School Info
            </p>
            <p className="text-[10px] text-slate-400 leading-tight whitespace-nowrap hidden sm:block">
              Identity &amp; Board
            </p>
          </div>
        </button>

        {/* Step 2 */}
        <button
          type="button"
          onClick={() => goToStep(2)}
          className="relative z-10 flex flex-col items-center gap-1.5 group focus:outline-none"
        >
          <div
            className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 ring-4 ${
              currentStep === 2
                ? 'bg-indigo-600 text-white ring-indigo-100 shadow-lg shadow-indigo-200'
                : currentStep > 2
                ? 'bg-indigo-600 text-white ring-indigo-50'
                : 'bg-white text-slate-400 ring-slate-100 border-2 border-slate-200'
            }`}
          >
            {currentStep > 2 ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <MapPin className="h-5 w-5" />
            )}
          </div>
          <div className="text-center">
            <p className={`text-[11px] font-semibold leading-tight whitespace-nowrap transition-colors ${
              currentStep >= 2 ? 'text-indigo-700' : 'text-slate-400'
            }`}>
              Campus
            </p>
            <p className="text-[10px] text-slate-400 leading-tight whitespace-nowrap hidden sm:block">
              Address &amp; City
            </p>
          </div>
        </button>

        {/* Step 3 */}
        <button
          type="button"
          onClick={() => goToStep(3)}
          className="relative z-10 flex flex-col items-center gap-1.5 group focus:outline-none"
        >
          <div
            className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 ring-4 ${
              currentStep === 3
                ? 'bg-indigo-600 text-white ring-indigo-100 shadow-lg shadow-indigo-200'
                : 'bg-white text-slate-400 ring-slate-100 border-2 border-slate-200'
            }`}
          >
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="text-center">
            <p className={`text-[11px] font-semibold leading-tight whitespace-nowrap transition-colors ${
              currentStep >= 3 ? 'text-indigo-700' : 'text-slate-400'
            }`}>
              Admin &amp; Access
            </p>
            <p className="text-[10px] text-slate-400 leading-tight whitespace-nowrap hidden sm:block">
              Credentials
            </p>
          </div>
        </button>

      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ================= STEP 1: SCHOOL PROFILE ================= */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <div className="flex items-center gap-2 pb-1 text-slate-700">
              <Building2 className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-semibold">{AUTH_TEXT.SIGNUP.STEP_1_TITLE}</h3>
              <span className="text-xs text-slate-400">({AUTH_TEXT.SIGNUP.STEP_1_DESC})</span>
            </div>

            {/* School Name */}
            <div className="space-y-1.5">
              <Label htmlFor="schoolName" className="text-xs font-medium text-slate-700">
                {AUTH_TEXT.SIGNUP.SCHOOL_NAME_LABEL} <span className="text-rose-500">*</span>
              </Label>
              <div className="relative">
                <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="schoolName"
                  placeholder={AUTH_TEXT.SIGNUP.SCHOOL_NAME_PLACEHOLDER}
                  value={formData.schoolName}
                  onChange={(e) => updateField('schoolName', e.target.value)}
                  className={`pl-10 h-10 ${errors.schoolName ? 'border-rose-500 focus:border-rose-500' : ''}`}
                />
              </div>
              {errors.schoolName && (
                <p className="text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>{errors.schoolName}</span>
                </p>
              )}
            </div>

            {/* School Code / Affiliation No. */}
            <div className="space-y-1.5">
              <Label htmlFor="schoolCode" className="text-xs font-medium text-slate-700">
                {AUTH_TEXT.SIGNUP.SCHOOL_CODE_LABEL} <span className="text-rose-500">*</span>
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="schoolCode"
                  placeholder={AUTH_TEXT.SIGNUP.SCHOOL_CODE_PLACEHOLDER}
                  value={formData.schoolCode}
                  onChange={(e) => updateField('schoolCode', e.target.value)}
                  className={`pl-10 h-10 ${errors.schoolCode ? 'border-rose-500 focus:border-rose-500' : ''}`}
                />
              </div>
              {errors.schoolCode && (
                <p className="text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>{errors.schoolCode}</span>
                </p>
              )}
            </div>

            {/* Board and School Category 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Board */}
              <div className="space-y-1.5">
                <Label htmlFor="affiliationBoard" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.BOARD_LABEL} <span className="text-rose-500">*</span>
                </Label>
                <Select
                  value={formData.affiliationBoard}
                  onValueChange={(val) => updateField('affiliationBoard', val)}
                >
                  <SelectTrigger
                    id="affiliationBoard"
                    className={`h-10 text-xs ${errors.affiliationBoard ? 'border-rose-500' : ''}`}
                  >
                    <SelectValue placeholder={AUTH_TEXT.SIGNUP.BOARD_PLACEHOLDER} />
                  </SelectTrigger>
                  <SelectContent>
                    {AFFILIATION_BOARDS.map((board) => (
                      <SelectItem key={board} value={board} className="text-xs">
                        {board}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.affiliationBoard && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.affiliationBoard}</span>
                  </p>
                )}
              </div>

              {/* School Category / Level */}
              <div className="space-y-1.5">
                <Label htmlFor="schoolType" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.SCHOOL_TYPE_LABEL} <span className="text-rose-500">*</span>
                </Label>
                <Select
                  value={formData.schoolType}
                  onValueChange={(val) => updateField('schoolType', val)}
                >
                  <SelectTrigger
                    id="schoolType"
                    className={`h-10 text-xs ${errors.schoolType ? 'border-rose-500' : ''}`}
                  >
                    <SelectValue placeholder={AUTH_TEXT.SIGNUP.SCHOOL_TYPE_PLACEHOLDER} />
                  </SelectTrigger>
                  <SelectContent>
                    {SCHOOL_TYPES.map((type) => (
                      <SelectItem key={type} value={type} className="text-xs">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.schoolType && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.schoolType}</span>
                  </p>
                )}
              </div>
            </div>

            {/* School Email & School Phone 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="schoolEmail" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.SCHOOL_EMAIL_LABEL} <span className="text-rose-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="schoolEmail"
                    type="email"
                    placeholder={AUTH_TEXT.SIGNUP.SCHOOL_EMAIL_PLACEHOLDER}
                    value={formData.schoolEmail}
                    onChange={(e) => updateField('schoolEmail', e.target.value)}
                    className={`pl-10 h-10 ${errors.schoolEmail ? 'border-rose-500' : ''}`}
                  />
                </div>
                {errors.schoolEmail && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.schoolEmail}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="schoolPhone" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.SCHOOL_PHONE_LABEL} <span className="text-rose-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="schoolPhone"
                    type="tel"
                    placeholder={AUTH_TEXT.SIGNUP.SCHOOL_PHONE_PLACEHOLDER}
                    value={formData.schoolPhone}
                    onChange={(e) => updateField('schoolPhone', e.target.value)}
                    className={`pl-10 h-10 ${errors.schoolPhone ? 'border-rose-500' : ''}`}
                  />
                </div>
                {errors.schoolPhone && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.schoolPhone}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Optional Website and Estd Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="website" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.WEBSITE_LABEL}
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="website"
                    placeholder={AUTH_TEXT.SIGNUP.WEBSITE_PLACEHOLDER}
                    value={formData.website}
                    onChange={(e) => updateField('website', e.target.value)}
                    className="pl-10 h-10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="establishedYear" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.ESTD_YEAR_LABEL}
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="establishedYear"
                    placeholder={AUTH_TEXT.SIGNUP.ESTD_YEAR_PLACEHOLDER}
                    value={formData.establishedYear}
                    onChange={(e) => updateField('establishedYear', e.target.value)}
                    className="pl-10 h-10"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: CAMPUS & LOCATION ================= */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <div className="flex items-center gap-2 pb-1 text-slate-700">
              <MapPin className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-semibold">{AUTH_TEXT.SIGNUP.STEP_2_TITLE}</h3>
              <span className="text-xs text-slate-400">({AUTH_TEXT.SIGNUP.STEP_2_DESC})</span>
            </div>

            {/* Street Address */}
            <div className="space-y-1.5">
              <Label htmlFor="address" className="text-xs font-medium text-slate-700">
                {AUTH_TEXT.SIGNUP.ADDRESS_LABEL} <span className="text-rose-500">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <textarea
                  id="address"
                  rows={2}
                  placeholder={AUTH_TEXT.SIGNUP.ADDRESS_PLACEHOLDER}
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className={`flex w-full rounded-xl border border-slate-200 bg-white px-3 py-2 pl-10 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 ${
                    errors.address ? 'border-rose-500' : ''
                  }`}
                />
              </div>
              {errors.address && (
                <p className="text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>{errors.address}</span>
                </p>
              )}
            </div>

            {/* City & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="city" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.CITY_LABEL} <span className="text-rose-500">*</span>
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="city"
                    placeholder={AUTH_TEXT.SIGNUP.CITY_PLACEHOLDER}
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className={`pl-10 h-10 ${errors.city ? 'border-rose-500' : ''}`}
                  />
                </div>
                {errors.city && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.city}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="state" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.STATE_LABEL} <span className="text-rose-500">*</span>
                </Label>
                <Select
                  value={formData.state}
                  onValueChange={(val) => updateField('state', val)}
                >
                  <SelectTrigger
                    id="state"
                    className={`h-10 text-xs ${errors.state ? 'border-rose-500' : ''}`}
                  >
                    <SelectValue placeholder={AUTH_TEXT.SIGNUP.STATE_PLACEHOLDER} />
                  </SelectTrigger>
                  <SelectContent className="max-h-56">
                    {INDIAN_STATES.map((st) => (
                      <SelectItem key={st} value={st} className="text-xs">
                        {st}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.state}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Postal Code & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="postalCode" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.POSTAL_CODE_LABEL} <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="postalCode"
                  placeholder={AUTH_TEXT.SIGNUP.POSTAL_CODE_PLACEHOLDER}
                  value={formData.postalCode}
                  maxLength={6}
                  onChange={(e) => updateField('postalCode', e.target.value)}
                  className={`h-10 ${errors.postalCode ? 'border-rose-500' : ''}`}
                />
                {errors.postalCode && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.postalCode}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="country" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.COUNTRY_LABEL}
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  disabled
                  className="h-10 bg-slate-100 text-slate-600 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: ADMINISTRATOR & CREDENTIALS ================= */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <div className="flex items-center gap-2 pb-1 text-slate-700">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-semibold">{AUTH_TEXT.SIGNUP.STEP_3_TITLE}</h3>
              <span className="text-xs text-slate-400">({AUTH_TEXT.SIGNUP.STEP_3_DESC})</span>
            </div>

            {/* Admin Name & Designation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="adminName" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.ADMIN_NAME_LABEL} <span className="text-rose-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="adminName"
                    placeholder={AUTH_TEXT.SIGNUP.ADMIN_NAME_PLACEHOLDER}
                    value={formData.adminName}
                    onChange={(e) => updateField('adminName', e.target.value)}
                    className={`pl-10 h-10 ${errors.adminName ? 'border-rose-500' : ''}`}
                  />
                </div>
                {errors.adminName && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.adminName}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="adminDesignation" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.DESIGNATION_LABEL} <span className="text-rose-500">*</span>
                </Label>
                <Select
                  value={formData.adminDesignation}
                  onValueChange={(val) => updateField('adminDesignation', val)}
                >
                  <SelectTrigger
                    id="adminDesignation"
                    className={`h-10 text-xs ${errors.adminDesignation ? 'border-rose-500' : ''}`}
                  >
                    <SelectValue placeholder={AUTH_TEXT.SIGNUP.DESIGNATION_PLACEHOLDER} />
                  </SelectTrigger>
                  <SelectContent>
                    {ADMIN_DESIGNATIONS.map((role) => (
                      <SelectItem key={role} value={role} className="text-xs">
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.adminDesignation && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.adminDesignation}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Admin Mobile & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="adminMobile" className="text-xs font-medium text-slate-700">
                    {AUTH_TEXT.SIGNUP.ADMIN_MOBILE_LABEL} <span className="text-rose-500">*</span>
                  </Label>
                  <span className="text-[10px] text-indigo-600 font-medium">Primary Login ID</span>
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="adminMobile"
                    type="tel"
                    placeholder={AUTH_TEXT.SIGNUP.ADMIN_MOBILE_PLACEHOLDER}
                    value={formData.adminMobile}
                    onChange={(e) => updateField('adminMobile', e.target.value)}
                    className={`pl-10 h-10 ${errors.adminMobile ? 'border-rose-500' : ''}`}
                  />
                </div>
                {errors.adminMobile && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.adminMobile}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="adminEmail" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.ADMIN_EMAIL_LABEL} <span className="text-rose-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="adminEmail"
                    type="email"
                    placeholder={AUTH_TEXT.SIGNUP.ADMIN_EMAIL_PLACEHOLDER}
                    value={formData.adminEmail}
                    onChange={(e) => updateField('adminEmail', e.target.value)}
                    className={`pl-10 h-10 ${errors.adminEmail ? 'border-rose-500' : ''}`}
                  />
                </div>
                {errors.adminEmail && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.adminEmail}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="signup-password" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.PASSWORD_LABEL} <span className="text-rose-500">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={AUTH_TEXT.SIGNUP.PASSWORD_PLACEHOLDER}
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    className={`pl-10 pr-10 h-10 ${errors.password ? 'border-rose-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-xs font-medium text-slate-700">
                  {AUTH_TEXT.SIGNUP.CONFIRM_PASSWORD_LABEL} <span className="text-rose-500">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={AUTH_TEXT.SIGNUP.CONFIRM_PASSWORD_PLACEHOLDER}
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    className={`pl-10 pr-10 h-10 ${errors.confirmPassword ? 'border-rose-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.confirmPassword}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="pt-2">
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => updateField('agreeToTerms', checked as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="agreeToTerms" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                  {AUTH_TEXT.SIGNUP.TERMS_LABEL}
                </Label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>{errors.agreeToTerms}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Global Submit Error Banner */}
        {errors.submit && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-700">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errors.submit}</span>
          </div>
        )}

        {/* Form Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="px-4 border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              <span>{AUTH_TEXT.SIGNUP.BTN_BACK}</span>
            </Button>
          )}

          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex-1 gradient-indigo text-white shadow-colored-indigo hover:scale-[1.01] transition-all duration-200"
            >
              <span>{AUTH_TEXT.SIGNUP.BTN_NEXT}</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 gradient-indigo text-white shadow-colored-indigo hover:scale-[1.01] transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Onboarding School...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>{AUTH_TEXT.SIGNUP.BTN_SUBMIT}</span>
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;


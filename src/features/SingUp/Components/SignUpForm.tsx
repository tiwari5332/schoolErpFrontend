
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Mail } from "lucide-react";
import { Eye } from "lucide-react";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { Lock } from "lucide-react";
import { EyeOff } from "lucide-react";
import { User } from "lucide-react";
import { Phone } from "lucide-react";
import { School } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { useSignUp } from "../Hooks/useSignUp";
import { SIGNUP_TEXT } from "../Constants";

const SignUpForm = () => {
  const {
    formData,
    setFormData,
    errors,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit
  } = useSignUp();

  return <form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name">{SIGNUP_TEXT.FULL_NAME_LABEL}</Label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          id="name"
          type="text"
          placeholder={SIGNUP_TEXT.FULL_NAME_PLACEHOLDER}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`pl-10 ${errors.name ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
        />
      </div>
      {errors.name && (
        <div className="flex items-center gap-1 text-xs text-rose-600">
          <AlertCircle className="h-3 w-3" />
          <span>{errors.name}</span>
        </div>
      )}
    </div>

    {/* Mobile Number Field */}
    <div className="space-y-2">
      <Label htmlFor="mobile">{SIGNUP_TEXT.MOBILE_NUMBER_LABEL}</Label>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          id="mobile"
          type="tel"
          placeholder={SIGNUP_TEXT.MOBILE_NUMBER_PLACEHOLDER}
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          className={`pl-10 ${errors.mobile ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
        />
      </div>
      {errors.mobile && (
        <div className="flex items-center gap-1 text-xs text-rose-600">
          <AlertCircle className="h-3 w-3" />
          <span>{errors.mobile}</span>
        </div>
      )}
    </div>

    {/* School Name Field */}
    <div className="space-y-2">
      <Label htmlFor="schoolName">{SIGNUP_TEXT.SCHOOL_NAME_LABEL}</Label>
      <div className="relative">
        <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          id="schoolName"
          type="text"
          placeholder={SIGNUP_TEXT.SCHOOL_NAME_PLACEHOLDER}
          value={formData.schoolName}
          onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
          className={`pl-10 ${errors.schoolName ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
        />
      </div>
      {errors.schoolName && (
        <div className="flex items-center gap-1 text-xs text-rose-600">
          <AlertCircle className="h-3 w-3" />
          <span>{errors.schoolName}</span>
        </div>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="email">{SIGNUP_TEXT.EMAIL_LABEL}</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          id="email"
          type="email"
          placeholder={SIGNUP_TEXT.EMAIL_PLACEHOLDER}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`pl-10 ${errors.email ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
        />
      </div>
      {errors.email && (
        <div className="flex items-center gap-1 text-xs text-rose-600">
          <AlertCircle className="h-3 w-3" />
          <span>{errors.email}</span>
        </div>
      )}
    </div>

    {/* Password Field */}
    <div className="space-y-2">
      <Label htmlFor="password">{SIGNUP_TEXT.PASSWORD_LABEL}</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder={SIGNUP_TEXT.PASSWORD_PLACEHOLDER}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={`pl-10 pr-10 ${errors.password ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
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
        <div className="flex items-center gap-1 text-xs text-rose-600">
          <AlertCircle className="h-3 w-3" />
          <span>{errors.password}</span>
        </div>
      )}
    </div>
    <div className="space-y-2">
      <Label htmlFor="confirmPassword">{SIGNUP_TEXT.CONFIRM_PASSWORD_LABEL}</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder={SIGNUP_TEXT.CONFIRM_PASSWORD_PLACEHOLDER}
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
        />
      </div>
      {errors.confirmPassword && (
        <div className="flex items-center gap-1 text-xs text-rose-600">
          <AlertCircle className="h-3 w-3" />
          <span>{errors.confirmPassword}</span>
        </div>
      )}
    </div>

    <div className="space-y-2">
      <div className="flex items-start items-center gap-2">
        <Checkbox
          id="terms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
          className={errors.agreeToTerms ? 'border-rose-500' : ''}
        />
        <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
          {SIGNUP_TEXT.TERMS_AGREE}{' '}
          <button type="button" className="text-indigo-600 hover:text-indigo-700">
            {SIGNUP_TEXT.TERMS_LINK}
          </button>
          {' '}{SIGNUP_TEXT.AND}{' '}
          <button type="button" className="text-indigo-600 hover:text-indigo-700">
            {SIGNUP_TEXT.PRIVACY_LINK}
          </button>
        </Label>
      </div>
      {errors.agreeToTerms && (
        <div className="flex items-center gap-1 text-xs text-rose-600">
          <AlertCircle className="h-3 w-3" />
          <span>{errors.agreeToTerms}</span>
        </div>
      )}
    </div>
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200"
      size="lg"
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
      ) : (
        <>
          <span>{SIGNUP_TEXT.CREATE_ACCOUNT_BTN}</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </>
      )}
    </Button>
  </form>
}

export default SignUpForm;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Eye, EyeOff, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/constants/routes';
import { useLoginForm } from '../hooks/useLoginForm';
import { AUTH_TEXT } from '../constants/text';

export function LoginForm() {
  const navigate = useNavigate();
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{AUTH_TEXT.LOGIN.ID_EMAIL_LABEL}</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="email"
            type="text"
            placeholder={AUTH_TEXT.LOGIN.ID_EMAIL_PLACEHOLDER}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`pl-10 ${errors.email || errors.submit ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
          />
        </div>
        {errors.email && (
          <div className="flex items-center gap-1 text-xs text-rose-600">
            <AlertCircle className="h-3 w-3" />
            <span>{errors.email}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{AUTH_TEXT.LOGIN.PASSWORD_LABEL}</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={AUTH_TEXT.LOGIN.PASSWORD_PLACEHOLDER}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`pl-10 pr-10 ${errors.password || errors.submit ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
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

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
            />
            <Label htmlFor="remember" className="text-sm cursor-pointer">
              {AUTH_TEXT.LOGIN.REMEMBER_ME}
            </Label>
          </div>
          <button
            type="button"
            onClick={() => {
              setErrors({});
              navigate(ROUTES.FORGOT_PASSWORD);
            }}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            {AUTH_TEXT.LOGIN.FORGOT_PASSWORD}
          </button>
        </div>
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
            <span>{AUTH_TEXT.LOGIN.SIGN_IN_BTN}</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </>
        )}
      </Button>

      {errors.submit && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs text-rose-700 mt-2">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{errors.submit}</span>
        </div>
      )}
    </form>
  );
}

export default LoginForm;

import React from 'react';
import {
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/constants/routes';
import { AUTH_TEXT } from '../constants';
import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm';

export function ForgotPasswordForm() {
  const navigate = useNavigate();
  const {
    step,
    setStep,
    identifier,
    setIdentifier,
    otp,
    setOtp,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    isLoading,
    countdown,
    handleRequestReset,
    handleResendOtp,
    handleResetSubmit,
    navigateToLogin,
  } = useForgotPasswordForm();

  // Step 3: Success Screen
  if (step === 'success') {
    return (
      <div className="space-y-6 py-4 animate-in fade-in-50 duration-300">
        <div className="text-center space-y-3">
          <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="h-10 w-10 animate-bounce" />
          </div>
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Security Updated</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {AUTH_TEXT.FORGOT.SUCCESS_TITLE}
          </h2>
          <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            {AUTH_TEXT.FORGOT.SUCCESS_DESC}
          </p>
        </div>

        <Button
          type="button"
          onClick={navigateToLogin}
          className="w-full gradient-indigo text-white shadow-colored-indigo hover:scale-[1.01] transition-all duration-200 py-6 text-sm font-semibold"
        >
          <span>{AUTH_TEXT.FORGOT.BACK_TO_LOGIN}</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    );
  }

  // Step 2: Verification and Set New Password
  if (step === 'verify') {
    return (
      <form onSubmit={handleResetSubmit} className="space-y-4 animate-in fade-in-50 duration-200">
        <div className="p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-xl space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-950 font-semibold text-xs">
            <ShieldCheck className="h-4 w-4 text-indigo-600" />
            <span>Verification Code Sent</span>
          </div>
          <p className="text-xs text-indigo-800">
            We sent a verification code to <span className="font-semibold text-slate-900">{identifier}</span>.
          </p>
        </div>

        {/* OTP Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="otp" className="text-xs font-medium text-slate-700">
              {AUTH_TEXT.FORGOT.OTP_LABEL} <span className="text-rose-500">*</span>
            </Label>
            {countdown > 0 ? (
              <span className="text-[11px] text-slate-400 font-mono">
                Resend in {countdown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="text-[11px] text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Resend Code</span>
              </button>
            )}
          </div>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="otp"
              placeholder={AUTH_TEXT.FORGOT.OTP_PLACEHOLDER}
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className={`pl-10 tracking-widest font-mono text-base h-10 ${
                errors.otp ? 'border-rose-500' : ''
              }`}
            />
          </div>
          {errors.otp && (
            <p className="text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errors.otp}</span>
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <Label htmlFor="newPassword" className="text-xs font-medium text-slate-700">
            {AUTH_TEXT.FORGOT.NEW_PASSWORD_LABEL} <span className="text-rose-500">*</span>
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder={AUTH_TEXT.FORGOT.NEW_PASSWORD_PLACEHOLDER}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`pl-10 pr-10 h-10 ${errors.newPassword ? 'border-rose-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errors.newPassword}</span>
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="space-y-1.5">
          <Label htmlFor="confirmNewPassword" className="text-xs font-medium text-slate-700">
            {AUTH_TEXT.FORGOT.CONFIRM_PASSWORD_LABEL} <span className="text-rose-500">*</span>
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="confirmNewPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={AUTH_TEXT.FORGOT.CONFIRM_PASSWORD_PLACEHOLDER}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

        {errors.submit && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-700">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errors.submit}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full gradient-indigo text-white shadow-colored-indigo hover:scale-[1.01] transition-all duration-200 h-10"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Updating Password...</span>
            </div>
          ) : (
            <span>{AUTH_TEXT.FORGOT.RESET_SUBMIT_BTN}</span>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => setStep('request')}
          className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 h-10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Change Email / Mobile</span>
        </Button>
      </form>
    );
  }

  // Step 1: Identifier Request Form
  return (
    <form onSubmit={handleRequestReset} className="space-y-4 animate-in fade-in-50 duration-200">
      <div className="text-center pb-2">
        <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2 shadow-sm border border-indigo-100">
          <KeyRound className="h-6 w-6" />
        </div>
        <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
          Enter your registered school administrator email address or mobile number. We will send a secure verification code to reset your account credentials.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="forgot-identifier" className="text-xs font-medium text-slate-700">
          {AUTH_TEXT.FORGOT.IDENTIFIER_LABEL} <span className="text-rose-500">*</span>
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="forgot-identifier"
            type="text"
            placeholder={AUTH_TEXT.FORGOT.IDENTIFIER_PLACEHOLDER}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className={`pl-10 h-10 ${errors.identifier ? 'border-rose-500' : ''}`}
          />
        </div>
        {errors.identifier && (
          <p className="text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>{errors.identifier}</span>
          </p>
        )}
      </div>

      {errors.submit && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-700">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{errors.submit}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full gradient-indigo text-white shadow-colored-indigo hover:scale-[1.01] transition-all duration-200 h-10"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Sending Code...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span>{AUTH_TEXT.FORGOT.SEND_OTP_BTN}</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        )}
      </Button>

      <div className="pt-2 text-center">
        <Button
          type="button"
          variant="ghost"
          onClick={navigateToLogin}
          className="text-xs text-slate-600 hover:text-indigo-600 font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
          <span>{AUTH_TEXT.FORGOT.BACK_TO_LOGIN}</span>
        </Button>
      </div>

      <div className="text-center pt-3 border-t border-slate-200">
        <p className="text-xs text-slate-600">
          {AUTH_TEXT.TOGGLE.NO_ACCOUNT}{' '}
          <button
            type="button"
            onClick={() => navigate(ROUTES.SIGNUP)}
            className="text-indigo-600 hover:text-indigo-700 font-medium underline-offset-2 hover:underline"
          >
            {AUTH_TEXT.TOGGLE.SIGN_UP_LINK}
          </button>
        </p>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;


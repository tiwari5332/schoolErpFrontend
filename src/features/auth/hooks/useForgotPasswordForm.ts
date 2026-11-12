import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import authService from '@/api/services/authService';

export function useForgotPasswordForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'request' | 'verify' | 'success'>('request');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const validateIdentifier = (value: string): boolean => {
    const trimmed = value.trim();
    if (!trimmed) return false;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    const isPhone = /^\+?[0-9]{10,14}$/.test(trimmed.replace(/[\s-]/g, ''));
    return isEmail || isPhone;
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!identifier.trim()) {
      newErrors.identifier = 'Email address or mobile number is required';
    } else if (!validateIdentifier(identifier)) {
      newErrors.identifier = 'Please enter a valid email address or 10-digit mobile number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});
      await authService.forgotPassword({ emailOrMobile: identifier.trim() });
      setStep('verify');
      setCountdown(45);
    } catch (err: any) {
      setErrors({
        submit: err?.message || 'Failed to send verification code. Please check your details.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    try {
      setIsLoading(true);
      await authService.forgotPassword({ emailOrMobile: identifier.trim() });
      setCountdown(45);
    } catch (err: any) {
      setErrors({ submit: err?.message || 'Could not resend code. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!otp.trim()) {
      newErrors.otp = 'Verification code is required';
    } else if (otp.trim().length < 4) {
      newErrors.otp = 'Please enter the complete verification code';
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});
      await authService.resetPassword({
        emailOrMobile: identifier.trim(),
        otp: otp.trim(),
        newPassword,
      });
      setStep('success');
    } catch (err: any) {
      setErrors({
        submit: err?.message || 'Password reset failed. Invalid or expired OTP.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    setErrors({});
    navigate(ROUTES.LOGIN);
  };

  return {
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
    setErrors,
    isLoading,
    countdown,
    handleRequestReset,
    handleResendOtp,
    handleResetSubmit,
    navigateToLogin,
  };
}


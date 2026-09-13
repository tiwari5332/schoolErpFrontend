import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../router/RouterConstant';
import authService from '../../../api/services/authService';
import { getOrCreateDeviceId } from '../../../utils/deviceId';
import { AUTH_TOKEN_KEY } from '../../../api/httpClient';

export function useSignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    schoolName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Auto-redirect to admin dashboard if token is present
  useEffect(() => {
    const existingToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (existingToken) {
      navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
    }
  }, [navigate]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateMobile = (mobile: string) => {
    const regex = /^[+]?[\d\s-]{10,15}$/;
    return regex.test(mobile.replace(/\s/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'School name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});

      const payload = {
        fullName: formData.name.trim(),
        mobileNo: formData.mobile.trim(),
        schoolName: formData.schoolName.trim(),
        emailAddress: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      // 1. Register account
      await authService.registerAdmin(payload);

      // 2. Automatically log in after registration
      const deviceId = getOrCreateDeviceId();
      const loginResponse = await authService.loginAdmin({
        msisdn: payload.mobileNo,
        password: payload.password,
        deviceId
      });

      const token = loginResponse?.token || loginResponse?.accessToken || loginResponse?.authToken || loginResponse?.data?.token;

      if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        const userObj = loginResponse?.user || loginResponse?.data?.user;
        if (userObj) {
          localStorage.setItem('user_info', JSON.stringify(userObj));
        }
        navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
      } else {
        // If account registered but login response missed token, redirect to login with prompt
        navigate(ROUTES.LOGIN);
      }
    } catch (err: any) {
      const apiErrors = err.responseData?.fieldErrors;
      const mappedErrors: { [key: string]: string } = {};

      if (Array.isArray(apiErrors) && apiErrors.length > 0) {
        apiErrors.forEach((fe: { field: string; message: string }) => {
          if (fe.field === 'emailAddress') mappedErrors.email = fe.message;
          else if (fe.field === 'mobileNo') mappedErrors.mobile = fe.message;
          else if (fe.field === 'fullName') mappedErrors.name = fe.message;
          else if (fe.field === 'schoolName') mappedErrors.schoolName = fe.message;
          else if (fe.field === 'password') mappedErrors.password = fe.message;
          else if (fe.field === 'confirmPassword') mappedErrors.confirmPassword = fe.message;
        });
      }

      mappedErrors.submit = err.message || 'Registration failed. Please check your details and try again.';
      setErrors(mappedErrors);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit
  };
}

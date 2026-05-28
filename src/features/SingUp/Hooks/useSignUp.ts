import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../router/RouterConstant';
import { AuthApi } from '../../../services/AuthApi';

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
      newErrors.name = 'Name is required';
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
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
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

      // Check for duplicate email
      const existingUsers = JSON.parse(localStorage.getItem('edu_trio_registered_users') || '[]');
      const duplicate = existingUsers.find((u: any) => u.email === formData.email);
      if (duplicate) {
        setErrors({ email: 'An account with this email already exists' });
        setIsLoading(false);
        return;
      }

      await AuthApi.signup(formData);

      // Store registered user in localStorage so they can log in
      const newUser = {
        id: `USR${String(existingUsers.length + 1).padStart(3, '0')}`,
        name: formData.name,
        mobile: formData.mobile,
        schoolName: formData.schoolName,
        email: formData.email,
        password: formData.password,
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      existingUsers.push(newUser);
      localStorage.setItem('edu_trio_registered_users', JSON.stringify(existingUsers));

      // Success - navigate to login
      navigate(ROUTES.LOGIN);
    } catch (err: any) {
      setErrors({
        email: err.message || 'Registration failed'
      });
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

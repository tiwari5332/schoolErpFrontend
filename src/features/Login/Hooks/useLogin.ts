import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../router/RouterConstant';
import { AuthApi } from '../../../services/AuthApi';

export function useLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = 'ID / Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});
      const response = await AuthApi.login(formData.email, formData.password);
      
      // Success - set auth token and redirect to dashboard
      localStorage.setItem('auth_token', response.token);
      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (err: any) {
      setErrors({
        email: err.message || 'Invalid ID or Password',
        password: err.message || 'Invalid ID or Password'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    showPassword,
    setShowPassword,
    isLogin,
    setIsLogin,
    isForgotPassword,
    setIsForgotPassword,
    isLoading,
    handleSubmit
  };
}

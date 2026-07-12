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

      // First try the hardcoded admin login via AuthApi
      let response: any = null;
      let loginSuccess = false;

      try {
        response = await AuthApi.login(formData.email, formData.password);
        loginSuccess = true;
      } catch {
        // Hardcoded admin login failed — check localStorage registered users
        const registeredUsers = JSON.parse(localStorage.getItem('edu_trio_registered_users') || '[]');
        const matchedUser = registeredUsers.find(
          (u: any) => u.email === formData.email && u.password === formData.password
        );

        if (matchedUser) {
          response = {
            token: btoa(matchedUser.email),
            user: { name: matchedUser.name, email: matchedUser.email, role: matchedUser.role }
          };
          loginSuccess = true;
        }
      }

      if (loginSuccess && response) {
        localStorage.setItem('auth_token', response.token);
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else {
        setErrors({
          email: 'Invalid ID or Password',
          password: 'Invalid ID or Password'
        });
      }
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

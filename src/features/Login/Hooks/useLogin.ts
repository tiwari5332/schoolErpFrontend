import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../router/RouterConstant';
import authService from '../../../api/services/authService';
import { getOrCreateDeviceId } from '../../../utils/deviceId';
import { AUTH_TOKEN_KEY } from '../../../api/httpClient';

export function useLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '', // Serves as MSISDN / Mobile / Admin ID
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Auto-redirect to admin dashboard if token exists
  useEffect(() => {
    const existingToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (existingToken) {
      navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    const identifier = formData.email.trim();
    if (!identifier) {
      newErrors.email = 'Mobile number / ID is required';
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

      const deviceId = getOrCreateDeviceId();

      const response = await authService.loginAdmin({
        msisdn: identifier,
        password: formData.password,
        deviceId
      });

      const token = response?.token || response?.accessToken || response?.authToken || response?.data?.token;

      if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);

        const userObj = response?.user || response?.data?.user;
        if (userObj) {
          localStorage.setItem('user_info', JSON.stringify(userObj));
        }

        navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
      } else {
        setErrors({
          submit: response?.message || 'Login failed. Invalid Mobile number / MSISDN or Password.'
        });
      }
    } catch (err: any) {
      const displayMsg = err.message || 'Invalid Mobile number / MSISDN or Password';
      setErrors({
        submit: displayMsg
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

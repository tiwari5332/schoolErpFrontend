import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import authService from '@/api/services/authService';
import { getOrCreateDeviceId } from '@/utils/deviceId';
import {
  getStoredAuthToken,
  getRememberedCredentials,
  setRememberedCredentials
} from '@/utils/authStorage';
import useAppStore from '@/store';

export function useLoginForm() {
  const navigate = useNavigate();
  const setSession = useAppStore((state) => state.setSession);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const existingToken = getStoredAuthToken();
    if (existingToken) {
      navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
      return;
    }

    const remembered = getRememberedCredentials();
    if (remembered.rememberMe && remembered.email) {
      setFormData((prev) => ({
        ...prev,
        email: remembered.email,
        rememberMe: true
      }));
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
        setRememberedCredentials(identifier, formData.rememberMe);
        const userObj = response?.user || response?.data?.user;
        setSession(token, userObj, formData.rememberMe);
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
    isLoading,
    handleSubmit
  };
}

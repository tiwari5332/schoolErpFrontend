import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import authService, { RegisterRequest } from '@/api/services/authService';
import { setRememberedCredentials } from '@/utils/authStorage';

export interface SignUpFormData {
  // Step 1: School Profile
  schoolName: string;
  schoolCode: string;
  affiliationBoard: string;
  schoolType: string;
  schoolEmail: string;
  schoolPhone: string;
  website: string;
  establishedYear: string;

  // Step 2: Campus & Location
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;

  // Step 3: Administrator & Security
  adminName: string;
  adminDesignation: string;
  adminMobile: string;
  adminEmail: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const initialFormData: SignUpFormData = {
  schoolName: '',
  schoolCode: '',
  affiliationBoard: '',
  schoolType: '',
  schoolEmail: '',
  schoolPhone: '',
  website: '',
  establishedYear: '',

  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'India',

  adminName: '',
  adminDesignation: '',
  adminMobile: '',
  adminEmail: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
};

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

const validatePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
};

export function useSignUpForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<SignUpFormData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdSchoolInfo, setCreatedSchoolInfo] = useState<{
    schoolId?: string;
    schoolName?: string;
    schoolCode?: string;
    adminName?: string;
    adminMobile?: string;
  } | null>(null);

  const updateField = (field: keyof SignUpFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field] || errors.submit) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        delete updated.submit;
        return updated;
      });
    }
  };

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (stepNumber === 1) {
      if (!formData.schoolName.trim()) {
        newErrors.schoolName = 'School name is required';
      } else if (formData.schoolName.trim().length < 3) {
        newErrors.schoolName = 'School name must be at least 3 characters';
      }

      if (!formData.schoolCode.trim()) {
        newErrors.schoolCode = 'School code / Affiliation number is required';
      }

      if (!formData.affiliationBoard) {
        newErrors.affiliationBoard = 'Please select the affiliation board';
      }

      if (!formData.schoolType) {
        newErrors.schoolType = 'Please select the school category';
      }

      if (!formData.schoolEmail.trim()) {
        newErrors.schoolEmail = 'Official school email is required';
      } else if (!validateEmail(formData.schoolEmail)) {
        newErrors.schoolEmail = 'Please enter a valid email address';
      }

      if (!formData.schoolPhone.trim()) {
        newErrors.schoolPhone = 'School contact phone is required';
      } else if (!validatePhone(formData.schoolPhone)) {
        newErrors.schoolPhone = 'Please enter a valid phone number (at least 10 digits)';
      }
    } else if (stepNumber === 2) {
      if (!formData.address.trim()) {
        newErrors.address = 'Campus address is required';
      } else if (formData.address.trim().length < 5) {
        newErrors.address = 'Please enter full street/campus address';
      }

      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }

      if (!formData.state.trim()) {
        newErrors.state = 'State / Union Territory is required';
      }

      if (!formData.postalCode.trim()) {
        newErrors.postalCode = 'Postal / PIN code is required';
      } else if (!/^\d{5,6}$/.test(formData.postalCode.trim())) {
        newErrors.postalCode = 'PIN code must be 5 to 6 digits';
      }
    } else if (stepNumber === 3) {
      if (!formData.adminName.trim()) {
        newErrors.adminName = 'Administrator / Principal name is required';
      }

      if (!formData.adminDesignation.trim()) {
        newErrors.adminDesignation = 'Please select administrator designation';
      }

      if (!formData.adminMobile.trim()) {
        newErrors.adminMobile = 'Admin mobile number is required';
      } else if (!validatePhone(formData.adminMobile)) {
        newErrors.adminMobile = 'Valid 10-digit mobile number required (used for sign-in)';
      }

      if (!formData.adminEmail.trim()) {
        newErrors.adminEmail = 'Admin email address is required';
      } else if (!validateEmail(formData.adminEmail)) {
        newErrors.adminEmail = 'Please enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirmation password is required';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must accept the terms & school data governance policy';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goToStep = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      setErrors({});
      setCurrentStep(stepNumber);
    } else if (stepNumber > currentStep) {
      // Validate all previous steps
      let valid = true;
      for (let s = currentStep; s < stepNumber; s++) {
        if (!validateStep(s)) {
          valid = false;
          break;
        }
      }
      if (valid) {
        setCurrentStep(stepNumber);
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Validate step 3
    if (!validateStep(3)) {
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});

      const cleanMobile = formData.adminMobile.replace(/\D/g, '').slice(-10);

      const payload: RegisterRequest = {
        fullName: formData.adminName.trim(),
        mobileNo: cleanMobile,
        schoolName: formData.schoolName.trim(),
        emailAddress: formData.adminEmail.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        schoolCode: formData.schoolCode.trim(),
        affiliationBoard: formData.affiliationBoard,
        schoolType: formData.schoolType,
        schoolEmail: formData.schoolEmail.trim(),
        schoolPhone: formData.schoolPhone.trim(),
        website: formData.website.trim(),
        establishedYear: formData.establishedYear.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        postalCode: formData.postalCode.trim(),
        country: formData.country,
        designation: formData.adminDesignation,
      };

      const response = await authService.registerAdmin(payload);

      // Pre-remember the mobile number for login convenience
      setRememberedCredentials(cleanMobile, true);

      setCreatedSchoolInfo({
        schoolId: response?.schoolId || 'SCH-' + Math.floor(1000 + Math.random() * 9000),
        schoolName: response?.schoolName || formData.schoolName,
        schoolCode: response?.schoolCode || formData.schoolCode,
        adminName: response?.adminName || formData.adminName,
        adminMobile: response?.mobileNo || cleanMobile,
      });

      setIsSuccess(true);
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        'Registration failed. Please review your details and try again.';
      setErrors({ submit: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  return {
    currentStep,
    formData,
    errors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    isSuccess,
    createdSchoolInfo,
    updateField,
    nextStep,
    prevStep,
    goToStep,
    handleSubmit,
    navigateToLogin,
  };
}


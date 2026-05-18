import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../router/RouterConstant";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Mail } from "lucide-react";
import { Eye } from "lucide-react";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { Lock } from "lucide-react";
import { EyeOff } from "lucide-react";
import { AlertCircle } from "lucide-react";
const LoginForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validation
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
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

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!isLogin && !formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Success - redirect to dashboard
      navigate(ROUTES.ADMIN_DASHBOARD);
    }
  };

  return <form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="email">Email Address</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`pl-10 ${errors.email ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
        />
      </div>
      {errors.email && (
        <div className="flex items-center gap-1 text-xs text-rose-600">
          <AlertCircle className="h-3 w-3" />
          <span>{errors.email}</span>
        </div>
      )}
    </div>

    {/* Password Field */}
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={`pl-10 pr-10 ${errors.password ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
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
            Remember me
          </Label>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsForgotPassword(true);
            setErrors({});
          }}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          Forgot password?
        </button>
      </div>
    </div>
    <Button
      type="submit"
      className="w-full gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200"
      size="lg"
    >
      <span>{'Sign In'}</span>
      <ArrowRight className="h-4 w-4 ml-2" />
    </Button>
  </form>
}

export default LoginForm;
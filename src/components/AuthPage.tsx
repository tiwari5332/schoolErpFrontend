import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { EduTrioLogo } from "./EduTrioLogo";
import { 
  Mail, Lock, User, Eye, EyeOff, ArrowRight, 
  Shield, Sparkles, CheckCircle, AlertCircle,
  GraduationCap, Heart, BookOpen, Brain, ArrowLeft, Send
} from "lucide-react";

interface AuthPageProps {
  onLogin: () => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
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
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

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
      // Success - call onLogin
      onLogin();
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Success - show confirmation
      setResetEmailSent(true);
    }
  };

  const features = [
    {
      icon: GraduationCap,
      title: 'Smart Learning',
      description: 'AI-powered education management',
      color: 'indigo'
    },
    {
      icon: Heart,
      title: 'Parent Engagement',
      description: 'Real-time communication tools',
      color: 'emerald'
    },
    {
      icon: BookOpen,
      title: 'Virtual Classrooms',
      description: 'Interactive digital learning',
      color: 'purple'
    },
    {
      icon: Brain,
      title: 'AI Analytics',
      description: 'Predictive insights & reports',
      color: 'cyan'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            <div className="animate-float">
              <EduTrioLogo size="xl" className="drop-shadow-lg" />
            </div>
            <div>
              <h1 className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                Transform Education with Technology
              </h1>
              <p className="text-slate-600 leading-relaxed">
                Join thousands of schools using EduTrio to revolutionize education management with AI-powered insights, seamless communication, and comprehensive analytics.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg glass-card hover-lift">
                <CardContent className="p-4">
                  <div className={`h-10 w-10 rounded-xl gradient-${feature.color} flex items-center justify-center shadow-colored-${feature.color} mb-3`}>
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-xs text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span>Secure & Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>Trusted by 1000+ Schools</span>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex items-center justify-center">
          <Card className="border-0 shadow-2xl glass-card w-full max-w-md">
            <CardHeader className="text-center pb-6">
              <div className="lg:hidden mb-4">
                <EduTrioLogo size="lg" className="mx-auto" />
              </div>
              <CardTitle className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                {isForgotPassword ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Create Account')}
              </CardTitle>
              <p className="text-slate-600 mt-2">
                {isForgotPassword
                  ? 'We\'ll help you get back into your account'
                  : (isLogin 
                    ? 'Sign in to access your EduTrio portal' 
                    : 'Join EduTrio to get started')}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {isForgotPassword ? (
                // Forgot Password Form
                resetEmailSent ? (
                  // Success Message
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <div className="h-16 w-16 rounded-full gradient-emerald flex items-center justify-center shadow-colored-emerald mx-auto mb-4 animate-pulse-slow">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">Check Your Email</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        We've sent password reset instructions to<br />
                        <span className="font-medium text-slate-900">{formData.email}</span>
                      </p>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-2">
                      <div className="flex items-start gap-2 text-sm text-slate-700">
                        <Shield className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-indigo-900 mb-1">Didn't receive the email?</p>
                          <p className="text-xs text-slate-600">
                            Check your spam folder or{' '}
                            <button
                              onClick={() => setResetEmailSent(false)}
                              className="text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                              try again
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(false);
                        setResetEmailSent(false);
                        setErrors({});
                        setFormData({
                          name: '',
                          email: '',
                          password: '',
                          confirmPassword: '',
                          rememberMe: false,
                          agreeToTerms: false
                        });
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Sign In
                    </Button>
                  </div>
                ) : (
                  // Reset Password Request Form
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                        <Lock className="h-6 w-6 text-indigo-600" />
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Enter your email address and we'll send you instructions to reset your password.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="forgot-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="forgot-email"
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

                    <Button
                      type="submit"
                      className="w-full gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200"
                      size="lg"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Reset Instructions
                    </Button>

                    <Button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(false);
                        setErrors({});
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Sign In
                    </Button>
                  </form>
                )
              ) : (
                // Login/Signup Form
                <>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field (Signup only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`pl-10 ${errors.name ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                      />
                    </div>
                    {errors.name && (
                      <div className="flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Email Field */}
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

                {/* Confirm Password Field (Signup only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <div className="flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.confirmPassword}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Remember Me / Terms Checkbox */}
                <div className="space-y-3">
                  {isLogin ? (
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
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Checkbox 
                          id="terms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                          className={errors.agreeToTerms ? 'border-rose-500' : ''}
                        />
                        <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                          I agree to the{' '}
                          <button type="button" className="text-indigo-600 hover:text-indigo-700">
                            Terms of Service
                          </button>
                          {' '}and{' '}
                          <button type="button" className="text-indigo-600 hover:text-indigo-700">
                            Privacy Policy
                          </button>
                        </Label>
                      </div>
                      {errors.agreeToTerms && (
                        <div className="flex items-center gap-1 text-xs text-rose-600">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.agreeToTerms}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200"
                  size="lg"
                >
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>

              {/* Divider */}
              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-slate-500">OR CONTINUE WITH</span>
                </div>
              </div> */}

              {/* Social Login */}
              {/* <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button"
                  variant="outline" 
                  className="border-slate-200 hover:bg-slate-50"
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  className="border-slate-200 hover:bg-slate-50"
                >
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </Button>
              </div> */}

              {/* Toggle Login/Signup */}
              <div className="text-center pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setErrors({});
                      setFormData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        rememberMe: false,
                        agreeToTerms: false
                      });
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Badge */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <Badge className="bg-white/80 backdrop-blur-sm border-slate-200 text-slate-700 px-4 py-2 shadow-lg">
          <Sparkles className="h-3 w-3 mr-1 text-indigo-600" />
          Transforming Education Through Technology
        </Badge>
      </div>
    </div>
  );
}
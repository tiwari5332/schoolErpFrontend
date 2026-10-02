import React from 'react';
import AuthLayout from '@/layout/AuthLayout';
import { Card, CardContent } from '@/components/ui/card';
import HeaderComponent from '@/components/HeaderComponent';
import { LoginForm } from './components/LoginForm';
import ToggleSignupLogin from '@/components/ToggleSignup';
import { AUTH_TEXT } from './constants/text';

interface AuthFeatureProps {
  view?: 'login' | 'signup' | 'forgot-password';
}

export function AuthFeature({ view = 'login' }: AuthFeatureProps) {
  const heading = view === 'login' ? AUTH_TEXT.LOGIN.HEADING : AUTH_TEXT.SIGNUP.HEADING;
  const subHeading = view === 'login' ? AUTH_TEXT.LOGIN.SUB_HEADING : AUTH_TEXT.SIGNUP.SUB_HEADING;

  return (
    <AuthLayout>
      <div className="flex items-center justify-center">
        <Card className="border-0 shadow-2xl glass-card w-full max-w-md">
          <HeaderComponent heading={heading} subHeading={subHeading} />
          <CardContent className="space-y-6">
            <LoginForm />
            <ToggleSignupLogin />
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
}

export default AuthFeature;

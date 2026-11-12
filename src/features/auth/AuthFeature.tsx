import React from 'react';
import AuthLayout from '@/layout/AuthLayout';
import { Card, CardContent } from '@/components/ui/card';
import HeaderComponent from '@/components/HeaderComponent';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import ToggleSignupLogin from '@/components/ToggleSignup';
import { AUTH_TEXT } from './constants';

interface AuthFeatureProps {
  view?: 'login' | 'signup' | 'forgot-password';
}

export function AuthFeature({ view = 'login' }: AuthFeatureProps) {
  let heading: string = AUTH_TEXT.LOGIN.HEADING;
  let subHeading: string = AUTH_TEXT.LOGIN.SUB_HEADING;

  if (view === 'signup') {
    heading = AUTH_TEXT.SIGNUP.HEADING;
    subHeading = AUTH_TEXT.SIGNUP.SUB_HEADING;
  } else if (view === 'forgot-password') {
    heading = AUTH_TEXT.FORGOT.HEADING;
    subHeading = AUTH_TEXT.FORGOT.SUB_HEADING;
  }

  const isSignup = view === 'signup';

  return (
    <AuthLayout wide={isSignup}>
      <div className="flex items-center justify-center w-full">
        <Card
          className={`border-0 shadow-2xl glass-card w-full transition-all duration-300 ${
            isSignup ? 'max-w-xl lg:max-w-2xl' : 'max-w-md'
          }`}
        >
          <HeaderComponent heading={heading} subHeading={subHeading} />
          <CardContent className="space-y-6">
            {view === 'login' && (
              <>
                <LoginForm />
                <ToggleSignupLogin isLogin={true} />
              </>
            )}

            {view === 'signup' && (
              <>
                <SignUpForm />
                <ToggleSignupLogin isLogin={false} />
              </>
            )}

            {view === 'forgot-password' && <ForgotPasswordForm />}
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
}

export default AuthFeature;

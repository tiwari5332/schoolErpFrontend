# Auth Feature Module

## Purpose
Manages authentication views (Login, Signup, Forgot Password), form states, API requests, and session creation.

## Structure
- `components/`: Presentational components (`LoginForm.tsx`, `SignupForm.tsx`, `ForgotPasswordForm.tsx`).
- `hooks/`: Form hooks (`useLoginForm.ts`, `useSignupForm.ts`, `useForgotPasswordForm.ts`).
- `constants/`: User-facing strings (`text.ts`) and configuration (`config.ts`).
- `AuthFeature.tsx`: Main feature container.
- `index.ts`: Public API export.

## Public API
- `AuthFeature`: React component rendering the feature entry.

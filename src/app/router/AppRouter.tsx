import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import AuthPageSkelton from '@/components/Loaders/AuthPageSkelton';

const LoginPage = lazy(() => import('@/pages/LoginPage.tsx'));
const SignupPage = lazy(() => import('@/pages/SignupPage.tsx'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage.tsx'));
const AdminLayout = lazy(() => import('@/layout/AdminLayout'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage.tsx'));
const StudentsPage = lazy(() => import('@/pages/StudentManagementPage.tsx'));
const TeachersPage = lazy(() => import('@/pages/TeachersPage.tsx'));
const AdminsPage = lazy(() => import('@/pages/AdminsPage.tsx'));
const FeeManagementPage = lazy(() => import('@/pages/FeeManagementPage.tsx'));
const ScheduleManagementPage = lazy(() => import('@/pages/ScheduleManagementPage.tsx'));
const CommunicationPage = lazy(() => import('@/pages/CommunicationPage.tsx'));
const AcademicSetupPage = lazy(() => import('@/pages/AcademicSetupPage.tsx'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage.tsx'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage.tsx'));
const AttendancePage = lazy(() => import('@/pages/AttendanceManagementPage.tsx'));

export const AppRouter = createBrowserRouter([
  {
    path: ROUTES.DEFAULT_ROUTE,
    element: (
      <Suspense fallback={<AuthPageSkelton />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <Suspense fallback={<AuthPageSkelton />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.SIGNUP,
    element: (
      <Suspense fallback={<AuthPageSkelton />}>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: (
      <Suspense fallback={<AuthPageSkelton />}>
        <ForgotPasswordPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.ADMIN_DASHBOARD,
    element: (
      <Suspense fallback={<AuthPageSkelton />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'attendance',
        element: <AttendancePage />,
      },
      {
        path: 'students',
        element: <StudentsPage />,
      },
      {
        path: 'teachers',
        element: <TeachersPage />,
      },
      {
        path: 'fees',
        element: <FeeManagementPage />,
      },
      {
        path: 'schedule',
        element: <ScheduleManagementPage />,
      },
      {
        path: 'communication',
        element: <CommunicationPage />,
      },
      {
        path: 'academic-setup',
        element: <AcademicSetupPage />,
      },
      {
        path: 'admins',
        element: <AdminsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
]);

export default AppRouter;

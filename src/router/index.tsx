import { lazy ,Suspense} from "react";
import {createBrowserRouter} from "react-router-dom";
import ROUTES from "./RouterConstant";
import AuthPageSkelton from "../components/Loaders/AuthPageSkelton.tsx";

const LoginPage = lazy(() => import("../pages/LoginPage/Login.tsx"));
const SingUpPage = lazy(() => import("../pages/SingUpPage/Signup.tsx"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage/ForgotPassword.tsx"));
const AdminLayout = lazy(() => import("../layout/AdminLayout.tsx"));
const DashboardPage = lazy(() => import("../features/AdminDashboard/Pages/DashboardPage"));
const StudentsPage = lazy(() => import("../pages/StudentManagementPage/index.tsx"));
const TeachersPage = lazy(() => import("../features/TeacherManagement/Pages/TeacherList.tsx"));
const AdminsPage = lazy(() => import("../features/AdminManagement/Pages/AdminList.tsx"));

const FeeManagementPage = lazy(() => import("../pages/FeeManagementPage/index.tsx"));
const ScheduleManagementPage = lazy(() => import("../pages/ScheduleManagementPage/index.tsx"));
const CommunicationPage = lazy(() => import("../pages/CommunicationPage/index.tsx"));
const AcademicSetupPage = lazy(() => import("../pages/AcademicSetupPage/index.tsx"));
const ExamManagementPage = lazy(() => import("../pages/ExamManagementPage/index.tsx"));

const AppRouter = createBrowserRouter([
  {
    path: ROUTES.DEFAULT_ROUTE,
    element:  <Suspense fallback={<AuthPageSkelton />}>
        <LoginPage />
      </Suspense>
  },
  {
    path: ROUTES.LOGIN,
    element:  <Suspense fallback={<AuthPageSkelton />}>
        <LoginPage />
      </Suspense>
  },
  {
    path: ROUTES.SIGNUP,
    element:  <Suspense fallback={<AuthPageSkelton />}>
        <SingUpPage />
      </Suspense>
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element:  <Suspense fallback={<AuthPageSkelton />}>
        <ForgotPasswordPage />
      </Suspense>
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
      index: true, // default child route
      element: <DashboardPage />,
    },
    {
      path: "students", 
      element: <StudentsPage />,
    },
    {
      path: "teachers",
      element: <TeachersPage />,
    },
    {
      path: "fees",
      element: <FeeManagementPage />,
    },
    {
      path: "schedule",
      element: <ScheduleManagementPage />,
    },
    {
      path: "communication",
      element: <CommunicationPage />,
    },
    {
      path: "academic-setup",
      element: <AcademicSetupPage />,
    },
    {
      path: "exams",
      element: <ExamManagementPage />,
    },
    {
      path: "admins",
      element: <AdminsPage />,
    },
  ],
}

]);

export default AppRouter;
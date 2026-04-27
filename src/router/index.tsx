import { lazy ,Suspense} from "react";
import {createBrowserRouter} from "react-router-dom";
import ROUTES from "./RouterConstant";

const LandingPage = lazy(() => import("../components/LandingPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/Login"));
const SingUpPage = lazy(() => import("../pages/SingUpPage/Signup"));

const AppRouter = createBrowserRouter([
  {
    path: ROUTES.DEFAULT_ROUTE,
    element:  <Suspense fallback={<div>Loading...</div>}>
        <LandingPage onGetStarted={() => {}} />
      </Suspense>
  },
  {
    path: ROUTES.LOGIN,
    element:  <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
  },
  {
    path: ROUTES.SIGNUP,
    element:  <Suspense fallback={<div>Loading...</div>}>
        <SingUpPage />
      </Suspense>
  },
]);

export default AppRouter;
import AuthLayout from "../../layout/AuthLayout";
import LoginForm from "./Components/LoginForm";
import { CardHeader } from "../../components/ui/card";
import { EduTrioLogo } from "../../components/EduTrioLogo";
import { CardTitle } from "../../components/ui/card";
import { Card } from "../../components/ui/card";
import { CardContent } from "../../components/ui/card";
import ToggleSingupLogin from "./Components/ToggleSignup";
import HeaderComponent from "./Components/HeaderComponent";

const LoginFeature = () => {
  return <AuthLayout>
    <div className="flex items-center justify-center">
      <Card className="border-0 shadow-2xl glass-card w-full max-w-md">
        <HeaderComponent/>
        <CardContent className="space-y-6">
          <LoginForm />
          <ToggleSingupLogin/>
        </CardContent>
      </Card>
    </div>
  </AuthLayout>
}

export default LoginFeature;
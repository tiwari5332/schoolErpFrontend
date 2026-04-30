import AuthLayout from "../../layout/AuthLayout";
import LoginForm from "./Components/LoginForm";
import { CardHeader } from "../../components/ui/card";
import { EduTrioLogo } from "../../components/EduTrioLogo";
import { Card } from "../../components/ui/card";
import { CardContent } from "../../components/ui/card";
import ToggleSingupLogin from "../../components/ToggleSignup";
import HeaderComponent from "../../components/HeaderComponent";
import ForgotPasswordForm from "./Components/ForgotPaswordForm";

const ForgotPasswordFeature = () => {
  return <AuthLayout>
    <div className="flex items-center justify-center">
      <Card className="border-0 shadow-2xl glass-card w-full max-w-md">
       <HeaderComponent heading="Reset Password" subHeading="We'll help you get back into your account" />
        <CardContent className="space-y-6">
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  </AuthLayout>
}

export default ForgotPasswordFeature;
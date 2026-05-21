import AuthLayout from "../../layout/AuthLayout";
import LoginForm from "./Components/LoginForm";
import { CardHeader } from "../../components/ui/card";
import { EduTrioLogo } from "../../components/EduTrioLogo";
import { Card } from "../../components/ui/card";
import { CardContent } from "../../components/ui/card";
import ToggleSingupLogin from "../../components/ToggleSignup";
import HeaderComponent from "../../components/HeaderComponent";
import ForgotPasswordForm from "./Components/ForgotPaswordForm";
import { FORGOT_PWD_TEXT } from "./Constants";

const ForgotPasswordFeature = () => {
  return <AuthLayout>
    <div className="flex items-center justify-center">
      <Card className="border-0 shadow-2xl glass-card w-full max-w-md">
       <HeaderComponent heading={FORGOT_PWD_TEXT.HEADING} subHeading={FORGOT_PWD_TEXT.SUB_HEADING} />
        <CardContent className="space-y-6">
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  </AuthLayout>
}

export default ForgotPasswordFeature;
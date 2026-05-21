import AuthLayout from "../../layout/AuthLayout";
import LoginForm from "./Components/LoginForm";
import { Card } from "../../components/ui/card";
import { CardContent } from "../../components/ui/card";
import ToggleSingupLogin from "../../components/ToggleSignup";
import HeaderComponent from "../../components/HeaderComponent";
import { LOGIN_TEXT } from "./Constants";

const LoginFeature = () => {
  return <AuthLayout>
    <div className="flex items-center justify-center">
      <Card className="border-0 shadow-2xl glass-card w-full max-w-md">
       <HeaderComponent heading={LOGIN_TEXT.HEADING} subHeading={LOGIN_TEXT.SUB_HEADING} />  
        <CardContent className="space-y-6">
          <LoginForm />
          <ToggleSingupLogin/>
        </CardContent>
      </Card>
    </div>
  </AuthLayout>
}

export default LoginFeature;
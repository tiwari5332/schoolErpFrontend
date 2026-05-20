import AuthLayout from "../../layout/AuthLayout";
import { Card } from "../../components/ui/card";
import { CardContent } from "../../components/ui/card";
import ToggleSingupLogin from "../../components/ToggleSignup";
import SignUpForm from "./Components/SignUpForm";
import HeaderComponent from "../../components/HeaderComponent";
import { SIGNUP_TEXT } from "./Constants";

const SignUpFeature = () => {
  return <AuthLayout>
    <div className="flex items-center justify-center">
      <Card className="border-0 shadow-2xl glass-card w-full max-w-md">
        <HeaderComponent heading={SIGNUP_TEXT.HEADING} subHeading={SIGNUP_TEXT.SUB_HEADING} />  
        <CardContent className="space-y-6">
          <SignUpForm/>
          <ToggleSingupLogin isLogin={false} />
        </CardContent>
      </Card>
    </div>
  </AuthLayout>
}

export default SignUpFeature;
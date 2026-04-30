import AuthLayout from "../../layout/AuthLayout";
import { Card } from "../../components/ui/card";
import { CardContent } from "../../components/ui/card";
import ToggleSingupLogin from "../../components/ToggleSignup";
import SignUpForm from "./Components/SignUpForm";
import HeaderComponent from "../../components/HeaderComponent";

const SignUpFeature = () => {
  return <AuthLayout>
    <div className="flex items-center justify-center">
      <Card className="border-0 shadow-2xl glass-card w-full max-w-md">
        <HeaderComponent heading="Create an Account" subHeading="Join EduTrio and start your learning journey today!" />  
        <CardContent className="space-y-6">
          <SignUpForm/>
          <ToggleSingupLogin isLogin={false} />
        </CardContent>
      </Card>
    </div>
  </AuthLayout>
}

export default SignUpFeature;